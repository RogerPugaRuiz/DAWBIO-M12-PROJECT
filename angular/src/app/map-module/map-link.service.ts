import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapLinkService {
  private link: string = "httpd://localhost:8050";
  constructor() { }

  public getLink(): string {
    return this.link;
  }
}
