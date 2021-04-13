import {
  Flex, ListItem, UnorderedList, Text, Input,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ipfsClient from 'ipfs-http-client'
import { Link } from 'react-router-dom'
import { nodeToJSON } from './utils/dom'
import { getDoc } from './utils/content'
import { dfs, toTree } from './utils/structures'

export const ipfs = (
  ipfsClient({ protocol: 'http', host: 'localhost', port: 5001 })
)

const isNum = (maybe) => (
  /^(\d+\.?\d*)|(\d*\.?\d+)$/.test(maybe)
)

const fixViewBox = (json) => {
  // without this images won't fill the frame
  if(
    json?.attributes?.xmlns
    === 'http://www.w3.org/2000/svg'
  ) {
    const { width: w, height: h, viewBox: b } = (
      json?.attributes
    )
    if(!b && isNum(w) && isNum(h)) {
      json.attributes.viewBox = (
        [0, 0, w, h].join(' ')
      )
    }
    // ??= not supported by webpack
    !w && (json.attributes.width = '100%')
    !h && (json.attributes.height = '100%')
  }
}

export default () => {
  const [content, setContent] = useState(null)
  const docTransforms = [fixViewBox]
  const [status, setStatus] = useState(null)
  
  const load = async (evt) => {
    const files = evt.target.files
    const name = evt.target.value

    if(files.length === 0) {
      throw new Error('No file is selected')
    }

    const doc = await getDoc(files[0])
    if(doc === null) {
      setContent(<h1><code>null</code> Document</h1>)
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
      const json = dfs({
        node: doc.documentElement,
        nodeFor: nodeToJSON,
      })
      try {
        docTransforms.forEach(t => t(json))
        const cid = await toTree({
          obj: json,
          leafFor: async (node) => (
            await ipfs.dag.put(node)
          ),
        })
        setStatus(
          <Text>CID for {name}: <Link to  ={`/build/${cid}`}>{cid.toString()}</Link></Text>
        )
      } catch(err) {
        console.warn('Error Building', err)
        setContent(
          <>
            <Text>Unable to create object.</Text>
            <Text>Error: <q>{err.message}</q></Text>
            <Text>If the error is with fetching, try the CORS solution above.</Text>
          </>
        )
      }
    }
  }

  return (
    <Flex align="center" direction="column" mt={25}>
      <Flex direction="column" maxW="35rem" textAlign="justify" style={{ textIndent: 20 }}>
        <Text>Application to serialize a DOM tree to IPLD as a <acronym title="Common Binary Object Representation">CBOR</acronym>-<acronym title="Directed Acylic Graph">DAG</acronym> where each node is a separate document.</Text>
        <Text>This program requires write access to an IPFS API endpoint. If you want to use it from the web, you'll need to be running a node locally &amp; whitelist <code>dysbulic.github.io</code>.</Text>
        <UnorderedList listStyleType="none" style={{ textIndent: -25 }}>
          <ListItem _before={{ content: '"$ "' }}>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["webui://-", "http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io", "https://dysbulic.github.io"]'</ListItem>
          <ListItem _before={{ content: '"$ "' }}>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'</ListItem>
        </UnorderedList>
      </Flex>
      <Input type="file"
        onChange={load}
        minH="1.8em" maxW={600} mt={6}
        fontSize={30}
      />
      {status}
      {content}
    </Flex>
  )
}