import mysql.connector as sql
from Models.pollutionInfo import pollutionInfo
import SQLQueries

# host: str = "spainairpollution.cnlzyfbmuh0e.us-east-1.rds.amazonaws.com"
# user: str = "admin"
# password: str = "admin1234"

host: str = "localhost"
user: str = "provenusr"
password: str = "provenpass"

#Preventing SQL Injection Attacks With Python
#Query

#string, tuple, numbers no mutable
def connection(db_name: str = ''):
    try:
        db = sql.connect(
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
    try:
        db = connection()
        cursor = db.cursor()
        cursor.execute(SQLQueries.create_database_query % (db_name))
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def drop_database(db_name: str = "spainAirPollution"):
    try:
        db = connection()
        cursor = db.cursor()
        cursor.execute(SQLQueries.drop_database_query % (db_name))
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def create_table_air_pollution():
    try:
        db = connection("spainAirPollution")
        cursor = db.cursor()
        cursor.execute(SQLQueries.create_table_air_pollution_query)
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def create_forecast_table_air_pollution():
    try:
        db = connection("spainAirPollution")
        cursor = db.cursor()
        cursor.execute(SQLQueries.create_forecast_table_air_pollution_query)
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))

def insert_pollution_air_info(array_object: tuple):
    try:
        db = connection("spainAirPollution")
        for pi in array_object:
            cursor = db.cursor(prepared=True)
            duplicated = check_duplicated(pi)
            if(duplicated == False):
                info_tuple = (pi.air_quality_level, pi.dominant_pollution, add_backslashes(pi.location_name), pi.date_day_info, pi.date_time_info, pi.latitude, pi.longitude
                                        , pi.no2, pi.pm10, pi.pm25, pi.co, pi.o3, pi.so2, pi.wg, pi.dew, pi.t, pi.w, pi.r, pi.p, pi.h)
                cursor.execute(SQLQueries.insert_query % info_tuple)   
            cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))

def check_duplicated(pi: pollutionInfo) -> bool:
    result = False
    try: 
        db = connection("spainAirPollution")
        cursor = db.cursor(prepared=True)
        info_tuple = (add_backslashes(pi.location_name), pi.date_day_info, pi.date_time_info)
        cursor.execute(SQLQueries.check_if_duplicated_info_pollution_query % info_tuple)
        if(len(cursor.fetchall()) != 0):   
            result = True
        print(cursor._executed)
        print(result)
        cursor.close()
        db.commit()    
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))
    return result
        
def add_backslashes(location_name: str) -> str:
    result = location_name.replace("'", "''")
    return result
    

        

    



