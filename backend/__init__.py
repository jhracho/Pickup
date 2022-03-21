from flask import Flask
from flask_cors import CORS

from .endpoints import endpoint
from .auth import auth

def create_app():
    cors = CORS()
    
    app = Flask(__name__)
    app.register_blueprint(endpoint, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    cors.init_app(app, support_credentials=True)

    return app