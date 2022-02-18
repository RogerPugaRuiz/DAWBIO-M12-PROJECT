import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PathsService } from 'src/app/services/paths.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private safeLink: SafeResourceUrl;
  constructor(private pathsService: PathsService, private sanitazer: DomSanitizer) {
    this.safeLink = this.sanitazer.bypassSecurityTrustResourceUrl(this.pathsService.paths.map);
   }

  ngOnInit(): void {
  }

  getLink(): SafeResourceUrl {
    return this.safeLink;
  }

}
