import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapLinkService {
  private link: string = "";
  constructor() { }

  public getLink(): string {
    return this.link;
  }
}
