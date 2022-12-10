/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { DestinationService } from './Destination.service';

describe('Service: Destination', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([DestinationService], (service: DestinationService) => {
    expect(service).toBeTruthy();
  }));
});
