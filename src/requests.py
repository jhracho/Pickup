from flask import Blueprint, request, flash, redirect, url_for, json, jsonify
from flask_login import login_required, current_user
from . import Session
from .models import User, Game, Team, Location
from datetime import datetime

requests = Blueprint('requests', __name__)