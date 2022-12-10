/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserPreferenceComponent } from './User-Preference.component';

describe('UserPreferenceComponent', () => {
  let component: UserPreferenceComponent;
  let fixture: ComponentFixture<UserPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if it is pressed it should change color', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="preferenceButton"]')
    expect(component.isOn).toBe(false)
    aux.click()
    fixture.detectChanges()
    expect(component.isOn).toBe(true)
    expect(component.status()).toBe("botonPreferenciaOn")
  });
});
