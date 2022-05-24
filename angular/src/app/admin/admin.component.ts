import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  darkmode?: boolean;
  users: any[] = [];
  constructor(
    private setting: SettingsService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.darkmode = this.setting.darkmode;
    this.getAllUsers();
  }

  getAllUsers() {
    this.adminService.getAllUsers(
      (users:any) => {
        this.users = users;
      }
    );
  }

}
