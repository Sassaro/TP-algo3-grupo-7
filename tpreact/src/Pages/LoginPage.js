/* eslint-disable no-unused-vars */
import React from 'react'
import { Flex } from "@chakra-ui/react"
import { Footer } from "../Atoms/A2Footer"
import { LoginCard } from "../Molecules/M1LoginCard"
import "./LoginPage.css"

export const LoginPage = () => {

    return (
        <>
        <Flex className='contenidoPagina'>
            <LoginCard></LoginCard>
        <Footer></Footer>
        </Flex>
        </>
    )
}

