/* eslint-disable no-unused-vars */
import "./M3CardActividad.css"

import { Flex, Icon, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { ImLocation } from 'react-icons/im'
import { BsCircle, BsCircleFill } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'
import { EditDeleteButtons } from "./M4EditDeleteButtons"
import { getErrorMessage } from "../Domain/Utils"
import { Actividad } from '../Domain/Actividades'
import { activityService } from "../Services/ActivitiesService"
import PropTypes from 'prop-types'
import { convertDateToString } from "../Domain/Utils"
import { useLocation, useNavigate } from "react-router-dom"

export const CardActividad = (props) => {

    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()

    const deleteActivity = async () => {
        try{
            await activityService.deleteActivity(props.activity.id)
            await props.update()
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

    const showEditMenu = () => {
        navigate("/editActivity",{state: {id: location.state.id,idActivity: props.activity.id}})
      }
    
  return (
    <>
    <Flex className="containerCardActivity">
        <Flex className="cardActivityBanner">
            <Icon data-testid = "iconActivity" className="activityIcon" as={ImLocation}></Icon>
            <Text className="cardActivityBannerText" data-testid="descripcion">{props.activity.descripcion}</Text>
            <EditDeleteButtons id={props.activity.descripcion} deleteFunc={deleteActivity} editFunc={showEditMenu}></EditDeleteButtons>
        </Flex>
        <Flex className='contenidoActividad'>
            <Flex className="duracionActivity">

                    <Text data-testid="inicio-fin"><span>{convertDateToString(props.activity.inicio)}hs. - {convertDateToString(props.activity.fin)}hs.</span></Text>
                    <Text> / </Text>
                    <FiClock/>
                    <Text data-testid="duracion">{props.activity.duracionActividad()} minutos</Text>
                
            </Flex>
            <Flex className="dificultadActivity">
                <Text data-testid="dificultad">Dificultad: </Text>
                <Text>{(() => {
                        switch (props.activity.dificultad) {
                        case "BAJA": return <Flex><BsCircleFill/><BsCircle/> <BsCircle/></Flex>
                        case "MEDIA": return <Flex><BsCircleFill/><BsCircleFill/><BsCircle/></Flex>
                        case "ALTA": return <Flex><BsCircleFill/><BsCircleFill/><BsCircleFill/></Flex>
                        default: return <Text>A nose ya te vas a enterar</Text>
                        }
                    })()}</Text>
            </Flex>
            <li>
                <Text data-testid="costo"><span className="costoTotal">${props.activity.costo}</span></Text>
            </li>
        </Flex>
    </Flex>
    </>
  )
}

CardActividad.propTypes = {
    activity: PropTypes.instanceOf(Actividad),
    update: PropTypes.func.isRequired
}

export default CardActividad