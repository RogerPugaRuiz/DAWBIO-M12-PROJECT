import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // sign up boolean
  public signUp: boolean = false;

  // sign up event value
  @Output() signUpEvent = new EventEmitter<boolean>();

  constructor() { }

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

}
