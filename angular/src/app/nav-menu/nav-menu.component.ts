import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { User } from '../model/user.model';
import { AddContactService } from '../services/add-contact.service';
import { ChatNumberOfNotificationsService } from '../services/chat-number-of-notifications.service';
import { ContactInfoService } from '../services/contact-info.service';
import { SettingsService } from '../services/settings.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menu: number = 1;
  darkmode?: boolean;
  isChatOpen: boolean = false;
  textHeight: number = 0;
  confirmAddContactList: any[] = [];
  num: number = 0;
  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private addContactService: AddContactService,
    private chatNumberOfNotifications: ChatNumberOfNotificationsService,
    private contactInfo: ContactInfoService
  ) { }

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
    return localStorage.getItem('auth_token') != null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['register']);
  }

  onClickedOutside(e: Event) {
    this.menu = 0;
    this.isChatOpen = false;
  }

  getContactList(): any {
    return this.contactInfo.getContactList();
  }

}
