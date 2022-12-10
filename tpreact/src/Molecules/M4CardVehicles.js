/* eslint-disable no-unused-vars */
import "./M4CardVehicles.css"

import React, { useState } from 'react'
import { Divider, Flex, Icon, Text, useToast } from '@chakra-ui/react'
import { Vehiculo } from "../Domain/vehiculo"
import { BiCar } from 'react-icons/bi'
import { FaShuttleVan, FaHandshake,FaMotorcycle } from 'react-icons/fa'
import { EditDeleteButtons } from "./M4EditDeleteButtons"
import PropTypes from 'prop-types'
import { vehicleService } from "../Services/VehicleService"
import { getErrorMessage } from "../Domain/Utils"
import { useLocation, useNavigate } from "react-router-dom"

//Esta pagina esta para probar los distintos atomos y moleculas
//Revisar el router para ver las distintas paginas
export const CardVehiculo = (props) => {

    const toast = useToast()
    const navigate = useNavigate()
    const location = useLocation()

    const deleteVehicle = async () => {
        try{
            await vehicleService.deleteVehicle(props.vehicle.id)
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
        navigate("/editVehicle",{state: {id: location.state.id,idVehicle: props.vehicle.id}})
      }

  return (
    <>
    <Flex className="containerCardVehicle">
        <Flex className="cardVehicleBanner">
            <Flex>
                <Text className="cardVehicleBannerText" data-testid="vehicleType">{props.vehicle.type}</Text>
                {props.vehicle.type.toLowerCase() == "moto" && <Icon data-testid = "iconMotorcycle" className="vehicleIcon" as={FaMotorcycle}></Icon>}
                {props.vehicle.type.toLowerCase() == "auto" && <Icon data-testid = "iconCar" className="vehicleIcon" as={BiCar}></Icon>}
                {props.vehicle.type.toLowerCase() == "camioneta" && <Icon data-testid = "iconTruck" className="vehicleIcon" as={FaShuttleVan}></Icon>}
            </Flex>
            <EditDeleteButtons id={props.vehicle.marca + props.vehicle.modelo} deleteFunc={deleteVehicle} editFunc= {showEditMenu}></EditDeleteButtons>
        </Flex>

        <Flex className="cardVehicle">
            <Flex className="vehicleDetails">

                <li className="containerConvenio">
                    <Text data-testid="marca">Marca: <span className="bold">{props.vehicle.marca}</span></Text>
                    { props.vehicle.tieneConvenio && <Icon data-testid="tieneConvenio" as={FaHandshake}></Icon> } 
                </li>

                <li>
                    <Text data-testid="modelo">Modelo: <span className="bold">{props.vehicle.modelo}</span></Text>
                </li>

                <Divider borderColor={'Black'} borderWidth={1.5} orientation='horizontal'/>

                <li>
                    <Text data-testid="costoDiario">Costo por dia: <span className="bold">${props.vehicle.costoDiario}</span></Text>
                </li>
                
                <li>
                <Text data-testid="costoBase">Costo base (una semana): <span className="bold">${props.vehicle.costoBase(7)}</span></Text>
                </li>

                <Divider borderColor={'Black'} borderWidth={1.5} orientation='horizontal'/>
                
                <Text data-testid="costoTotal" className="costoTotal">${props.vehicle.costoDeAlquiler(10)}</Text>
            </Flex>
        </Flex>
    </Flex>
    </>
  )
}

CardVehiculo.propTypes = {
    vehicle: PropTypes.instanceOf(Vehiculo),
    update: PropTypes.func.isRequired
}

export default CardVehiculo