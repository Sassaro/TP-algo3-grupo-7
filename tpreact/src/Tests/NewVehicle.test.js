/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { NewVehicle } from '../Pages/VehicleFormPage'
import { MemoryRouter } from 'react-router-dom';
import { render } from '../test-utils'
import { Auto, Camioneta, Moto } from '../Domain/vehiculo';
import { vehicleService } from '../Services/VehicleService';

describe("Tests related to the newActivity Organism", () => {

    const moto = new Moto("Honda","H-250",new Date("October 13, 2014"),1500,900,false,true)
    const auto = new Auto("FIAT","Suran",new Date("October 13, 2019"),2000,true,false,true)
    const camioneta = new Camioneta("Renault","Duster",new Date("October 13, 2015"),2500,true,false,false)

    test('If the component is opened in edit mode it should display the vehicle values',async () => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).

        const vehicleServiceSpy = jest.spyOn(vehicleService, "getVehiclesById").mockReturnValue(moto)

        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idVehicle: 0} }]}>
                <NewVehicle type="edit"></NewVehicle>
            </MemoryRouter>
        )

        await waitFor( () => {
            expect(vehicleServiceSpy).toBeCalled()
            expect(screen.getByTestId('marca').value).toBe("Honda")
            expect(screen.getByTestId('tipo').value).toBe("Moto")
            expect(screen.getByTestId('cilindradas').value).toBe("900")
            expect(screen.getByTestId('modelo').value).toBe("H-250")
            expect(screen.getByTestId('anio').value).toBe("2014")
            expect(screen.getByTestId('costo').value).toBe("1500")
        })

    } )

    test('If the component is a motorcycle it should not display the hatchback and 4x4 checkboxes',async () => {

        const vehicleServiceSpy = jest.spyOn(vehicleService, "getVehiclesById").mockReturnValue(moto)

        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idVehicle: 0} }]}>
                <NewVehicle type="edit"></NewVehicle>
            </MemoryRouter>
        )

        await waitFor( () => {
            expect(vehicleServiceSpy).toBeCalled()
            expect(screen.queryByTestId("hatchback")).toBeNull()
            expect(screen.queryByTestId("cuatroXCuatro")).toBeNull()
        })

    } )

    test('If the component is a car it should display the hatchback checkbox',async () => {

        const vehicleServiceSpy = jest.spyOn(vehicleService, "getVehiclesById").mockReturnValue(auto)

        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idVehicle: 0} }]}>
                <NewVehicle type="edit"></NewVehicle>
            </MemoryRouter>
        )
        
        await waitFor( () => {
            expect(vehicleServiceSpy).toBeCalled()
        expect(screen.getByTestId("hatchback")).not.toBeNull()
        })
    } )

    test('If the component is a truck it shoul display the 4x4 checkbox',async () => {

        const vehicleServiceSpy = jest.spyOn(vehicleService, "getVehiclesById").mockReturnValue(camioneta)

        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idVehicle: 0} }]}>
                <NewVehicle type="edit"></NewVehicle>
            </MemoryRouter>
        )

        await waitFor( () => {
        expect(vehicleServiceSpy).toBeCalled()
        expect(screen.getByTestId("cuatroXCuatro")).not.toBeNull()
        })
    } )

    test('If the component is opened in new mode it should not display vehicle',() => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idVehicle: 0} }]}>
                <NewVehicle type="new" returnFunc= {() => {}} update= {() => {}}></NewVehicle>
            </MemoryRouter>
        )

        expect(screen.getByTestId('marca').value).toBe("")
        expect(screen.getByTestId('tipo').value).toBe("")
        expect(screen.getByTestId('modelo').value).toBe("")
        expect(screen.getByTestId('anio').value).toBe("")
        expect(screen.getByTestId('costo').value).toBe("")
        
    } )

    test("If the component doesn't have a type it should display cilindradas nor hatchback and 4x4 checkboxes",() => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idVehicle: 0} }]}>
                <NewVehicle type="new" returnFunc= {() => {}} update= {() => {}}></NewVehicle>
            </MemoryRouter>
        )
        
        expect(screen.queryByTestId('cilindradas')).toBeNull()
        expect(screen.queryByTestId('cuatroXCuatro')).toBeNull()
        expect(screen.queryByTestId('hatchback')).toBeNull()

    } )

    test('If the component is saved with errors, the errors should be displayed',async () => {
        //Lo envuelvo en un BrowserRouter porque este componente puede hacer acciones de ruteo (por pedido de jest).
        render(
            <MemoryRouter initialEntries={[{ pathname: '/activities', state: {id:1, idVehicle: 0} }]}>
                <NewVehicle type="new" returnFunc= {() => {}} update= {() => {}}></NewVehicle>
            </MemoryRouter>
        )
        
        const acceptButton = screen.getByTestId('acceptButton')

        expect(screen.queryByTestId('errorMarca')).toBeNull()
        expect(screen.queryByTestId('errorTipo')).toBeNull()
        expect(screen.queryByTestId('errorModelo')).toBeNull()
        expect(screen.queryByTestId('errorAnio')).toBeNull()
        expect(screen.queryByTestId('errorCosto')).toBeNull()

        //intenta guardar el nuevo vehiculo
        fireEvent.click(acceptButton)

        expect(screen.getByTestId('marca')).not.toBeNull()
        expect(screen.getByTestId('errorTipo')).not.toBeNull()
        expect(screen.getByTestId('errorModelo')).not.toBeNull()
        expect(screen.getByTestId('errorAnio')).not.toBeNull()
        expect(screen.getByTestId('errorCosto')).not.toBeNull()
        
    } )

})