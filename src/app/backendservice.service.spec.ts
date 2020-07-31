import { TestBed, inject } from '@angular/core/testing';

import { BackendserviceService } from './backendservice.service';

describe('BackendserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendserviceService]
    });
  });

  it('should be created', inject([BackendserviceService], (service: BackendserviceService) => {
    expect(service).toBeTruthy();
  }));
});
