import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { AddContactService } from '../services/add-contact.service';
import { NameAndEmailExistsService } from '../services/name-and-email-exists.service';
import { SettingsService } from '../services/settings.service';
import { passwordMatchingValidatior } from '../validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  invalidForm: String = '';
  usernameAlreadyExists: string = '';
  emailAlreadyExists: string = '';
  stompClient?: any;

  accents = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";

  id = new FormControl('', [
    Validators.required,
    Validators.pattern('.{3,}')]);

  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z' + this.accents + '0-9]{8,}$')]);


  signUpUsername = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z' + this.accents + '0-9]{3,20}')]);

  signUpEmail = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);


  public signInForm: FormGroup = new FormGroup({
    id: this.id,
    password: this.password
  },
  );

  public signUpForm: FormGroup = new FormGroup({
    signUpUsername: this.signUpUsername,
    signUpEmail: this.signUpEmail,
    signUpPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z' + this.accents + '0-9]{8,}$')]),
    signUpConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z' + this.accents + '0-9]{8,}$')]),
  },
    { validators: passwordMatchingValidatior }
  );

  darkmode?: boolean;


  constructor(
    private router: Router,
    private http: HttpClient,
    private settingsService: SettingsService,
    private nameAndEmail: NameAndEmailExistsService,
    private addContactService: AddContactService) { }

  ngOnInit(): void {
    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(darkmode => {
      this.darkmode = darkmode;
    });

  }

  signIn() {
    if (this.signInForm.valid) {
    this.http.post('http://localhost:8081/api/users/login', { password: this.signInForm.value.password, id: this.signInForm.value.id }).subscribe(
      {
        next: (data:any) => {
            data = data;
            if (data.ok == true) {
              let jwt: string = data.data.jwt;

              sessionStorage.setItem('auth_token', jwt);
              let socket = new SockJS('http://localhost:8081/ws');
              this.stompClient = Stomp.over(socket);
          
              this.addContactService.connection();
              
              this.router.navigate(['/myAccount']);
            }
            if (data.ok == false) {
              this.invalidForm = 'Invalid username, email or password';
              this.signInForm.setErrors({ 'invalidForm': true });
            }
            
            
          },
          error: (data) => {
            this.invalidForm = 'Invalid username, email or password';
            this.signInForm.setErrors({ 'invalidForm': true });
          },
          complete: () => {
            console.log('complete');
          }
          
          
        }
        
        );
      }else{
        this.invalidForm = 'Invalid username, email or password';

      }

  }

  signUp() {
    if (this.signUpForm.valid) {
      this.http.post("http://localhost:8081/api/users/signup", {
        username: this.signUpForm.value.signUpUsername,
        email: this.signUpForm.value.signUpEmail,
        password: this.signUpForm.value.signUpPassword,
        confirmPassword: this.signUpForm.value.signUpConfirmPassword
      }).subscribe(
        {
          next: (data:any) => {
            data = data;
            if (data.ok == true) {
              this.id.setValue(this.signUpForm.value.signUpEmail);
              this.password.setValue(this.signUpForm.value.signUpPassword);

            }
            else {
              this.invalidForm = data.messages;
            }
          }
        });
    } else {
      // this.invalidForm = 'Invalid username, email or password';
    }
  }


  userNameExists() {
    this.nameAndEmail.userNameExists(this.signUpUsername);
    this.usernameAlreadyExists = 'username already exists';
  }

  emailExists() {
    this.nameAndEmail.emailExists(this.signUpEmail);
    this.emailAlreadyExists = 'email already exists';
  }
}
