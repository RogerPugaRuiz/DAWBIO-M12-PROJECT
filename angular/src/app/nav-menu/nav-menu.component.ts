import { AfterViewChecked, AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SignInService } from '../services/sign-in.service';
import { SignUpService } from '../services/sign-up.service';
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
    "Login"
  ];
  constructor(
    private signInService: SignInService,
    private signUpService: SignUpService
  ) { }

  ngOnInit(): void {
    this.signInService.getSignIn().subscribe(signIn => { this.signIn = signIn; });
    this.signUpService.getSignUp().subscribe(signUp => { this.signUp = signUp; });
  }

  public navFunction(item : string) : void {
    // if item is sign in
    if(item == "Login") {
      this.signIn = true;
      this.signUp = false;
      this.signInService.setSignIn(this.signIn);
    }
  }

}
