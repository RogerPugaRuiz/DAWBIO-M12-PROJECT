import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class ChatComponent implements OnInit{
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

  message:string = "";
  chats: any[] = [];

  invalidContactName: string = "";
  isValidContact: boolean = true;

  actualChatContact: string = "";

  obj: any;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private addContactService: AddContactService,
    private settingsService: SettingsService,
    private responseWs: ResponseWsService,
    private chatNumberOfNotification: ChatNumberOfNotificationsService,
    private chatService: ChatService) { }


  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      }
    );
  }

  openChat(e: Event, obj: any){
    console.log(obj);
    console.log(obj.contact);
    this.actualChatContact = obj.contact;
    let user:any = this.user.username;
    this.chatService.getChat(user, obj.contact, (chats:any) => {
      this.chats = chats;
      console.log(chats);
      console.log(this.chats);
    });
    this.toggleChat(e);
  }
  toggleChat(e: Event): void {

    this.isChatOpen = !this.isChatOpen;
    console.log(this.chats);
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
    let user:any = this.user.username;
    this.chatService.sendMessage(this.message, user, this.actualChatContact);
  }

  checkTypeOfMessage(type: string){
    let user:any = this.user.username;
    if (type == user){
      return "send";
    } else {
      return "received";
    }

  }
}
