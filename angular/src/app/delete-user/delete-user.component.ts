import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Input() user: any;
  darkmode?: boolean;
  @Output() isOpen = new EventEmitter<boolean>();
  constructor( private settings: SettingsService ) { }

  ngOnInit(): void {
    this.darkmode = this.settings.darkmode;
  }

  cancel(isOpen: boolean){
    this.isOpen.emit(false);
  }

}
