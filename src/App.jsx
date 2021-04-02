import { Flex, ListItem, UnorderedList, Text } from '@chakra-ui/react'
import { useState } from 'react'
import {
  getDoc, domDFS, nodeToJSON, toDocTree, buildDOM, ipfs,
} from './util'
import './App.css'

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
      const json = domDFS(
        doc.documentElement, nodeToJSON,
      )
      try {
        const cid = await toDocTree(json)
        const root = (await ipfs.dag.get(cid)).value
        console.info(<h1>CID for {name}: {cid.toString()}</h1>)
        const dom = await buildDOM(root)
        console.info("DOM", dom)
        setContent(dom)
      } catch(err) {
        console.warn('Error Building', err)
        setContent(
          <>
            <Text>Unable to create object.</Text>
            <Text>Error: <q>{err.message}</q></Text>
            <Text>If the error is with CORS, try running the following from the command line:</Text>
            <UnorderedList listStyleType="none">
              <ListItem _before={{ content: '"$ "' }}>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]'</ListItem>
              <ListItem _before={{ content: '"$ "' }}>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'</ListItem>
            </UnorderedList>
          </>
        )
      }
    }
  }

  return (
    <Flex align="center" direction="column" mt={25}>
      <input type="file" onChange={load}/>
      {content}
    </Flex>
  )
}