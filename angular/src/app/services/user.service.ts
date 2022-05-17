import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): User {
    let user = new User();
    this.http.get("http://localhost:8081/api/users/myaccount").subscribe(
      {
        next: (data: any) =>{
          user.username = data.data.myAccount.username;
          user.email = data.data.myAccount.email;
          user.firstname = data.data.myAccount.firstname;
          user.lastname = data.data.myAccount.lastname;
          user.description = data.data.myAccount.description;
        }
      });
    return user;
  }
}
