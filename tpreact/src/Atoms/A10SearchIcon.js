/* eslint-disable no-unused-vars */
import { SearchIcon } from "@chakra-ui/icons"
import { Button, Flex } from "@chakra-ui/react"
import React from 'react'
import './A10SearchIcon.css'
import PropTypes from 'prop-types'

export const Buscar = (props) => {
    return (
        <Flex>
            <Button data-testid="buttonSearch" id="button" onClick={ () => {props.searchFunction(props.value)}} >
                <SearchIcon className="iconSearch" id="iconSearch" color='black'></SearchIcon>
            </Button>
        </Flex> 
    )
}

Buscar.propTypes = {
    searchFunction: PropTypes.func.isRequired,
    value: PropTypes.string,
}