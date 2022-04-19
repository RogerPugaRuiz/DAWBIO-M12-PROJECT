import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignInService } from '../services/sign-in.service';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // sign up boolean
  public signUp: boolean = false;

  public username: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public signUpError: boolean = false;
  public errorMessage: string = '';

  public signUpForm: FormGroup = this.formBuilder.group({
    username: new FormControl(this.username, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]*')
    ]),
    email: new FormControl(this.email, [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9]*'),
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    password: new FormControl(this.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$')
    ]),
    confirmPassword: new FormControl(this.confirmPassword, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
      //Roger_23
    ])
  }, {
    validator: this.confirmPasswordValidator('password', 'confirmPassword')
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private signUpService: SignUpService,
    private signInService: SignInService) { }

  // send event to parent
  public sendSignUpEvent(): void {
    // close sign up
    this.signUpService.setSignUp(false);
  }

  // stop event propagation
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.signUpService.getSignUp().subscribe(signUp => { this.signUp = signUp; });
  }

  public openSignIn(): void {
    this.signUpService.setSignUp(false);
    this.signInService.setSignIn(true);
  }

  // sign up http request
  public signUpRequest(): void {
    if (this.signUpForm.valid) {
      this.username = this.signUpForm.value.username;
      this.email = this.signUpForm.value.email;
      this.password = this.signUpForm.value.password;
      this.confirmPassword = this.signUpForm.value.confirmPassword;

      // url localhost:8081/api/add-user
      this.http.post<any>('http://localhost:8081/api/user/add',
        {
          "username": this.username,
          "email": this.email,
          "password": this.password,
          "confirmPassword": this.confirmPassword
        })
        .subscribe((data: any) => {
          // is succes sign up
          if (data.ok) {
            console.log("sign up success");
            this.signUpError = false;
          } else {
            this.signUpError = true;
            this.errorMessage = data.message;
          }
        });
    }
  }


  // get form control
  public controlle(name: string) {
    return this.signUpForm.get(name);
  }

  public confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }

    }
  }

}
