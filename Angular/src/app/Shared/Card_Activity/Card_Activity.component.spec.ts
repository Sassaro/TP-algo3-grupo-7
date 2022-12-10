/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Card_ActivityComponent } from './Card_Activity.component';
import { FormsModule } from '@angular/forms';
import { ItineraryService } from 'src/app/Services/Itinerary.service';
import { Actividad, Dificultad } from 'src/Dominio/Actividades/Actividades';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('Card_ActivityComponent', () => {
  let component: Card_ActivityComponent;
  let fixture: ComponentFixture<Card_ActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Card_ActivityComponent ],
      imports: [FormsModule,HttpClientModule,RouterModule.forRoot([])],
      providers: [ ItineraryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Card_ActivityComponent);
    component = fixture.componentInstance;
    component.Actividad = actividadSenderismo      //Revisar
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


const actividadSenderismo = new Actividad(100,"Senderismo",Dificultad.BAJA,new Date('December 20, 2020 10:30:00'),new Date('December 20, 2020 12:00:00'))