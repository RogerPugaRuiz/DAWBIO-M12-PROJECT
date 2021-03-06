import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConnectBackendApiService{
  
  //Backend Root Url 
  ROOT_URL: string = "http://localhost:8085/";

  /*
  Constructor:
    http - Create HttpClient instance for do requests to backend
    CookieService - Create CookieService instance for work with the browser cookies
  */
  constructor(private http : HttpClient, private CookieService: CookieService){
  } 


  //Function: Return user object from backend
  login(username: string | null, password: string | null): Observable<any> {
    return this.http.post<any>(this.ROOT_URL + "login", {username: username, password: password})
  }
  
  //Function: Set cookie to save logged user info
  setCookie(user: any) {
    this.CookieService.set("user", JSON.stringify(user));
  }

  //Function: Get cookie with logged user info
  getCookie(cookie: string) {
    return this.CookieService.get(cookie);
  }
  
  //Function: Delete cookie with logged user info
  deleteCookie(cookie:string){
    this.CookieService.delete(cookie)
  }
  
  //Function: Call backend Script to update map data
  callScript(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "executeScript");
  }

  //Function: Kill backend Script process to update map data
  killScript(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "killScript");
  }

  getScriptCount(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "getScriptCount");
  }


  //Function: Return Spain Autonomous Regions GEOJSON object from backend
  get_autonomous_regions(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "GeoJson/autonomous_regions")
  }

  //Function: Return Spain Provinces GEOJSON object from backend
  get_provinces(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "GeoJson/provinces")
  }

  //Function: Return locations_info object from backend
  get_locations_info(): Observable<any> {
      return this.http.get<any>(this.ROOT_URL + "getUniqueLocationsInfoData");
  }

  //Function: Return location_data object from backend with the given location_name and date
  get_location_data(location: string, date_str: string | undefined): Observable<any> {
      return this.http.post<any>(this.ROOT_URL + "getData", {location_name: location, date: date_str});
  }

  //Function: Return location_statistical_data object from backend with the given location_name and date
  get_location_statistical_data(location: string, date_str: string | undefined): Observable<any> {
    return this.http.post<any>(this.ROOT_URL + "getStatisticalData", {location_name: location, date: date_str});
  }
  
  //Function: Return location_statistical_data object from backen with the given date, pollutant and location_name
  get_forecast_data(date_string: string | undefined, pollutant: string | null, location: string): Observable<any> {
    return this.http.post<any>(this.ROOT_URL + "getForecastData", {date: date_string, pollutant_name: pollutant, location_name: location });
  }

  //Function: Return location_forecast_data object from backen with the given location_name
  get_location_forecast_data(location: string): Observable<any>{
    return this.http.post<any>(this.ROOT_URL + "getForecastData", {location_name: location});
  }
  
  //Function: Return nearest_location_data_date object from backen with the given location_name
  get_nearest_location_data_date(location: string): Observable<any> {
      return this.http.post<any>(this.ROOT_URL + "getNearestLocationDataDate", {location_name: location});
  }

  //Function: Return ranking object from backen with the given pollutant and date
  get_ranking(pollutant: string, date_str: string | undefined): Observable<any> {
    return this.http.post<any>(this.ROOT_URL + "getRankings", {pollutant: pollutant, date: date_str});
  } 

  //Function: Return ranking_date_range object from backend
  get_ranking_date_range(): Observable<any> {
    return this.http.get<any>(this.ROOT_URL + "getRankingDateRange");
  }

  //Function: Return forecast_date_range object from backend with the given locations and pollutant
  get_forecast_date_range(location: string, pollutant: string | null): Observable<any> {
      return this.http.post<any>(this.ROOT_URL + "getForecastDateRange", {location_name: location, pollutant_name: pollutant});
  }
} 