import {
  Flex, Input, Text, Box,
} from '@chakra-ui/react'
import CID from 'cids';
import ForcedGraph from 'ForcedGraph';
import ForceGraph from 'ForceGraph';
import React, {
  useEffect, useState, useCallback,
} from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom';
import { buildDOM } from './util';

const useQuery = () => (
  new URLSearchParams(useLocation().search)
)

export default () => {
  const [doc, setDoc] = useState(null)
  const [graph, setGraph] = (
    useState({ nodes: [], links: []})
  )
  let { cid } = useParams()
  if(!cid) {
    cid = useQuery().get('cid')
    console.info({ cid })
  }

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

  const load = useCallback(
    async () => {
      if(cid) {
        setDoc(await buildDOM({
          root: new CID(cid),
          onBuildStart, onDOMStart,
          onLeaf: onDOMStart,
        }))
      }
    }, [cid]
  )
  useEffect(() => { load() }, [load])

  return (
    <Flex direction="column" align="center">
      {cid ? (
        <>
          <Text>Loading: {cid}</Text>
          <Flex>
            <ForcedGraph
              {...{ graph }}
              grow={1} mr={100}
            />
            {doc}
          </Flex>
        </>
      ) : (
        <Box as="form" id="cid">
          <Input
            name="cid"
            placeholder="IPFS Content ID"
            bg="white"
            color="black"
            ml={20} mt={6}
            maxW="93%"
            onKeyPress={(evt) => {
              if(evt.key === 'Enter') {
                document.forms.cid.submit()
              }
            }}
            _placeholder={{ color: '#333' }}
          />
        </Box>
      )}
    </Flex>
  )
}