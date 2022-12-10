/* eslint-disable no-unused-vars */
import "./M2Botonera.css"

import { Button, ButtonGroup } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

export const Botonera = (props) => {

    return(
        <ButtonGroup className='botonera' justifyContent={"center"} alignItems={"center"}>
            <Button data-testid="acceptButton" border={"solid"} bg={"#9AD0EC"} onClick={props.acceptFunc}>Guardar</Button>
            <Button data-testid="cancelButton" border={"solid"} onClick={props.cancelFunc} >Volver</Button>
        </ButtonGroup>
    )

}

Botonera.propTypes = {
    acceptFunc: PropTypes.func.isRequired,
    cancelFunc: PropTypes.func.isRequired
}