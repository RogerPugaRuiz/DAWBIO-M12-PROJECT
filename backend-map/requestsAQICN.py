#Imports

import utils.utilsWAQIApi as utilsWAQIApi
import utils.utilsDB as utilsDB
import utils.utils as utils


# Main
# ---------------------------------------------------------------------

this_module: str = __name__
main_module: str = "__main__"

if this_module == main_module:
   
   # DataBase Create Functions
   
   #utilsDB.drop_database()
   #utilsDB.create_database()
   #utilsDB.create_users_table()
   #utilsDB.create_air_pollution_table()
   #utilsDB.create_forecast_air_pollution_table()
   
   #Get spain data
   data: tuple = utilsWAQIApi.get_spain_stations_data()
   
   #Convert data to object
   objectsPollution = utils.stations_data_to_object(data)
   objectsForecast = utils.stations_forecast_data_to_object(data)
   
   #Get unique locations name from forecast data
   unique_forecast_location_name = utils.get_unique_forecast_data_locations(data)
   #Delete forecast data duplicated  
   utilsDB.delete_duplicated_forecast_data(unique_forecast_location_name)
   #Insert data
   utilsDB.insert_air_pollution_data(objectsPollution)
   utilsDB.insert_forecast_air_pollution_data(objectsForecast)
   #Delete duplicated data (in case a duplicate row has been inserted by mistake)
   utilsDB.delete_duplicated_data_pollution()
   #Export database to sql file
   utilsDB.export_database()
# ---------------------------------------------------------------------