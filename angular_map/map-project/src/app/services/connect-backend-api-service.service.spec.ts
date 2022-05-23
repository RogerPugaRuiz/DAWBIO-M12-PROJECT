import { TestBed } from '@angular/core/testing';

import { ConnectBackendApiServiceService } from './connect-backend-api-service.service';

describe('ConnectBackendApiServiceService', () => {
  let service: ConnectBackendApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectBackendApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
