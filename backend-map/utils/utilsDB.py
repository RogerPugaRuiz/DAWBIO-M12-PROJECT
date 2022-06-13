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

def login(username: str, password: str):
    """
    Login - Return an user if is user is in database
    
    Parameters
        username (str): User Name string
        password (str): User Password string

    Returns:
        user(obj): User object if found
    """
    result_array = []
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple: tuple = (username, password)
        cursor.execute(SQLQueries.login_query, info_tuple)
        users = cursor.fetchall()
        columnNames = [column[0] for column in cursor.description]
        for row in users:
            user = OrderedDict(zip(columnNames, row))
            result_array.append(user)
        cursor.close()
        db.commit()    
        db.close()
        return result_array
    except Exception as e:
        print("An exception occurred - " + format(e))
   
def saveProcessPid(pid: int):
    """
    Save Process Pid - Save the pid of the script task in the database
    
    Parameters
        pid (int): PID of the script task
        
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.pid_delete_query)
        cursor.close()
        
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.pid_insert_query, (pid,))
        cursor.close()
        
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def getProcessPid():
    """
    Get Process Pid - Get the pid of the script task from the database
    
    Returns:
        pid (tuple): PID of the script task
        
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.pid_select_query)
        result = cursor.fetchone()
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result

def getScriptCount():
    """
    Get Script Count - Get times that script executed
    
    Returns:
        scriptcount (tuple): Times that script executed
        
    """
    try: 
        db: sql.MySQLConnection = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        cursor.execute(SQLQueries.script_count_query)
        scriptcount = cursor.fetchone()
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return scriptcount
        
def export_database(db_name: str = "spainAirPollution"):
    """ 
    Export Database Function - Export a database to SQL file with the given name (default = "spainAirPollution")

    Parameters:
    db_name (string): Name of the database to export
    
    """
    try:
        tuple_info = (user, password, db_name, db_name)
        print("Exporting DB to SQL file...")
        os.system(SQLQueries.export_database_query % tuple_info)
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
        #Iterate array_object
        print("Inserting info air pollution data...")
        for pi in array_object:
            cursor = db.cursor(prepared=True)
            ##Check if rows is already in the database "info_air_pollution"
            #duplicated: bool = check_duplicated_data_info_air_pollution(pi)
            #Save object info into array
            info_tuple: tuple = (pi.air_quality_level, pi.dominant_pollution, utils.add_backslashes_in_special_characters(pi.location_name), pi.date_day_info, pi.date_time_info, pi.latitude, pi.longitude
                                    , pi.no2, pi.pm10, pi.pm25, pi.co, pi.o3, pi.so2, pi.wg, pi.dew, pi.t, pi.w, pi.r, pi.p, pi.h)
            cursor.execute(SQLQueries.insert_info_air_pollution_query % info_tuple)   
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
        print("Inserting forecast data...")
        for fpi in array_object:
            cursor = db.cursor(prepared=True)
            #Save object info into array
            info_tuple: tuple = (utils.add_backslashes_in_special_characters(fpi.location_name), fpi.date_day_info, fpi.pollutant, fpi.pollutant_avg, fpi.pollutant_max, fpi.pollutant_min)
            cursor.execute(SQLQueries.insert_info_forecast_air_pollution_query % info_tuple) 
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
        #Iterate array with location names
        for ufln in unique_location_names:
            cursor = db.cursor(prepared=True)
            cursor.execute(SQLQueries.delete_forecast_duplicated_data, (utils.add_backslashes_in_special_characters(ufln),))
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
        cursor.execute(SQLQueries.check_if_duplicated_info_air_pollution_query, info_tuple)
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
        cursor.execute(SQLQueries.get_location_data_where_location_name_and_date, info_tuple)
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
        cursor.execute(SQLQueries.get_location_statistical_data_where_location_name_and_date, info_tuple)
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
        cursor.execute(SQLQueries.get_location_forecast_data_where_pollutant_and_date_and_location_date, info_tuple)
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
        info_tuple: tuple = (utils.add_backslashes_in_special_characters(location_name),)
        cursor.execute(SQLQueries.get_nearest_location_data_date, info_tuple) 
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
        cursor.execute(SQLQueries.get_forecast_date_range, info_tuple)
        date_range = cursor.fetchall()
        cursor.close()
        db.commit()    
        db.close()
        return date_range
    except Exception as e:
        print("An exception occurred - " + format(e))