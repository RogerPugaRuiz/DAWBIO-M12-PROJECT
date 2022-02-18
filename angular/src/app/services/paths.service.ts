import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathsService {
  paths;
  constructor() {
    this.paths = {
      logo: "assets/logo.jpg",
      map:"http://localhost:8050/"
    }
  }
}
