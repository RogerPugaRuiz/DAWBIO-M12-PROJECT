import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  darkmode:any;
  buttonDarkModeText = 'Dark Mode';
  constructor(private settingsService: SettingsService) { 
    
  }

  ngOnInit(): void {
    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
        if (this.darkmode) {
          this.buttonDarkModeText = 'Light Mode';
        } else {
          this.buttonDarkModeText = 'Dark Mode';
        }
      });
  }

  toggleDarkMode() {
    this.settingsService.darkmode = !this.settingsService.darkmode;
    this.settingsService.setDarkMode(this.settingsService.darkmode);

  }
}
