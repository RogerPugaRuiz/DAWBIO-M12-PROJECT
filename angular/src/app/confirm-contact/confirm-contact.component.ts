import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AddContactService } from '../services/add-contact.service';
import { ChatNumberOfNotificationsService } from '../services/chat-number-of-notifications.service';
import { ContactInfoService } from '../services/contact-info.service';
import { ResponseWsService } from '../services/response-ws.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirm-contact',
  templateUrl: './confirm-contact.component.html',
  styleUrls: ['./confirm-contact.component.css']
})
export class ConfirmContactComponent implements OnInit {
  @Input() text?: string;
  @Input() item?: any;

  constructor(
    private addContact: AddContactService,
    private chatNumberOfNotification: ChatNumberOfNotificationsService,
    private contactInfo: ContactInfoService,
    private http: HttpClient,
    private responseWs: ResponseWsService,
    private user: UserService) { }

  ngOnInit(): void {
  }

  confirmAddContact(e: Event): void {
    this.addContact.removeConfirmAddContact(this.item.contactJwt);
    this.chatNumberOfNotification.removeChatNumberOfNotifications();
    let user = this.user.getUser();

    this.http.post("http://localhost:8081/api/users/confirm-contact", {"contactJwt":this.item.contactJwt, "confirm":true}).subscribe(
      {
        next: (data:any) => {
          console.log(data);
          this.contactInfo.httpConnect();
          this.responseWs.sendMessage({"text": user.username + " has accepted your contact request", "contactJwt": this.item.contactJwt},data.data.user);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );

    e.stopPropagation();
  }
  denyAddContact(e: Event): void {
    this.addContact.removeConfirmAddContact(this.item.contactJwt);
    this.chatNumberOfNotification.removeChatNumberOfNotifications();
    e.stopPropagation();
  }
}
