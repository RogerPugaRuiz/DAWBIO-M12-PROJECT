import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { AddContactService } from '../services/add-contact.service';
import { ChatNumberOfNotificationsService } from '../services/chat-number-of-notifications.service';
import { ChatService } from '../services/chat.service';
import { ResponseWsService } from '../services/response-ws.service';
import { SettingsService } from '../services/settings.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
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
  @Output() close: any = new EventEmitter<boolean>();

  message: string = "";
  chats: any[] = [];

  invalidContactName: string = "";
  isValidContact: boolean = true;

  actualChatContact: string = "";

  scrollSize: number = 0;

  obj: any;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private addContactService: AddContactService,
    private settingsService: SettingsService,
    private responseWs: ResponseWsService,
    private chatNumberOfNotification: ChatNumberOfNotificationsService,
    private chatService: ChatService) { }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }


  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      }
    );

    this.chatService.connection((obj: any) => {
      this.updateChat(obj.sendTo, obj.sendBy);
    });
    this.ngAfterViewInit();
  }

  openChat(e: Event, obj: any) {
    this.actualChatContact = obj.contact;
    let user: any = this.user.username;
    this.updateChat(user, obj.contact);
    this.toggleChat(e);
    console.log("click")
  }
  toggleChat(e: Event): void {

    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.isAddNewContact = false;

    }
    e.stopPropagation();
  }

  addNewContact(e: Event): void {
    // user.username = "roger"
    // let user = {"username":"roger"}
    let contactJwt = this.http.get("http://localhost:8081/api/users/send-contact-request?user=" +
      this.user.username + "&contact=" +
      this.sendUser).subscribe(
        {
          next: (data: any) => {
            this.addContactService.getStompClient().send("/topic/adduser/" + this.sendUser, {}, JSON.stringify({
              "text": this.user.username + " wants to add you to his contact list",
              "contactJwt": data.contactJwt

            }));
          },
          error: (err: any) => {
            console.log(err);
            this.invalidContactName = this.sendUser + " is not a valid username";
            this.isValidContact = false;
          }
        }
      );
    // this.addContactService.getStompClient().unsubscribe("/topic/adduser/" + this.user.username);
    // this.addContactService.responseAddContact();

  }



  deleteItem(e: Event, contact: any) {
    // console.log(this.responseList);
    this.ngOnInit();
    this.sendResponseList.emit(contact);
    e.stopPropagation();
    this.chatNumberOfNotification.removeChatNumberOfNotifications();
  }

  sendMessage(e: Event) {
    let user: any = this.user.username;
    this.chatService.sendMessage(this.message, user, this.actualChatContact,()=>{
      this.updateChat(user, this.actualChatContact);
      this.scrollToBottom();
      this.message = "";
    });
  }

  checkTypeOfMessage(type: string) {
    let user: any = this.user.username;
    if (type == user) {
      return "send";
    } else {
      return "received";
    }

  }


  updateChat(sendBy: string, sendTo: string) {
    this.chatService.getChat(sendBy, sendTo, (chats: any) => {
      this.chats = chats;
      // this.ngAfterViewInit();
      this.scrollToBottom();
      this.scrollSize = document.getElementsByClassName("message-container")[0].scrollHeight;
      console.log(this.scrollSize);
    });
  }

  scrollToBottom(): void {
    try {
      let chat = document.getElementsByClassName("message-container")[0];
      if (chat != null) {
        chat.scrollTop = chat.scrollHeight;
      }
    } catch (e) {
      console.log(e);
    }
  }

  closeChat() {
    this.close.emit(true);
  }

}
