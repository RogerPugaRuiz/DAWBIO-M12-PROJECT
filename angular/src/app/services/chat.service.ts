import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chat: any[] = [];

  constructor(private http: HttpClient) { }

  getChat(user: string, contact: string, callback: any): void {

    this.http.get("http://localhost:8081/api/users/get-messages?user=" + user + "&contact=" + contact).subscribe((obj: any) => {
      this.chat = obj.data.messages;
      callback(this.chat);
    });
  }

  sendMessage(message: any, sendBy: string, sendTo: string) {
    this.http.post("http://localhost:8081/api/users/send-message", { "message": message, "sendBy": sendBy, "sendTo": sendTo }).subscribe({
      next: (obj: any) => {
        console.log(obj);
      }
    });
    return this.chat;
  }

}
