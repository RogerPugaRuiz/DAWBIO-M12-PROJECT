#Imports 

from Models.pollutionInfo import pollutionInfo

#Functions 

def stations_data_to_object(data: tuple) -> tuple:
    """ 
    Stations Data to object - Convert stations data to objects

    Parameters:
    data (tuple): Array of dicts 

    Returns:
    array_objects (tuple): Array of objects
    
    """
    array_objects = []
    for station in data:
        #Get info from dict to create object
        aqi = station["data"]["aqi"]
        dominant_pollution = station["data"]["dominentpol"]
        location_name = station["data"]["city"]["name"]
        date_day_info = extract_date(station["data"]["time"]["s"], "day")
        date_time_info = extract_date(station["data"]["time"]["s"], "hour") 
        latitude = station["data"]["city"]["geo"][0]
        longitude = station["data"]["city"]["geo"][1]
        #Get unique pollutants
        pollutants_dict = get_unique_pollutants()
        #Create a dict of pollutants to pass to the constructor of the object
        for pollutant, value in station["data"]["iaqi"].items():
            for index_pollutant in value.values():
                pollutants_dict[pollutant] = index_pollutant
        try:
            #Create object (pollutionInfo)
            result = pollutionInfo(aqi, dominant_pollution, location_name, date_day_info, date_time_info, latitude, longitude, pollutants_dict)
        except Exception as e:
            print("An exception occurred - " + format(e))
        array_objects.append(result)
    return array_objects
        
def get_unique_pollutants() -> dict:
    """ 
    Get unique pollutants - Get a dict with null values for unique pollutants 

    Returns:
    result (dict): Dict with pollutants as key, all values set to null
    
    """
    unique_pollutants = ['h', 'no2', 'p', 'pm10', 'pm25', 't', 'w', 'wg', 'co', 'o3', 'so2', 'dew', 'r']
    result  = dict()
    for value in unique_pollutants:
        result[value] = "NULL"
    return result   
        
def extract_date(date: str, option: str) -> str:
    """ 
    Extract date - Extract day or time from a date

    Parameters:
    date (str): Date (%yyyy-%mm-%dd %hh-%mm-%ss)
    option (str): Extract Option (day/hour) 

    Returns:
    result (str): day/hour String
    
    """
    result = ""
    if(option == "day"):
        array_date = date.split(" ")
        result = array_date[0]
    if(option == "hour"):
        array_date = date.split(" ")
        result = array_date[1]
    return result

def add_backslashes_in_special_characters(location_name: str) -> str:
    """ 
    Add backslashes in special characters - Add "\" before apostrophe characters

    Parameters:
    location_name: (string): Location Name

    Returns:
    result (string): Location Name with backslashes before apostrophe characters
    """
    result = location_name.replace("'", "''")
    return result