/* eslint-disable no-unused-vars */
import "./A5Select.css"
import React from 'react'
import { Text,Flex, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const SpecialSelect = (props) =>{
return (
    <Flex className="InputLoginContainer" direction={'column'}>
    <Text as='b' mb='8px'> {props.label} </Text>
    <Select data-testid = {props.dataTestId} bg={"white"} placeholder={props.placeholder} value={props.state} onChange={props.handleChange}>
      {props.options}
    </Select>
  </Flex>
)
}

SpecialSelect.propTypes = {
    dataTestId: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.any,
    state: PropTypes.any,
    handleChange: PropTypes.func

  }
  
  export default SpecialSelect