import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { User } from '../model/user.model';
import { AddContactService } from '../services/add-contact.service';
import { ChatNumberOfNotificationsService } from '../services/chat-number-of-notifications.service';
import { ContactInfoService } from '../services/contact-info.service';
import { ResponseWsService } from '../services/response-ws.service';
import { SettingsService } from '../services/settings.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit{
  menu: number = 1;
  darkmode?: boolean;
  isChatOpen: boolean = false;
  textHeight: number = 0;
  confirmAddContactList: any[] = [];
  responseList: any[] = [];
  contactList: any[] = [];
  num: number = 0;
  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private addContactService: AddContactService,
    private chatNumberOfNotifications: ChatNumberOfNotificationsService,
    private contactInfo: ContactInfoService,
    private responseWs: ResponseWsService
  ) { }
  ngAfterViewInit(): void {
    this.contactInfo.httpConnect();
  }

  ngOnInit(): void {
    // this.websocket.listen();

    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      }
    );


    this.addContactService.getText().subscribe((text: any) => {
      this.confirmAddContactList = text;
    });

    this.chatNumberOfNotifications.getNumberOfNotifications().subscribe(
      num => {
        this.num = num;
      }
    );

    this.responseWs.get().subscribe(
      response => {
        this.responseList.push(response);
      }
    );
    this.contactInfo.httpConnect();

    this.contactList = this.getContactList();

    // this.responseList = [{"text": "roger"}, {"text": "roger2"}];
  }

  setMenu(menu: number): void {
    this.isChatOpen = false;

    if (this.menu == menu) {
      this.menu = 0;
    } else {
      this.menu = menu;
    }

    if (this.menu == 4){
      this.contactInfo.httpConnect();
    }
  }

  isRegistered(): boolean {
    return sessionStorage.getItem('auth_token') != null;
  }

  logout(): void {
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['register']);
  }

  onClickedOutside(e: Event) {
    this.menu = 0;
    this.isChatOpen = false;
  }

  getContactList(): any {
    return this.contactInfo.getContactList();
  }

  sendResponseList(e: any): void {
    console.log(e);
    //filter out the response that is not from the user
    this.responseList = this.responseList.filter(response => response.text != e.text);
    this.ngAfterViewInit();
  }
}
