/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { DestinationCard } from "../Molecules/M5DestinationCard"
import { Destino } from '../Domain/Destino';

describe (" Tests related to the destination Card ",() => {

    test( "Should display correct values",() => {

        const destination = new Destino("prueba","Pruebapolis","15000")

        render(
            <DestinationCard destination={destination}></DestinationCard>
        )

        expect(screen.getByTestId("paisCiudad").textContent).toBe( "prueba - Pruebapolis" )
    } )
} ) 

