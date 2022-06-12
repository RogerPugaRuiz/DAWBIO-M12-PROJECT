import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  userLogged: any = null;
  constructor(private CookieService: CookieService, private Router: Router) { }

  ngOnInit(): void {
    if(this.CookieService.get('user')){
      //Get cookie User
      this.userLogged = JSON.parse(this.CookieService.get('user'))
    }
  }

  logout(){
    this.CookieService.delete('user');
    this.Router.navigateByUrl('/home').then(() => {
      window.location.reload();
    });;
  }

}
