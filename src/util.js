import ipfsClient from 'ipfs-http-client'
import React from 'react'
import CID from 'cids'

export const ipfs = ipfsClient({ port: 5001 })

export const toIPLD = async (obj) => {
  return await ipfs.dag.put(obj)
}

// Creates a sharded object where each level
// is a separate document.
export const toDocTree = async (obj) => {
  const out = {}
  await Promise.all(
    Object.entries(obj).map(
      async ([key, val]) => {
        if(Array.isArray(val)) {
          out[key] = await Promise.all(
            val.map(toDocTree)
          )
        } else if(typeof val === 'object') {
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

// Return the contents of a file returned from
// a form input. It first tries as XML. If that
// succeeds, the DOM is returned. Next HTML is
// tried. Most files (txt, png, m4a, etc.) are
// inserted into a simple HTML document. HTML
// produces a DOM which is returned.
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
      // Browsers will wrap the contents of any
      // file in a <html><head/><body>…</body></html>
      // structure.
      if(
        html.firstChild.localName === 'html'
        && arraysEqual(
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

export const domDFS = ({
  node, pre = () => {}, step = () => {},
  post = () => {}, depth = 1,
  count = { current: 1 }, 
}) => {
  // SQL nested set model, "right" is count on exit
  const left = count.current
  pre(node, depth, left)
  const children = []
  Array.from(node.childNodes).forEach(
    (child) => {
      count.current++
      const result = domDFS({
        node: child, pre, post,
        depth: depth + 1, count,
      })
      if(result) {
        children.push(result)
        step({
          node, children,
          depth, left, right: count.current,
        })
      }
    }
  )
  return post({
    node, children,
    depth, left, right: count.current,
  })
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
  onProcessing = () => {},
  onCompleting = () => {},
  onChildStart = () => {},
  onChildDOM = () => {},
  onChildElem = () => {},
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
    onChildStart({ child })
    if(child.type === 'element') {
      const childChildren = await Promise.all(
        Object.values(
          await optDeref(child.children ?? [])
        )
        .map(optDeref)
      )
      if(
        childChildren.length === 0
        || childChildren.some(
          (sub) => (
            !['text', 'cdata'].includes(sub.type)
          )
        )
      ) {
        // if there are non-text nodes, recurse
        const dom = await buildDOM({ root: child, key })
        onChildDOM(child, dom)
        children.push(dom)
      } else {
        // otherwise build a node
        const attrs = await cleanAttributes(child.attributes)
        attrs.key = ++key.val

        const text = childChildren.map(c => c.value).join()
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
