import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../model/user.model';
import { AddContactService } from '../services/add-contact.service';
import { ResponseWsService } from '../services/response-ws.service';
import { SettingsService } from '../services/settings.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isAddNewContact: boolean = false;
  sendUser: string = "";
  user: User = new User();
  @Input() confirmAddContactList: any[] = [];
  @Input() contactList: any[] = [];
  stompClient: any;
  isChatOpen?: boolean = false;
  darkmode?: boolean;
  @Input() responseList: any[] = [];

  @Input() isCompOpen?: boolean;

  @Output() sendResponseList: any = new EventEmitter<any>();

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private addContactService: AddContactService,
    private settingsService: SettingsService,
    private responseWs: ResponseWsService) { }

  ngOnInit(): void {


    this.user = this.userService.getUser();

    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      }
    );

    this.setChatStyle();
  }

  toggleChat(e: Event): void {

    this.isChatOpen = !this.isChatOpen;
    this.setChatStyle();
    if (this.isChatOpen) {
      this.isAddNewContact = false;

    }
    e.stopPropagation();
  }

  addNewContact(e: Event): void {
    // user.username = "roger"
    // let user = {"username":"roger"}
    console.log(this.user.username);
    console.log(this.sendUser);
    let contactJwt = this.http.get("http://localhost:8081/api/users/send-contact-request?user=" +
      this.user.username + "&contact=" +
      this.sendUser).subscribe(
        {
          next: (data: any) => {
            this.addContactService.getStompClient().send("/topic/adduser/" + this.sendUser, {}, JSON.stringify({
              "text": this.user.username + " wants to add you to his contact list",
              "contactJwt": data.contactJwt
            }));
          }
        }
      );
      // this.addContactService.getStompClient().unsubscribe("/topic/adduser/" + this.user.username);
      // this.addContactService.responseAddContact();

  }

  setChatStyle() {
    let messages = document.getElementsByClassName('message');

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const text = messages[i].querySelector('.text');
      const bg = messages[i].querySelector('.bg-message');

      if (text != null && bg != null) {
        if (text.clientHeight < 30) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballon.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballon.svg");
          }
        } else if (text.clientHeight > 30 && text.clientHeight < 100) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX2.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX2.svg");
          }
        } else if (text.clientHeight > 100 && text.clientHeight < 120) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX3.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX3.svg");
          }
        } else if (text.clientHeight > 120 && text.clientHeight < 200) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX4.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX4.svg");
          }
        } else {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX5.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX5.svg");
          }
        }
      }
    }
  }

  deleteItem(e: Event, contact: any) {
    // console.log(this.responseList);
    this.ngOnInit();
    this.sendResponseList.emit(contact);
    e.stopPropagation();
  }
}
