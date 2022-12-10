/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Flex, useDisclosure, useToast,Text } from '@chakra-ui/react'
import { PageSelector } from "../Molecules/M8PageSelector"
import { Header } from '../Atoms/A3Header'
import { SearchCard } from '../Molecules/M6SearchCard'
import { ButtonRadius } from '../Atoms/A9ButtonRadius'
import { DestinationCard } from '../Molecules/M5DestinationCard'
import { useEffect } from 'react'
import './DestinationPage.css'
import { destinationService } from "../Services/DestinationService"
import { getErrorMessage } from '../Domain/Utils'
import { NewDestination } from '../Organisms/O1NewDestination'
import { useLocation } from 'react-router-dom'

export const DestinationPage = () => {
  
  const [ destinationList, setDestinationList ] = useState([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation()

  useEffect( () => {
    Destinations()
  },[] )

  const Destinations = async() => {

    try{
      const destinationAux = await destinationService.getDestination()
      setDestinationList( destinationAux )
    }catch(error){
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const filterDestinations = async(value) => {
    const filteredDestinations = await destinationService.filterDestinations(value)
    setDestinationList(filteredDestinations)
  }
  
  return (
    <>
      <Flex className='contenidoPagina'>
        <Header label="Destino"></Header>
        <SearchCard searchFunction={filterDestinations}></SearchCard>

        <Flex className='itemsContainer'>
          { destinationList.map ( (destination) => { return <DestinationCard data-testid="destinationCard" destination={destination} key={destination.id} update={Destinations}></DestinationCard>  } ) }
          {(destinationList.length == 0) && (<Text fontSize='20px' bg="white" padding="10px" borderRadius="5px" data-testid="emptyDestinationList">No se han encontrado Destinos</Text>) }
        </Flex>

        <Flex className='buttonContainer'>
          <ButtonRadius function={onOpen}></ButtonRadius>
        </Flex>

      </Flex>
      <PageSelector userId={location.state.id}></PageSelector>
      <NewDestination isOpen={isOpen} onClose={onClose} onOpen={onOpen} updateList={Destinations}></NewDestination>
    </>
  )
}

export default DestinationPage