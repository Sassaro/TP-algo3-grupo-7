/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { render } from '../test-utils'
import { LoginPage } from '../Pages/LoginPage'

describe( "Tests related to the login page" ,() => {

    test( "Should start correctly",() => {
        render(
        <BrowserRouter>
            <LoginPage></LoginPage>
        </BrowserRouter>
        )
    } )
    
    test( "If the component has error they should be displayed",() => {
        render(
        <BrowserRouter>
            <LoginPage></LoginPage>
        </BrowserRouter>
        )

        const loginButton = screen.getByTestId("loginButton")

        fireEvent.click(loginButton)

        expect(screen.getByTestId("errorUsername")).not.toBeNull()
        expect(screen.getByTestId("errorPassword")).not.toBeNull()

    } )

    test( "If the component has a username value it should not display the error",async () => {
        render(
        <BrowserRouter>
            <LoginPage></LoginPage>
        </BrowserRouter>
        )

        const loginButton = screen.getByTestId("loginButton")
        const inputUsername = screen.getByTestId('username')

        await userEvent.type(inputUsername,"Test")

        fireEvent.click(loginButton)

        expect(screen.queryByTestId("errorUsername")).toBeNull()
        expect(screen.getByTestId("errorPassword")).not.toBeNull()

    } )

    test( "If the component has a username and password values it should not display the errors",async () => {
        render(
        <BrowserRouter>
            <LoginPage></LoginPage>
        </BrowserRouter>
        )

        const loginButton = screen.getByTestId("loginButton")
        const inputUsername = screen.getByTestId('username')
        const inputPassword = screen.getByTestId('password')

        await userEvent.type(inputUsername,"Test")
        await userEvent.type(inputPassword,"Test")

        fireEvent.click(loginButton)

        expect(screen.queryByTestId("errorUsername")).toBeNull()
        expect(screen.queryByTestId("errorPassword")).toBeNull()

    } )

    test( "If the component has a pasword it should not display the error",async () => {
        render(
        <BrowserRouter>
            <LoginPage></LoginPage>
        </BrowserRouter>
        )

        const loginButton = screen.getByTestId("loginButton")
        const inputPassword = screen.getByTestId('password')

        await userEvent.type(inputPassword,"Test")

        fireEvent.click(loginButton)

        expect(screen.getByTestId("errorUsername")).not.toBeNull()
        expect(screen.queryByTestId("errorPassword")).toBeNull()

    } )
} )