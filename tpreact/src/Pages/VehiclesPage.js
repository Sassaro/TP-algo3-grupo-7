/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Flex, useToast,Text } from '@chakra-ui/react'
import Header from '../Atoms/A3Header'
import PageSelector from '../Molecules/M8PageSelector'
import CardVehiculo from '../Molecules/M4CardVehicles'
import { getErrorMessage } from '../Domain/Utils'
import { vehicleService } from '../Services/VehicleService'
import { ButtonRadius } from "../Atoms/A9ButtonRadius"
import { SearchCard } from "../Molecules/M6SearchCard"
import { useLocation, useNavigate } from 'react-router-dom'

//Esta pagina esta para probar los distintos atomos y moleculas
//Revisar el router para ver las distintas paginas
export const VehiclesPage = () => {

  const [ vehicles, setVehicles ] = useState([])
  const location = useLocation()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect( () => {
    getVehicles()
  },[] )

  const getVehicles = async() => {

    try{
      const vehiclesAux = await vehicleService.getVehicles()
      setVehicles( vehiclesAux )
    }catch( error){
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const showNewMenu = () => {
    navigate("/newVehicle",{state: {id: location.state.id}})
  }

  const filterVehicles = async(value) => {
    const filteredVehicles = await vehicleService.filterVehicles(value)
    setVehicles(filteredVehicles)
  }


  return (
    <>
    <Flex className='contenidoPagina'>
        <Header label="Vehiculos"></Header>
        <SearchCard searchFunction={filterVehicles}></SearchCard>
          <Flex className='itemsContainer'>
            
            {vehicles.map( (vehicle) => {
              return <CardVehiculo vehicle={vehicle} key={vehicle.id} update={getVehicles}></CardVehiculo>
            } )}
            {(vehicles.length == 0) && (<Text fontSize='20px' bg="white" padding="10px" borderRadius="5px" >No se han encontrado Vehiculos</Text>) }
          </Flex>

          <Flex className='buttonContainer'>
          <ButtonRadius function={showNewMenu}></ButtonRadius>
          </Flex>
    </Flex>
    <PageSelector userId={location.state.id}></PageSelector>
    </>
  )
}

export default VehiclesPage