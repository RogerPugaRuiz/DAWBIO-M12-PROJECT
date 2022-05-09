import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  darkmode: boolean = false;
  darkmodeSubject = new Subject<boolean>();

  constructor() { 
    if (localStorage.getItem('darkmode') != null) {
      this.darkmode = localStorage.getItem('darkmode') == 'true' ? true : false;
    }
  }


  setDarkMode(darkmode: boolean) {
    this.darkmodeSubject.next(darkmode);
    localStorage.setItem('darkmode', JSON.stringify(darkmode));
  }


  getDarkMode(){
    return this.darkmodeSubject;
  }
}
