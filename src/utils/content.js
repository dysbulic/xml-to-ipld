import { arraysEqual, allOfType } from './types'

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
        event.target.result.toString(), 'application/xml'
      )
      if(!isParseError(xml)) {
        return resolve(xml)
      }
      const html = parser.parseFromString(
        event.target.result.toString(), 'text/html'
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
