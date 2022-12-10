import { Neofilo, Combinado } from './../../../Dominio/Gustos/Gustos';
import { Relajado } from './../../../Dominio/Criterio/Criterio';
import { httpClientSpy } from 'src/app/Services/HttpClientSpy';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FriendsComponent } from './Friends.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Usuario } from 'src/Dominio/Usuario/Usuario';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsComponent ],
      imports: [HttpClientModule,],
      providers: [ {provide: HttpClient, useValue: httpClientSpy} ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    component.user = new Usuario("armando","barreras","armanbarr",new Date('December 20, 2020 10:30:00'),"Argentina",10,[],[],new Relajado,new Neofilo,[])
    component.friendList = []
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get the right amount of users', () => {
    expect(component.friendToAddList).toEqual([usuario2]);
  });

});

//Tiene que ser Combinado para comparar debido a que cuando el programa hace from JSON, para manejarlo mejor lo transforma a combinado.
const usuario2 = new Usuario("Jose","Perez","Jope",new Date('December 20, 2018 10:30:00'),"Argentina",10,[],[],new Relajado,new Combinado([new Neofilo]),[])