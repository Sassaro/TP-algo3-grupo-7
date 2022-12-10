/* eslint-disable no-unused-vars */
import './M6SearchCard.css'
import { Flex,Input } from "@chakra-ui/react"
import { Buscar } from '../Atoms/A10SearchIcon'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const SearchCard = (props) => {

    const [searchValue,setSearchValue] = useState("")

    const handleValueChange = (event) => {
        setSearchValue(event.target.value)
    }
    
    return (
        <Flex className='containerSearchCard'>
            <Flex className='searchCard'>
                <Input data-testid="inputSearch" placeholder="Buscar..." id="inputBuscador" value={searchValue} onChange={(event)=> { handleValueChange(event)}}></Input>
                <Buscar searchFunction={props.searchFunction} value={searchValue} className="boton"></Buscar>
            </Flex>
        </Flex>
    )
}

SearchCard.propTypes = {
    searchFunction: PropTypes.func.isRequired,
}