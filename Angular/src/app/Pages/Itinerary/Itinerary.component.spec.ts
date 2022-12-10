/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ItineraryComponent } from './Itinerary.component';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
import { IItineraryService, ItineraryService,StubItineraryService } from 'src/app/Services/Itinerary.service';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes, routingComponents } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

let component: ItineraryComponent;
let fixture: ComponentFixture<ItineraryComponent>;
let routerSpy: jasmine.SpyObj<Router>

describe('ItineraryComponent', () => {

  routerSpy = jasmine.createSpyObj('Router', ['navigate'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryComponent,routingComponents ],
      imports: [FormsModule, RouterModule.forRoot(routes), HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
