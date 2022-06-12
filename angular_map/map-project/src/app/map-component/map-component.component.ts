import { ConnectBackendApiService } from '../services/connect-backend-api.service';
import { Component, OnInit } from '@angular/core'; 
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { DatePipe } from '@angular/common';
import { SpinnerService } from '../services/spinner.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements OnInit {
  /*
  Constructor:
    service - Create service instance from ConnectBackendApi Service for request backend data
    datepipe - Create datePipe instance for change date format
  */
  constructor(public service: ConnectBackendApiService, public datepipe: DatePipe, private SpinnerService: SpinnerService, private CookieService: CookieService) { } 

  //For check if user is Logged
  userLogged: any = null;

  //Data Variables

  //dataPollution - Saves a specific object of pollution information for a location, used to display info in HTML
  dataPollution: any = null;
  //Save dataPollution location Name
  dataPollutionLocationName: any = null;
  //dataPollution - Saves a specific object of pollution statical information for a location, used to display info in HTML
  statisticalDataPollution: any = null;
  //dataForecastPollution - Saves a specific object of pollution forecast information for a location, used to display info in HTML
  dataForecastPollution: any = null;
  //rankingArray - Save array of objects for the ranking, used to display info in HTML
  rankingArray: any = null;

  //Date Variables

  //currentDate - Save the current date
  currentDate = new Date()
  //forecastDefaultDate - Save the default forecast date
  forecastDefaultDate: any = this.currentDate.setDate(this.currentDate.getDate() + 1);
  //dataPollutionActualDate - Save the date for dataPollution datepicker (Default -> currentDate), , used to request backend info
  dataPollutionActualDate: any = this.datepipe.transform(new Date(), 'YYYY-MM-dd')?.toString();
  //forecastActualDate - Save the date for forecast datepicker (Default -> currentDate + 1), used to request backend info
  forecastActualDate: any = this.datepipe.transform(this.forecastDefaultDate , 'YYYY-MM-dd')?.toString();
  //rankingActualDate - Save the date for ranking datepicker (Default -> currentDate), used to request backend info
  rankingActualDate: any = this.datepipe.transform(new Date(), 'YYYY-MM-dd')?.toString();
  //minDateRanking - Save min date for ranking datepicker and dataPollution datepicker
  minDateRanking: string = "";
  //maxDateRanking - Save max date for ranking datepicker and dataPollution datepicker
  maxDateRanking: string = "";
  //minDateRanking - Save min date for forecast datepicker
  minDateForecast: string = "";
  //minDateRanking - Save max date for forecast datepicker
  maxDateForecast: string = "";

  //Select Data Variables

  //rankingPollutant - Save current pollutant for the ranking, used to request backend info
  rankingPollutant: string = "";
  //selectedForecastPollutant - Save current pollutant for the forecast, used to request backend info
  selectedForecastPollutant: string = "";

  //Maps D3 options

  //Peninsula Map size 
    //Width
  wmap: number = 750;
    //Height
  hmap: number = 500;
  //Canary Islands Map size
    //Width
  hCan: number = 120 ;
    //Height
  wCan: number = 240;
  //Station Points Render Scale Array
  scale: any  = {
    1: 3,
    2: 2.8,
    3: 2.6,
    4: 2.4,
    5: 2.2,
    6: 2, 
    7: 1.8,
    8: 1.6,
    9: 1.4,
    10: 1.2,
    11: 1,
    12: 0.8,
    13: 0.8,
    14: 0.6,
    15: 0.5,
    16: 0.4,
    17: 0.4,
    18: 0.4,
    19: 0.4,
    20: 0.3,
    21: 0.3,
    22: 0.3,
    23: 0.3,
    24: 0.3,
    25: 0.3
  }; 

  ngOnInit(): void {
    //Check if user is already loged
    if(this.CookieService.get('user')){
      //Get cookie User
      this.userLogged = JSON.parse(this.CookieService.get('user'))
      //Check if user is in DataBase
      this.service.login(this.userLogged.username, this.userLogged.password).subscribe({
        //Wait for response
        next: (response: any) => {
          //If valid user is logged show content and display data
          if(response.length > 0){

            //Display Content
            d3.select("#mainDiv").style("display", "block");

            //Create map function
            this.createMap();
      
            //Get max and min date data from backend for ranking
            this.service.get_ranking_date_range().subscribe({
              next: (response: any) => {
                if(response.lenght != 0){
                  this.minDateRanking = response[0][0];
                  this.maxDateRanking = response[0][1];
                }
              },
              error: (err: any) => {
                console.log("Error on Request");
              },
              complete: () => {}
            });
      
            //Get default ranking list(pollutant -> air_quality_level, date -> today) from backend
            this.service.get_ranking("air_quality_level", this.datepipe.transform(this.rankingActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
              next: (response: any) => {
                if(response.length != 0){
                  this.rankingPollutant = response[0].pollutant;
                  this.rankingArray = response;
                }
              },
              error: (err: any) => {
                console.log("Error on Request");
              },
              complete: () => {}
      
            });
          } else {
            this.userLogged = null; 
          }
        },
        error: (err: any) => {
          console.log("Error on Request");
        },
        complete: () => {}
      })
    }
  }

  createMap() {
    
    //D3 Peninsula Map
    
    //Projection, Path, Map of Peninsula
    let projection: d3.GeoProjection = d3.geoMercator().translate([410,2140]).scale(2500);
    let path: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projection);
    let map: any = d3.select("#map").append("svg").attr("id", "peninsulaMap").attr("width", this.wmap).attr("height", this.hmap).style("border", "1px solid black").style("background-color", "#7fcdff");
    
    //D3 Canary Island Map

    //Projection, Path, Map of Canary Island
    let projectionCan: d3.GeoProjection = d3.geoMercator().translate([810, 1350]).scale(2500);
    let pathCan: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projectionCan);
    let mapCan: any = d3.select("#mapC").append("svg").attr("id", "isleMap").attr("width", this.wCan).attr("height", this.hCan).style("border", "1px solid black").style("background-color", "#7fcdff");

    //Zoom Functions Peninsula Map

    //Set zoom with max scale 25
    map = map.call(d3.zoom().scaleExtent([1,25]).translateExtent([[0,0],[this.wmap,this.hmap]]).on("zoom", () => {
      //On zoom event apply zoomTransform
      map.attr("transform", d3.zoomTransform(map.node()))
        //Change location points size depending on zoom scale level
        let scale = d3.zoomTransform(map.node()).k;
        let scale_int = Math.round(scale)
        d3.selectAll('.circlesPeninsula').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
    })).append("g");

    //Zoom Functions Canary Island Map

    mapCan = mapCan.call(d3.zoom().scaleExtent([1,15]).translateExtent([[0,0],[this.wCan,this.hCan]]).on("zoom", () =>{
      //On zoom event apply zoomTransform
      mapCan.attr("transform", d3.zoomTransform(mapCan.node()))
        //Change location points size depending on zoom scale level
        let scale = d3.zoomTransform(mapCan.node()).k;
        let scale_int = Math.round(scale)
        d3.selectAll('.circlesCan').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
    })).append("g");


    //Generate div that is displayed with info when hovering over some map location point
    var divToolTip = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0)
    .style("display", "none");


    this.SpinnerService.callSpinner()

    //Draw Spain Maps

    //Get Spain Provinces GEOJSON from backend
    this.service.get_provinces().subscribe({
      next: (response: any) => {
        //Read GEOJSON with topojson extension
        let prov = topojson.feature(response, response.objects["provinces"]);

        //Draw Peninsula Map

        map
          .selectAll("#map path")
          // @ts-ignore
          .data(prov.features)
          .enter()
          .append("path")
          .attr("class", "path")
          .attr("d", path)
          .attr("fill", "#aba56d")
          .attr("stroke", "#000000")
          .attr("stroke-width", 0.6);

        //Draw Canary Island Map

        mapCan
          .selectAll("#mapC path")
          // @ts-ignore
          .data(prov.features)
          .enter()
          .append("path")
          .attr("class", "path")
          .attr("d", pathCan)
          .attr("fill", "#aba56d")
          .attr("stroke", "#000000")
          .attr("stroke-width", 0.6);



        //Insert Station Points

          //Get locations_info from backend
          this.service.get_locations_info().subscribe({
            next: (response: any) => {
              //Iterate response from backend
              response.forEach((element: any) => {
                //Insert Peninsula Station Points
                map
                .selectAll("circles")
                //Set Latitude and longitude in data
                .data([[element[2], element[1]]])
                .enter()
                .append("circle")
                //Set as id the location_name
                .attr("id", element[0])
                .attr("aqilevel", element[3])
                .attr("dominant_pollution", element[4])
                .attr("date_day_info", element[5])
                .attr("date_time_info", element[6])
                .attr("class", "circlesPeninsula")
                //Get projection of points from latitude and longitude 
                // @ts-ignore
                .attr("cx", function(d){ return projection(d)[0] })
                // @ts-ignore
                .attr("cy", function(d){ return projection(d)[1] })
                .attr("r", 3)
                .style("fill", "black")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .style('cursor', "pointer")
                //Add Event listener "click" on peninsule circles 
                .on("click", (event: any) =>  {
                  this.dataPollutionLocationName = event.target.id;
                  //Get nearest location data date from the backend with given location name
                  this.service.get_nearest_location_data_date(event.target.id).subscribe({
                    next: (response_v1: any) => {
                      //Wait for response
                      //Get location data from the backend with given location name and date
                      this.service.get_location_data(event.target.id, response_v1[0][0]).subscribe({
                        next: (response_v2: any) => {
                          //Wait for response
                          //Change info of object dataPollution 
                          this.changeInfoData(response_v2);
                          //Get statistical data of the location from the backend with given location and date
                          this.service.get_location_statistical_data(event.target.id, this.datepipe.transform(response_v1[0][0], 'YYYY-MM-dd')?.toString()).subscribe({
                            next: (response_v3: any) => {
                              //Wait for response
                              //Change info of object statisticalDataPollution
                              this.statisticalDataPollution = response_v3[0];
                              //Set date to 'YYYY-MM-DD' format
                              let substring_date: string = this.statisticalDataPollution["date_day_info"];
                              this.statisticalDataPollution["date_day_info"] = substring_date.substring(0, substring_date.length - 12);
                              //Change info of object dataForecastPollution calling a function
                              this.changeForecastData(this.dataPollution.location_name, "o3");
                            },
                            error: (err:any) => {
                              console.log("Error on Request");  
                            },
                            complete: () => {}
                          });
                        },
                        error: (err:any) => {
                          console.log("Error on Request");  
                        },
                        complete: () => {}
                      });
                    },
                    error: (err:any) => {
                      console.log("Error on Request");  
                    },
                    complete: () => {}
                  });
                })
                //Add Event listener "mouseover" peninsule on circles
                .on('mouseover', function (event: any) {
                  //Set visible the toolTip div that is displayed with info when hovering over some map location point
                  divToolTip.transition()
                    .duration(350)
                    .style("opacity", .7)
                    .style("display", "block")
                  //Add relevant data to toolTip div and display the div near to cursor location
                  divToolTip.html("<h2 style=\"margin-bottom:0px\">" + event.target.id + "</h2>" + "Air Quality Level - " + event.target.attributes["aqilevel"]["nodeValue"]  + "<br>" +
                  "Dominant Pollution - " + event.target.attributes["dominant_pollution"]["nodeValue"] + "<br>" + "Data date - " + event.target.attributes["date_day_info"]["nodeValue"]
                   + "<br>" + "Date time - " + event.target.attributes["date_time_info"]["nodeValue"])
                    .style("box-sizing", "border-box")
                    .style("padding", "5px")
                    .style("background-color" , "white")
                    .style("position", "absolute")
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY - 28 + "px");
                })
                //Add Event listener "mouseout" peninsule on circles
                .on('mouseout', function () {
                  //Hide the toolTip div that is displayed with info when hovering over some map location point
                  divToolTip.style("opacity", 0).style("display", "none");
                });
        
                //Insert Canary Island Stations Points
        
                mapCan
                .selectAll("circles")
                .data([[element[2], element[1]]])
                .enter()
                .append("circle")
                .attr("id", element[0])
                .attr("aqilevel", element[3])
                .attr("dominant_pollution", element[4])
                .attr("date_day_info", element[5])
                .attr("date_time_info", element[6])
                .attr("class", "circlesCan")
                // @ts-ignore
                .attr("cx", function(d){ return projectionCan(d)[0]})
                // @ts-ignore
                .attr("cy", function(d){ return projectionCan(d)[1] })
                .attr("r", 3) 
                .style("fill", "black")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .style('cursor', "pointer")
                //Add Event listener "click" on Canary Island circles 
                .on("click", (event: any) =>  {
                  this.dataPollutionLocationName = event.target.id;
                  //Get nearest location data date from the backend with given location name
                  this.service.get_nearest_location_data_date(event.target.id).subscribe({
                    next: (response_v1: any) => {
                      //Wait for response
                      //Get location data from the backend with given location name and date
                      this.service.get_location_data(event.target.id, response_v1[0][0]).subscribe({
                        next: (response_v2: any) => {
                          //Wait for response
                          //Change info of object dataPollution 
                          this.changeInfoData(response_v2);
                          //Get statistical data of the location from the backend with given location and date
                          this.service.get_location_statistical_data(event.target.id, this.datepipe.transform(response_v1[0][0], 'YYYY-MM-dd')?.toString()).subscribe({
                            next: (response_v3: any) => {
                              //Wait for response
                              //Change info of object statisticalDataPollution
                              this.statisticalDataPollution = response_v3[0];
                              //Set date to 'YYYY-MM-DD' format
                              let substring_date: string = this.statisticalDataPollution["date_day_info"];
                              this.statisticalDataPollution["date_day_info"] = substring_date.substring(0, substring_date.length - 12);
                              //Change info of object dataForecastPollution calling a function
                              this.changeForecastData(this.dataPollution.location_name, "o3");
                            },
                            error: (err:any) => {
                              console.log("Error on Request");  
                            },
                            complete: () => {}
                          });
                        },
                        error: (err:any) => {
                          console.log("Error on Request");  
                        },
                        complete: () => {}
                      });
                    },
                    error: (err:any) => {
                      console.log("Error on Request"); 
                    },
                    complete: () => {}
                  });
                })
                //Add Event listener "mouseover" on Canary Island circles
                .on('mouseover', function (event: any) {
                  //Set visible the toolTip div that is displayed with info when hovering over some map location point
                  divToolTip.transition()
                    .duration(350)
                    .style("opacity", .7)
                    .style("display", "block");
                  //Add relevant data to toolTip div and display the div near to cursor location
                  divToolTip.html("<h2 style=\"margin-bottom:0px\">" + event.target.id + "</h2>" + "Air Quality Level - " + event.target.attributes["aqilevel"]["nodeValue"]  + "<br>" +
                  "Dominant Pollution - " + event.target.attributes["dominant_pollution"]["nodeValue"] + "<br>" + "Data date - " + event.target.attributes["date_day_info"]["nodeValue"]
                   + "<br>" + "Date time - " + event.target.attributes["date_time_info"]["nodeValue"])
                    .style("box-sizing", "border-box")
                    .style("padding", "5px")
                    .style("background-color" , "white")
                    .style("position", "absolute")
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY - 28 + "px");
                })
                //Add Event listener "mouseout" Canary Island on circles
                .on('mouseout', function () {
                  //Hide the toolTip div that is displayed with info when hovering over some map location point
                  divToolTip.style("opacity", 0).style("display", "none");
                });
              });
            },
            error: (err: any) => {
              console.log("Error on Request");
            },
            complete: () => {this.SpinnerService.stopSpinner()}
        });    
      },
      error: (err: any) => {
        console.log("Error on Request");
      },
      complete: () => {}
    });
  }

  /*

  refreshRankings - Refresh ranking data with the pollutant selected and date selected requesting petition from backend 

  */
  refreshRankings(){
   this.service.get_ranking(this.rankingPollutant, this.datepipe.transform(this.rankingActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
    next: (response: any) => {
      if(response.length != 0){
        console.log(response)
        this.rankingPollutant = response[0].pollutant;
        this.rankingArray = response;
      } else {
        this.rankingArray = [];
      }
    },
    error: (err: any) => {
      console.log("Error on Request");
    },
    complete: () => {}

    })
  }

  /*

  changeInfoData - Change info on dataPollution object with a given object and hide irrelevant divs at the moment

  */
  changeInfoData(data: any){
   this.dataPollution = data[0];
   d3.select("#pollutantInfo").style("display", "none");
   d3.select("#infoaqitable").style("display", "none");
   d3.select("#forecastData").style("display", "none");
   d3.select("#locationData").style("display", "block");
   this.dataPollution.date_day_info = this.datepipe.transform(this.dataPollution.date_day_info, 'YYYY-MM-dd')?.toString();
   this.dataPollutionActualDate = this.dataPollution.date_day_info;
  }

  /*

  refreshInfoData - Change info on dataPollution object, requesting petition from backend with a given location name and date

  */
  refreshInfoData(){
    this.service.get_location_data(this.dataPollutionLocationName, this.datepipe.transform(this.dataPollutionActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
      next: (response: any) => {
        if(response.length != 0){
          this.dataPollution = response[0];
          this.dataPollution.date_day_info = this.datepipe.transform(this.dataPollution.date_day_info, 'YYYY-MM-dd')?.toString();
          //Get statistical data from location
          this.changeInfoStaticalData(this.dataPollution.location_name);
        } else {
          this.dataPollution = null;
          this.statisticalDataPollution = null;
        }
      },
      error: (err: any) => {
        console.log("Error on Request");
      },
      complete: () => {}
  
      })
  }

  /*

  changeForecastData - Change info on dataForecastPollution object, requesting petition from backend with a given location name and pollutant

  */

  changeForecastData(location_name: string, pollutant: string | null){
    this.service.get_forecast_date_range(location_name, pollutant).subscribe({
      next: (response: any) => {
        this.minDateForecast = response[0][0];
        this.maxDateForecast = response[0][1];
      },
      error: (err:any) => {
        console.log("Error on Request");  
      },
      complete: () => {}
    });
    this.service.get_forecast_data(this.datepipe.transform(this.forecastActualDate, 'YYYY-MM-dd')?.toString(), pollutant, location_name).subscribe({
      next: (response: any) => {
        this.dataForecastPollution = response[0];
      },
      error: (err:any) => {
        console.log("Error on Request");  
      },
      complete: () => {}
    });
  }

  /*

  changeInfoStaticalData - Change info on statisticalDataPollution object, requesting petition from backend with a given location name and date

  */
  changeInfoStaticalData(location_name: string){
    this.service.get_location_statistical_data(location_name, this.datepipe.transform(this.dataPollutionActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
      next: (response: any) => {
        if(response.length != 0){
          this.statisticalDataPollution = response[0];
          let substring_date: string = this.statisticalDataPollution["date_day_info"];
          this.statisticalDataPollution["date_day_info"] = substring_date.substring(0, substring_date.length - 12);
        } else {
          this.statisticalDataPollution = null;
        }

      },
      error: (err:any) => {
        console.log("Error on Request"); 
      },
      complete: () => {}
    });
  }

  /*

  updateForecastData - Change info on dataForecastPollution object, requesting petition from backend with a given date and pollutant

  */

  updateForecastData(){
    this.service.get_forecast_data(this.datepipe.transform(this.forecastActualDate, 'YYYY-MM-dd')?.toString(), this.selectedForecastPollutant, this.dataPollutionLocationName).subscribe({
      next: (response: any) => {
        if(response.length != 0){
          this.dataForecastPollution = response[0];
        } else {
          this.dataForecastPollution = null;
        }
        
      },
      error: (err:any) => {
        console.log("Error on Request");
      },
      complete: () => {}
    });
  }

  //Show info about pollutants and hide other info
  showInfoPollution(){
    d3.select("#infoaqitable").style("display", "none");
    d3.select("#locationData").style("display", "none");
    d3.select("#forecastData").style("display", "none");
    d3.select("#pollutantInfo").style("display", "block");
  }

  //Show info about location_pollution and hide other info
  showDataPollution(){
    d3.select("#pollutantInfo").style("display", "none");
    d3.select("#infoaqitable").style("display", "none");
    d3.select("#forecastData").style("display", "none");
    d3.select("#locationData").style("display", "block");
  }

  //Show info about location_forecast_pollution and hide other info
  showForecastDataPollution(){
    d3.select("#locationData").style("display", "none");
    d3.select("#pollutantInfo").style("display", "none");
    d3.select("#infoaqitable").style("display", "none");
    d3.select("#forecastData").style("display", "block");
  };

  //Show additional info about pollution and hide other info
  showAdditionalInfo(){
    d3.select("#locationData").style("display", "none");
    d3.select("#pollutantInfo").style("display", "none");
    d3.select("#forecastData").style("display", "none");
    d3.select("#infoaqitable").style("display", "block");
  };
}
