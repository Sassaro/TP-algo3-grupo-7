/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileService } from './Profile.service';

describe('Service: Profile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});
