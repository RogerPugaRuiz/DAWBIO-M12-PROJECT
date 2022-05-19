import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chat: any[] = [];
  stompClient: any;

  constructor(private http: HttpClient,
    private userService: UserService) { }

  getChat(user: string, contact: string, callback: any): void {

    this.http.get("http://localhost:8081/api/users/get-messages?user=" + user + "&contact=" + contact).subscribe({
      next: (obj: any) => {
        this.chat = obj.data.messages;
        callback(this.chat);
      },
      error: (err: any) => {
        this.chat = [];
        callback(this.chat);
      }
    });
  }

  sendMessage(message: any, sendBy: string, sendTo: string,callback:any): void {
    this.http.post("http://localhost:8081/api/users/send-message", { "message": message, "sendBy": sendBy, "sendTo": sendTo }).subscribe({
      next: (obj: any) => {
        this.sendMessageToChat(message, sendBy, sendTo);
        callback(obj);
      }
    });
  }

  connection(callback:any): void {
    let socket = new SockJS('http://localhost:8081/ws');
    this.stompClient = Stomp.over(socket);
    let user: any = this.userService.getUser();

    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/messages/' + user.username, (message: any) => {
        let auxVar = JSON.parse(message.body);
        callback(auxVar);
      });
    });
  }

  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  sendMessageToChat(message: any, sendBy: string, sendTo: string) {
    this.stompClient.send("/topic/messages/" + sendTo, {}, JSON.stringify({ 'message': message, 'sendBy': sendBy, 'sendTo': sendTo }));
  }
}
