import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  path = {
    img_src:"assets/images/logo.jpg",
  };
  rutings = ["home","news","login","register"]

  constructor() { }

  ngOnInit(): void {
  }

}
