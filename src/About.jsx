import {
  Flex, Heading, ListItem, Text, UnorderedList,
  Link as ChakraLink,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Link = ({ children, to }) => (
  <ChakraLink
    as={RouterLink}
    {...{ to }}
  >{children}</ChakraLink>
)

export default () => (
  <Flex
    maxW="50rem" m="auto" fontSize={20} direction="column" align="center"
  >
    <Heading m={10}>XML to IPLD Converter</Heading>
    <Text style={{ textIndent: 25, textAlign: 'justify' }}>This program takes an XML document, converts it into an <acronym title="Interplanetary Filesystem">IPFS</acronym> <acronym title="Directed Acyclic Graph">DAG</acronym> representing the <acronym title="Document Object Model">DOM</acronym> where each node is a separate document linked to the others by <acronym title="Content Identifier">CID</acronym>s.</Text>
    <Text style={{ textIndent: 25, textAlign: 'justify' }} mt={5}>This method of storage has some interesting properties having to do with reusing unchanged subgraphs &amp; minimizing document size. The question was how long will it take to load, and thus this program.</Text>
    <Flex w="100%" align="flex-start" direction="column">
      <Text style={{ textIndent: 25, textAlign: 'justify' }} mt={5}>Examples:</Text>
      <UnorderedList>
        <ListItem><Link to="/cid/bafyreiadbcuiiwmdhzca2ajxwjgguwjyidujex2ptfu77rpidyt65lsm5e">Gazoo</Link> <i>(~20 nodes)</i></ListItem>
        <ListItem><Link to="/cid/bafyreibu2ase2fvphe47yjfiebtvvx236f4pbgqzgraayyd2bfszekldzi">MetaGame Flag</Link> <i>(~30 nodes)</i></ListItem>
        <ListItem><Link to="/cid/bafyreihqodbfy47utwfqyxnmsxpxgs5p3g5opcqnilor6flt3lwhksxrsu">Chakras</Link> <i>(1000+ nodes)</i></ListItem>
      </UnorderedList>
    </Flex>
  </Flex>
)