import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MapLinkService } from '../map-link.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private safeLink: SafeResourceUrl;
  constructor(private mapLinkService: MapLinkService, private sanitazer: DomSanitizer) {
    this.safeLink = this.sanitazer.bypassSecurityTrustResourceUrl(this.mapLinkService.getLink());
   }

  ngOnInit(): void {
  }

  getLink(): SafeResourceUrl {
    return this.safeLink;
  }
}
