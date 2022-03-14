from flask import Flask
# from flask_login import LoginManager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

### Link database to sqlalchemy to use classes and orm
engine = create_engine()
Session = sessionmaker(bind=engine)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret'

    from .views import views
    from .auth import auth
    from .requests import requests

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(requests, url_prefix='/')

    from .models import Base, User
    Base.metadata.create_all(bind=engine)

    ### Login Manager to control access to login required pages
    # login_manager = LoginManager()
    # login_manager.init_app(app)

    # @login_manager.user_loader
    # def load_user(user_id):
    #     return None

    return app