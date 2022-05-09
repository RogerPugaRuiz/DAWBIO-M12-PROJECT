import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JWTverifyService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  verifyToken() {
    this.http.get('http://localhost:8081/api/users/jwt/verify').subscribe(
      {
        next: (data) => {
          console.log(data);
          // this.router.navigate(['/register']);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/error'], { queryParams: {status: err.status}});
        }
      }
    );
  }
}
