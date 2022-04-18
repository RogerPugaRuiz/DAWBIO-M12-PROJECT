import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  public signUpForm: FormGroup = this.formBuilder.group({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  // sign up event value
  @Output() signUpEvent = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  // send event to parent
  public sendSignUpEvent(): void {
    // close sign up
    this.signUp = false;
    this.signUpEvent.emit(this.signUp);
  }

  // stop event propagation
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  ngOnInit(): void {
  }

  // sign up http request
  public signUpRequest(): void {
    
    this.username = this.signUpForm.value.userName;
    this.email = this.signUpForm.value.email;
    this.password = this.signUpForm.value.password;
    this.confirmPassword = this.signUpForm.value.confirmPassword;
    
    // url localhost:8081/api/add-user
    this.http.post<any>('http://localhost:8081/api/add-user',
      {})
      .subscribe((data: any) => {
        // is success login
      });
  }

}
