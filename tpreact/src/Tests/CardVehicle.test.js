/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import { screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { render } from '../test-utils'
import { Auto, Camioneta, Moto } from "../Domain/vehiculo"
import { CardVehiculo } from "../Molecules/M4CardVehicles"

describe ( "Tests related to the Vehicle card",() => {

    const moto = new Moto("Honda","H-250",new Date(),2000,900,true,false,false)
    const auto = new Auto("Audi","Marca de audi",new Date(),2500,true,true,false)
    const camioneta = new Camioneta("Renault","Duster",new Date(),3000,true,true,true)

    test("Should display the correct values",() => {

        render(
            <BrowserRouter>
                <CardVehiculo vehicle={moto} update={ () => {}}></CardVehiculo>
            </BrowserRouter>
        )
        
        expect(screen.getByTestId('vehicleType').textContent).toBe("Moto")
        expect(screen.getByTestId('marca').textContent).toBe("Marca: Honda")
        expect(screen.getByTestId('modelo').textContent).toBe("Modelo: H-250")
        expect(screen.getByTestId('costoDiario').textContent).toBe("Costo por dia: $2000")
        expect(screen.getByTestId('costoBase').textContent).toBe("Costo base (una semana): $14000")
        expect(screen.getByTestId('costoTotal').textContent).toBe("$22500")

    } )

    test("If the vehicle type is motorcycle, should display the motorcycle icon",() => {

        render(
            <BrowserRouter>
                <CardVehiculo vehicle={moto} update={ () => {}}></CardVehiculo>
            </BrowserRouter>)
        
        expect( screen.getByTestId("iconMotorcycle") ).not.toBeNull()
    } )

    test("If the vehicle type is car, should display the car icon",() => {

        render(<BrowserRouter>
            <CardVehiculo vehicle={auto} update={ () => {}}></CardVehiculo>
        </BrowserRouter>)
        
        expect( screen.getByTestId("iconCar") ).not.toBeNull()
    } )

    test("If the vehicle type is truck, should display the truck icon",() => {

        render(<BrowserRouter>
            <CardVehiculo vehicle={camioneta} update={ () => {}}></CardVehiculo>
        </BrowserRouter>)
        
        expect( screen.getByTestId("iconTruck") ).not.toBeNull()
    } )

    test("If the vehicle has convenio should display the icon",() => {

        render(<BrowserRouter>
            <CardVehiculo vehicle={camioneta} update={ () => {}}></CardVehiculo>
        </BrowserRouter>)
        
        expect( screen.getByTestId("tieneConvenio") ).not.toBeNull()
    } )
} )