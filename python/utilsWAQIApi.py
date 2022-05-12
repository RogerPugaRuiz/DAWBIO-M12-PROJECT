from requests.models import Response
import requests
import json
import pprint

#Token
token: str = "8053d4771842a8790c2cd96798bc90f4292a983d"
#Create requests Session
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
            json_data = json.dumps(dict)
            jsonFile = open("info/" + dict["data"]["city"]["name"] + ".json", "w")
            jsonFile.write(json_data)
            jsonFile.close()
            data_stations.append(dict)
    return data_stations