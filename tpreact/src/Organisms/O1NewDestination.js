/* eslint-disable no-unused-vars */

import "./O1NewDestination.css"

import { useToast  } from '@chakra-ui/react'
import { SpecialInput } from "../Atoms/A4Input"
import SpecialSelect from "../Atoms/A5Select"
import { Botonera } from "../Molecules/M2Botonera"
import React from "react"
import { DestinoJson } from "../Domain/Destino"
import { countryList } from "../Utils/CountryList"
import SpecialNumberInput from "../Atoms/A7NumberInput"
import { ErrorText } from "../Atoms/A8ValidationText"
import { validate, validateVarious } from "../Domain/Utils"
import { destinationService } from "../Services/DestinationService"
import { getErrorMessage } from "../Domain/Utils"
import PropTypes from 'prop-types'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  } from '@chakra-ui/react'


export const NewDestination = ({isOpen,onClose,onOpen,updateList}) =>{

    const [destination, setDestination] = React.useState( new DestinoJson())
    const [saved, setSaved] = React.useState( false )
    const toast = useToast()

    const update = (reference,value) => {
        destination[reference] = value
        setDestination({...destination})
    }

    const handlePaisChange = (event) => {
        update("pais", event.target.value)
    }

    const handleCiudadChange = (event) => {
        update("ciudad", event.target.value)
    }

    const handleCostoBaseChange = (event) => {
        update("costo", event.target.value)
    }

    const saveDestination = async () => {
        setSaved(true)
        if(validateVarious([!validatePais,!validateCiudad,!validateCosto])){
            try{
                await destinationService.createDestination(destination)
                await updateList()
                onClose()
            }catch(error){
                toast({
                    title: 'Error',
                    description: getErrorMessage(error),
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }
        }
    }

    const resetInputs = () => {
        setDestination({
            ...new DestinoJson()
        })
    }

    const validatePais = destination.pais === ""
    const validateCiudad = destination.ciudad === ""
    const validateCosto = destination.costo === undefined || destination.costo == ""

    const errorList = {
        errorPais: "Es necesario ingresar Pais",
        errorCiudad: "Es necesario ingresar Ciudad",
        errorCosto: "Es necesario ingresar Costo"
    }

return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="containerNewDestination">
            <ModalHeader className="titleText"> Nuevo Destino </ModalHeader>

            <ModalBody>
                <SpecialSelect dataTestId="selectorPais" label="Pais" placeholder="Selecionar Pais" state={destination.pais} handleChange={handlePaisChange} options={countryList()}></SpecialSelect>
                {validate(saved,validatePais) && <ErrorText dataTestId="errorPais" content={errorList.errorPais}></ErrorText>}

                <SpecialInput dataTestId="ciudad" label="Ciudad:" placeholder="Ciudad" state={destination.ciudad} handleChange={handleCiudadChange}></SpecialInput>
                {validate(saved,validateCiudad) && <ErrorText dataTestId="errorCiudad" content={errorList.errorCiudad}></ErrorText>}

                <SpecialNumberInput dataTestId="costoBase" label="Costo Base:" placeholder="Costo Base" state={destination.costo} handleChange={handleCostoBaseChange}></SpecialNumberInput>
                {validate(saved,validateCosto) && <ErrorText dataTestId="errorCosto" content={errorList.errorCosto}></ErrorText>}
            </ModalBody>

            <ModalFooter>
                <Botonera acceptFunc={saveDestination} cancelFunc={onClose}></Botonera>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
)
}

NewDestination.propTypes = {
    isOpen: PropTypes.bool,
    onOpen: PropTypes.any,
    onClose: PropTypes.any,
    updateList: PropTypes.func
}