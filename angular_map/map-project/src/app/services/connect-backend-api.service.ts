import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectBackendApiService  {

  baseURL: string = "http://localhost:8085/";
  
  locations_data: Array<any> = [];
  constructor(private http : HttpClient){
  } 

  get_locations_data(): Observable<Array<any>> {
      return this.http.get<Array<any>>(this.baseURL + "getUniqueLocationsInfoData");
  };

  get_location_data(location: string): Observable<any> {
      return this.http.post<Array<any>>(this.baseURL + "getData", {location_name: location });
  }
  

  

}  
