/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { NewActivity } from '../Pages/ActivityFormPage'
import { Actividad, Dificultad } from '../Domain/Actividades'
import { MemoryRouter } from 'react-router-dom';
import { render } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { activityService } from '../Services/ActivitiesService';

describe("Tests related to the newActivity Organism", () => {

    const activity = new Actividad(1500,"Actividad de test",Dificultad.BAJA,new Date("October 13, 2014 11:30:00"), new Date("October 13, 2014 11:50:00"))

    test('If the component is opened in edit mode it should display the activity values',async () => {

        const activityServiceSpy = jest.spyOn(activityService, "getActivitiesById").mockReturnValue(activity)

        //Lo envuelvo en un MemoryRouter para poder pasarle el state de la location
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idActivity: 0} }]}>
                <NewActivity type="edit"></NewActivity>
            </MemoryRouter>
        )

        await waitFor( () => {
            expect(activityServiceSpy).toBeCalled()
            expect(screen.getByTestId('descripcion').value).toBe("Actividad de test")
            expect(screen.getByTestId('inicio').value).toBe("11:30")
            expect(screen.getByTestId('fin').value).toBe("11:50")
            expect(screen.getByTestId('duracion').textContent).toBe("Duracion: 20")
            expect(screen.getByTestId('dificultad').value).toBe("BAJA")
            expect(screen.getByTestId('costo').value).toBe("1500")
        } )

    } )

    test('If the component is opened in new mode it should not display any activity values',() => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idActivity: 0} }]}>
                <NewActivity type="new" returnFunc= {() => {}} update= {() => {}}></NewActivity>
            </MemoryRouter>
        )

        expect(screen.getByTestId('descripcion').value).toBe("")
        expect(screen.getByTestId('inicio').value).toBe("")
        expect(screen.getByTestId('fin').value).toBe("")
        expect(screen.getByTestId('duracion').textContent).toBe("Duracion: ")
        expect(screen.getByTestId('dificultad').value).toBe("")
        expect(screen.getByTestId('costo').value).toBe("")
    } )

    test('If the component is saved with errors, the errors should be displayed',() => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idActivity: 0} }]}>
                <NewActivity type="new" returnFunc= {() => {}} update= {() => {}}></NewActivity>
            </MemoryRouter>
        )
        
        const acceptButton = screen.getByTestId('acceptButton')

        expect(screen.queryByTestId('errorDescripcion')).toBeNull()
        expect(screen.queryByTestId('errorInicio')).toBeNull()
        expect(screen.queryByTestId('errorFin')).toBeNull()
        expect(screen.queryByTestId('errorDiferencia')).toBeNull()
        expect(screen.queryByTestId('errorDificultad')).toBeNull()
        expect(screen.queryByTestId('errorCosto')).toBeNull()

        //intenta guardar la nueva actividad
        fireEvent.click(acceptButton)

        expect(screen.getByTestId('errorDescripcion')).not.toBeNull()
        expect(screen.getByTestId('errorInicio')).not.toBeNull()
        expect(screen.getByTestId('errorFin')).not.toBeNull()
        expect(screen.getByTestId('errorDiferencia')).not.toBeNull()
        expect(screen.getByTestId('errorDificultad')).not.toBeNull()
        expect(screen.getByTestId('errorCosto')).not.toBeNull()
    } )

    test('If the component is saved with errors, diferent convinations',async () => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idActivity: 0} }]}>
                <NewActivity type="new" returnFunc= {() => {}} update= {() => {}}></NewActivity>
            </MemoryRouter>
        )
        
        const acceptButton = screen.getByTestId('acceptButton')
        const inputDescripcion = screen.getByTestId('descripcion')
        await userEvent.type(inputDescripcion,"Test")

        //intenta guardar la nueva actividad
        fireEvent.click(acceptButton)

        expect(screen.queryByTestId('errorDescripcion')).toBeNull()

        const inputInicio = screen.getByTestId('inicio')
        await userEvent.type(inputInicio,"7:30")

        expect(screen.queryByTestId('errorInicio')).toBeNull()

        const inputFin = screen.getByTestId('fin')
        await userEvent.type(inputFin,"8:30")

        expect(screen.queryByTestId('errorFin')).toBeNull()
        expect(screen.queryByTestId('errorDiferencia')).toBeNull()

        const inputCosto = screen.getByTestId('costo')
        await userEvent.type(inputCosto,"2000")

        expect(screen.queryByTestId('errorCosto')).toBeNull()


        expect(screen.getByTestId('errorDificultad')).not.toBeNull()
    } )

    test('If the component is saved with negative time it should display an error',async () => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idActivity: 0} }]}>
                <NewActivity type="new" returnFunc= {() => {}} update= {() => {}}></NewActivity>
            </MemoryRouter>
        )
        
        const acceptButton = screen.getByTestId('acceptButton')
        const inputDescripcion = screen.getByTestId('descripcion')
        await userEvent.type(inputDescripcion,"Test")

        //intenta guardar la nueva actividad
        fireEvent.click(acceptButton)

        const inputInicio = screen.getByTestId('inicio')
        await userEvent.type(inputInicio,"9:30")

        expect(screen.queryByTestId('errorInicio')).toBeNull()

        const inputFin = screen.getByTestId('fin')
        await userEvent.type(inputFin,"8:30")

        expect(screen.queryByTestId('errorFin')).toBeNull()
        expect(screen.getByTestId('errorDiferencia')).not.toBeNull()

    } )
})