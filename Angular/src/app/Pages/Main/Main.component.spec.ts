import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IItineraryService, ItineraryService, StubItineraryService } from './../../Services/Itinerary.service';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainComponent } from './Main.component';
import { FormsModule } from '@angular/forms';
import { FilterItineraryPipe } from 'src/app/Pipes/filterItinerary.pipe';
import { httpClientSpy } from 'src/app/Services/HttpClientSpy';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, FilterItineraryPipe ],
      imports: [FormsModule,HttpClientModule ],
      providers: [ ItineraryService, FilterItineraryPipe, { provide: HttpClient, useValue: httpClientSpy, } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
  });

  it('should create',(() => {
    expect(component).toBeTruthy();
  }));
  
  it('should get the right amount of itineraries',(() => {
    expect(component.itineraryList.length).toBe(5)
  }));

});
