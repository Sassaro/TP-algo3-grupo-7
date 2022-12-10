import { routes, routingComponents } from './../../app-routing.module';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { Edit_itineraryComponent } from './Edit_itinerary.component';
import { IItineraryService, ItineraryService, StubItineraryService } from 'src/app/Services/Itinerary.service';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

type subscribeFunction = { (fn: (value: Data) => void): void}

const existingTaskId = 2

function subscribeValido(fn: (value: Data) => void) {
  fn({ id: existingTaskId })
}

let component: Edit_itineraryComponent;
let fixture: ComponentFixture<Edit_itineraryComponent>;
let routerSpy: jasmine.SpyObj<Router>
let mainService: IItineraryService

describe('Edit_itineraryComponent', () => {

  routerSpy = jasmine.createSpyObj('Router', ['navigate'])

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_itineraryComponent,routingComponents ],
      imports: [FormsModule, RouterModule.forRoot(routes), HttpClientModule],
      providers: stubProviders(mainService, subscribeValido)
    })
    .compileComponents();
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(Edit_itineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

function stubProviders(stubItineraryService: IItineraryService, subscribe: subscribeFunction) {
  return [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: ActivatedRoute,
      useValue: {
        params: {
          subscribe,
        }
      }
    },
    { provide: StubItineraryService, useValue: stubItineraryService },
    { provide: Router, useValue: routerSpy }
  ]
}