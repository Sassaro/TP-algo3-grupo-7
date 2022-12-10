/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { My_itinerariesComponent } from './My_itineraries.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { httpClientSpy } from 'src/app/Services/HttpClientSpy';
import { ItineraryService } from 'src/app/Services/Itinerary.service';

describe('My_itinerariesComponent', () => {
  let component: My_itinerariesComponent;
  let fixture: ComponentFixture<My_itinerariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ My_itinerariesComponent ],
      imports: [HttpClientModule,RouterModule.forRoot([])],
      providers: [ItineraryService,{ provide: HttpClient, useValue: httpClientSpy, },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => "1",},},},},]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(My_itinerariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the right amount of itineraries', () => {
    expect(component.itineraryList.length).toBe(3);
  });

});
