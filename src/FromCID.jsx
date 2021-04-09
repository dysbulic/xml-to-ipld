import {
  Flex, Input, Text, Box,
} from '@chakra-ui/react'
import CID from 'cids'
import ForcedGraph from 'ForcedGraph'
import React, {
  useEffect, useState, useCallback,
} from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { buildDOM } from './util'

const useQuery = () => (
  new URLSearchParams(useLocation().search)
)

export default ({ history }) => {
  const [doc, setDoc] = useState(null)
  const [graph, setGraph] = (
    useState({ nodes: [], links: []})
  )
  let { cidParam } = useParams()
  if(!cidParam) {
    cidParam = useQuery().get('cid')
  }
  const [cid, setCID] = useState(cidParam)
  const [formCID, setFormCID] = useState('')

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
  const onSubmit = () => {
    history.push(`/cid/${formCID}`)
  }

  const load = useCallback(
    async () => {
      try {
        const cidObj = new CID(cid)
        if(cidObj) {
          setDoc(await buildDOM({
            root: cidObj,
            onBuildStart, onDOMStart,
            onLeaf: onDOMStart,
          }))
        }
      } catch(err) {
        // bad CID
      }
    }, [cid]
  )
  useEffect(() => { load() }, [load])

  return (
    <Flex direction="column" align="center">
      {cid ? (
        <>
          <Text>Loading: {cid}</Text>
          <Flex w="100%">
            <ForcedGraph
              {...{ graph }}
              flexGrow={1} h="90vh" mr={100}
            />
            {doc}
          </Flex>
        </>
      ) : (
        <Box as="form" id="cid" w="100%" {...{ onSubmit }}>
          <Input
            value={formCID ?? undefined}
            onChange={
              (evt) => setFormCID(evt.target.value)
            }
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