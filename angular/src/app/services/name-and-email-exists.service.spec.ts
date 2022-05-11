import { TestBed } from '@angular/core/testing';

import { NameAndEmailExistsService } from './name-and-email-exists.service';

describe('NameAndEmailExistsService', () => {
  let service: NameAndEmailExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameAndEmailExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
