// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  ChakraProvider,
} from '@chakra-ui/react'
import { TareasRoutes } from "./routes"

function App() {
  return (
    <ChakraProvider>
        <TareasRoutes />
    </ChakraProvider>
  )
}

export default App
