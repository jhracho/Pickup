from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .endpoints import endpoint
from .auth import auth

import cx_Oracle

def create_app():
    # login_manager = LoginManager()
    cors = CORS()
    app = Flask(__name__)

    # login_manager.login_view = 'auth.login'
    # login_manager.init_app(app)

    app.register_blueprint(endpoint, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/api')
    cors.init_app(app, support_credentials=True)

    return app