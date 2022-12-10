/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Validation_FieldComponent } from './Validation_Field.component';
import { Login } from 'src/Dominio/Usuario/Login';

describe('Validation_FieldComponent', () => {
  let component: Validation_FieldComponent;
  let fixture: ComponentFixture<Validation_FieldComponent>;
  let login = new Login()

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Validation_FieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Validation_FieldComponent);
    component = fixture.componentInstance;
    component.object = login
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });
});
