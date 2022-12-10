/* eslint-disable no-unused-vars */
import React from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { MdHome, MdPlace, MdDirectionsWalk,MdExitToApp } from 'react-icons/md'
import { BiCar } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import "./A6PageSelector.css"

//Hay que reemplazar los iconos por iconos correctos y deberian ser botones.
export const PageSelector = () =>{

    const navigate = useNavigate()

return (
    <>
        <Flex className='pageSelector'>
            <IconButton aria-label='Inicio' colorScheme="white" onClick={ () => {navigate("/home")}} icon={<MdHome className='iconButton'/>} />
            <IconButton aria-label='Destinos' colorScheme="white" onClick={ () => {navigate("/destination")}} icon={<MdPlace className='iconButton' />} />
            <IconButton aria-label='Actividades' colorScheme="white" onClick={ () => {navigate("/activities")}} icon={<MdDirectionsWalk className='iconButton' />} />
            <IconButton aria-label='Vehiculos' colorScheme="white" onClick={ () => {navigate("/vehicles")}} icon={<BiCar className='iconButton' />} />
            <IconButton aria-label='Salir' colorScheme="white" onClick={ () => {navigate("/login")}} icon={<MdExitToApp className='iconButton' />} />
        </Flex>
    </>
)
}

  export default PageSelector
