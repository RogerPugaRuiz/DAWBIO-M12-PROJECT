import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatNumberOfNotificationsService } from './chat-number-of-notifications.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseWsService {
  subject: Subject<any> = new Subject<any>();
  stompClient: any;
  constructor(
    private user: UserService,
    private chatNumberOfNotifications: ChatNumberOfNotificationsService) { }

  connection(){
    let socket = new SockJS('http://localhost:8081/ws');
    let user = this.user.getUser();
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/response/' + user.username,  (message: any) => {
        let obj = JSON.parse(message.body);
        this.subject.next(obj);
        this.chatNumberOfNotifications.addChatNumberOfNotifications();
      });
    });
  }

  get() : Subject<any>{  
    return this.subject;
  }

  getStompClient() : Stomp.Client{
    return this.stompClient;
  }

  sendMessage(message: any, username: string){
    this.stompClient.send("/topic/response/" + username, {}, JSON.stringify(message));
  }
}
