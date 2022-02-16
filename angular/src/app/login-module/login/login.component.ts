import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '80px',

      })),
      state('closed', style({
        height: '570px',
        "border-bottom-left-radius": "1rem",
        "border-bottom-right-radius": "1rem",
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]

})
export class LoginComponent implements OnInit {
  isOpen = true;
  constructor() { }

  ngOnInit(): void {
  }

  

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
