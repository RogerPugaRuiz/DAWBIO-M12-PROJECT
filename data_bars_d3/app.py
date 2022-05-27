from crypt import methods
from flask import Flask, jsonify, render_template, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS, cross_origin



import datetime 
import json
import pandas as pd
import csv

import utilsDB.utilsDB as utilsDB
app = Flask(__name__)
limiter = Limiter(app,key_func=get_remote_address)
app.config['JSON_SORT_KEYS'] = False

@app.route("/")
@limiter.limit("30/second")
def mainPage():
    return "API Main Page" 


@app.route("/createDatabase")
@limiter.limit("30/second")
def CreateDatabase():
    utilsDB.create_database('pollutionAgriculture')
    return "Database Created" 

# @app.route('/predict', methods=['GET', 'POST'])

# def predict() :    
#     json_ = request.json
#     new = pd.read_csv('CW_Agriculture_area.csv')
#     json_vector = new.transform(json_)
#     query = pd.DataFrame(json_vector)
#     prediction = regr.predict(query)
#     return json.dumps({'prediction': list({{prediction}})})

# if __name__ == '__main__' :
#      regr = joblib.load('model.pkl')
#      app.run(port=8080, debug=True)



# @app.route('/',methods=['GET','POST'])
# def index():
#     return render_template('index.html')

# @app.route('/data',methods=['GET','POST'])
# def data():
#     if request.method == 'POST':
#         f = request.form['csvfile']
#         data = []
#         with open(f) as file:
#             csvfile =csv.reader(file)
#             for row in csvfile:
#                 data.append(row)
#         return render_template('data.html', data=data)


# Main
# ---------------------------------------------------------------------
this_module: str = __name__
main_module: str = "__main__"

if this_module == main_module:
    app.run(host="localhost", port=8085, debug=True)
    