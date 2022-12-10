/* eslint-disable no-unused-vars */
import "./M7HomeCard.css"
import { Flex} from "@chakra-ui/react"
import React from 'react'
import PropTypes from 'prop-types'


export const HomeCard = (props) => {

    return (
        <>
        <Flex className="homeCard">
        <Flex className="iconContainer">{props.icon()}</Flex>
        <Flex className="contentContainer">
                <Flex className="Indicador">{props.numericLabel}</Flex>
                <Flex className="IndicadorDescripcion">{props.Desclabel}</Flex>
        </Flex>
        </Flex>
        </>
    )
}

HomeCard.propTypes = {
    icon: PropTypes.any,
    numericLabel: PropTypes.number,
    Desclabel: PropTypes.string
}
