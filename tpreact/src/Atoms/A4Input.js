/* eslint-disable no-unused-vars */
import "./A4Input.css"
import React from 'react'
import { Input,Text,Flex,InputGroup } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const SpecialInput = (props) =>{
return (
    <Flex className="InputLoginContainer" direction={'column'}>
    <Text fontSize="20px" as='b' mb='8px'> {props.label}</Text>
    <InputGroup className="InputBox">
        {props.leftElement}
        <Input data-testid={props.dataTestId} type={props.type} focusBorderColor='black' value={props.state} placeholder={props.placeholder} size='md' variant='filled' onChange={props.handleChange}></Input>
    </InputGroup>
  </Flex>
)
}

SpecialInput.propTypes = {
    dataTestId: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    leftElement: PropTypes.any,
    type: PropTypes.string,
    state: PropTypes.any,
    handleChange: PropTypes.func
  }
  
  export default SpecialInput

