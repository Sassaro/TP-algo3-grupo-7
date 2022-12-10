/** * @jest-environment jsdom */
/* eslint-disable no-unused-vars */
import React from 'react';
import { screen } from '@testing-library/react'
import { Actividad, Dificultad } from '../Domain/Actividades'
import { BrowserRouter } from 'react-router-dom';
import { render } from '../test-utils'
import { CardActividad } from "../Molecules/M3CardActividad"

describe (" Tests related to the Activity Card ",() => {

    const activity = new Actividad(2000,"Nadar",Dificultad.ALTA,new Date("October 13, 2014 11:13:00"), new Date("October 13, 2014 12:13:00"))

    test( "Should display correct values",() => {

        render(
            <BrowserRouter>
                <CardActividad activity={activity} update={()=>{}}></CardActividad>
            </BrowserRouter>
        )

        expect( screen.getByTestId('descripcion').textContent ).toBe("Nadar")
        expect( screen.getByTestId('inicio-fin').textContent ).toBe("11:13hs. - 12:13hs.")
        expect( screen.getByTestId('duracion').textContent ).toBe("60 minutos")
        expect( screen.getByTestId('costo').textContent ).toBe("$2000")

    } )

} ) 