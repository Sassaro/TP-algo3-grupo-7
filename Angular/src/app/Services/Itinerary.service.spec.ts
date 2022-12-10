/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { ItineraryService } from './Itinerary.service';

describe('Service: Main', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItineraryService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([ItineraryService], (service: ItineraryService) => {
    expect(service).toBeTruthy();
  }));
});
