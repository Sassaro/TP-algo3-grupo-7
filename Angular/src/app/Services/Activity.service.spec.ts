/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActivityService } from './Activity.service';

describe('Service: Activity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([ActivityService], (service: ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
