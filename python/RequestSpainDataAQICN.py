import utilsWAQIApi
import utilsDB
import utils


def get_unique_pollutants(array_data: tuple) -> tuple:
   unique_pollutants = []; 
   for single_data in array_data:
      for pollutant in single_data["data"]["iaqi"].keys():
            if pollutant not in unique_pollutants:
               unique_pollutants.append(pollutant)
   return unique_pollutants

def get_unique_date(array_data: tuple) -> tuple:
   unique_dates = []
   for single_data in array_data:
      if single_data["data"]["time"]["iso"] not in unique_dates:
            unique_dates.append(single_data["data"]["time"]["iso"])


   
# Main
# ---------------------------------------------------------------------
this_module: str = __name__
main_module: str = "__main__"

if this_module == main_module:
   #utilsDB.drop_database()
   #utilsDB.create_database()
   #utilsDB.create_air_pollution_table()
   #utilsDB.create_forecast_air_pollution_table()
   
   #Get spain data
   data: tuple = utilsWAQIApi.get_spain_stations_data()
   
   unique_pollutants = get_unique_pollutants(data)
   print(unique_pollutants)
   unique_dates = get_unique_date(data)
   print(unique_dates)
   
   #Convert data to object
   object = utils.stations_data_to_object(data)
   #Insert data
   utilsDB.insert_air_pollution_data(object)

# ---------------------------------------------------------------------