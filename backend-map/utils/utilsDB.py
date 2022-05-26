#Imports

import mysql.connector as sql
import os


import decimal
from datetime import date, timedelta
from collections import OrderedDict

from Models.pollutionInfo import pollutionInfo
from Models.forecastPollutionInfo import forecastPollutionInfo

import SQL.SQLQueries as SQLQueries
import utils.utils as utils

# AWS DataBase connection parameters

# host: str = "spainairpollution.cnlzyfbmuh0e.us-east-1.rds.amazonaws.com"
# user: str = "admin"
# password: str = "admin1234"

# Local DataBase connection parameters 

host: str = "localhost"
user: str = "provenusr"
password: str = "provenpass"

#Database Functions

def connection(db_name: str = '') -> sql.MySQLConnection:
    """ 
    Connection Function - returns a MYSQL connection to a database

    Parameters:
    db_name (string): Name of the database to connect to

    Returns:
    db (sql.MySQLConnection): MYSQLConnection Object

    """
    try:
        db: sql.MySQLConnection = sql.connect(
            host=host,
            user=user,
            password=password,
            database=db_name
        )
        return db
    except Exception as e:
        print("An exception occurred - " + format(e))
        return None
        
def create_database(db_name: str = "spainAirPollution"):
    """ 
    Create Database Function - Create a database with the given name (default = "spainAirPollution")

    Parameters:
    db_name (string): Name of the database to create it
    
    """
    try:
        db: sql.MySQLConnection = connection()
        cursor = db.cursor()
        cursor.execute(SQLQueries.create_database_query % (db_name))
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def export_database(db_name: str = "spainAirPollution"):
    """ 
    Export Database Function - Export a database to SQL file with the given name (default = "spainAirPollution")

    Parameters:
    db_name (string): Name of the database to export
    
    """
    try:
        tuple_info = (user, password, db_name, db_name)
        os.system(SQLQueries.export_database_query % tuple_info)
    except Exception as e:
        print("An exception occurred - " + format(e))

def drop_database(db_name: str = "spainAirPollution"):
    """ 
    Drop Database Function - Drop a database with the given name (default = "spainAirPollution")

    Parameters:
    db_name (string): Name of the database to drop it
    
    """
    try:
        db: sql.MySQLConnection = connection()
        cursor = db.cursor()
        cursor.execute(SQLQueries.drop_database_query % (db_name))
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def create_air_pollution_table():
    """ 
    Create Air Pollution Table - Create air pollution table with the following parameters:
    
    id: int - Identifier (Primary Key)
    air_quality_level: int - AQI value
    dominant_pollution: string - Dominant Pollution 
    location_name: string - Name of the place where the data comes from
    date_day_info: date - Data date
    date_time_info: date - Data time
    latitude: float - Latitude where the data comes from
    longitude: float - Longitude where the data comes from
    no2: float - Nitrogen (converted to AQI levels from µg/m3 (EPA Standard)) 
    pm10: float - (Respirable particulate matter) Suspended particles between 2.5 and 10 microns in diameter (converted to AQI levels from µg/m3 (EPA Standard))
    pm25: float - (Fine particulate matter) Suspended particles less than 2.5 microns in diameter (converted to AQI levels from µg/m3 (EPA Standard))
    co: float - Carbon Monoxide (converted to AQI levels from µg/m3 (EPA Standard))
    o3: float - Ozone (converted to AQI levels from µg/m3 (EPA Standard))
    so2: float - Sulfur Dioxide (converted to AQI levels from µg/m3 (EPA Standard))
    wg: float - Static pressure (Pressure necessary to support a column of water) (iaqi)
    dew: float - Indirect indicator of contamination by particulate matter (iaqi)
    t: float - Temperature (Celsius)
    w: float - Wind (m/s)
    r: float - rain
    p: float - Pressure (Hectopascals)
    h: float - Humidity (%)
    
    """
    try:
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor()
        cursor.execute(SQLQueries.create_table_air_pollution_query)
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def create_forecast_air_pollution_table():
    """ 
    Create Forecast Air Pollution Table - Create forecast air pollution table with the following parameters:
    
    id: int - Identifier (Primary Key)
    location_name: string - Name of the place where the data comes from
    date_day_info: date - Data date
    pollutant: string - Pollutant name
    avg: int - Pollutant forecast avg value
    max: int - Pollutant forecast max value
    min: int - Pollutant forecast min value
    
    """
    try:
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor()
        cursor.execute(SQLQueries.create_forecast_table_air_pollution_query)
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))

def insert_air_pollution_data(array_object: tuple):
    """ 
    Insert Air Pollution Data - Insert rows into table info_air_pollution

    Parameters:
    array_object (tuple): Array of pollutioninfo objects

    """
    try:
        db: sql.MySQLConnection = connection("spainAirPollution")
        for pi in array_object:
            cursor = db.cursor(prepared=True)
            print("Inserting " + pi.location_name + " data")
            print("\t -Checking if " + pi.location_name + " data is already in dataBase...")
            duplicated: bool = check_duplicated_data_info_air_pollution(pi) #Check if the data is already in the database "info_air_pollution"
            if(duplicated == False):
                #Save object info into array
                info_tuple: tuple = (pi.air_quality_level, pi.dominant_pollution, utils.add_backslashes_in_special_characters(pi.location_name), pi.date_day_info, pi.date_time_info, pi.latitude, pi.longitude
                                        , pi.no2, pi.pm10, pi.pm25, pi.co, pi.o3, pi.so2, pi.wg, pi.dew, pi.t, pi.w, pi.r, pi.p, pi.h)
                cursor.execute(SQLQueries.insert_info_air_pollution_query % info_tuple)   
                print("\t\t -Data inserted")
            else:
                print("\t\t -Data not inserted")
            cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))

def insert_forecast_air_pollution_data(array_object: tuple):
    """ 
    Insert Forecast Air Pollution Data - Insert rows into table 'forecast_air_pollution'

    Parameters:
    array_object (tuple): Array of forecastPollutionInfo objects

    """
    try:
        db: sql.MySQLConnection = connection("spainAirPollution")
        for fpi in array_object:
            cursor = db.cursor(prepared=True)
            print("Inserting " + fpi.location_name + " forecast data")
            #Save object info into array
            info_tuple: tuple = (utils.add_backslashes_in_special_characters(fpi.location_name), fpi.date_day_info, fpi.pollutant, fpi.pollutant_avg, fpi.pollutant_max, fpi.pollutant_min)
            cursor.execute(SQLQueries.insert_info_forecast_air_pollution_query % info_tuple) 
            print("Data inserted")  
            cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))

def delete_duplicated_forecast_data(unique_location_names: tuple):
    """ 
    Delete forecast data - Delete rows with given location name in table 'forecast_air_pollution'
    
    Parameters:
    unique_location_names (tuple): Array with unique forecast location names
    
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        print("Deleting duplicate forecast data if exist...")
        for ufln in unique_location_names:
            cursor = db.cursor(prepared=True)
            cursor.execute(SQLQueries.delete_forecast_duplicated_data % utils.add_backslashes_in_special_characters(ufln))
            cursor.close()
            db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))

def check_duplicated_data_info_air_pollution(pi: pollutionInfo) -> bool:
    """ 
    Check duplicated data - Check if the data is already in the database "table info_air_pollution"

    Parameters:
    pi: (pollutionInfo Object): Pollution Info Object

    Returns:
    result (bool): False - If data not exist / True - If data exist
    
    """
    result = False
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (utils.add_backslashes_in_special_characters(pi.location_name), pi.date_day_info, pi.date_time_info)
        cursor.execute(SQLQueries.check_if_duplicated_info_air_pollution_query % info_tuple)
        if(len(cursor.fetchall()) != 0):   
            result = True
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result

def delete_duplicated_data_pollution():
    """ 
    Delete duplicated data - Delete duplicated rows in the database "table info_air_pollution"
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        print("Deleting duplicate data if exist...")
        cursor.execute(SQLQueries.delete_duplicated_rows)
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))

def get_all_air_pollution_data():
    """ 
    Get all air pollution data - Get all rows in database table "table info_air_pollution" and converted to dicts

    Returns:
    result_array (tuple): Array with all data
    
    """
    result_array = []
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.select_all_info_air_pollution_query)
        rows = cursor.fetchall()
        columnNames = [column[0] for column in cursor.description]
        for row in rows:
            dict_row = OrderedDict(zip(columnNames, row))
            for key, value in dict_row.items():
                if(type(value) == decimal.Decimal):
                    dict_row[key]= float(value)
                if(type(value) == date or type(value) == timedelta):
                    dict_row[key] = str(value)
            result_array.append(dict_row)
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result_array

def get_air_pollution_data(location_name: str, date: str):
    """ 
    Get air pollution data - Get pollution data given the location_name and the date

    Returns:
    result_array (tuple): Array with all data
    
    """
    result_array = []
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (utils.add_backslashes_in_special_characters(location_name), date)
        cursor.execute(SQLQueries.get_location_data_where_location_name_and_date % info_tuple)
        rows = cursor.fetchall()
        columnNames = [column[0] for column in cursor.description]
        for row in rows:
            dict_row = OrderedDict(zip(columnNames, row))
            for key, value in dict_row.items():
                if(type(value) == decimal.Decimal):
                    dict_row[key]= float(value)
                if(type(value) == date or type(value) == timedelta):
                    dict_row[key] = str(value)
            result_array.append(dict_row)
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result_array

def get_air_pollution_statistical_data(location_name: str, date: str):
    """ 
    Get air pollution statistical data - Get pollution statistical data (AVG, MAX, MIN) given the location_name and the date

    Returns:
    result_array (tuple): Array with all statistical data
    
    """
    result_array = []
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (utils.add_backslashes_in_special_characters(location_name), date)
        cursor.execute(SQLQueries.get_location_statistical_data_where_location_name_and_date % info_tuple)
        rows = cursor.fetchall()
        columnNames = [column[0] for column in cursor.description]
        for row in rows:
            dict_row = OrderedDict(zip(columnNames, row))
            for key, value in dict_row.items():
                if(type(value) == decimal.Decimal):
                    dict_row[key]= float(value)
                if(type(value) == date or type(value) == timedelta):
                    dict_row[key] = str(value)
            result_array.append(dict_row)
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result_array

def get_air_pollution_forecast_data(location_name: str ,pollutant: str, date: str):
    """ 
    Get air pollution forecast data - Get pollution forecast data given the pollutant, date and location_name

    Returns:
    result_array (tuple): Array with all statistical data
    
    """
    result_array = []
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (utils.add_backslashes_in_special_characters(location_name),pollutant, date)
        cursor.execute(SQLQueries.get_location_forecast_data_where_pollutant_and_date_and_location_date % info_tuple)
        rows = cursor.fetchall()
        columnNames = [column[0] for column in cursor.description]
        for row in rows:
            dict_row = OrderedDict(zip(columnNames, row))
            for key, value in dict_row.items():
                if(type(value) == decimal.Decimal):
                    dict_row[key]= float(value)
                if(type(value) == date or type(value) == timedelta):
                    dict_row[key] = str(value)
            result_array.append(dict_row)
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result_array




def get_unique_locations():
    """ 
    Get unique locations - Get unique locations in database table "info_air_pollution"

    Returns:
    unique_locations (tuple): Array with unique locations
    
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.get_unique_locations)
        unique_locations = cursor.fetchall()
        cursor.close()
        db.commit()    
        db.close()
        return unique_locations
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def get_unique_location_info_data():
    """ 
    Get unique locations info data - Get unique locations data in database table "info_air_pollution"

    Returns:
    unique_locations_data (tuple): Array with unique locations
    
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.get_unique_location_info_data)
        unique_locations_info_data = cursor.fetchall()
        cursor.close()
        db.commit()    
        db.close()
        return unique_locations_info_data
    except Exception as e:
        print("An exception occurred - " + format(e))

def get_rankings_data(pollutant: str, date: str):
    """ 
    Get rankings data - Get ranking data given the pollutant and the day

    Returns:
    result_array (tuple): Array with rankings
    
    """
    result_array = []
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (pollutant, pollutant , date, pollutant)
        cursor.execute(SQLQueries.get_rankings % info_tuple)
        rows = cursor.fetchall()
        columnNames = [column[0] for column in cursor.description]
        for row in rows:
            dict_row = OrderedDict(zip(columnNames, row))
            for key, value in dict_row.items():
                if(type(value) == decimal.Decimal):
                    dict_row[key]= float(value)
            result_array.append(dict_row)
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result_array

def get_nearest_location_data_date(location_name: str):
    """ 
    Get nearest location data date - Get the most recent data date with a given location in the database table 'info_air_pollution'

    Returns:
    most_recent_date (tuple): Array with most recent date
    
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (utils.add_backslashes_in_special_characters(location_name))
        cursor.execute(SQLQueries.get_nearest_location_data_date % info_tuple) 
        most_recent_date = cursor.fetchall()
        cursor.close()
        db.commit()    
        db.close()
        return most_recent_date
    except Exception as e:
        print("An exception occurred - " + format(e))

def get_ranking_date_range():
    """ 
    Get ranking date range - Get the minimum and maximum date of the data in the database table 'info_air_pollution'

    Returns:
    date_range (tuple): Array with max and min date
    
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.get_date_range)
        date_range = cursor.fetchall()
        cursor.close()
        db.commit()    
        db.close()
        return date_range
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def get_forecast_date_range(location_name: str, pollutant_name: str):
    """ 
    Get forecast date range - Get the minimum and maximum date of the data in the database table 'forecast_air_pollution' with the given location and pollutant

    Returns:
    unique_locations_data (tuple): Array with max and min date
    
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (utils.add_backslashes_in_special_characters(location_name), pollutant_name)
        cursor.execute(SQLQueries.get_forecast_date_range % info_tuple)
        date_range = cursor.fetchall()
        cursor.close()
        db.commit()    
        db.close()
        return date_range
    except Exception as e:
        print("An exception occurred - " + format(e))