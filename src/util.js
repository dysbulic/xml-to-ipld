import ipfsClient from 'ipfs-http-client'
import React from 'react'
import CID from 'cids'

export const ipfs = ipfsClient({ port: 5001 })

export const toIPLD = async (obj) => {
  return await ipfs.dag.put(obj)
}

export const toDocTree = async (obj) => {
  const out = {}
  await Promise.all(
    Object.entries(obj).map(
      async ([key, val]) => {
        if(typeof val === 'object') {
          out[key] = await toDocTree(val)
        } else {
          out[key] = val
        }
      }
    )
  )
  return await ipfs.dag.put(out)
}

export const arraysEqual = (a, b) => {
  if(a === b) return true
  if(a == null || b == null) return false
  if(a.length !== b.length) return false

  for(let i = 0; i < a.length; ++i) {
    if(a[i] !== b[i]) return false
  }
  return true
}

export const parsererrorNS = (() => (
  (new DOMParser())
  .parseFromString('INVALID', 'application/xml')
  .getElementsByTagName('parsererror')[0]
  .namespaceURI
))()

export const isParseError = (doc) => (
  doc.getElementsByTagNameNS(
    parsererrorNS, 'parsererror'
  ).length > 0
)

// Checks if all the elements in a list have the
// same node type
export const allOfType = (list, type) => (
  Array.from(list)
  .all(n => n.nodeType === type)
)

export const getDoc = (file) => (
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const parser = new DOMParser()
      const xml = parser.parseFromString(
        event.target.result, 'application/xml'
      )
      if(!isParseError(xml)) {
        return resolve(xml)
      }
      const html = parser.parseFromString(
        event.target.result, 'text/html'
      )
      if(isParseError(html)) {
        return resolve(null)
      }
      if(
        arraysEqual(
          Array.from(html.firstChild.childNodes)
          .map(n => n.localName),
          ['head', 'body'],
        )
      ) {
        const head = html.firstChild.firstChild
        const body = html.firstChild.childNodes[1]
        if(
          head.childNodes.length === 0
          && allOfType(
            body.childNodes, Node.TEXT_NODE
          )
        ) {
          const text = (
            Array.from(body.childNodes)
            .map(n => n.textContent)
            .join()
          )
          return resolve(text)
        }
        return resolve(html)
      }
    }
    reader.readAsText(file)
  })
)

export const domDFS = (node, func, depth = 1) => {
  const result = (
    Array.from(node.childNodes)
    .map(child => domDFS(child, func, depth + 1))
    .filter(n => !!n)
  )
  return func(node, result)
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

// Dereference a CID if the node is one
const optDeref = async (node) => {
  if(CID.isCID(node)) {
    return (await ipfs.dag.get(node)).value
  } else {
    return node
  } 
}

const cleanAttributes = async (attributes) => {
  attributes = await optDeref(attributes)

  const attrs = {}
  for(let [name, val] of Object.entries(attributes)) {
    attrs[name] = await optDeref(val)
  }

  if(attrs.style) {
    const style = {}
    for(let [prop, val] of Object.entries(style)) {
      prop = camelCase(prop, '-')
      style[prop] = val
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
  for(let attr of ['flood-opacity', 'flood-color']) {
    if(attrs[attr]) {
      attrs[camelCase(attr, '-')] = attrs[attr]
      delete attrs[attr]
    }
  }

  return attrs
}

export const buildDOM = async (root, key = { val: 0 }) => {
  if(root.type !== 'element') {
    throw new Error(`Root Type: ${root.type}`)
  }
  const children = []
  for(let child of Object.values(optDeref(root.children ?? {}))) {
    if(child.type === 'element') {
      const childChildren = Object.values(optDeref(child.children ?? []))
      if(
        childChildren.length === 0
        || childChildren.some(
          (sub) => (
            !['text', 'cdata'].includes(sub.type)
          )
        )
      ) {
        // if there are non-text nodes, recurse
        children.push(await buildDOM(child, key))
      } else {
        // otherwise build a node
        const attrs = await cleanAttributes(child.attributes)
        attrs.key = ++key.val

        const text = childChildren.map(c => c.value).join()
        children.push(React.createElement(
          child.name, attrs, text
        ))
      }
    } else if(child.value && child.value.trim() !== '') {
      console.error('Child', child.value)
    }
  }
  const attrs = await cleanAttributes(root.attributes)
  return React.createElement(
    root.name, attrs, children
  )
}

export const nodeToJSON = (node, children) => {
  const json = {
    name: node.localName, children,
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
  return json
}
