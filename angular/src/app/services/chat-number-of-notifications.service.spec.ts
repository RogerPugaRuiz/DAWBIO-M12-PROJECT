import { TestBed } from '@angular/core/testing';

import { ChatNumberOfNotificationsService } from './chat-number-of-notifications.service';

describe('ChatNumberOfNotificationsService', () => {
  let service: ChatNumberOfNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatNumberOfNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
