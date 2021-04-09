import loadable from '@loadable/component'
import {
  Flex, ListItem, UnorderedList, Text, Box,
  Input,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ipfsClient from 'ipfs-http-client'
import {
  nodeToJSON, buildDOM,
} from './utils/dom'
import { getDoc } from './utils/content'
import { dfs, toTree } from './utils/structures'

const ForcedGraph = loadable(() => import('./ForcedGraph'))
//const DynGraph = loadable(() => import('./DynGraph'))
export const ipfs = (
  ipfsClient({ protocol: 'http', host: 'localhost', port: 5001 })
)

const isNum = (maybe) => (
  /^(\d+\.?\d*)|(\d*\.?\d+)$/.test(maybe)
)

const fixViewBox = (json) => {
  // without this images won't fill the frame
  if(json?.attributes?.xmlns === 'http://www.w3.org/2000/svg') {
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
  const [graph, setGraph] = (
    useState({ nodes: [], links: []})
  )
  const [status, setStatus] = useState(null)
  
  const onBuildStart = ({ root }) => {
    const id = `${root.left}:${root.right}`
    const nodes = [{ id }]
    const links = []
    setGraph({ nodes, links })
  }
  const onDOMStart = ({ parent, child }) => {
    const pid = `${parent.left}:${parent.right}`
    const cid = `${child.left}:${child.right}`
    setGraph(({ nodes = [], links = [] }) => ({
      nodes: [
        ...nodes,
        { id: cid },
      ],
      links: [
        ...links,
        { source: pid, target: cid },
      ],
    }))
  }
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
        const root = (await ipfs.dag.get(cid)).value
        setStatus(
          <Text>CID for {name}: {cid.toString()}</Text>
        )
        const dom = await buildDOM({
          root, onBuildStart, onDOMStart, onLeaf: onDOMStart,
        })
        setContent(dom)
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
      <Text>This program requires write access to an IPFS endpoint. If you want to use it from the web, you'll need to whitelist <code>dysbulic.github.io</code>.</Text>
      <UnorderedList listStyleType="none">
        <ListItem _before={{ content: '"$ "' }}>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["webui://-", "http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io", "https://dysbulic.github.io"]'</ListItem>
        <ListItem _before={{ content: '"$ "' }}>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'</ListItem>
      </UnorderedList>
      <Input type="file"
        onChange={load}
        minH="1.8em" maxW={600} mt={6}
        fontSize={30}
      />
      {status}
      {content && (
        <Box h="90vh">
          {content}
        </Box>
      )}
      <ForcedGraph maxH="90vh" {...{ graph }}/>
    </Flex>
  )
}