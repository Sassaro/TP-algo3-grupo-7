/* eslint-disable no-unused-vars */

import "./M4EditDeleteButtons.css"

import { Button, ButtonGroup, Divider, Flex, Icon, Text,IconButton } from '@chakra-ui/react'
import { BiPen,BiTrash } from 'react-icons/bi'
import PropTypes from 'prop-types'
import React from 'react'

export const EditDeleteButtons = (props) => {

    return(
        <>
        <Flex direction={props.direction}>
            <IconButton data-testid={'deleteButton' + props.id} aria-label='Borrar' colorScheme="" onClick={props.deleteFunc} icon={<BiTrash className='customIconButton deleteButton'/>} />
            <IconButton aria-label='Editar' colorScheme="" onClick={props.editFunc} icon={<BiPen className='customIconButton editButton' />} />
        </Flex>
        </>
    )
}

EditDeleteButtons.propTypes = {
    id: PropTypes.string,
    direction: PropTypes.string,
    deleteFunc: PropTypes.func.isRequired,
    editFunc: PropTypes.func.isRequired,

}