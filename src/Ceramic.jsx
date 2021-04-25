import {
  Flex, Text, Input, Button, Spinner, Alert, AlertIcon,
} from '@chakra-ui/react'
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react'
import Ceramic from '@ceramicnetwork/http-client'
import {
  ThreeIdConnect, EthereumAuthProvider,
} from '@3id/connect'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import { nodeToJSON } from './utils/dom'
import { getDoc } from './utils/content'
import { dfs, toTree } from './utils/structures'
import { Link } from 'react-router-dom'
//import DocID from './docID.json'

const createCeramic = (
  url = 'https://ceramic-clay.3boxlabs.com',
) => {
  const ceramic = new Ceramic(url)
  // ceramic.didFor = async (addr) => (
  //   (await ceramic.createDocument('caip10-link',
  //     { metadata: {
  //       family: 'caip10-link',
  //       controllers: [`${addr.toLowerCase()}@eip155:1`],
  //     } }
  //   )).content
  // )
  return ceramic
}

export default () => {
  const [content, setContent] = useState(null)
  const [status, setStatus] = useState(null)
  const [ceramic, setCeramic] = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [timer, setTimer] = useState(null)
  const [startTime, setStartTime] = useState()
  const endTime = useRef()
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState([])

  const log = (msg) => setMessages(msgs => [...msgs, msg])

  const counter = useCallback(() => {
    if(startTime && !endTime.current) {
      const δ = performance.now() - startTime
      const time = δ.toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 },
      )
      setTimer(`${time}ms`)
      requestAnimationFrame(counter)
    }
  }, [startTime])
  useEffect(() => { counter() }, [counter])

  const connect = async () => {
    try {
      setConnecting(true)
      const threeIdConnect = new ThreeIdConnect()
      const addresses = await window.ethereum.enable()
      const authProvider = new EthereumAuthProvider(
        window.ethereum, addresses[0]
      )
      await threeIdConnect.connect(authProvider)
      const ceramic = new Ceramic('https://ceramic-dev.3boxlabs.com')
      const did = new DID({
        provider: threeIdConnect.getDidProvider(),
        resolver: ThreeIdResolver.getResolver(ceramic)
      })
      await did.authenticate()
      ceramic.setDID(did)
      setCeramic(ceramic)
    } catch(err) {
      setError(err.message)
    }
  }

  const load = async (evt) => {
    setContent(null)
    setStartTime(performance.now())
    endTime.current = null

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
        const uri = await toTree({
          obj: json,
          leafFor: async (node) => {
            log(`Writing: ${JSON.stringify(node).replace(/","/g, '", "')}`)
            const tile = (
              await TileDocument.create(
                ceramic, node, { deterministic: true }
              )
            )
            return tile.commitId.toUrl()
          },
        })
        setStatus(
          <Text color="lightgreen">URI for {name}: <Link to={`/build/${encodeURIComponent(uri)}`}>{uri}</Link></Text>
        )
      } catch(err) {
        console.warn('Error Building', err)
        setContent(
          <>
            <Text>Unable to create object.</Text>
            <Text>Error: <q>{err.message}</q></Text>
          </>
        )
      }
    }
    endTime.current = performance.now()
  }

  return (
    <Flex align="center" direction="column" mt={25}>
      <Text>This program serializes a <acronym title="Document Object Model">DOM</acronym> to the Ceramic Network with each node in a separate document.</Text>
      {error && <Alert status="error" maxW="35rem"><AlertIcon /> {error}</Alert>}
      {!ceramic ? (
        <Button
          mt={7}
          onClick={connect}
          disabled={connecting}
        >
          {connecting ? (
            <Spinner/>
          ) : (
            'Connect Your Wallet'
          )}
        </Button>
      ) : (
        <>
          <Input type="file"
            onChange={load}
            minH="1.8em" maxW={600} mt={6}
            fontSize={30}
          />
          {timer}
          {status}
          {content}
          <ul>{messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}</ul>
        </>
      )}
    </Flex>
  )
}