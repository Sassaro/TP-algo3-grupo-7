/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Container_ItineraryComponent } from './Container_Itinerary.component';
import { FormsModule } from '@angular/forms';
import { IItineraryService, ItineraryService,StubItineraryService } from 'src/app/Services/Itinerary.service';
import { Actividad, Dificultad } from 'src/Dominio/Actividades/Actividades';
import { DiaDeActividad } from 'src/Dominio/DiaDeActividad/DiaDeActividad';
import { RouterModule } from '@angular/router';
import { Relajado } from 'src/Dominio/Criterio/Criterio';
import { Neofilo } from 'src/Dominio/Gustos/Gustos';
import { Usuario } from 'src/Dominio/Usuario/Usuario';
import { Destino } from 'src/Dominio/Destino/Destino';
import { Puntuacion } from 'src/Dominio/Puntuaciones/Puntuacion';
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';

describe('Container_ItineraryComponent', () => {
  let component: Container_ItineraryComponent;
  let fixture: ComponentFixture<Container_ItineraryComponent>;
  let aux:DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Container_ItineraryComponent ],
      imports: [FormsModule, RouterModule.forRoot([])],
      providers: [ StubItineraryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Container_ItineraryComponent);
    component = fixture.componentInstance;
    component.itinerary = itinerario1
    component.activityDay = diaDeActividad
    aux = fixture.debugElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display button if it is not on editing page', () => {
    Object.defineProperty(component.router, 'url', { writable: true, value: '/itinerary/1'});
    fixture.detectChanges()
    const element = aux.nativeElement.querySelector('[data-testid="Icon"]')
    expect(element).toBeNull
  });

  it('should not display button if it is on editing page', () => {
    Object.defineProperty(component.router, 'url', { writable: true, value: '/editItinerary/1'});
    fixture.detectChanges()
    const element = aux.nativeElement.querySelector('[data-testid="Icon"]')
    expect(element.textContent).toBe("")
  });

  it('if itinerary day is empty, should display < SIN ACTIVIDAD >', () => {
    component.activityDay.actividades = []
    fixture.detectChanges()
    const element = aux.nativeElement.querySelector('[data-testid="emptyActivityDay"]')
    expect(element).toBeTruthy()
    component.activityDay.actividades = [actividadSenderismo,actividadSenderismo2]
  });

  it('if itinerary day is not empty, should display not < SIN ACTIVIDAD >', () => {
    const element = aux.nativeElement.querySelector('[data-testid="emptyActivityDay"]')
    expect(element).toBeFalsy()
  });

});

const actividadSenderismo = new Actividad(100,"Senderismo",Dificultad.BAJA,new Date('December 20, 2020 10:30:00'),new Date('December 20, 2020 12:00:00'))
const actividadSenderismo2 = new Actividad(100,"Senderismo",Dificultad.BAJA,new Date('December 20, 2020 8:00:00'),new Date('December 20, 2020 9:30:00'))
const diaDeActividad = new DiaDeActividad([actividadSenderismo,actividadSenderismo2])
const diaDeActividadVacio = new DiaDeActividad([])
const relajado = new Relajado()
const neofilo = new Neofilo()
const usuario = new Usuario("armando","barreras","armanbarr",new Date('December 20, 2020 10:30:00'),"Argentina",10,[],[],relajado,neofilo,[])
const destinoNoLocal = new Destino("Brazil","Petropolis", 1000)
const puntuacion = new Puntuacion(10,usuario)
const puntuacion2 = new Puntuacion(2,usuario)
const puntuacion3 = new Puntuacion(7,usuario)

const itinerario1 = new Itinerario(1,[diaDeActividad,diaDeActividadVacio],usuario,destinoNoLocal,[puntuacion,puntuacion2,puntuacion3])