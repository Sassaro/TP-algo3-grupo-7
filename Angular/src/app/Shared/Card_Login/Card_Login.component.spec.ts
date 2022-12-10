/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Card_LoginComponent } from './Card_Login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { httpClientSpy } from 'src/app/Services/HttpClientSpy';

describe('Card_LoginComponent', () => {
  let component: Card_LoginComponent;
  let fixture: ComponentFixture<Card_LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Card_LoginComponent ],
      imports: [HttpClientModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Card_LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if username and password is written, it should not display errors', () => {
    component.login.userName= "armanbarr"
    fixture.detectChanges()
    component.login.password = "1234567"
    fixture.detectChanges()
    const loginButton = fixture.debugElement.nativeElement.querySelector('[data-testid="loginButton"]')
    loginButton.click()
    fixture.detectChanges()
    expect(component.login.errors.length).toBe(0);
  });

  it('if the username is added but no the password it should display the password error', () => {
    component.login.userName = "armanbarr"
    fixture.detectChanges()
    const loginButton = fixture.debugElement.nativeElement.querySelector('[data-testid="loginButton"]')
    loginButton.click()
    expect(component.login.errors[0].message).toBe("Debe ingresar una contraseña");
  });

  it('if the username is added but no the password it should display the password error', () => {
    component.login.password = "1234567"
    fixture.detectChanges()
    const loginButton = fixture.debugElement.nativeElement.querySelector('[data-testid="loginButton"]')
    loginButton.click()
    expect(component.login.errors[0].message).toBe("Debe ingresar un usuario");
  });
});
