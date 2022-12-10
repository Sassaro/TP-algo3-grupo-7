/* eslint-disable no-unused-vars */
import { Button, Flex, FormControl, InputLeftElement, useToast } from "@chakra-ui/react"
import { Logo } from "../Atoms/A1Logo"
import SpecialInput from "../Atoms/A4Input"
import { Icon } from "@chakra-ui/icons"
import { MdVpnKey } from 'react-icons/md'
import { BiUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { Usuario } from "../Domain/Usuario"
import React from "react"
import "./M1LoginCard.css"
import ErrorText from "../Atoms/A8ValidationText"
import { getErrorMessage, validate, validateVarious } from "../Domain/Utils"
import { loginService } from "../Services/LoginService"

const leftElement = (icon) =>{
    return <InputLeftElement pointerEvents='none'>
    <Icon as={icon} />
    </InputLeftElement>
  }

export const LoginCard = () => {

    const navigate = useNavigate()
    const [ login,setLogin ] = React.useState(new Usuario())
    const [ saved,setSaved ] = React.useState(false)
    const toast = useToast()

    const usernameHandler = (event) => {
        setLogin({
            ...login,
            username: event.target.value})
    }

    const passwordHandler = (event) => {
        setLogin({
            ...login,
            contrasenia: event.target.value})
    }
    
    const tryToLogin = async () => {
        setSaved(true)
        if(validateVarious([!validateContrasenia,!validateUsername])){
            try{
                const userId = await loginService.login(login)
                //navega al home y le envia el id del usuario
                navigate("/home",{state: {id: userId}})
            }catch (error) {
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

    const validateContrasenia = login.contrasenia === ""
    const validateUsername = login.username === ""

    const errorList = {
        errorPassword: "Ingrese la contraseña",
        errorUsername: "Ingrese el usuario"
    }

    return (
        <>
        <Flex className="cardLogin">
            <Logo label="Hola Mundo"></Logo>
            
            <FormControl isInvalid={validate(saved, validateUsername)}>
                <SpecialInput dataTestId="username" label="Usuario:" placeholder="Usuario" state={login.username} handleChange={usernameHandler} leftElement={leftElement(BiUser)}></SpecialInput>
                {validate(saved, validateUsername) && <ErrorText dataTestId="errorUsername" content={errorList.errorUsername}></ErrorText>}
            </FormControl>

            <FormControl isInvalid={validate(saved, validateContrasenia)}>
            <SpecialInput dataTestId="password" label="Contraseña:" type="password" placeholder="Contraseña" state={login.password} handleChange={passwordHandler} leftElement={leftElement(MdVpnKey)}></SpecialInput>
                {validate(saved, validateContrasenia) && <ErrorText dataTestId="errorPassword" content={errorList.errorPassword}></ErrorText>}
            </FormControl>

            <Button data-testid="loginButton" color="white" onClick={ tryToLogin } >Ingresar</Button>
        </Flex>
        </>
    )
}

