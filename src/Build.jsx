import {
  Flex, Input, Text, Box, Progress,
} from '@chakra-ui/react'
import loadable from '@loadable/component'
import CID from 'cids'
import React, {
  useEffect, useState, useCallback,
} from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { buildDOM } from './utils/dom'

const ForcedGraph = (
  loadable(() => import('./ForcedGraph'))
)

const useQuery = () => (
  new URLSearchParams(useLocation().search)
)

export default ({ history }) => {
  const [doc, setDoc] = useState(null)
  const [graph, setGraph] = (
    useState({ nodes: [], links: []})
  )
  const { root: paramRoot } = useParams()
  const queryRoot = useQuery().get('root')
  const resolvedRoot = paramRoot ?? queryRoot
  const root = resolvedRoot && decodeURIComponent(
    resolvedRoot
  )
  const [formRoot, setFormRoot] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [total, setTotal] = useState(1)
  const [progress, setProgress] = useState(1)

  const onBuildStart = ({ root }) => {
    const id = `${root.left}:${root.right}`
    const nodes = [{ id }]
    const links = []
    setTotal(root.right / 2)
    setProgress(1)
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
    setProgress(p => p + 1)
  }
  const onBuildEnd = () => {
    // total === 1 w/o wrapping
    setTotal(t => {
      setProgress(t)
      return t
    })
    setEndTime(performance.now())
  }
  const onSubmit = () => {
    const path = (
      `/build/${encodeURIComponent(formRoot)}`
    )
    history.push(path)
  }

  const load = useCallback(
    async () => {
      try {
        let rootObj
        try {
          rootObj = new CID(root)
        } catch(err) {}
        if(root.startsWith('ceramic://')) {
          rootObj = root
        } else if(root && !rootObj) {
          console.warn('Unknown Root', root)
        }
        if(rootObj) {
          setDoc(await buildDOM({
            root: rootObj,
            onBuildStart, onDOMStart,
            onLeaf: onDOMStart,
            onBuildEnd,
          }))
        }
      } catch(err) {
        console.error('Load Error', err)
      }
    }, [root]
  )
  useEffect(() => { load() }, [load])

  const time = (
    (endTime ?? performance.now()) - (startTime ?? 0)
  )

  return (
    <Flex direction="column" align="center">
      {root ? (
        <>
          <Text>
            Loading: {root}
            <span> </span>
            ({time.toLocaleString()}ms)
          </Text>
          <Progress
            w="75%"
            value={(progress / total) * 100}
          />
          <Flex w="100%" h="90vh">
            <ForcedGraph
              {...{ graph }}
              flexGrow={1} mr={100}
            />
            {doc}
          </Flex>
        </>
      ) : (
        <Box
          as="form"
          id="cid"
          w="100%"
          {...{ onSubmit }}
        >
          <Input
            value={formRoot ?? ''}
            onChange={
              (evt) => setFormRoot(evt.target.value)
            }
            autoFocus
            placeholder="IPFS Content ID or Ceramic URI"
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