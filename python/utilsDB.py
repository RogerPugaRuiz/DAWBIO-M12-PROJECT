import mysql.connector as sql

host: str = "localhost"
user: str = "provenusr"
password: str = "provenpass"

#Preventing SQL Injection Attacks With Python


#string, tuple, numbers no mutable
def connection(db_name: str = ''):
    try:
        db = sql.connect(
            host=host,
            user=user,
            password=password,
            database= db_name
        )
        return db
    except Exception as e:
        print("An exception occurred - " + format(e))
        return None
        
def create_database(db_name: str = "spain_air_pollution"):
    try:
        db = connection()
        cursor = db.cursor()
        cursor.execute("""CREATE DATABASE %s 
                            DEFAULT CHARACTER SET utf8
                            DEFAULT COLLATE utf8_general_ci""" % (db_name,))
        print(cursor.fetchall())
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def drop_database(db_name: str = "spain_air_pollution"):
    try:
        db = connection()
        cursor = db.cursor()
        cursor.execute("""DROP DATABASE %s""" % (db_name,))
    except Exception as e:
        print("An exception occurred - " + format(e))
        
def create_tables():
    try:
        db = connection("spain_air_pollution")
        cursor = db.cursor()
        cursor.execute("""CREATE TABLE info_air_pollution (
                            id INTEGER PRIMARY KEY AUTO_INCREMENT,
                            air_quality_level INTEGER(4) NOT NULL,
                            dominant_pollution VARCHAR(10) NOT NULL, 
                            location_name VARCHAR(120) NOT NULL,
                            date_day_info DATE NOT NULL,
                            date_time_info TIME NOT NULL,
                            latitude DECIMAL(7,4) NOT NULL, 
                            longitude DECIMAL(7,4) NOT NULL,
                            no2 DECIMAL(5,1) DEFAULT NULL,
                            pm10 DECIMAL(5,1) DEFAULT NULL,
                            pm25 DECIMAL(5,1) DEFAULT NULL,
                            co DECIMAL(5,1) DEFAULT NULL,
                            o3 DECIMAL(5,1) DEFAULT NULL, 
                            so2 DECIMAL(5,1) DEFAULT NULL, 
                            wg DECIMAL(5,1) DEFAULT NULL, 
                            dew DECIMAL(5,1) DEFAULT NULL,
                            t DECIMAL(4,1) DEFAULT NULL, 
                            w DECIMAL(4,1) DEFAULT NULL, 
                            r DECIMAL(4,1) DEFAULT NULL,
                            p DECIMAL(5,1) DEFAULT NULL,
                            h DECIMAL(4,1) DEFAULT NULL 
                        ) ENGINE InnoDb;""")
    except Exception as e:
        print("An exception occurred - " + format(e))

