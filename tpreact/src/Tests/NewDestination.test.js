/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react'
import { NewDestination } from "../Organisms/O1NewDestination"
import { render } from '../test-utils'

describe("Tests related to the newActivity Organism", () => {

    test('If the component is saved with error the errors should be displayed',() => {
        //isOpen = true fuerza que el componente este abierto
        render(
            <NewDestination isOpen={true}></NewDestination>
        )

        const acceptButton = screen.getByTestId('acceptButton')

        expect(screen.queryByTestId("errorPais")).toBeNull()
        expect(screen.queryByTestId("errorCiudad")).toBeNull()
        expect(screen.queryByTestId("errorCosto")).toBeNull()

        fireEvent.click(acceptButton)

        expect(screen.getByTestId("errorPais")).not.toBeNull()
        expect(screen.getByTestId("errorCiudad")).not.toBeNull()
        expect(screen.getByTestId("errorCosto")).not.toBeNull()

    } )

})