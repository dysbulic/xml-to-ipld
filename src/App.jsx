import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { getDoc, domDFS, nodeToJSON } from './util'
import './App.css';

export default () => {
  const [content, setContent] = useState(null)

  const load = async (evt) => {
    const files = evt.target.files
    const name = evt.target.value

    if(files.length === 0) {
      console.warn('No file is selected')
      return
    }

    const doc = await getDoc(files[0])
    console.info('DD', doc)
    if(doc === null) {
      setContent(<h1>null Document</h1>)
    } else if(typeof doc === 'string') {
      // eslint-disable-next-line no-control-regex
      if(/\x00/.test(doc)) {
        setContent(
          <object data={`data:;base64,${btoa(doc)}`}>
            <p>This was the binary object: {name}</p>
          </object>
        )
      } else {
        setContent(<pre>{doc}</pre>)
      }
    } else {
      domDFS(
        doc.documentElement,
        (node, result) => {
          const json = nodeToJSON(node, result)
          console.info(json)
          return json
        }
      )
      setContent(<h1>Doc {doc.nodeName}</h1>)
    }
  }

  return (
    <Flex align="center" direction="column" mt={25}>
      <input type="file" onChange={load}/>
      {content}
    </Flex>
  )
}