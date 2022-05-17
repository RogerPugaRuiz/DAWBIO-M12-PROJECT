import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-contact',
  templateUrl: './confirm-contact.component.html',
  styleUrls: ['./confirm-contact.component.css']
})
export class ConfirmContactComponent implements OnInit {
  @Input() text?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
