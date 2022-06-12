import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(public service: SpinnerService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("interceptada");
    //this.service.callSpinner();
    return next.handle(request).pipe(
          finalize(() => console.log("acabada")
          //this.service.stopSpinner()
          ),
    );
 }
}
