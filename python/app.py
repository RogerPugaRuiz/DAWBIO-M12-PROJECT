from flask import Flask
from flask import jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

import utilsDB

app = Flask(__name__)
limiter = Limiter(app,key_func=get_remote_address)


@app.route("/")
@limiter.limit("10/second")
def hello_world():
    return "<p>Hello, World!</p>"

# Main
# ---------------------------------------------------------------------
this_module: str = __name__
main_module: str = "__main__"

if this_module == main_module:
    app.run(host="ApiAQICNData.localhost", port=8085, debug=True)