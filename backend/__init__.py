from flask import Flask
from flask_cors import CORS

from .endpoints import endpoint

def create_app():
    cors = CORS()
    
    app = Flask(__name__)
    app.register_blueprint(endpoint, url_prefix='/')
    cors.init_app(app)

    return app