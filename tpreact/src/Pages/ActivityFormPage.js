/* eslint-disable no-unused-vars */

import "./ActivityFormPage.css"

import { Divider, Flex, Text,Box, useToast, FormControl } from '@chakra-ui/react'
import { SpecialInput } from "../Atoms/A4Input"
import { Header } from "../Atoms/A3Header"
import SpecialSelect from "../Atoms/A5Select"
import { Botonera } from "../Molecules/M2Botonera"
import PageSelector from "../Molecules/M8PageSelector"
import React, { useEffect } from "react"
import SpecialNumberInput from "../Atoms/A7NumberInput"
import { Actividad } from "../Domain/Actividades"
import { validate, validateVarious,FuncionesDeTiempo } from "../Domain/Utils"
import ErrorText from "../Atoms/A8ValidationText"
import { activityService } from "../Services/ActivitiesService"
import { getErrorMessage } from "../Domain/Utils"
import PropTypes from 'prop-types'
import { convertDateToString } from "../Domain/Utils"
import { useLocation, useNavigate } from "react-router-dom"


export const NewActivity = (props) =>{

    // aca se debe declarar los distintos values de los inputs de la pagina/componente
    const [activity, setActivity] = React.useState(new Actividad())
    const [saved, setSaved] = React.useState( false )
    const toast = useToast()
    const location = useLocation()
    const navigate = useNavigate()

    //Traduce las horas de la actividad a el formato del time input del formulario
    const translateActivity = async () => {
        const activity = await getActivityById()
        setActivity({
            ...activity,
            inicio: convertDateToString(activity.inicio),
            fin: convertDateToString(activity.fin)
        })
    }

    useEffect( () => {
        if(props.type == "edit"){
            translateActivity()
        }
    },[] )

    const getActivityById = async () => {
        console.log(location.state.idActivity)
        const activity = await activityService.getActivitiesById(location.state.idActivity)
        return activity
    }

    const update = (reference,value) => {
        activity[reference] = value
        setActivity({...activity})
    }

    const handleDescripcionChange = (event) =>{
        update("descripcion", event.target.value)
    }
    const handleHoraInicioChange = (event) =>{
        update("inicio", event.target.value)
    }
    const handleHoraFinChange = (event) =>{
        update("fin", event.target.value)
    }
    const handleDificultadChange = (event) =>{
        update("dificultad", event.target.value)
    }
    const handleCostoChange = (event) =>{
        update("costo", event.target.value)
    }

    const validateDuration = (timeStart, timeEnd) => {
        const start = createDateFromString(timeStart)
        const end = createDateFromString(timeEnd)
        return FuncionesDeTiempo.tiempoEntre(start,end) <= 0
    }

    const saveActivity = async () => {
        setSaved(true)
        if(validateVarious([!validateDescripcion,!validateInicio,!validateFin,!validateDificultad,!validateCosto,!validateDuration(activity.inicio, activity.fin)])){

            try{
                const inicio = convertTimeFormat(activity.inicio)
                const fin = convertTimeFormat(activity.fin)
                const activityJson = {
                    ...activity,
                    inicio: inicio,
                    fin: fin
                }
                if(props.type.toLowerCase() == "edit"){
                    await activityService.updateActivity(activityJson)
                }else{
                    await activityService.createActivity(activityJson)
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

    const goBack = () => {
        navigate("/activities",{state: {id: location.state.id}})
    }

    const validateDescripcion = activity.descripcion === ""
    const validateInicio = activity.inicio === ""
    const validateFin = activity.fin === ""
    const validateDificultad = activity.dificultad === ""
    const validateCosto = activity.costo === undefined || activity.costo == ""

    const errorList = {
        errorDescripcion: "Es necesaria una descripcion",
        errorInicio: "Es necesario un Inicio",
        errorFin: "Es necesario un Fin",
        errorTimeDifference: "Ingrese horas adecuadas",
        errorDificultad: "Es necesaria una Dificultad",
        errorCosto: "Es necesario un costo",
    }

return (
    <Flex className="contenidoPagina">
        <Header label="Nueva Actividad"></Header>
    <Box className="containerNewActivityMenu">

        <FormControl isInvalid = {validate(saved,validateDescripcion)}>
            <SpecialInput dataTestId="descripcion" label="Descripcion:" placeholder="Descripcion" state={activity.descripcion} handleChange={handleDescripcionChange}></SpecialInput>
            {validate(saved,validateDescripcion) && <ErrorText dataTestId="errorDescripcion" content={errorList.errorDescripcion}></ErrorText>}
        </FormControl>
        
        <Divider borderColor={'Black'} borderWidth={1.5} orientation='horizontal'/>

        <FormControl isInvalid = {validate(saved,validateInicio)}>
            <SpecialInput dataTestId="inicio" type={"time"} label="Hora De Inicio:" state={activity.inicio} handleChange={handleHoraInicioChange}></SpecialInput>
            {validate(saved,validateInicio) && <ErrorText dataTestId="errorInicio" content={errorList.errorInicio}></ErrorText>}
        </FormControl>
        
        <FormControl isInvalid={validate(saved,validateFin)}>
        <SpecialInput dataTestId="fin" type={"time"} label="Hora De Finalizacion:" state={activity.fin} handleChange={handleHoraFinChange}></SpecialInput>
            {validate(saved,validateFin) && <ErrorText dataTestId="errorFin" content={errorList.errorFin}></ErrorText>}
        </FormControl>

        <Text data-testid="duracion" >Duracion: {activityDurationOptions(activity.inicio, activity.fin)}</Text>
        <Divider borderColor={'Black'} borderWidth={1.5} orientation='horizontal'/>
            {validate(saved,validateDuration(activity.inicio, activity.fin)) && <ErrorText dataTestId="errorDiferencia" content={errorList.errorTimeDifference}></ErrorText>}

        <FormControl isInvalid = {validate(saved,validateDificultad)}>
            <SpecialSelect dataTestId="dificultad" label="Dificultad:" placeholder="Dificultad" state={activity.dificultad} handleChange={handleDificultadChange} options={difficultyOptions()}></SpecialSelect>
            {validate(saved,validateDificultad) && <ErrorText dataTestId="errorDificultad" content={errorList.errorDificultad}></ErrorText>}
        </FormControl>

        <FormControl isInvalid={validate(saved,validateCosto)}>
            <SpecialNumberInput dataTestId="costo" label="Costo: " placeholder="Costo" state={activity.costo} handleChange={handleCostoChange}></SpecialNumberInput>
            {validate(saved,validateCosto) && <ErrorText dataTestId="errorCosto" content={errorList.errorCosto}></ErrorText>}
        </FormControl>

        <Flex className="centeredContainer">
            <Botonera className="centered" acceptFunc={saveActivity} cancelFunc={goBack}></Botonera>
        </Flex>
        
    </Box>
    <PageSelector userId={location.state.id}></PageSelector>
    </Flex>
)
}

const createDateFromString = (time) =>{
    return new Date("0000-01-01 " + time + ":00")
}

const convertTimeFormat = (time) => {
    return time + ":00"
}

const difficultyOptions = () => {
    return (
        <>
        <option>BAJA</option>
        <option>MEDIA</option>
        <option>ALTA</option>
        </>
    )
}

export const activityDurationOptions = (timeStart, timeEnd) => {

    const start = createDateFromString(timeStart)
    const end = createDateFromString(timeEnd)

    if(timeStart && timeEnd){
        return FuncionesDeTiempo.tiempoEntre(start,end)
    }
    return ""
}

NewActivity.propTypes = {
    type: PropTypes.string.isRequired
}