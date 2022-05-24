import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWTverifyService } from './jwtverify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private jwt: JWTverifyService
    ) { }

  getAllUsers(callback:any) {
    this.jwt.adminAuth();
    this.http.get("http://localhost:8081/api/admin/users").subscribe(
    {
      next: (obj:any) => {
        callback(obj.data.users);
      }
    }
    );
  }

  getUserById(id: string | null, callback: any) {
    this.jwt.adminAuth();
    this.http.get("http://localhost:8081/api/admin/user?id=" + id).subscribe(
      {
        next: (obj: any) => {
          callback(obj.data.user);
        }
      }
    );
  }

  deleteUser(user:any , callback:any) {
    this.jwt.adminAuth();
    this.http.post("http://localhost:8081/api/admin/delete-user", user).subscribe(
      {
        next: (obj: any) => {
          callback(user);
        }
      }
    );
  }

  deleteUsers(users:any , callback:any) {
    this.jwt.adminAuth();
    this.http.post("http://localhost:8081/api/admin/delete-users", users).subscribe(
      {
        next: (obj: any) => {
          callback(users);
        }
      }
    );
  }
}
