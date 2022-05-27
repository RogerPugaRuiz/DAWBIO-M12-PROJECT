import mysql.connector as sql


host: str = "localhost"
user: str = "provenusr"
password: str = "provenpass"

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

def create_database(db_name: str = "pollutionAgriculture"):
    """ 
    Create Database Function - Create a database with the given name (default = "pollutionAgriculture")

    Parameters:
    db_name (string): Name of the database to create it

    """
    try:
        db: sql.MySQLConnection = connection()
        cursor = db.cursor()
        cursor.execute('CREATE DATABASE %s DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci' % (db_name))
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))


def create_tables():
    """ 
    Create Database Function - Create a database with the given name (default = "pollutionAgriculture")

    Parameters:
    db_name (string): Name of the database to create it

    """
    try:
        db: sql.MySQLConnection = connection()
        cursor = db.cursor()
        cursor.execute("""CREATE TABLE data_agriculture (area VARCHAR(5), )""")
        db.commit()
        cursor.close()
        db.close()
    except Exception as e:
        print("An exception occurred - " + format(e))


