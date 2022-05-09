import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  darkmode?: boolean;
  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.darkmode = this.settingsService.darkmode;
  }
}
