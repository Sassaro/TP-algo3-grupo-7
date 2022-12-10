/* eslint-disable no-unused-vars */
import { Button, Flex } from "@chakra-ui/react"
import PropTypes from 'prop-types'
import React from 'react'
import './A9ButtonRadius.css'

export const ButtonRadius = (props) => {
    
    return (
        <Flex className="containerBotonAgregar" id="containerBotonAgregar">
            <Button data-testid='addButton' className="botonAgregar" id="botonAgregar" onClick={props.function}>+</Button>
        </Flex>
    )
}

ButtonRadius.propTypes = {
    function: PropTypes.func
  }
  
export default ButtonRadius
