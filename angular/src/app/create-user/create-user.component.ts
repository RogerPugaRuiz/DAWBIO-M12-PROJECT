import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NameAndEmailExistsService } from '../services/name-and-email-exists.service';
import { SettingsService } from '../services/settings.service';
import { passwordMatchingValidatior } from '../validators/must-match.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  accents = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
  usernameAlreadyExists: string = '';
  emailAlreadyExists: string = '';
  invalidForm: String = '';
  signUpUsername = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z' + this.accents + '0-9]{3,20}')]);

  signUpEmail = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);


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
    private settings: SettingsService,
    private nameAndEmail: NameAndEmailExistsService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.darkmode = this.settings.darkmode;
  }

  userNameExists() {
    this.nameAndEmail.userNameExists(this.signUpUsername);
    this.usernameAlreadyExists = 'username already exists';
  }

  emailExists() {
    this.nameAndEmail.emailExists(this.signUpEmail);
    this.emailAlreadyExists = 'email already exists';
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
              // this.id.setValue(this.signUpForm.value.signUpEmail);
              // this.password.setValue(this.signUpForm.value.signUpPassword);

            }
            else {
              this.invalidForm = data.messages;
            }
          }
        });
    } else {
      this.invalidForm = '* Invalid form';
    }
  }

}
