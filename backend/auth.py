from flask import Blueprint, request
from sqlalchemy import insert
from flask_login import login_required, current_user, login_user, logout_user, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .db import Conn as conn
from hashlib import md5
from .gameapi import get_next_id

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    # Get request data
    username = request.json.get('username').lower()
    pswd = md5(request.json.get('password').encode()).hexdigest()

    if username is None or pswd is None:
        return {'auth': False, 'msg': 'One or more fields is left empty...'}

    cursor = conn.cursor()
    sql = f'SELECT password_hash, athlete_id FROM athlete WHERE username = :username'
    cursor.execute(sql, [username])
    row = cursor.fetchone()
    if not row:
        return {'auth': False, 'msg': 'Incorrect username and/or password...'}
    pass_hash = row[0]
    if pass_hash == pswd:
        # athlete = Athlete(row)
        # login_user(athlete, remember=True)
        return {'auth': True, 'athlete_id': row[1]}
    else:
        return {'auth': False, 'msg': 'Incorrect username and/or password...'}


@auth.route('/logout', methods=['GET'])
def logout():
    return {'result': 'success'}


@auth.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email').lower()
    phone = request.json.get('phone')
    print(f'phone: -{phone}-')
    print(f'type {type(phone)}')
    username = request.json.get('username').lower()
    first_name = request.json.get('first_name').title()
    last_name = request.json.get('last_name').title()
    password1 = md5(request.json.get('password1').encode()).hexdigest()
    password2 = md5(request.json.get('password2').encode()).hexdigest()

    if len(email) == 0 or len(username) == 0 or password1 == 'd41d8cd98f00b204e9800998ecf8427e' or password2 == 'd41d8cd98f00b204e9800998ecf8427e':
        return {'result': 'error', 'msg': 'One or more fields left blank.'}
    cursor = conn.cursor()
    sql = f'SELECT athlete_id FROM athlete WHERE username = :username'
    cursor.execute(sql, [username])
    row = cursor.fetchone()
    if row:
        return {'result': 'error', 'msg': 'Username is taken.'}
    if len(username) > 25:
        return {'result': 'error', 'msg': 'Username must be 25 characters or less.'}
    if password1 != password2:
        return {'result': 'error', 'msg': 'Passwords do not match.'}
    
    id = get_next_id('athlete')
    cursor = conn.cursor()
    if phone == '':
        sql = f"INSERT INTO athlete (athlete_id, first_name, last_name, username, email, password_hash, football_select, golf_select, basketball_select, soccer_select, other_select, game_notif) VALUES ({id}, '{first_name}', '{last_name}', '{username}', '{email}', '{password1}', 1, 1, 1, 1, 1, 1, 1)"
    else:
        sql = f"INSERT INTO athlete (athlete_id, first_name, last_name, username, email, phone, password_hash, football_select, golf_select, basketball_select, soccer_select, other_select, team_notif) VALUES ({id}, '{first_name}', '{last_name}', '{username}', '{email}', '{phone}', '{password1}', 1, 1, 1, 1, 1, 1, 1)"
    cursor.execute(sql)
    conn.commit()
    return {'auth': True, 'athlete_id': id}


@auth.route('/isAuthed', methods=['GET'])
def isAuthed():
    if current_user:
        return {'isAuthed': 1, 'user': current_user}
    return {'isAuthed': 0}
