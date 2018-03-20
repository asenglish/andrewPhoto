import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpServiceService]
    });
  });

  it('should be created', inject([HttpServiceService], (service: HttpServiceService) => {
    expect(service).toBeTruthy();
  }));
});
