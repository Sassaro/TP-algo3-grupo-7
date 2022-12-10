import { IVehiclesService, StubVehiclesService, VehiclesService } from './../../Services/Vehicles.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Card_VehicleComponent } from './Card_Vehicle.component';
import { FormsModule } from '@angular/forms';
import { Camioneta } from 'src/Dominio/vehiculo/vehiculo';

describe('Card_VehiculoComponent', () => {
  let component: Card_VehicleComponent;
  let fixture: ComponentFixture<Card_VehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Card_VehicleComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Card_VehicleComponent);
    component = fixture.componentInstance;
    component.vehiculo = vehicle1
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if the vehicle has convenio it should display the text', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="textConvenio"]')
    fixture.detectChanges();
    expect(aux).toBeTruthy();
  });

  it('if the vehicle doesnt have convenio it should display the text', () => {
    component.vehiculo.tieneConvenio = false
    fixture.detectChanges();
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="textConvenio"]')
    expect(aux).toBeFalsy();
    component.vehiculo.tieneConvenio = true
  });

});


const vehicle1 = new Camioneta("Fiat", "fiorino", new Date(),18000,false,true,false)