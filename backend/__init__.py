from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .endpoints import endpoint
from .auth import auth

'''
engine = create_engine()
Session = sessionmaker(bind=engine)
'''

def create_app():
    cors = CORS()
    
    app = Flask(__name__)
    app.register_blueprint(endpoint, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/api')
    cors.init_app(app, support_credentials=True)

    return app