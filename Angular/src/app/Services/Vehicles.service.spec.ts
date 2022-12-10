/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { VehiclesService } from './Vehicles.service';

describe('Service: Vehicles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclesService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([VehiclesService], (service: VehiclesService) => {
    expect(service).toBeTruthy();
  }));
});
