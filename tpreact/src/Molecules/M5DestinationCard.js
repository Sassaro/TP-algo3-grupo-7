/* eslint-disable no-unused-vars */
import { Flex, IconButton, Table, Text, useToast} from "@chakra-ui/react"
import React from 'react'
import { BiTrash } from "react-icons/bi"
import { Destino } from "../Domain/Destino"
import PropTypes from 'prop-types'
import { destinationService } from "../Services/DestinationService"
import { getErrorMessage } from '../Domain/Utils'

import './M5DestinationCard.css'

export const DestinationCard = (props) => {

    const toast = useToast()

    const deleteDestination = async () => {
        try{
            await destinationService.deleteDestination(props.destination.id)
            await props.update()
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

    return (
        <>
            <Flex className="textoContainer">
                <Text data-testid="paisCiudad" className="texto">{props.destination.pais} - {props.destination.ciudad}</Text>
                <IconButton data-testid={"deleteButton"+props.destination.pais+props.destination.ciudad} aria-label='Borrar' colorScheme="" icon={<BiTrash className='iconButton deleteButton'/>} onClick={deleteDestination}></IconButton>
            </Flex>
        </>
    )
}

DestinationCard.propTypes = {
    destination: PropTypes.instanceOf(Destino),
    update: PropTypes.func
}

export default DestinationCard