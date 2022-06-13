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


  //Variable to save username from form
  loginUsername: string = "";
  //Variable to save password from form
  loginPassword: string = "";
  //Variable to display username form errors
  errorUsername: string = ""; 
  //Variable to display password form errors
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
      //Set error variables to empty strings
      this.errorUsername = "";
      this.errorPassword = "";
      //Request to backend for login and wait for response
      this.service.login(this.loginUsername, this.loginPassword).subscribe({
        next: (response: any) => {
          //If user found set user cookie and navigate to map page
          if(response.length > 0){
            this.service.setCookie(response[0])
            this.router.navigate(["/home"]).then(() => {
              window.location.reload();
            });;
          } else {
            //Else show error message
            this.errorPassword = "Incorrect Login"
          }
        },
        error: (err: any) => {
          console.log("Request error - " + err.message);
        },
        complete: () => {}
      });
    }
  } 

}
