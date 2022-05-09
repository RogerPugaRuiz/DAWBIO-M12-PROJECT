import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return next.handle(request);
    }
    
    const headers = request.clone({
      headers: request.headers.set('Authorization', token)
    });
    
    // console.log(headers.headers.get('Authorization'));
    return next.handle(headers);

  }
}
