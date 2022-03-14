from flask import Blueprint, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from . import Session
from datetime import datetime
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('/', methods=['GET'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('views.home'))