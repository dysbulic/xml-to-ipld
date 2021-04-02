//import ipfsClient from 'ipfs-http-client'
//const ipfs = ipfsClient()
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({ port: 5001 })

console.info('IPFS', ipfs)

export const toIPLD = async (obj) => {
  //console.info('IPFS', await ipfs.add('Testing'))
  //const ipfs = createIPFS()
  console.info('DAG', obj)
  //return await ipfs.dag.put(obj)
  return await ipfs.dag.put(
    { test: 'test' },
  )
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
  .map(n => n.nodeType)
  .reduce((acc, t) => acc && t === type, true)
)

export const getDoc = (file) => (
  new Promise((resolve, reject) => {
    console.info('Promise')
    const reader = new FileReader()
    reader.onload = (event) => {
      const parser = new DOMParser()
      const xml = parser.parseFromString(
        event.target.result, 'application/xml'
      )
      if(!isParseError(xml)) {
        console.info('XML', xml, isParseError(xml))
        return resolve(xml)
      }
      const html = parser.parseFromString(
        event.target.result, 'text/html'
      )
      if(isParseError(html)) {
        console.info('HTML', html, 'Parse Error')
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
        console.info('HTML', html, 'Checking for Text')
        if(
          head.childNodes.length === 0
          && allOfType(
            body.childNodes, Node.TEXT_NODE
          )
        ) {
          console.info('HTML', html, 'Is Text')
          const text = (
            Array.from(body.childNodes)
            .map(n => n.textContent)
            .join()
          )
          return resolve(text)
        }
        console.info('HTML', 'Returning')
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
  if(json.type === 'text') {
    delete json.name
    json.value = node.textContent
    if(/^\n\s*$/.test(json.value)) {
      return null // Don't save interelement whitespace
    }
  }
  json.attributes = Object.fromEntries(
    [...node.attributes ?? []].map((attr) => (
      [attr.name, attr.value]
    ))
  )
  return json
}
