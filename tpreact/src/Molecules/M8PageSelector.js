/* eslint-disable no-unused-vars */
import React from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { MdHome, MdPlace,MdExitToApp, } from 'react-icons/md'
import { FaHiking } from 'react-icons/fa'
import { BiCar } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import "./M8PageSelector.css"

//Hay que reemplazar los iconos por iconos correctos y deberian ser botones.
export const PageSelector = (props) =>{

    const navigate = useNavigate()

return (
    <>
        <Flex className='pageSelector'>
            <IconButton aria-label='Inicio' colorScheme="" onClick={ () => {navigate("/home",{state: {id: props.userId}},)}} icon={<MdHome className='iconButton'/>} />
            <IconButton data-testid= "destinosButton" aria-label='Destinos' colorScheme="" onClick={ () => {navigate("/destination",{state: {id: props.userId}})}} icon={<MdPlace className='iconButton' />} />
            <IconButton data-testid= 'activitiesButton' aria-label='Actividades' colorScheme="" onClick={ () => {navigate("/activities",{state: {id: props.userId}})}} icon={<FaHiking className='iconButton' />} />
            <IconButton data-testid= 'vehiculosButton' aria-label='Vehiculos' colorScheme="" onClick={ () => {navigate("/vehicles",{state: {id: props.userId}})}} icon={<BiCar className='iconButton' />} />
            <IconButton data-testid= 'salirButton'aria-label='Salir' colorScheme="" onClick={ () => {navigate("/")}} icon={<MdExitToApp className='iconButton' />} />
        </Flex>
    </>
)
}

PageSelector.propTypes ={
    userId: PropTypes.number.isRequired
}

export default PageSelector
