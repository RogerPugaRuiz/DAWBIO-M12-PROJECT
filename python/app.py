from flask import Flask, jsonify, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS, cross_origin

import datetime 

import utilsDB

app = Flask(__name__)
cors = CORS(app, resources={r"/*":{"origins": "http://localhost:4200"}})
app.config['JSON_SORT_KEYS'] = False
limiter = Limiter(app,key_func=get_remote_address)

@app.route("/")
@limiter.limit("10/second")
def mainPage():
    return "API Main Page"

@app.route("/getData/<location_name>")
@limiter.limit("10/second")
def getLocationData(location_name):
    return location_name

@app.route("/getAllData")
@limiter.limit("10/second")
def getAllData():
    return jsonify(utilsDB.get_all_air_pollution_data())

@app.route("/getData", methods=['POST'])
@limiter.limit("10/second")
def getData():
    location_name = ""
    if(request.method == 'POST'):
        location_name = request.json['location_name']
        current_date = datetime.datetime.now()
    return jsonify(utilsDB.get_air_pollution_data(location_name, current_date.strftime("%y-%m-%d")))

@app.route("/getUniqueLocations")
@limiter.limit("10/second")
def getUniqueLocations():
    return jsonify(utilsDB.get_unique_locations())

@app.route("/getUniqueLocationsInfoData")
@limiter.limit("10/second")
def getUniqueLocationsInfoData():
    return jsonify(utilsDB.get_unique_location_info_data())

# Main
# ---------------------------------------------------------------------
this_module: str = __name__
main_module: str = "__main__"

if this_module == main_module:
    app.run(host="localhost", port=8085, debug=True)