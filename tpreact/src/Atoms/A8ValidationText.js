/* eslint-disable no-unused-vars */
import "./A8ValidationText.css"

import { Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

export const ErrorText = (props) => {
    return <Text data-testid = {props.dataTestId} className='validationText'>{props.content}</Text>
}

ErrorText.propTypes = {
    dataTestId: PropTypes.string,
    content: PropTypes.string
}

export default ErrorText