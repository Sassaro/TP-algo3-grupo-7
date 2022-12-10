// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'

// eslint-disable-next-line react/prop-types
const AllProviders = ({ children }) => 
  <ChakraProvider theme={theme}>{children}</ChakraProvider>


const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
