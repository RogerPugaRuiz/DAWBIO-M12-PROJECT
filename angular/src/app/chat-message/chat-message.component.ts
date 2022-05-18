import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit, AfterViewInit {
  @Input() type: string = "";
  @Input() message: string = "";
  constructor() { }
  ngAfterViewInit(): void {
    this.setChatStyle();
  }

  ngOnInit(): void {
    this.setChatStyle();
  }

  setChatStyle() {
    let messages = document.getElementsByClassName('message');

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const text = messages[i].querySelector('.text');
      const bg = messages[i].querySelector('.bg-message');

      console.log("text " + this.message + " = " + text?.clientHeight);
      if (text != null && bg != null) {
        if (text.clientHeight < 40) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballon.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballon.svg");
            console.log("blueballon");
          }
        } else if (text.clientHeight > 30 && text.clientHeight < 100) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX2.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX2.svg");
            console.log("blueballonX2");
          }
        } else if (text.clientHeight > 100 && text.clientHeight < 120) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX3.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX3.svg");
          }
        } else if (text.clientHeight > 120 && text.clientHeight < 200) {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX4.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX4.svg");
          }
        } else {
          if (message.classList.contains('received')) {
            bg.setAttribute("src", "assets/img/greenballonX5.svg");
          } else {
            bg.setAttribute("src", "assets/img/blueballonX5.svg");
          }
        }
      }
    }
  }
}
