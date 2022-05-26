import { TestBed } from '@angular/core/testing';

import { ConnectBackendApiService } from './connect-backend-api.service';

describe('ConnectBackendApiService', () => {
  let service: ConnectBackendApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectBackendApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
