import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectBackendApiServiceService  {

  baseURL: string = "http://localhost:8085/";
  
  locations_data: Array<any> = [];
  constructor(private http : HttpClient){
  } 

  get_locations_data(): Observable<Array<any>> {
      return this.http.get<Array<any>>(this.baseURL + "getUniqueLocationsInfoData");
  };

  

}


