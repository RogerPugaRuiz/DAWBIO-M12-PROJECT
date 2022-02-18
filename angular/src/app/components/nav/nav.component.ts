import { Component, OnInit } from '@angular/core';
import { PathsService } from 'src/app/services/paths.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private logo: string;
  constructor(private pathsService: PathsService) {
    this.logo = this.pathsService.paths.logo;
  }

  ngOnInit(): void {
  }

  public getLogo(): string {
    return this.logo;
  }
}
