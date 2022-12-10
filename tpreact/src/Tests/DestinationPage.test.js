/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render } from '../test-utils'
import DestinationPage from '../Pages/DestinationPage'
import { Destino } from '../Domain/Destino';
import { destinationService } from '../Services/DestinationService';

describe (" Tests related to the destination Card ",() => {

    const destino1 = new Destino("destino1","ciudad1",1500)
    const destino2 = new Destino("destino2","ciudad2",1500)
    const destino3 = new Destino("destino3","ciudad3",1500)

    const stubDestinationList = [destino1,destino2,destino3]

    test( "Should display the correct amount of cards",async () => {

        const destinationServiceSpy = jest.spyOn(destinationService,"getDestination").mockReturnValue(stubDestinationList)

        render(
            <MemoryRouter initialEntries={[{ pathname: '/destination', state: {id:1} }]}>
                <DestinationPage></DestinationPage>
            </MemoryRouter>
        )

        await waitFor( () => {
            expect(destinationServiceSpy).toBeCalled()
            //no es lo correcto pero por alguna razon el test-id en el componente custom no funciona
            expect(screen.queryAllByTestId('paisCiudad').length).toBe(3)
        } )
    } )
} ) 

