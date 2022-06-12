import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectBackendApiService } from '../services/connect-backend-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: ConnectBackendApiService, private router: Router) { }

  loginUsername: string = "";
  loginPassword: string = "";
  errorUsername: string = ""; 
  errorPassword: string = "";

  ngOnInit(): void {
  }
  login(){
    //Check login inputs
    if(this.loginUsername == ""){
      this.errorUsername = "Type Username";
    }
    if(this.loginUsername.length > 80){
      this.errorUsername = "The maximum characters for the username are 80";
    }
    if(this.loginPassword == ""){
      this.errorPassword = "Type Password";
    }
    if(this.loginPassword.length > 80){
      this.errorUsername = "The maximum characters for the password are 80";
    }
    //If inputs are correct enter if 
    if(this.loginUsername != "" && this.loginPassword != "" && this.loginUsername.length < 80 && this.loginPassword.length < 80){
      this.errorUsername = "";
      this.errorPassword = "";
      //Request to backend and wait for response
      this.service.login(this.loginUsername, this.loginPassword).subscribe({
        next: (response: any) => {
          //If user found set Cookie and navigate to /map
          if(response.length > 0){
            this.service.setCookie(response[0])
            this.router.navigateByUrl("/map").then(() => {
              window.location.reload();
            });;
          } else {
            this.errorPassword = "Incorrect Login"
          }
        },
        error: (err: any) => {
          console.log("Error on Request");
        },
        complete: () => {}
      });
    }
  } 

}
