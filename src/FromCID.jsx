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
import { buildDOM } from './utils/dom'

const useQuery = () => (
  new URLSearchParams(useLocation().search)
)

export default ({ history }) => {
  const [doc, setDoc] = useState(null)
  const [graph, setGraph] = (
    useState({ nodes: [], links: []})
  )
  const { cid: paramCID } = useParams()
  const queryCID = useQuery().get('cid')
  const cid = paramCID ?? queryCID
  const [formCID, setFormCID] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()

  const onBuildStart = ({ root }) => {
    const id = `${root.left}:${root.right}`
    const nodes = [{ id }]
    const links = []
    setDoc(null)
    setGraph({ nodes, links })
    setStartTime(performance.now())
    setEndTime(null)
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
  const onBuildEnd = () => {
    setEndTime(performance.now())
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
            onBuildEnd,
          }))
        }
      } catch(err) {
        if(cid) {
          console.warn('Load Error', err)
        }
      }
    }, [cid]
  )
  useEffect(() => { load() }, [load])

  const time = (
    (endTime ?? performance.now()) - (startTime ?? 0)
  )

  return (
    <Flex direction="column" align="center">
      {cid ? (
        <>
          <Text>Loading: {cid} ({time.toLocaleString()}ms)</Text>
          <Flex w="100%" h="90vh">
            <ForcedGraph
              {...{ graph }}
              flexGrow={1} mr={100}
            />
            {doc}
          </Flex>
        </>
      ) : (
        <Box as="form" id="cid" w="100%" {...{ onSubmit }}>
          <Input
            value={formCID ?? ''}
            onChange={
              (evt) => setFormCID(evt.target.value)
            }
            placeholder="IPFS Content ID"
            bg="white"
            color="black"
            ml={20} mt={6}
            maxW="93%"
            _placeholder={{ color: '#333' }}
          />
          <Input type="submit" visibility="hidden"/>
        </Box>
      )}
    </Flex>
  )
}