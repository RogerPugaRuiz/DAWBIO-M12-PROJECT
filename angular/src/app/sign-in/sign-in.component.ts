import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public signIn: boolean = false;
  public pass: string = '';
  public id: string = '';
  public signInSuccess: boolean = false;
  public signInError: boolean = false;

  // sign in form. form builder
  public signInForm : FormGroup =  this.formBuilder.group({
    id: '',
    pass: ''
  });


  // event sig in
  @Output() signInEvent = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder) { }

  public closeSignIn(): void {
    this.signIn = false;
    this.sendSignInEvent();
  }

  // send event to parent
  public sendSignInEvent(): void {
    this.signInEvent.emit(this.signIn);
  }

  ngOnInit(): void {
  }

  // stop event propagation
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  // sign in http request
  public signInRequest(): void {
    // url localhost:8081/api/login
    this.id = this.signInForm.value.id;
    this.pass = this.signInForm.value.pass;
    console.log(this.id);
    console.log(this.pass);
    
    this.http.post<any>('http://localhost:8081/api/login', { "password": this.pass, "id": this.id})
      .subscribe((data: any) => {
        // is success login
        this.signInSuccess = data.ok;
        if (this.signInSuccess) {
          this.signInError = false;
          this.closeSignIn();
        } else {
          this.signInError = true;
        }
      });
  }

}
