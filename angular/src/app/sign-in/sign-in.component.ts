import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signIn : boolean = false;
  
  // event sig in
  @Output() signInEvent = new EventEmitter<boolean>();
  
  constructor() { }

  public closeSignIn() : void {
    this.signIn = false;
    this.sendSignInEvent();
  }

  // send event to parent
  public sendSignInEvent() : void {
    this.signInEvent.emit(this.signIn);
  }
  
  ngOnInit(): void {
  }

  // stop event propagation
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) : void {
    event.stopPropagation();
  }
}
