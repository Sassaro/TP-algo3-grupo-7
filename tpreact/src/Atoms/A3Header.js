/* eslint-disable no-unused-vars */
import React from 'react'
import { Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import "./A3Header.css"


export const Header = (props) =>{
return (
    <>
        <Flex className='header'>{props.label}</Flex>
    </>
)
}

Header.propTypes = {
    label: PropTypes.string,
  }
  
  export default Header
