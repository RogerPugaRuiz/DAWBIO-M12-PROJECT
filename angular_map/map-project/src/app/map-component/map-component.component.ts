import { ConnectBackendApiServiceService } from '../services/connect-backend-api-service.service';
import { Component, OnInit } from '@angular/core'; 
import * as d3 from "d3";
import * as topojson from "topojson-client";


@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  constructor(private service: ConnectBackendApiServiceService) { }

  ngOnInit(): void {
    //Peninsula Map size 
    var wmap = 600;
    var hmap = 520;
    //Canary Islands Map size
    var hCan = 100;
    var wCan = 240;

    //Peninsula Map
    var projection = d3.geoMercator().translate([410,2140]).scale(2500);
    var path = d3.geoPath().projection(projection);
    var map = d3.select("#map").append("svg").attr("width", wmap).attr("height", hmap).style("border", "1px solid black");

    //Canary Island Map
    var projectionCan = d3.geoMercator().translate([810, 1350]).scale(2500);
    var pathCan = d3.geoPath().projection(projectionCan);
    var mapCan = d3.select("#mapC").append("svg").attr("width", wCan).attr("height", hCan).style("border", "1px solid black");

    // @ts-ignore
    d3.json("https://unpkg.com/es-atlas@0.5.0/es/provinces.json").then(data => {
      // @ts-ignore
      var us = topojson.feature(data, data.objects["provinces"]);

      //Continente
      var cont = map
        .selectAll("#map path")
        // @ts-ignore
        .data(us.features)
        .enter()
        .append("path")
        .attr("class", "path")
        // @ts-ignore
        .attr("d", path)
        .attr("fill", "#ffffff")
        .attr("stroke", "#202020")
        .attr("stroke-width", 0.6)

      //Canarias
      var isl = mapCan
        .selectAll("#mapC path")
        // @ts-ignore
        .data(us.features)
        .enter()
        .append("path")
        .attr("class", "path")
        // @ts-ignore
        .attr("d", pathCan)
        .attr("fill", "#ffffff")
        .attr("stroke", "#202020")
        .attr("stroke-width", 0.6)


        this.service.get_locations_data().subscribe((array_data) => {
    
          array_data.forEach(element => {
            map
            .selectAll("circles")
            // @ts-ignore
            .data([[element[2], element[1]]])
            .enter()
            .append("circle")
            .attr("class", "path")
            // @ts-ignore
            .attr("cx", function(d){return projection(d)[0]})
            // @ts-ignore
            .attr("cy", function(d){ return projection(d)[1] })
            .attr("r", 2)
            .style("fill", "69b3a2")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            


            mapCan
            .selectAll("circles")
            // @ts-ignore
            .data([[element[2], element[1]]])
            .enter()
            .append("circle")
            .attr("class", "path")
            // @ts-ignore
            .attr("cx", function(d){return projection(d)[0]})
            // @ts-ignore
            .attr("cy", function(d){ return projection(d)[1] })
            .attr("r", 7)
            .style("fill", "69b3a2")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)

            
          });
        });


    });


  }

}
