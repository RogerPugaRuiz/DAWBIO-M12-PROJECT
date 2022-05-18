import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatNumberOfNotificationsService } from './chat-number-of-notifications.service';
import { ContactInfoService } from './contact-info.service';

@Injectable({
  providedIn: 'root'
})
export class AddContactService {
  stompClient: any;
  subject: Subject<string[]> = new Subject<string[]>();
  confirmAddContactList: any[] = [];
  constructor(
    private http: HttpClient,
    private chatNumberOfNotifications: ChatNumberOfNotificationsService,
    private contactInfo: ContactInfoService
  ) { }

  connection(){
    let socket = new SockJS('http://localhost:8081/ws');
    this.stompClient = Stomp.over(socket);

    this.http.get("http://localhost:8081/api/users/myaccount").subscribe(
      {
        next: (data: any) => {
          let idUser = data.data.myAccount.username;
          this.stompClient.connect({}, (frame: any) => {
            this.stompClient.subscribe('/topic/adduser/' + idUser,  (message: any) => {
              this.chatNumberOfNotifications.addChatNumberOfNotifications();
              let text = JSON.parse(message.body).text;
              let contactJwt = JSON.parse(message.body).contactJwt;
              let contact = {"text": text, "contactJwt": contactJwt};
              this.confirmAddContactList.push(contact);
              this.subject.next(this.confirmAddContactList);

            });
          });
        }
      }
    );
  }

  // responseAddContact(){
  //   let socket = new SockJS('http://localhost:8081/ws');
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect({}, (frame: any) => {
  //     this.stompClient.subscribe('/topic/adduser/response',  (message: any) => {
  //       this.contactInfo.httpConnect();
  //     });
  //   });
  // }

  getStompClient() : Stomp.Client{
    return this.stompClient;
  }

  getText() : Subject<any[]>{  
    return this.subject;
  }

  removeConfirmAddContact(contactJwt: string){
    let index = this.confirmAddContactList.findIndex(x => x.contactJwt === contactJwt);
    this.confirmAddContactList.splice(index, 1);
    this.subject.next(this.confirmAddContactList);
  }

}
