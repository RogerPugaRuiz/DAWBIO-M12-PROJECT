import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NameAndEmailExistsService {

  constructor(private http: HttpClient) { }

  userNameExists(signUpUsername: FormControl) {
    this.http.get("http://localhost:8081/api/users/user", { params: { username: signUpUsername.value } }).subscribe(
      {
        next: (data:any) => {
          data = data;
          if (data.ok == true) {
            signUpUsername.setErrors({ 'usernameAlreadyExists': true });
          }
        }
      }
    );
  }

  emailExists(signUpEmail: FormControl) {
    this.http.get("http://localhost:8081/api/users/user", { params: { email: signUpEmail.value } }).subscribe(
      {
        next: (data:any) => {
          data = data;
          if (data.ok == true) {
            signUpEmail.setErrors({ 'emailAlreadyExists': true });
          }
        }
      });
  }
}
