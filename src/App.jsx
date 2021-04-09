import React from 'react'
import {
  HashRouter as Router, Switch, Route,
  Link as RouterLink,
} from 'react-router-dom'
import {
  ChakraProvider, extendTheme, Menu, MenuItem,
  MenuButton, Button, MenuList, Link as ChakraLink,
} from '@chakra-ui/react'
import {
  ChevronDownIcon, HamburgerIcon
} from "@chakra-ui/icons"
//import { Provider } from 'react-redux'
import Restructure from './Restructure'
import FromCID from './FromCID'
import About from './About'

const overrides = {
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      body: {
        minH: '100vh',
      },
      a: {
        textDecoration: 'underline',
      },
    },
  },
}
const theme = extendTheme(overrides)

const Link = ({ children, to }) => (
  <ChakraLink
    as={RouterLink}
    {...{ to }}
    w='100%'
  >{children}</ChakraLink>
)

export default () => (
  <ChakraProvider theme={theme}>
    {/* <Provider store={store}> */}
    <Router basename='/'>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen} as={Button}
              position='fixed' top='1rem' left='1rem'
            >
              {isOpen ? <ChevronDownIcon/> : <HamburgerIcon/>}
            </MenuButton>
            <MenuList>
            <MenuItem>
                <Link to='/'>🏡 Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/cid'>✍ By <acronym title="Content Identifier">CID</acronym></Link>
              </MenuItem>
              <MenuItem>
                <Link to='/about'>📰 About</Link>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Switch>
      <Route
        path='/cid/:cid?'
        exact={false}
        component={FromCID}
      />
      <Route path='/about' component={About}/>
      <Route path='/' exact={false} component={Restructure}/>
      </Switch>
    </Router>
  {/* </Provider> */}
  </ChakraProvider>
)