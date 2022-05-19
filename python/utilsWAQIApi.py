from Models.pollutionInfo import pollutionInfo
from requests.models import Response
import requests
import json

#API AICN Token 
token: str = "8053d4771842a8790c2cd96798bc90f4292a983d"
#Create
r = requests.Session()


def get_station_feed_by_name(city: str) -> json:
    try:
        response: Response = r.get("https://api.waqi.info/feed/" + city + "/?token=" + token, timeout=20)
        content: json = response.json()
        return content
    except Exception as e:
        print("An exception occurred -  " + format(e))
        content: dict = dict()
        return content

def get_stations_name_by_coordinates(latitude_1: float, longitude_1: float, latitude_2: float, longitude_2: float) -> json:  
    try:
        response: Response = r.get("https://api.waqi.info/map/bounds?latlng=" + str(latitude_1) + "," + str(longitude_1) + "," + str(latitude_2) + "," + str(longitude_2) + "&networks=all&token=" + token, timeout=2.5)   
        content: json = response.json()
        return content
    except Exception as e:
        print("An exception occurred -  " + format(e))
        content: dict = dict()
        return content
    
def get_station_feed_by_coordinates(latitude: float, longitude: float) -> json: 
    try:
        response: Response = r.get("https://api.waqi.info/feed/geo:" + str(latitude) + ";" + str(longitude) + "/?token=" + token, timeout=20)   
        content: json = response.json()
        return content          
    except Exception as e:
        print("An exception occurred -  " + format(e))
        content: dict = dict()
        return content

def get_stations_data_by_coordinates(latitude_1: float , longitude_1: float, latitude_2: float, longitude_2: float) -> dict: 
    name_stations = get_stations_name_by_coordinates(latitude_1, longitude_1, latitude_2, longitude_2)
    data_stations = []
    for station in name_stations["data"]:
        if "spain" in station["station"]["name"].lower():
            dict = get_station_feed_by_coordinates(station["lat"], station["lon"])
            data_stations.append(dict)
            json_data = json.dumps(dict)
            jsonFile = open("info/" + dict["data"]["city"]["name"] + ".json", "w")
            jsonFile.write(json_data)
            jsonFile.close()
    return data_stations

def stations_data_to_object(data: tuple) -> tuple:
    array_objects = []
    for station in data:
        aqi = station["data"]["aqi"]
        dominant_pollution = station["data"]["dominentpol"]
        location_name = station["data"]["city"]["name"]
        date_day_info = extract_date(station["data"]["time"]["s"], "day")
        date_time_info = extract_date(station["data"]["time"]["s"], "hour") 
        latitude = station["data"]["city"]["geo"][0]
        longitude = station["data"]["city"]["geo"][1]
        pollutants_dict = unique_pollutants()
        for pollutant, value in station["data"]["iaqi"].items():
            for index_pollutant in value.values():
                pollutants_dict[pollutant] = index_pollutant
        try:
            result = pollutionInfo(aqi, dominant_pollution, location_name, date_day_info, date_time_info, latitude, longitude, pollutants_dict)
        except Exception as e:
            print("An exception occurred - " + format(e))
        array_objects.append(result)
    return array_objects
        
        
def extract_date(date: str, option: str) -> str:
    result = ""
    if(option == "day"):
        array_date = date.split(" ")
        result = array_date[0]
    if(option == "hour"):
        array_date = date.split(" ")
        result = array_date[1]
    return result

def unique_pollutants() -> dict:
    unique_pollutants = ['h', 'no2', 'p', 'pm10', 'pm25', 't', 'w', 'wg', 'co', 'o3', 'so2', 'dew', 'r']
    result  = dict()
    for value in unique_pollutants:
        result[value] = "NULL"
    return result
    
       