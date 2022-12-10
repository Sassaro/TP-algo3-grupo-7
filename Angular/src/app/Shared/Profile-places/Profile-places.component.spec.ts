/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfilePlacesComponent } from './Profile-places.component';

describe('ProfilePlacesComponent', () => {
  let component: ProfilePlacesComponent;
  let fixture: ComponentFixture<ProfilePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if the destination is wanted destinations, it should show a button', () => {
    component.wanted = true
    fixture.detectChanges()
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="addDestinationButton"]')
    expect(aux).toBeTruthy();
    component.wanted = false
  });

  it('if the destination is visited destinations, it should not show a button', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="addDestinationButton"]')
    expect(aux).toBeFalsy();
  });

  it('if the user presses the add destination button it should display the menu', () => {
    component.wanted = true
    fixture.detectChanges()
    const aux1 = fixture.debugElement.nativeElement.querySelector('[data-testid="addDestinationButton"]')
    aux1.click();
    fixture.detectChanges()
    const aux2 = fixture.debugElement.nativeElement.querySelector('[data-testid="destinationMenu"]')
    expect(aux2).toBeTruthy();
    component.wanted = false
  });

  it('the destination menu should be on by default', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="destinationMenu"]')
    expect(aux).toBeFalsy();
  });
});
