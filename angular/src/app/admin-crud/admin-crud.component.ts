import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css']
})
export class AdminCrudComponent implements OnInit {

  darkmode?: boolean;
  isDelete: boolean = false;
  isInfo: boolean = false;
  infoText: string = "";
  @Input() users: any[] = [];
  selectedUser: any;
  @Output() updateUsers = new EventEmitter();

  constructor(
    private setting: SettingsService,
    private router: Router,
    private admin: AdminService) { }

  ngOnInit(): void {
    this.darkmode = this.setting.darkmode;
  }

  activeHover(e: Event){
    let content = (e.target as HTMLInputElement).querySelector(".content");
    let hoverContent = (e.target as HTMLInputElement).querySelector(".hover-content");
    if(hoverContent){
      hoverContent.classList.add("active");
    }
  }

  deactiveHover(e: Event){
    let hoverContent = (e.target as HTMLInputElement).querySelector(".hover-content");
    if(hoverContent){
      hoverContent.classList.remove("active");
    }
  }

  selectUser(e: Event){
    let user = (e.currentTarget as HTMLInputElement);
    let checkUser: any = user.querySelector(".check-user");
    checkUser.checked = !checkUser.checked;
  }

  deleteUser(e: Event , user: any){
    this.isDelete = true;
    this.selectedUser = user;
  }

  deleteUserConfirm(user: any){
    this.isDelete = false;
    this.infoText = "user " + user.username + " was not deleted";
    this.admin.deleteUser(user, (obj: any) => {
      console.log("delete user", obj);
      this.infoText = "User " + user.username + " deleted";
      this.isInfo = true;
    });
  }
  


  closeDelete(e: boolean){
    this.isDelete = e;
  }

  closeInfo(){
    this.isInfo = false;
    this.ngOnInit();
    this.updateUsers.emit();
  }

  removeSelectedUser(){
    let users:any = document.getElementsByClassName("check-user");
    let selectedUsers: any[] = [];
    for(let i = 0; i < users.length; i++){
      let user = users[i];
      if(user.checked){
        selectedUsers.push(user.id);
      }
    }
    this.admin.deleteUsers(selectedUsers, (obj: any) => {
      console.log("delete users", obj);
      this.infoText = "Users deleted";
      this.isInfo = true;
    }); 
    console.log("selected users", selectedUsers);
  }

  createUser(){
    this.router.navigate(["/admin/create-user"]);
  }
}
