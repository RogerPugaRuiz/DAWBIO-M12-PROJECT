import { AfterViewChecked, AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  signIn : boolean = false;
  signUp : boolean = false;

  navItems : Array<string> = [
    "Home",
    "Air pollution map",
    "Water pollution map",
    "News",
    "Sign up",
    "Sign in",
  ];
  constructor() { }

  ngOnInit(): void {
  }

  public navFunction(item : string) : void {
    // if item is sign in
    if(item == "Sign in") {
      this.signIn = true;
    }
    // if item is sign up
    if(item == "Sign up") {
      this.signUp = true;
    }
  }

  public toggleSignIn() : void {
    this.signIn = !this.signIn;
  }

  public toggleSignUp() : void {
    this.signUp = !this.signUp;
  }

  // recieve event sign in from child
  public recieveSignInEvent($event: boolean) : void {
    this.signIn = $event;
  }

  // recieve event sign up from child
  public recieveSignUpEvent($event: boolean) : void {
    this.signUp = $event;
  }
}
