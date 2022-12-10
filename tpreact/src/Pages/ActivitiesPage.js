/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import CardActividad from '../Molecules/M3CardActividad'
import PageSelector from "../Molecules/M8PageSelector"
import Header from "../Atoms/A3Header"
import { Flex, useToast,Text } from '@chakra-ui/react'
import { activityService } from "../Services/ActivitiesService"
import { ButtonRadius } from "../Atoms/A9ButtonRadius"
import { getErrorMessage } from '../Domain/Utils'
import { SearchCard } from "../Molecules/M6SearchCard"
import { useLocation, useNavigate } from 'react-router-dom'

export const ActivitiesPage = () => {

  const [ activities, setActivities ] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  useEffect( () => {
    getActivities()
  },[] )

  const getActivities = async() => {

    try{
      const activitiesAux = await activityService.getActivities()
      setActivities( activitiesAux )
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
    navigate("/newActivity",{state: {id: location.state.id}})
  }

  const filterActivities = async(value) => {
    const filteredActivities = await activityService.filterActivities(value)
    setActivities(filteredActivities)
  }

  return (
    <>
      <Flex className='contenidoPagina'>
      <Header label="Actividades"></Header>
      <SearchCard searchFunction={filterActivities}></SearchCard>
      <Flex className='itemsContainer'>
        {activities.map( (activity) => {
          return <CardActividad activity={activity} key= {activity.id} update= {getActivities}></CardActividad>
        } )}
        {(activities.length == 0) && (<Text fontSize='20px' bg="white" padding="10px" borderRadius="5px">No se han encontrado Actividades</Text>) }
      </Flex>
      <Flex className='buttonContainer'>
          <ButtonRadius function={showNewMenu}></ButtonRadius>
      </Flex>
    </Flex>
    <PageSelector userId={location.state.id}></PageSelector>
    </>
  )
}

export default ActivitiesPage