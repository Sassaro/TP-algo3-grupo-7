/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavigationComponent } from './Navigation.component';
import { FormsModule } from '@angular/forms';
import { IItineraryService, ItineraryService, StubItineraryService } from 'src/app/Services/Itinerary.service';
import { HttpClientModule } from '@angular/common/http';

describe('NavegationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let itineraryService:StubItineraryService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports: [FormsModule, HttpClientModule],
      providers: [ StubItineraryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    itineraryService = new StubItineraryService()
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    component.itinerary = itineraryService.getItineraryById(1)!
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
