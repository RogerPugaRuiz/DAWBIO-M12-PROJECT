import { ConnectBackendApiServiceService } from '../services/connect-backend-api-service.service';
import { Component, OnInit } from '@angular/core'; 
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { GeometryObject, Topology } from 'topojson-specification';
import { timeThursdays } from 'd3';


@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  constructor(private service: ConnectBackendApiServiceService) { } 

  ngOnInit(): void {
    this.generateMap();
  }

  //Peninsula Map size 
  wmap: number = 750;
  hmap: number = 500;
  //Canary Islands Map size
  hCan: number = 120 ;
  wCan: number = 240;



  generateMap() {
        //Peninsula Map
        let projection: d3.GeoProjection = d3.geoMercator().translate([410,2140]).scale(2500);
        let path: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projection);
        let map: any = d3.select("#map").append("svg").attr("id", "peninsulaMap").attr("width", this.wmap).attr("height", this.hmap).style("border", "1px solid black");
        
        //Canary Island Map
        let  projectionCan: d3.GeoProjection = d3.geoMercator().translate([810, 1350]).scale(2500);
        let pathCan: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projectionCan);
        let mapCan: any = d3.select("#mapC").append("svg").attr("id", "isleMap").attr("width", this.wCan).attr("height", this.hCan).style("border", "1px solid black");

        //Zoom Functions
        map = map.call(d3.zoom().scaleExtent([1,6]).translateExtent([[0,0],[this.wmap,this.hmap]]).on("zoom", function(){
          map.attr("transform", d3.zoomTransform(map.node()))
        })).append("g");

        mapCan = mapCan.call(d3.zoom().scaleExtent([1,6]).translateExtent([[0,0],[this.wCan,this.hCan]]).on("zoom", function(){
          mapCan.attr("transform", d3.zoomTransform(mapCan.node()))
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
            .attr("fill", "#ffffff")
            .attr("stroke", "#202020")
            .attr("stroke-width", 0.6)
    
          //Canarias
          var isl = mapCan
            .selectAll("#mapC path")
            // @ts-ignore
            .data(prov.features)
            .enter()
            .append("path")
            .attr("class", "path")
            .attr("d", pathCan)
            .attr("fill", "#ffffff")
            .attr("stroke", "#202020")
            .attr("stroke-width", 0.6)
    
            this.service.get_locations_data().subscribe((array_data) => {
              array_data.forEach(element => {
                map
                .selectAll("circles")
                .data([[element[2], element[1]]])
                .enter()
                .append("circle")
                .attr("id", element[0])
                .attr("class", "circles")
                // @ts-ignore
                .attr("cx", function(d: any){ return projection(d)[0] })
                // @ts-ignore
                .attr("cy", function(d: any){ return projection(d)[1] })
                .attr("r", 2)
                .style("fill", "69b3a2")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .style('cursor', "pointer")
    
    
    
                mapCan
                .selectAll("circles")
                .data([[element[2], element[1]]])
                .enter()
                .append("circle")
                .attr("id", element[0])
                .attr("class", "circles")
                // @ts-ignore
                .attr("cx", function(d){return projectionCan(d)[0]})
                // @ts-ignore
                .attr("cy", function(d){ return projectionCan(d)[1] })
                .attr("r", 7)
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .attr("fill-opacity", .4)
                .style('cursor', "pointer")
    
                
              });
            });
        });
  }
  
}
