import ipfsClient from 'ipfs-http-client'
import React from 'react'
import CID from 'cids'

let ipfs = (
  ipfsClient({ protocol: 'http', host: 'localhost', port: 5001 })
)

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
  try {
    if(CID.isCID(node)) {
      return (await ipfs.dag.get(node)).value
    }
    return node
  } catch(err) {
    console.warn('ERR', err)
    ipfs = ipfsClient({ host: 'ipfs.io', port: 443 })
    return await optDeref(node)
  }
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
  // ToDo: switch this to a blacklist & convert everything else
  for(let attr of [
    'flood-opacity', 'flood-color', 'stop-color',
    'clip-rule', 'stroke-miterlimit', 'stroke-linejoin',
    'stroke-linecap', 'stroke-width', 'clip-path',
    'fill-rule', 'font-size', 'font-family',
    'enable-background',
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
  onBuildStart = null, onBuildEnd = null,
  onDOMStart = null, onDOMFinish = null,
  onLeaf = null,
}) => {
  root = await optDeref(root)
  if(root.type !== 'element') {
    throw new Error(`Root Type: ${root.type}`)
  }
  if(root.depth === 1 && root.left === 1) {
    onBuildStart?.({ root })
  }
  root.children = await Promise.all(
    Object.values(
      await optDeref(root.children ?? [])
    )
    .map(optDeref)
  )
  const children = []
  for(let child of root.children) {
    if(child.type === 'element') {
      onDOMStart?.({ parent: root, child })
      child.children = await Promise.all(
        Object.values(
          await optDeref(child.children ?? [])
        )
        .map(optDeref)
      )
      const dom = await (
        buildDOM({
          root: child, key,
          onBuildStart, onBuildEnd,
          onDOMStart, onDOMFinish,
          onLeaf,
        })
      )
      onDOMFinish?.({ parent: root, child, node: dom })
      children.push(dom)
    } else if(['text', 'cdata'].includes(child.type)) {
      onLeaf({ parent: root, child })
      children.push(child.value)
    } else if(child?.value?.trim() !== '') {
      console.error('Child', child)
    }
  }
  const attrs = await cleanAttributes(root.attributes)
  attrs.key = ++key.val
  const elem = React.createElement(
    root.name, attrs, children.length > 0 ? children : null
  )
  if(root.depth === 1 && root.left === 1) {
    onBuildEnd?.(root, elem)
  }
  return elem
}
