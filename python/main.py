import utilsWAQIApi
import utilsDB
import pprint

import json
import glob

def read_json_get_unique_pollutants():
   files = glob.glob('info/*', recursive=True)
   unique_pollutants = []
   numFiles = 0; 
   for single_file in files:
      numFiles = numFiles + 1 
      with open(single_file, 'r') as f:
         try:
            json_file = json.load(f)
            for pollutant in json_file["data"]["iaqi"].keys():
               if pollutant not in unique_pollutants:
                  unique_pollutants.append(pollutant)
         except Exception as e:
            print("An exception occurred - " + format(e))
   pprint.pprint(numFiles)
   pprint.pprint(unique_pollutants)
   """
   Pepe
   Result ->
   """
def read_json_get_unique_date():
   files = glob.glob('info/*', recursive=True)
   unique_dates = []
   numFiles = 0; 
   for single_file in files:
      numFiles = numFiles + 1 
      with open(single_file, 'r') as f:
         try:
            json_file = json.load(f)
            pprint.pprint(json_file)
            if json_file["data"]["time"]["iso"] not in unique_dates:
               unique_dates.append(json_file["data"]["time"]["iso"])
         except Exception as e:
            print("An exception occurred - " + format(e))
   pprint.pprint(numFiles)
   pprint.pprint(unique_dates)
   
def read_data_to_tuple():
   files = glob.glob('info/*', recursive=True)
   data = [] 
   for single_file in files: 
      with open(single_file, 'r') as f:
         try:
            json_file = json.load(f)
            data.append(json_file)
         except Exception as e:
            print("An exception occurred - " + format(e))
   return data; 
   
# Main
# ---------------------------------------------------------------------
this_module: str = __name__
main_module: str = "__main__"

if this_module == main_module:
   #utilsDB.drop_database()
   #utilsDB.create_database()
   # Create tables info_air_pollution and forecast_air_polution in database 
   #utilsDB.create_table_air_pollution()
   #utilsDB.create_forecast_table_air_pollution()
   
   data = utilsWAQIApi.get_stations_data_by_coordinates(44.87353007587014, -21.550816940495544, 26.345010525453212, 6.547298025887243)
   object = utilsWAQIApi.stations_data_to_object(data)
   utilsDB.insert_pollution_air_info(object)
   
   #read_json_get_unique_pollutants()
   #read_json_get_unique_date()
# ---------------------------------------------------------------------