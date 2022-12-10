/* eslint-disable no-unused-vars */
import "./A4Input.css"

import { Text,Flex, NumberInputField, NumberInput } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

  export const SpecialNumberInput = (props) =>{
    return (
        <Flex className="InputLoginContainer" direction={'column'}>
        <Text as='b' mb='8px'> {props.label}</Text>
        <NumberInput className="InputBox" value={props.state}>
            <NumberInputField data-testid={props.dataTestId} focusBorderColor='black' size='md' variant='filled' onChange={props.handleChange}></NumberInputField>
        </NumberInput>
      </Flex>
    )
}
    
    SpecialNumberInput.propTypes = {
        dataTestId: PropTypes.string,
        label: PropTypes.string,
        state: PropTypes.any,
        handleChange: PropTypes.func,
}

  
export default SpecialNumberInput
