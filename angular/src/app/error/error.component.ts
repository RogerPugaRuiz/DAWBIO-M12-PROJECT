import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  status: number = 200;
  title: string = '';
  description: string = '';
  darkmode?: boolean;
  constructor(
    private route: ActivatedRoute,
    private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.setError();
    });
    this.route.data.subscribe(data => {
      if (data['status']) {
        this.status = data['status'];
        this.setError();
      }
    });
    this.darkmode = this.settingsService.darkmode;
    this.settingsService.getDarkMode().subscribe(
      darkmode => {
        this.darkmode = darkmode;
      });
  }

  getStatus(): number {
    return this.status;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  setError() {

    if (this.status == 400) {
      this.title = 'Bad Request';
      this.description = 'The request was invalid or cannot be served. Required parameters are missing or invalid.';
    }
    else if (this.status == 401) {
      this.title = 'Unauthorized';
      this.description = 'The request requires user authentication.';
    }
    else if (this.status == 403) {
      this.title = 'Forbidden';
      this.description = 'The server understood the request but refuses to authorize it.';
    }
    else if (this.status == 404) {
      this.title = 'Not Found';
      this.description = 'The requested resource could not be found.';
    }
    if (this.status == 500) {
      this.title = 'Internal Server Error';
      this.description = 'The server encountered an unexpected condition which prevented it from fulfilling the request.';
    }
    if (this.status == 501) {
      this.title = 'Not Implemented';
      this.description = 'The server either does not recognize the request method, or it lacks the ability to fulfill the request.';
    }
    if (this.status == 502) {
      this.title = 'Bad Gateway';
      this.description = 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.';
    }
    if (this.status == 503) {
      this.title = 'Service Unavailable';
      this.description = 'The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.';
    }
    if (this.status == 504) {
      this.title = 'Gateway Timeout';
      this.description = 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.';
    }



    // switch (this.status) {
    //   case 404:
    //     this.title = 'Not Found';
    //     this.description = 'The requested resource was not found.';
    //     break;
    //   case 500:
    //     this.title = 'Internal Server Error';
    //     this.description = 'The server encountered an unexpected condition which prevented it from fulfilling the request.';
    //     break;
    //   case 401:
    //     this.title = 'Unauthorized';
    //     this.description = 'The requested resource requires authentication.';
    //     break;
    //   case 403:
    //     this.title = 'Forbidden';
    //     this.description = 'The requested resource is forbidden.';
    //     break;
    //   case 400:
    //     this.title = 'Bad Request';
    //     this.description = 'The server cannot or will not process the request due to an apparent client error.';
    //     break;
    //   case 503:
    //     this.title = 'Service Unavailable';
    //     this.description = 'The server is currently unavailable (because it is overloaded or down for maintenance).';
    //     break;
    //   case 502:
    //     this.title = 'Bad Gateway';
    //     this.description = 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.';
    //     break;
    //   case 504:
    //     this.title = 'Gateway Timeout';
    //     this.description = 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.';
    //     break;
    //   default:
    //     this.title = 'Unknown Error';
    //     this.description = 'An unknown error has occurred.';
    //     break;
    // }
  }

}
