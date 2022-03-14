from flask import Blueprint, render_template
from flask_login import login_required, current_user
from . import Session
from .models import User, Game, Team, Location
from datetime import datetime

views = Blueprint('views', __name__)

@views.route('/home', methods=['GET'])
@login_required
def home(**kwargs):
    session = Session()