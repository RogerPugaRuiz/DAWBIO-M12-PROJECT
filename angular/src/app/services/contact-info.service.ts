import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  ContactList: any[] = [];
  constructor(
    private http:HttpClient
  ) { }

  httpConnect(){
    this.http.get("http://localhost:8081/api/users/get-contacts").subscribe(
      {
        next: (obj: any) => {
          this.ContactList = obj.data.contacts;
        }
      }
    );
  }

  getContactList(){
    return this.ContactList;
  }

}
