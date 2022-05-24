import utilsWAQIApi
import utilsDB
import utils
   
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
   #Convert data to object
   object = utils.stations_data_to_object(data)
   #Insert data
   utilsDB.insert_air_pollution_data(object)
# ---------------------------------------------------------------------