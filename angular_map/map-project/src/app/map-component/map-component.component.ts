import { ConnectBackendApiService } from '../services/connect-backend-api.service';
import { Component, OnInit } from '@angular/core'; 
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements OnInit {

  constructor(private service: ConnectBackendApiService, public datepipe: DatePipe) { } 
  currentDate = new Date()
  forecastDefaultDate = this.currentDate.setDate(this.currentDate.getDate() + 1);

  dataPollution: any = null;
  staticalDataPollution: any = null;
  dataForecastPollution: any = null;
  

  dataPollutionActualDate: any = this.datepipe.transform(new Date(), 'YYYY-MM-dd')?.toString();

  rankingArray: any = [];
  rankingPollutant: string = "";

  rankingActualDate = this.datepipe.transform(new Date(), 'YYYY-MM-dd')?.toString();
  minDateRanking: string = "";
  maxDateRanking: string = "";

  selectedForecastPollutant: string = "";
  forecastActualDate = this.datepipe.transform(this.forecastDefaultDate , 'YYYY-MM-dd')?.toString();
  minDateForecast: string = "";
  maxDateForecast: string = "";
  

  ngOnInit(): void {

    //Create map
    this.createMap();

    //Get max and min Date of data for ranking
    this.service.get_ranking_date_range().subscribe({
      next: (response: any) => {
        this.minDateRanking = response[0][0]
        this.maxDateRanking = response[0][1]
      },
      error: (err: any) => {
        console.log("Error on Request")
      },
      complete: () => {}
    })

    //Get default ranking (air_quality_level, today)
    this.service.get_ranking("air_quality_level", this.datepipe.transform(this.rankingActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
      next: (response: any) => {
        this.rankingPollutant = response[0].pollutant
        this.rankingArray = response;
      },
      error: (err: any) => {
        console.log("Error on Request")
      },
      complete: () => {}

    })
  }

  //Peninsula Map size 
  wmap: number = 750;
  hmap: number = 500;
  //Canary Islands Map size
  hCan: number = 120 ;
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
  } 

  createMap() {
    
    //D3 Peninsula Map

    let projection: d3.GeoProjection = d3.geoMercator().translate([410,2140]).scale(2500);
    let path: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projection);
    let map: any = d3.select("#map").append("svg").attr("id", "peninsulaMap").attr("width", this.wmap).attr("height", this.hmap).style("border", "1px solid black").style("background-color", "#7fcdff");
    
    //D3 Canary Island Map

    let projectionCan: d3.GeoProjection = d3.geoMercator().translate([810, 1350]).scale(2500);
    let pathCan: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projectionCan);
    let mapCan: any = d3.select("#mapC").append("svg").attr("id", "isleMap").attr("width", this.wCan).attr("height", this.hCan).style("border", "1px solid black").style("background-color", "#7fcdff");

    //Zoom Functions Peninsula Map

    map = map.call(d3.zoom().scaleExtent([1,25]).translateExtent([[0,0],[this.wmap,this.hmap]]).on("zoom", event => {
      map.attr("transform", d3.zoomTransform(map.node()))
      if(event.sourceEvent.wheelDelta < 0){
        let scale = d3.zoomTransform(map.node()).k;
        let scale_int = Math.round(scale)
        d3.selectAll('.circlesPeninsula').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
      } else {
        let scale = d3.zoomTransform(map.node()).k;
        let scale_int = Math.round(scale)
        d3.selectAll('.circlesPeninsula').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
      }
    })).append("g");

    //Zoom Functions Canary Island Map

    mapCan = mapCan.call(d3.zoom().scaleExtent([1,15]).translateExtent([[0,0],[this.wCan,this.hCan]]).on("zoom", event =>{
      mapCan.attr("transform", d3.zoomTransform(mapCan.node()))
      if(event.sourceEvent.wheelDelta < 0){
        let scale = d3.zoomTransform(mapCan.node()).k;
        let scale_int = Math.round(scale)
        d3.selectAll('.circlesCan').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
      } else {
        let scale = d3.zoomTransform(mapCan.node()).k;
        let scale_int = Math.round(scale)
        d3.selectAll('.circlesCan').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
      }
    })).append("g");


    //ToolTip
    var divToolTip = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0)
    .style("display", "none");

    //Draw maps
    this.service.get_provinces().subscribe({
      next: (response: any) => {
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
          .attr("stroke-width", 0.6)

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
          .attr("stroke-width", 0.6)



        //Insert Station Points

          this.service.get_locations_info().subscribe({
            next: (response: any) => {
              response.forEach((element: any) => {
                //Insert Peninsula Stations Points
                map
                .selectAll("circles")
                .data([[element[2], element[1]]])
                .enter()
                .append("circle")
                .attr("id", element[0])
                .attr("aqilevel", element[3])
                .attr("dominant_pollution", element[4])
                .attr("date_day_info", element[5])
                .attr("date_time_info", element[6])
                .attr("class", "circlesPeninsula")
                // @ts-ignore
                .attr("cx", function(d){ return projection(d)[0] })
                // @ts-ignore
                .attr("cy", function(d){ return projection(d)[1] })
                .attr("r", 3)
                .style("fill", "black")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .style('cursor', "pointer")
                .on("click", (event: any) =>  {
                  this.service.get_nearest_location_data_date(event.target.id).subscribe({
                    next: (response_v1: any) => {
                      this.service.get_location_data(event.target.id, response_v1[0][0]).subscribe({
                        next: (response_v2: any) => {
                          this.changeInfoData(response_v2);
                          this.service.get_location_statistical_data(event.target.id, this.datepipe.transform(response_v1[0][0], 'YYYY-MM-dd')?.toString()).subscribe({
                            next: (response_v3: any) => {
                              this.staticalDataPollution = response_v3[0];
                              let substring_date: string = this.staticalDataPollution["date_day_info"]
                              this.staticalDataPollution["date_day_info"] = substring_date.substring(0, substring_date.length - 12)
                              this.changeForecastData(this.dataPollution.location_name, "o3")
                            },
                            error: (err:any) => {
                              console.log("Error on Request")  
                            },
                            complete: () => {}
                          });
                        },
                        error: (err:any) => {
                          console.log("Error on Request")  
                        },
                        complete: () => {}
                      });
                    },
                    error: (err:any) => {
                      console.log("Error on Request")  
                    },
                    complete: () => {}
                  });
                })
                .on('mouseover', function (event: any) {
                  divToolTip.transition()
                    .duration(350)
                    .style("opacity", .7)
                    .style("display", "block")
                  divToolTip.html("<h2 style=\"margin-bottom:0px\">" + event.target.id + "</h2>" + "Air Quality Level - " + event.target.attributes["aqilevel"]["nodeValue"]  + "<br>" +
                  "Dominant Pollution - " + event.target.attributes["dominant_pollution"]["nodeValue"] + "<br>" + "Data date - " + event.target.attributes["date_day_info"]["nodeValue"]
                   + "<br>" + "Date time - " + event.target.attributes["date_time_info"]["nodeValue"])
                    .style("box-sizing", "border-box")
                    .style("padding", "5px")
                    .style("background-color" , "white")
                    .style("position", "absolute")
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY - 28 + "px")
                })
                .on('mouseout', function () {
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
                .on("click", (event: any) =>  {
                  this.service.get_nearest_location_data_date(event.target.id).subscribe({
                    next: (response_v1: any) => {
                      this.service.get_location_data(event.target.id, response_v1[0][0]).subscribe({
                        next: (response_v2: any) => {
                          this.changeInfoData(response_v2);
                          this.service.get_location_statistical_data(event.target.id, this.datepipe.transform(response_v1[0][0], 'YYYY-MM-dd')?.toString()).subscribe({
                            next: (response_v3: any) => {
                              this.staticalDataPollution = response_v3[0];
                              let substring_date: string = this.staticalDataPollution["date_day_info"]
                              this.staticalDataPollution["date_day_info"] = substring_date.substring(0, substring_date.length - 12)
                            },
                            error: (err:any) => {
                              console.log("Error on Request")  
                            },
                            complete: () => {}
                          });
                        },
                        error: (err:any) => {
                          console.log("Error on Request")  
                        },
                        complete: () => {}
                      });
                      this.service.get_location_forecast_data(event.target.id).subscribe({
                        next: (response: any) => {
                          
                        },
                        error: (err:any) => {
                          console.log("Error on Request")  
                        },
                        complete: () => {}
                      });
                    },
                    error: (err:any) => {
                      console.log("Error on Request")  
                    },
                    complete: () => {}
                  });
                })
                .on('mouseover', function (event: any) {
                  console.log("hola")
                  divToolTip.transition()
                    .duration(350)
                    .style("opacity", .7)
                    .style("display", "block")
                  divToolTip.html("<h2 style=\"margin-bottom:0px\">" + event.target.id + "</h2>" + "Air Quality Level - " + event.target.attributes["aqilevel"]["nodeValue"]  + "<br>" +
                  "Dominant Pollution - " + event.target.attributes["dominant_pollution"]["nodeValue"] + "<br>" + "Data date - " + event.target.attributes["date_day_info"]["nodeValue"]
                   + "<br>" + "Date time - " + event.target.attributes["date_time_info"]["nodeValue"])
                    .style("box-sizing", "border-box")
                    .style("padding", "5px")
                    .style("background-color" , "white")
                    .style("position", "absolute")
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY - 28 + "px")
                })
                .on('mouseout', function () {
                  divToolTip.style("opacity", 0).style("display", "none");
                });
              });
            },
            error: (err: any) => {
              console.log("Error on Request")
            },
            complete: () => {}
        });    
      },
      error: (err: any) => {
        console.log("Error on Request")
      },
      complete: () => {}
    });
  }

  refreshRankings(){
   this.service.get_ranking(this.rankingPollutant, this.datepipe.transform(this.rankingActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
    next: (response: any) => {
      this.rankingPollutant = response[0].pollutant
      this.rankingArray = response;
    },
    error: (err: any) => {
      console.log("Error on Request")
    },
    complete: () => {}

    })
  }

  changeInfoData(data: any){
   this.dataPollution = data[0];
   console.log(this.dataPollution)
   d3.select("#pollutantInfo").style("display", "none")
   d3.select("#infoaqitable").style("display", "none")
   d3.select("#locationData").style("display", "block")
   this.dataPollution.date_day_info = this.datepipe.transform(this.dataPollution.date_day_info, 'YYYY-MM-dd')?.toString()
  }

  changeForecastData(location_name: string, pollutant: string | null){
    this.service.get_forecast_date_range(location_name, pollutant).subscribe({
      next: (response: any) => {
        this.minDateForecast = response[0][0]
        this.maxDateForecast = response[0][1]
      },
      error: (err:any) => {
        console.log("Error on Request")  
      },
      complete: () => {}
    });
    this.service.get_forecast_data(this.datepipe.transform(this.forecastActualDate, 'YYYY-MM-dd')?.toString(), pollutant, location_name).subscribe({
      next: (response: any) => {
        this.dataForecastPollution = response[0]
        console.log(this.dataForecastPollution)
      },
      error: (err:any) => {
        console.log("Error on Request")  
      },
      complete: () => {}
    });
  }

  changeInfoStaticalData(location_name: string){
    this.service.get_location_statistical_data(location_name, this.datepipe.transform(this.dataPollutionActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
      next: (response: any) => {
        this.staticalDataPollution = response[0];
        let substring_date: string = this.staticalDataPollution["date_day_info"]
        this.staticalDataPollution["date_day_info"] = substring_date.substring(0, substring_date.length - 12)
      },
      error: (err:any) => {
        console.log("Error on Request")  
      },
      complete: () => {}
    });
  }

  refreshInfoData(){
    this.service.get_location_data(this.dataPollution.location_name, this.datepipe.transform(this.dataPollutionActualDate, 'YYYY-MM-dd')?.toString()).subscribe({
      next: (response: any) => {
        this.dataPollution = response[0];
        this.dataPollution.date_day_info = this.datepipe.transform(this.dataPollution.date_day_info, 'YYYY-MM-dd')?.toString()
      },
      error: (err: any) => {
        console.log("Error on Request")
      },
      complete: () => {}
  
      })
      this.changeInfoStaticalData(this.dataPollution.location_name)
  }
  
  showInfoPollution(){
    d3.select("#infoaqitable").style("display", "none")
    d3.select("#locationData").style("display", "none")
    d3.select("#forecastData").style("display", "none")
    d3.select("#pollutantInfo").style("display", "block")
  }

  showDataPollution(){
    d3.select("#pollutantInfo").style("display", "none")
    d3.select("#infoaqitable").style("display", "none")
    d3.select("#forecastData").style("display", "none")
    d3.select("#locationData").style("display", "block")
  }

  showForecastDataPollution(){
    d3.select("#locationData").style("display", "none")
    d3.select("#pollutantInfo").style("display", "none")
    d3.select("#infoaqitable").style("display", "none")
    d3.select("#forecastData").style("display", "block")
  }

  showAdditionalInfo(){
    d3.select("#locationData").style("display", "none")
    d3.select("#pollutantInfo").style("display", "none")
    d3.select("#forecastData").style("display", "none")
    d3.select("#infoaqitable").style("display", "block")
  }

  updateForecastData(){
    this.service.get_forecast_data(this.datepipe.transform(this.forecastActualDate, 'YYYY-MM-dd')?.toString(), this.selectedForecastPollutant, this.dataPollution.location_name).subscribe({
      next: (response: any) => {
        this.dataForecastPollution = response[0]
        console.log(this.dataForecastPollution)
      },
      error: (err:any) => {
        console.log("Error on Request")  
      },
      complete: () => {}
    });
    console.log()
  }
}
