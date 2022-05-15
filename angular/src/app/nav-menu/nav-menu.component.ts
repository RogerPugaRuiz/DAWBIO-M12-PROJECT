import { style } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

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

  constructor(
    private router: Router,
    private settingsService: SettingsService) { }

  ngOnInit(): void {

    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      }
    );
  }

  setMenu(menu: number): void {
    this.isChatOpen = false;
    if (menu == 4) {
      let message = document.getElementsByClassName('message');

      for (let i = 0; i < message.length; i++) {
        const text = message[i].querySelector('.text');
        const bg = message[i].querySelector('.bg-message');

        if (text != null && bg != null) {
          if (text.clientHeight < 50) {
            bg.setAttribute("src", "assets/img/balon.svg");
          } else if (text.clientHeight > 50 && text.clientHeight < 100) {
            bg.setAttribute("src", "assets/img/balonX2.svg");
          } else if (text.clientHeight > 100 && text.clientHeight < 150) {
            bg.setAttribute("src", "assets/img/balonX3.svg");
          } else if (text.clientHeight > 150 && text.clientHeight < 300) {
            bg.setAttribute("src", "assets/img/balonX4.svg");
          }
        }
      }
    }

    if (this.menu == menu) {
      this.menu = 0;
    } else {
      this.menu = menu;
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

  toggleChat(e: Event): void {
    this.isChatOpen = !this.isChatOpen;
    e.stopPropagation();
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
}
