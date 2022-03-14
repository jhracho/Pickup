from flask import Flask
# from flask_login import LoginManager

engine = create_engine()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret'

    # login_manager = LoginManager()
    # login_manager.init_app(app)

    # @login_manager.user_loader
    # def load_user(user_id):
    #     return None

    return app