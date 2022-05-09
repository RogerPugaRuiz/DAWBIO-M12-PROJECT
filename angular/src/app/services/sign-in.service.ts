import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private http:HttpClient) { }

  signIn(password:string, id:string){
    return this.http
      .post('http://localhost:8081/api/users/login', {password:password, id:id})
      .forEach(data => {
        console.log(data);
      })
  }

  // jwt(){
  //   this.http.request.arguments.HttpHeaders.get('Authorization');
  // }
  // jwt(){
  //   return this.header.get('Authorization');
  // }
}