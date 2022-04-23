from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .gameapi import gameapi
from .auth import auth
from .userapi import userapi
#from .teamapi import teamapi

from .db import Conn as conn

def create_app():
    login_manager = LoginManager()
    cors = CORS()
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'pickup'

    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    app.register_blueprint(gameapi, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(userapi, url_prefix='/api')
    cors.init_app(app, support_credentials=True)

    @login_manager.user_loader
    def load_user(athlete_id):
        cursor = conn.cursor()
        cursor.execute('SELECT first_name, last_name, username, football_select, golf_select, basketball_select, soccer_select, other_select from athlete where ahtlete_id = :athlete_id', [athlete_id])
        row = cursor.fetchone()
        if row:
            return {
                'athlete_id': athlete_id,
                'first_name': row[0],
                'last_name': row[1],
                'username': row[2],
                'football_select': row[3],
                'golf_select': row[4],
                'basketball_select': row[5],
                'soccer_select': row[6],
                'other_select': row[7]
            }
        else:
            return None

    return app