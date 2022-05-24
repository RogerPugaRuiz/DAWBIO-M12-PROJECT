import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() text?:string;
  @Output() close = new EventEmitter();

  darkmode?: boolean;
  constructor(private settings:SettingsService) { }

  ngOnInit(): void {
    this.darkmode = this.settings.darkmode;
  }

  closeInfo(){
    this.close.emit();
  }

}
