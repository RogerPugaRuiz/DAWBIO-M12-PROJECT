#Imports

from flask import Flask, jsonify, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS, cross_origin

import datetime 
import json

import utils.utilsDB as utilsDB

#Flask Settings

app = Flask(__name__)
cors = CORS(app, resources={r"/*":{"origins": "http://localhost:4200"}})
app.config['JSON_SORT_KEYS'] = False
limiter = Limiter(app,key_func=get_remote_address)

#Flask routes

@app.route("/")
@limiter.limit("30/second")
def mainPage():
    return "API Main Page"

@app.route("/login", methods=['POST'])
@limiter.limit("30/second")
def login():
    username = ""
    password = ""
    if(request.method == 'POST'):
        username = request.json['username']
        password = request.json['password']
    return jsonify(utilsDB.login(username, password))
     
@app.route("/GeoJson/provinces")
@limiter.limit("30/second")
def getGeoJSONProvinces():
    json_file = open("data/provinces.json")
    json_object = json.load(json_file)
    json_file.close()
    return jsonify(json_object)

@app.route("/GeoJson/autonomous_regions")
@limiter.limit("30/second")
def getGeoJSONAutonomousRegions():
    json_file = open("data/autonomous_regions.json")
    json_object = json.load(json_file)
    json_file.close()
    return jsonify(json_object)

@app.route("/getAllData")
@limiter.limit("30/second")
def getAllData():
    return jsonify(utilsDB.get_all_air_pollution_data())

@app.route("/getData", methods=['POST'])
@limiter.limit("30/second")
def getData():
    location_name = ""
    date = ""
    if(request.method == 'POST'):
        location_name = request.json['location_name']
        date = request.json['date']
    return jsonify(utilsDB.get_air_pollution_data(location_name, date))

@app.route("/getStatisticalData", methods=['POST'])
@limiter.limit("30/second")
def getStatisticalData():
    location_name = ""
    date = ""
    if(request.method == 'POST'):
        location_name = request.json['location_name']
        date = request.json['date']
    return jsonify(utilsDB.get_air_pollution_statistical_data(location_name, date))

@app.route("/getForecastData", methods=['POST'])
@limiter.limit("30/second")
def getForecastData():
    location_name = ""
    pollutant = ""
    date = ""
    if(request.method == 'POST'):
        location_name = request.json['location_name']
        pollutant = request.json['pollutant_name']
        date = request.json['date']
    return jsonify(utilsDB.get_air_pollution_forecast_data(location_name,pollutant, date))

@app.route("/getNearestLocationDataDate", methods=['POST'])
@limiter.limit("30/second")
def getNearestLocationDataDate():
    location_name = ""
    if(request.method == 'POST'):
        location_name = request.json['location_name']
    return jsonify(utilsDB.get_nearest_location_data_date(location_name))

@app.route("/getRankings", methods=['POST'])
@limiter.limit("30/second")
def getRankings():
    pollutant = ""
    if(request.method == 'POST'):
        pollutant = request.json['pollutant']
        date = request.json['date']
    return jsonify(utilsDB.get_rankings_data(pollutant, date))

@app.route("/getUniqueLocations")
@limiter.limit("30/second")
def getUniqueLocations():
    return jsonify(utilsDB.get_unique_locations())

@app.route("/getUniqueLocationsInfoData")
@limiter.limit("30/second")
def getUniqueLocationsInfoData():
    return jsonify(utilsDB.get_unique_location_info_data())

@app.route("/getRankingDateRange")
@limiter.limit("30/second")
def getDateRange():
    return jsonify(utilsDB.get_ranking_date_range())

@app.route("/getForecastDateRange", methods=['POST'])
@limiter.limit("30/second")
def getForecastDateRange():
    location = ""
    pollutant = ""
    if(request.method == 'POST'):
        location = request.json['location_name']
        pollutant = request.json['pollutant_name']
    return jsonify(utilsDB.get_forecast_date_range(location, pollutant))




# Main
# ---------------------------------------------------------------------
this_module: str = __name__
main_module: str = "__main__"

if this_module == main_module:
    app.run(host="localhost", port=8085, debug=True)