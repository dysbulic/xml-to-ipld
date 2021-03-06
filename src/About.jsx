import {
  Flex, Heading, ListItem, Text, UnorderedList,
  Link as ChakraLink, chakra,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Link = ({ children, to }) => (
  <ChakraLink
    as={RouterLink}
    {...{ to }}
  >{children}</ChakraLink>
)

const Acronym = chakra('acronym')

export default () => (
  <Flex
    maxW="50rem" m="auto" fontSize={20} direction="column" align="center"
  >
    <Heading m={10}>XML to IPLD Converter</Heading>
    <Text style={{ textIndent: 25, textAlign: 'justify' }}>This program takes an XML document, converts it into an <Acronym title="Interplanetary Filesystem">IPFS</Acronym> <Acronym title="Directed Acyclic Graph">DAG</Acronym> representing the <Acronym title="Document Object Model">DOM</Acronym> where each node is a separate document linked to the others by <Acronym title="Content Identifier">CID</Acronym>s. The program then walks the <Acronym title="Common Binary Object Representation">CBOR</Acronym> structure and rebuilds the DOM tree.</Text>
    <Text style={{ textIndent: 25, textAlign: 'justify' }} mt={5}>This method of storage has some interesting properties having to do with reusing unchanged subgraphs &amp; minimizing document size. The question was how long will it take to load, thus this program.</Text>
    <Flex w="100%" align="flex-start" direction="column">
      <Text mt={5}>Examples:</Text>
      <UnorderedList>
        <ListItem><Link to="/build/bafyreiadbcuiiwmdhzca2ajxwjgguwjyidujex2ptfu77rpidyt65lsm5e">Gazoo</Link> <i>(~20 CBOR nodes)</i></ListItem>
        <ListItem><Link to="/build/bafyreigrpczkdehmrc4t3fl64amaelrxdogh4femcu6j6g43kyvorqz7cq">MetaGame Flag</Link> <i>(~30 CBOR nodes)</i></ListItem>
        <ListItem><Link to="/build/ceramic%3A%2F%2Fk3y52l7qbv1fryb0xtwadtq0z31win1rgiux03gme0t6ixa6oryayfimfohotv7y8">MetaGame Flag</Link> <i>(~30 Ceramic nodes)</i></ListItem>
        <ListItem><Link to="/build/bafyreif645kruyhewydqwyjpor6z24mu3dzj2jsi6f2w57xoxcmnlf4ypa">Linux Fox</Link> <i>(~150 CBOR nodes)</i></ListItem>
        <ListItem><Link to="/build/bafyreiepdlskoh2ogf63cfbjccjpz7xtporqwoo4sna77tz3modfttu7p4">Chakras</Link> <i>(1000+ CBOR nodes)</i></ListItem>
        <ListItem><Link to="/build/bafyreifnikp6jlpzph7hqwwpz6wa6lqoos5ky45j56ivdv3cgrt7joc7gy">Income Distribution in 2007</Link></ListItem>
      </UnorderedList>
    </Flex>
  </Flex>
)