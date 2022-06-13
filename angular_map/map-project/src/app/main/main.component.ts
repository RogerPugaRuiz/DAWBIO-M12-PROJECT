import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ConnectBackendApiService } from '../services/connect-backend-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //Variable to save logged user info
  userLogged: any = null;
  //Boolean to check if logged user have admin role
  isAdminUser: boolean = false;

  constructor(private Router: Router, private service: ConnectBackendApiService) { }

  ngOnInit(): void {
    //Check if user cookie exist
    if(this.service.getCookie('user')){
      //If exists get cookie user and save user in local variable
      this.userLogged = JSON.parse(this.service.getCookie('user'))
      //Check if cookie user have admin role
      if(this.userLogged.role == 'admin'){
        //If user have admin role set local variable to true
        this.isAdminUser = true;
      }
    }
  }

  //Logout function
  logout(){
    //Delete cookie user
    this.service.deleteCookie('user');
    //Redirect to home
    this.Router.navigateByUrl('/home').then(() => {
      window.location.reload();
    });;
  }

}
