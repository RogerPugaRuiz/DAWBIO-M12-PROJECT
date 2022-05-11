import { Component, Input, OnInit } from '@angular/core';
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

  onClickedOutside(e: Event){
    this.menu = 0;
  }
}
