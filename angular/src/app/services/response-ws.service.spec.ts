import { TestBed } from '@angular/core/testing';

import { ResponseWsService } from './response-ws.service';

describe('ResponseWsService', () => {
  let service: ResponseWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
