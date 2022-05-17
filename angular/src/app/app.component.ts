import { Component } from '@angular/core';
import { AddContactService } from './services/add-contact.service';
import { ContactInfoService } from './services/contact-info.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  darkmode:boolean;
  constructor(
      private settingsService: SettingsService,
      private addContactService: AddContactService,
      private contactInfo: ContactInfoService) { 
    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      }
    );

    this.contactInfo.httpConnect();

    this.addContactService.connection();
  }
}
