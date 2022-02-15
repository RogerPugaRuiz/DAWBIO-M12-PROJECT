import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  page_selector = {
    "home":0,
    "news":1,
    "login":3
  }
  go: number = 0;
}
