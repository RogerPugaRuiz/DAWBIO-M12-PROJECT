create_database_query: str = "CREATE DATABASE %s DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci"
drop_database_query: str = "DROP DATABASE %s"
create_table_air_pollution_query: str = """CREATE TABLE info_air_pollution (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    air_quality_level INTEGER(10) NOT NULL,
    dominant_pollution VARCHAR(20) NOT NULL, 
    location_name VARCHAR(180) NOT NULL,
    date_day_info DATE NOT NULL,
    date_time_info TIME NOT NULL,
    latitude DECIMAL(10,5) NOT NULL, 
    longitude DECIMAL(10,5) NOT NULL,
    no2 DECIMAL(10,1) DEFAULT NULL,
    pm10 DECIMAL(10,1) DEFAULT NULL,
    pm25 DECIMAL(10,1) DEFAULT NULL,
    co DECIMAL(10,1) DEFAULT NULL,
    o3 DECIMAL(10,1) DEFAULT NULL, 
    so2 DECIMAL(10,1) DEFAULT NULL, 
    wg DECIMAL(10,1) DEFAULT NULL, 
    dew DECIMAL(10,1) DEFAULT NULL,
    t DECIMAL(10,1) DEFAULT NULL, 
    w DECIMAL(10,1) DEFAULT NULL, 
    r DECIMAL(10,1) DEFAULT NULL,
    p DECIMAL(10,1) DEFAULT NULL,
    h DECIMAL(10,1) DEFAULT NULL 
) ENGINE InnoDb;"""
create_forecast_table_air_pollution_query: str = """CREATE TABLE forecast_air_pollution (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(180) NOT NULL,
    date_day_info DATE NOT NULL,
    pollutant VARCHAR(40) NOT NULL,
    avg INTEGER(5) DEFAULT NULL,
    max INTEGER(5) DEFAULT NULL,
    min INTEGER(5) DEFAULT NULL
) ENGINE InnoDb;"""
insert_query: str = """INSERT INTO info_air_pollution (air_quality_level, dominant_pollution, location_name, date_day_info, date_time_info, latitude, longitude,no2, pm10, pm25, co, o3, so2, wg, dew, t, w, r, p, h) VALUES ('%s', '%s', '%s', '%s', '%s', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""
check_if_duplicated_info_pollution_query: str = "SELECT * from info_air_pollution WHERE location_name = '%s' AND date_day_info = '%s' AND date_time_info = '%s'"