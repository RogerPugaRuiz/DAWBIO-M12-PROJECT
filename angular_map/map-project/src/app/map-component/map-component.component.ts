import { ConnectBackendApiService } from '../services/connect-backend-api.service';
import { Component, OnInit } from '@angular/core'; 
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { timeThursdays } from 'd3';



@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  constructor(private service: ConnectBackendApiService) { } 

  ngOnInit(): void {
    this.createMap();
  }

  //Peninsula Map size 
  wmap: number = 750;
  hmap: number = 500;
  //Canary Islands Map size
  hCan: number = 120 ;
  wCan: number = 240;
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
    12: 0.9,
    13: 0.8,
    14: 0.7,
    15: 0.5
  } 
  

    createMap() {
      //Peninsula Map
      let projection: d3.GeoProjection = d3.geoMercator().translate([410,2140]).scale(2500);
      let path: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projection);
      let map: any = d3.select("#map").append("svg").attr("id", "peninsulaMap").attr("width", this.wmap).attr("height", this.hmap).style("border", "1px solid black").style("background-color", "#7fcdff");
      
      //Canary Island Map
      let projectionCan: d3.GeoProjection = d3.geoMercator().translate([810, 1350]).scale(2500);
      let pathCan: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projectionCan);
      let mapCan: any = d3.select("#mapC").append("svg").attr("id", "isleMap").attr("width", this.wCan).attr("height", this.hCan).style("border", "1px solid black").style("background-color", "#7fcdff").style("position", "absolute").style("top", "388px").style("left", "526px");

      //Zoom Functions
      map = map.call(d3.zoom().scaleExtent([1,15]).translateExtent([[0,0],[this.wmap,this.hmap]]).on("zoom", e => {
        map.attr("transform", d3.zoomTransform(map.node()))
        if(e.sourceEvent.wheelDelta < 0){
          console.log("zoom out")
          let scale = d3.zoomTransform(map.node()).k;
          let scale_int = Math.round(scale)
          d3.selectAll('.circlesPeninsula').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
        } else {
          let scale = d3.zoomTransform(map.node()).k;
          let scale_int = Math.round(scale)
          let actual_r = d3.selectAll('circle').attr('r')
          d3.selectAll('.circlesPeninsula').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])

        }
      })).append("g");


      mapCan = mapCan.call(d3.zoom().scaleExtent([1,15]).translateExtent([[0,0],[this.wCan,this.hCan]]).on("zoom", e =>{
        mapCan.attr("transform", d3.zoomTransform(mapCan.node()))
        if(e.sourceEvent.wheelDelta < 0){
          console.log("zoom out")
          let scale = d3.zoomTransform(mapCan.node()).k;
          let scale_int = Math.round(scale)
          d3.selectAll('.circlesCan').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])
        } else {
          let scale = d3.zoomTransform(mapCan.node()).k;
          let scale_int = Math.round(scale)
          let actual_r = d3.selectAll('circle').attr('r')
          d3.selectAll('.circlesCan').attr("r" , this.scale[scale_int]).attr("stroke-width", this.scale[scale_int])

        }
      })).append("g");

      d3.json("https://unpkg.com/es-atlas@0.5.0/es/provinces.json").then(data => {
        let data_f = (data as any);
        let prov = topojson.feature(data_f, data_f.objects["provinces"]);

        //Continente
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

        //Canarias
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
        
        this.service.get_locations_data().subscribe((array_data) => {
          this.service.locations_data = array_data
          array_data.forEach(element => {
            map
            .selectAll("circles")
            .data([[element[2], element[1]]])
            .enter()
            .append("circle")
            .attr("id", element[0])
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
            .on("click", (event: any) => {
              console.log(event.target.id)
                this.service.get_location_data(event.target.id).subscribe((data: any) => {
                console.log(data);
                });
            });

            mapCan
            .selectAll("circles")
            .data([[element[2], element[1]]])
            .enter()
            .append("circle")
            .attr("id", element[0])
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
            .on("click", function(event: any) {
              console.log(event.target.id)
            });
          });
        });
      });
    }
}
