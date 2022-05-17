import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class AddContactService {
  stompClient: any;
  subject: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) { }

  connection(){
    let socket = new SockJS('http://localhost:8081/ws');
    this.stompClient = Stomp.over(socket);

    this.http.get("http://localhost:8081/api/users/myaccount").subscribe(
      {
        next: (data: any) => {
          let idUser = data.data.myAccount.username;
          this.stompClient.connect({}, (frame: any) => {
            this.stompClient.subscribe('/topic/adduser/' + idUser,  (message: any) => {
              this.subject.next(message);
            });
          });
        }
      }
    );
  }

  getStompClient() : Stomp.Client{
    return this.stompClient;
  }

  getText() : Subject<string>{  
    return this.subject;
  }

}
