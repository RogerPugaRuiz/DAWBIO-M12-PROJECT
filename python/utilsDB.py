#Imports

import mysql.connector as sql

import pprint

import decimal
from datetime import date, timedelta
from collections import OrderedDict

from Models.pollutionInfo import pollutionInfo

import SQLQueries
import utils

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
            duplicated: bool = check_duplicated_data_info_air_pollution(pi) #Check if the data is already in the database "info_air_pollution"
            if(duplicated == False):
                #Save object info into array
                info_tuple: tuple = (pi.air_quality_level, pi.dominant_pollution, utils.add_backslashes_in_special_characters(pi.location_name), pi.date_day_info, pi.date_time_info, pi.latitude, pi.longitude
                                        , pi.no2, pi.pm10, pi.pm25, pi.co, pi.o3, pi.so2, pi.wg, pi.dew, pi.t, pi.w, pi.r, pi.p, pi.h)
                cursor.execute(SQLQueries.insert_info_air_pollution_query % info_tuple)   
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

def get_unique_locations():
    """ 
    Get unique locations - Get unique locations in database table "info_air_pollution"

    Returns:
    unique locations (tuple): Array with unique locations
    
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
        rows = cursor.fetch
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