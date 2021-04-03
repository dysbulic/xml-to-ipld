import ipfsClient from 'ipfs-http-client'
import React from 'react'
import CID from 'cids'

export const ipfs = ipfsClient({ port: 5001 })

export const toIPLD = async (obj) => {
  return await ipfs.dag.put(obj)
}

export const camelCase = (str, sep = '-') => (
  str.split(sep)
  .map((part, i) => {
    if(i === 0) {
      return part
    } else {
      return part[0].toUpperCase() + part.slice(1)
    }
  })
  .join('')
)

export const nodeToJSON = ({
  node, children, depth, left, right
}) => {
  const json = {
    name: node.localName, children,
    depth, left, right,
  }
  json.type = ((() => {
    switch(node.nodeType) {
    case Node.ELEMENT_NODE: return 'element'
    case Node.TEXT_NODE: return 'text'
    case Node.ATTRIBUTE_NODE: return 'attribute'
    case Node.CDATA_SECTION_NODE: return 'cdata'
    case Node.ENTITY_REFERENCE_NODE: return 'reference'
    case Node.ENTITY_NODE: return 'entity'
    case Node.PROCESSING_INSTRUCTION_NODE: return 'instruction'
    case Node.COMMENT_NODE: return 'comment'
    case Node.DOCUMENT_NODE: return 'document'
    case Node.DOCUMENT_TYPE_NODE: return 'doctype'
    case Node.DOCUMENT_FRAGMENT_NODE: return 'fragment'
    case Node.NOTATION_NODE: return 'notation'
    default: return 'unknown'
    }
  })())
  if(json.type === 'text' || json.type === 'cdata') {
    delete json.name
    json.value = node.textContent
    if(/^\n\s*$/.test(json.value)) {
      return null // Don't save inter-element whitespace
    }
  }
  if(children.length === 0) {
    delete json.children
  }
  json.attributes = Object.fromEntries(
    [...node.attributes ?? []].map((attr) => {
      let value = attr.value
      if(attr.name === 'style') {
        value = Object.fromEntries(
          attr.value.split(';').map(
            (rule) => {
              const [name, ...val] = rule.split(':')
              return [camelCase(name.trim()), val.join().trim()]
            }
          )
          .filter(e => e.some(t => /\S/.test(t)))
        )
      }
      return [attr.name, value]
    })
  )
  if(Object.keys(json.attributes).length === 0) {
    delete json.attributes
  }
  return json
}

// Dereference a CID if the node is one
const optDeref = async (node) => {
  if(CID.isCID(node)) {
    return (await ipfs.dag.get(node)).value
  }
  return node
}

const cleanAttributes = async (attributes) => {
  attributes = await optDeref(attributes ?? {})

  const attrs = {}
  for(let [name, val] of Object.entries(attributes)) {
    attrs[name] = await optDeref(val)
  }

  if(attrs.style) {
    const style = {}
    for(let [prop, val] of (
      Object.entries(attrs.style)
    )) {
      style[camelCase(prop, '-')] = val
    }
    attrs.style = style
  }

  if(attrs.class) {
    attrs.className = attrs.class
    delete attrs.class
  }
  for(let attr of ['xml:space', 'xmlns:xlink', 'xlink:href']) {
    if(attrs[attr]) {
      attrs[camelCase(attr, ':')] = attrs[attr]
      delete attrs[attr]
    }
  }
  for(let attr of [
    'flood-opacity', 'flood-color', 'stop-color',
    'clip-rule',
  ]) {
    if(attrs[attr]) {
      attrs[camelCase(attr, '-')] = attrs[attr]
      delete attrs[attr]
    }
  }

  return attrs
}

export const buildDOM = async ({
  root, key = { val: 0 },
  onProcessing = (..._) => {},
  onCompleting = (..._) => {},
  onDOMStart = (..._) => {},
  onDOMFinish = (..._) => {},
  onChildElem = (..._) => {},
}) => {
  if(root.type !== 'element') {
    throw new Error(`Root Type: ${root.type}`)
  }
  onProcessing({ node: root })
  const children = []
  for(let child of Object.values(
    await optDeref(root.children ?? [])
  )) {
    child = await optDeref(child)
    if(child.type === 'element') {
      onDOMStart({ child })
      child.children = await Promise.all(
        Object.values(
          await optDeref(child.children ?? [])
        )
        .map(optDeref)
      )
      console.info(child, child.children)
      if(
        child.children.length === 0
        || child.children.some(
          (sub) => (
            !['text', 'cdata'].includes(sub.type)
          )
        )
      ) {
        // if there are non-text nodes, recurse
        const dom = await buildDOM({ root: child, key })
        onDOMFinish(child, dom)
        children.push(dom)
      } else {
        // otherwise build a node
        const attrs = await cleanAttributes(child.attributes)
        attrs.key = ++key.val

        const text = (
          child.children.map(c => c.value).join()
        )
        const elem = (
          React.createElement(child.name, attrs, text)
        )
        onChildElem(child, elem)
        children.push(elem)
      }
    } else if(child.value && child.value.trim() !== '') {
      console.error('Child', child.value)
    }
  }
  const attrs = await cleanAttributes(root.attributes)
  attrs.key = ++key.val
  const elem = React.createElement(
    root.name, attrs, children.length > 0 ? children : null
  )
  onCompleting(root, elem)
  return 
}
