import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css']
})
export class AdminCrudComponent implements OnInit {

  darkmode?: boolean;
  isDelete: boolean = false;
  @Input() users: any[] = [];
  selectedUser: any;

  constructor(
    private setting: SettingsService,
    private router: Router) { }

  ngOnInit(): void {
    this.darkmode = this.setting.darkmode;
  }

  // activeHover(e: Event){
  //   let content = (e.target as HTMLInputElement).querySelector(".content");
  //   if(content){
  //     content.classList.add("active");
  //   }
  // }

  // deactiveHover(e: Event){
  //   let content = (e.target as HTMLInputElement).querySelector(".content");
  //   if(content){
  //     content.classList.remove("active");
  //   }
  // }

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
    let user = (e.target as HTMLInputElement);
    let check:any = user.querySelector(".col");
    console.log("check", user);
    if(check){
      if (check.checked){
        user.classList.add("selected");
      }
    }
  }

  deleteUser(e: Event , user: any){
    this.isDelete = true;
    this.selectedUser = user;
  }

  closeDelete(e: boolean){
    this.isDelete = e;
  }
}
