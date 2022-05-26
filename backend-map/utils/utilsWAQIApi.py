#Imports

from requests.models import Response
import requests
import json

#AQICN Api Token 

token: str = "8053d4771842a8790c2cd96798bc90f4292a983d"

#Request Session

r = requests.Session()

#Api Requests Functions 

def get_station_feed_by_name(city: str) -> json:
    """ 
    Get Station Feed By Name - Returns json data about air pollution from the given city

    Parameters:
    city (string): City Name

    Returns:
    content (dict): Json/Dict with data
    
    """
    try:
        response: Response = r.get("https://api.waqi.info/feed/" + city + "/?token=" + token, timeout=20)
        content: json = response.json()
        return content
    except Exception as e:
        print("An exception occurred -  " + format(e))
        content: dict = dict()
        return content

def get_stations_name_by_coordinates(latitude_1: float, longitude_1: float, latitude_2: float, longitude_2: float) -> json:
    """ 
    Get Stations Name By Coordinates - Returns the names of the stations from an area determined by two locations 

    Parameters:
    latitude_1 (float): Latitude location 1 
    longitude_1 (float): Longitude location 1
    latitude_2 (float): Latitude location 2 
    longitude_2 (float): Longitude location 2

    Returns:
    content (dict): Json/Dict with data
    
    """
    try:
        response: Response = r.get("https://api.waqi.info/map/bounds?latlng=" + str(latitude_1) + "," + str(longitude_1) + "," + str(latitude_2) + "," + str(longitude_2) + "&networks=all&token=" + token, timeout=2.5)   
        content: json = response.json()
        return content
    except Exception as e:
        print("An exception occurred -  " + format(e))
        content: dict = dict()
        return content
    
def get_station_feed_by_coordinates(latitude: float, longitude: float) -> json:
    """ 
    Get Station Feed By Coordinates - Returns station data from a location

    Parameters:
    latitude_1 (float): Latitude location
    longitude_1 (float): Longitude location

    Returns:
    content (dict): Json/Dict with data
    
    """
    try:
        response: Response = r.get("https://api.waqi.info/feed/geo:" + str(latitude) + ";" + str(longitude) + "/?token=" + token, timeout=20)   
        content: json = response.json()
        return content          
    except Exception as e:
        print("An exception occurred -  " + format(e))
        content: dict = dict()
        return content

def get_spain_stations_data() -> tuple: 
    """ 
    Get Spain Stations Data By Coordinates - Returns the data of spain stations

    Returns:
    spain_stations_data (tuple): Tuple of Json/Dict with all spain data
    
    """
    spain_stations_name: json = get_stations_name_by_coordinates(44.87353007587014, -21.550816940495544, 26.345010525453212, 6.547298025887243)
    spain_stations_data: tuple = []
    progress_counter: int = 0
    for station in spain_stations_name["data"]:
        if "spain" in station["station"]["name"].lower(): #Get only spain data (340 stations)
            dict = get_station_feed_by_coordinates(station["lat"], station["lon"])
            spain_stations_data.append(dict)
            #Print progress counter
            progress_counter = progress_counter + 1
            print(str(progress_counter) + "/340" + "-" + dict["data"]["city"]["name"])
            print()
    return spain_stations_data    