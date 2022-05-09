import { TestBed } from '@angular/core/testing';

import { JWTverifyService } from './jwtverify.service';

describe('JWTverifyService', () => {
  let service: JWTverifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTverifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
