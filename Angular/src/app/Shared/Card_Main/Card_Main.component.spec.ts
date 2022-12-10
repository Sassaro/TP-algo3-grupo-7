import { UserDataComponent } from './../User-Data/User-Data.component';
import { httpClientSpy } from 'src/app/Services/HttpClientSpy';
import { Usuario } from './../../../Dominio/Usuario/Usuario';
import { HttpClient, HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Card_MainComponent } from './Card_Main.component';
import { FormsModule } from '@angular/forms';
import { IItineraryService, ItineraryService, StubItineraryService } from 'src/app/Services/Itinerary.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Relajado } from 'src/Dominio/Criterio/Criterio';
import { Neofilo } from 'src/Dominio/Gustos/Gustos';

describe('Card_MainComponent', () => {
  let component: Card_MainComponent;
  let fixture: ComponentFixture<Card_MainComponent>;
  let itineraryService:StubItineraryService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Card_MainComponent ],
      imports: [FormsModule, HttpClientModule ,RouterModule.forRoot([])],
      providers: [ StubItineraryService, { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => "1",},},},} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    itineraryService = new StubItineraryService()
    fixture = TestBed.createComponent(Card_MainComponent);
    component = fixture.componentInstance;
    component.user = new Usuario("","","",new Date(),"",0,[],[],new Relajado(),new Neofilo(),[])
    component.itinerario = itineraryService.getItineraryById(1)!!
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("The component should show the correct values",() => {

    it('Should show the correct title', () => {
      console.log(component.itinerario)
      const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="titleText"]')
      expect(aux.textContent).toBe(" Brazil Petropolis ")
    })

    it('Should show the correct average activity time', () => {
      const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="tripDuration"]')
      expect(aux.textContent).toBe("Viaje de 2 Dias")
    });

    it('Should show the correct average activity amount', () => {
      const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="tripTotalActivities"]')
      expect(aux.textContent).toBe(" Actividades totales: 2 ")
    });

    it('Should show the correct price', () => {
      const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="tripCost"]')
      expect(aux.textContent).toBe("Desde 1400$")
    });

    it('Should show the correct dificulty', () => {
      const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="tripDificulty"]')
      expect(aux.textContent).toBe("Dificultad BAJA")
    });

    it('Should show the edit button if you can edit the itinerary', () => {
      const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="editIcon"]')
      expect(aux).toBeTruthy()
    });

    it('Should not show the edit button if you cant edit the itinerary', () => {
      //cambia el id a uno distinto para que no pueda editarlo
      component.user.id = 2
      fixture.detectChanges()
      const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="editIcon"]')
      expect(aux).toBeFalsy()
    });
  })
});

