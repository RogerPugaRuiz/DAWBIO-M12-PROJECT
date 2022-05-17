import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatNumberOfNotificationsService {
  private chatNumberOfNotifications: number = 0;
  private subject: Subject<number> = new Subject<number>();
  
  constructor() { }

  addChatNumberOfNotifications(): void {
    this.chatNumberOfNotifications++;
    this.subject.next(this.chatNumberOfNotifications);
  }

  removeChatNumberOfNotifications(): void {
    this.chatNumberOfNotifications--;
    this.subject.next(this.chatNumberOfNotifications);
  }

  getNumberOfNotifications(): Subject<number> {
    return this.subject;
  }
}
