import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectBackendApiService  {

  ROOT_URL: string = "http://localhost:8085/";
  
  locations_data: Array<any> = [];
  constructor(private http : HttpClient){
  } 

  get_autonomous_regions(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "GeoJson/autonomous_regions")
  }

  get_provinces(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "GeoJson/provinces")
  }

  get_locations_info(): Observable<any> {
      return this.http.get<any>(this.ROOT_URL + "getUniqueLocationsInfoData");
  }

  get_location_data(location: string, date_str: string | undefined): Observable<any> {
      return this.http.post<any>(this.ROOT_URL + "getData", {location_name: location, date: date_str});
  }
  
  get_nearest_location_data_date(location: string): Observable<any> {
      return this.http.post<any>(this.ROOT_URL + "getNearestLocationDataDate", {location_name: location});
  }

  get_ranking(pollutant: string, date_str: string | undefined): Observable<any> {
    return this.http.post<any>(this.ROOT_URL + "getRankings", {pollutant: pollutant, date: date_str});
  } 

  get_ranking_date_range(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "getRankingDateRange");
  }
  
 
  

} 