/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */

import "./VehicleFormPage.css"
import { Box, Checkbox, Flex, useToast } from '@chakra-ui/react'
import { SpecialInput } from "../Atoms/A4Input"
import { SpecialNumberInput } from "../Atoms/A7NumberInput"
import SpecialSelect from "../Atoms/A5Select"
import { Header } from "../Atoms/A3Header"
import { Botonera } from "../Molecules/M2Botonera"
import PageSelector from "../Molecules/M8PageSelector"
import React, { useEffect } from "react"
import { ErrorText } from "../Atoms/A8ValidationText"
import { VehiculoJSON } from "../Domain/vehiculo"
import { validate, validateVarious } from "../Domain/Utils"
import { vehicleService } from "../Services/VehicleService"
import { getErrorMessage } from "../Domain/Utils"
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from "react-router-dom"

export const NewVehicle = (props) => {

    const [vehicle, setVehicle] = React.useState( new VehiculoJSON())
    const [ saved, setSaved ] = React.useState( false ) 
    const toast = useToast()
    const location = useLocation()
    const navigate = useNavigate()

    const translateVehicle = async () => {

        const vehicle = await getVehicle()

        setVehicle({
            ...vehicle,
            anioDeFabricacion: vehicle.anioDeFabricacion.getFullYear()
        })
    }

    useEffect( () => {
        if(props.type.toLowerCase() === "edit"){
            translateVehicle()
        }
    },[] )

    const getVehicle = async () => {
        const vehicle = await vehicleService.getVehiclesById(location.state.idVehicle)
        return vehicle
    }

    const update = (reference,value) => {
        vehicle[reference] = value
        setVehicle({...vehicle})
    }

    const handleTypeChange = (event) => {
        update("type", event.target.value)
    }

    const handleMarcaChange = (event) => {
        update("marca", event.target.value)
    }

    const handleModeloChange = (event) => {
        update("modelo", event.target.value)
    }
    
    const handleAnioChange = (event) => {
        update("anioDeFabricacion", event.target.value)
    }
    
    const handleCostoDiarioChange = (event) => {
        update("costoDiario", event.target.value)
    }
    
    const handleKilometrajeLibreChange = (event) => {
        update("kilometrajeLibre", !vehicle.kilometrajeLibre)
    }
    
    const handleCilindradasChange = (event) => {
        update("cilindradas", event.target.value)
    }
    
    const handleHatckbackChange = (event) => {
        update("hatchback", !vehicle.hatchback)
    }
    
    const handle4x4Change = (event) => {
        update("cuatroXCuatro", !vehicle.cuatroXCuatro)
    }

    const validateMarca = vehicle.marca === ""
    const validateTipo = vehicle.type === ""
    const validateCilidradas = vehicle.cilindradas == undefined || vehicle.cilindradas == ""
    const validateModelo = vehicle.modelo === ""
    const validateAnio = vehicle.anioDeFabricacion == undefined || vehicle.anioDeFabricacion == ""
    const validateCosto = vehicle.costoDiario == undefined || vehicle.costoDiario == ""

    const errorList = {
        errorMarca: "Es necesaria una marca.",
        errorTipo: "Elija un tipo.",
        errorCilidradas: "Ingrese las cilindradas.",
        errorModelo: "Ingrese un modelo.",
        errorAnio: "Ingrese año de fabricación.",
        errorCosto: "Ingrese costo diario."
    }

    const saveVehicle = async () => {
        setSaved(true)
        if(validateVarious([!validateMarca,!validateTipo,!validateAnio,!validateCosto,!validateModelo,especificValidation()])){

            try{
                const fecha = new Date()
                fecha.setFullYear(vehicle.anioDeFabricacion)
                //Genera un nuevo vehiculo JSON con el anio de fabricación como Date
                const vehicleJson = {
                    ...vehicle,
                    anioDeFabricacion: fecha
                }

                if(props.type.toLowerCase() == "edit"){
                    await vehicleService.updateVehicle(vehicleJson)
                }else{
                    await vehicleService.createVehicle(vehicleJson)
                }
                goBack()

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

    const especificValidation = () =>{
        if (vehicle.type.toLowerCase() == "moto"){
            return !validateCilidradas
        }else{
            return true
        }
    }

    const goBack = () => {
        navigate("/vehicles",{state: {id: location.state.id}})
    }

    return (
        <Flex className="contenidoPagina">
        <Header label="Nuevo Vehiculo"></Header>
        <Box className="cardNewVehicle">

            <SpecialInput dataTestId="marca" label="Marca:" placeholder="Marca" state={vehicle.marca} handleChange = {handleMarcaChange}></SpecialInput>
            {validate(saved,validateMarca) && <ErrorText dataTestId="errorMarca" content={errorList.errorMarca}></ErrorText>}

            <SpecialSelect dataTestId="tipo" label="Tipo: " placeholder="Tipo" options={vehicleOptions()} state={vehicle.type} handleChange={handleTypeChange}></SpecialSelect>
            {validate(saved,validateTipo) && <ErrorText dataTestId="errorTipo" content={errorList.errorTipo}></ErrorText>}

            {vehicle.type.toLowerCase() == "moto" && 
                <>
                <SpecialNumberInput dataTestId="cilindradas" label="Cilindradas:" state={vehicle.cilindradas} handleChange = {handleCilindradasChange}></SpecialNumberInput>
                {validate(saved,validateCilidradas) && <ErrorText dataTestId="errorCilindradas" content={errorList.errorCilidradas}></ErrorText>}
                </>
            }

            <SpecialInput dataTestId="modelo" label="Modelo:" placeholder="Modelo" state={vehicle.modelo} handleChange = {handleModeloChange}></SpecialInput>
            {validate(saved,validateModelo) && <ErrorText dataTestId="errorModelo" content={errorList.errorModelo}></ErrorText>}

            <SpecialNumberInput dataTestId="anio" label="Año:" placeholder="Año" state={vehicle.anioDeFabricacion} handleChange = {handleAnioChange}></SpecialNumberInput>
            {validate(saved,validateAnio) && <ErrorText dataTestId="errorAnio" content={errorList.errorAnio}></ErrorText>}

            <SpecialNumberInput dataTestId="costo" label="Costo Diario:" placeholder="Costo Diario" state={vehicle.costoDiario} handleChange = {handleCostoDiarioChange}></SpecialNumberInput>
            {validate(saved,validateCosto) && <ErrorText dataTestId="errorCosto" content={errorList.errorCosto}></ErrorText>}

            <Flex className="checkBox">
                <Checkbox data-testid="kilometrajeLibre" borderColor="black" isChecked={vehicle.kilometrajeLibre} onChange={handleKilometrajeLibreChange}>Kilometraje Libre</Checkbox>
                {vehicle.type.toLowerCase() == "camioneta" && 
                    <Checkbox data-testid="cuatroXCuatro" borderColor="black" isChecked={vehicle.cuatroXCuatro} onChange={handle4x4Change}>Es 4x4</Checkbox>
                }
                {vehicle.type.toLowerCase() == "auto" && 
                    <Checkbox data-testid="hatchback" borderColor="black" isChecked={vehicle.hatchback} onChange={handleHatckbackChange}>Es hatchback</Checkbox>
                }
            </Flex>
            
            <Flex className="centeredContainer">
                <Botonera className="centered" acceptFunc={saveVehicle} cancelFunc={goBack}></Botonera>
            </Flex>

        </Box>
        <PageSelector userId={location.state.id}></PageSelector>
        </Flex>
    )
    
}
//Devuelve todas las opciones del select de tipo de vehiculo.
const vehicleOptions = () =>{

    return (
        <>
        <option value="Moto">Moto</option>
        <option value="Auto">Auto</option>
        <option value="Camioneta">Camioneta</option>
        </>
    )
}

NewVehicle.propTypes = {
    type: PropTypes.string,
}