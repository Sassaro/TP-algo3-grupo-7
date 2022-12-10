/* eslint-disable no-unused-vars */
import "./HomePage.css"
import { Flex, Icon, IconButton, Table, Text, useToast} from "@chakra-ui/react"
import { HomeCard } from "../Molecules/M7HomeCard"
import Header from "../Atoms/A3Header"
import PageSelector from "../Molecules/M8PageSelector"
import { homeService } from "../Services/HomeService"
import { Star,Walker,Plane,User } from "../Atoms/A11HomeIcons"
import { useEffect, useState } from "react"
import { UserInformation } from "../Domain/Usuario"
import { useLocation } from "react-router-dom"


export const HomePage = () => {

    const [ userInformation, setUserInformation ] = useState(new UserInformation())
    const location = useLocation()

    useEffect(
        () => {
            getUserInformation()
        },[])

    const getUserInformation = async () =>{
        setUserInformation(await homeService.getUserInformation(location.state.id))
    }

    return (
        <>
        <Flex className="contenidoPagina">
        <Header label="Home"></Header>
            <Flex className="itemsContainer">
                <HomeCard icon={Star} Desclabel="Itinerarios Puntuados" numericLabel={userInformation.itinerariosPuntuados}></HomeCard>
                <HomeCard icon={Walker} Desclabel="Itinerarios Creados" numericLabel={userInformation.itinerariosCreados}></HomeCard>
                <HomeCard icon={Plane} Desclabel="Destinos Visitados" numericLabel={userInformation.destinosVisitados}></HomeCard>
                <HomeCard icon={User} Desclabel="Amigos" numericLabel={userInformation.amigos}></HomeCard>
            </Flex>
        </Flex>
            <PageSelector userId={location.state.id}></PageSelector>
        </>
    )
}

export default HomePage


