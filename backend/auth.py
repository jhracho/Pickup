from flask import Blueprint, request
from sqlalchemy import insert
from flask_login import login_required, current_user, login_user, logout_user, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .db import Conn as conn
from hashlib import md5
from .gameapi import get_next_id

auth = Blueprint('auth', __name__)

@auth.route('/get-athlete-from-id', methods=['GET'])
def get_athlete_from_id():
    athlete_id = request.args.get('athlete_id')
    cursor = conn.cursor()
    sql = f'SELECT first_name, last_name, username, football_select, golf_select, basketball_select, soccer_select, other_select FROM athlete WHERE athlete_id = {athlete_id}'
    row = cursor.execute(sql).fetchone()
    if row:
        return {
            'result': 'success',
            'athlete': {
                'first_name': row[0],
                'last_name': row[1],
                'username': row[2],
                'football': row[3],
                'golf': row[4],
                'basketball': row[5],
                'soccer': row[6],
                'other': row[7]
            }
        }
    return {'result': 'error'}

# Log in a user based on supplied credentials
@auth.route('/login', methods=['POST'])
def login():
    # Get request data  
    username = request.json.get('username').lower()
    pswd = md5(request.json.get('password').encode()).hexdigest()

    if username is None or pswd is None:
        return {'auth':False, 'msg':'One or more fields is left empty...'}

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
    username = request.json.get('username').lower()
    first_name = request.json.get('first_name').title()
    last_name = request.json.get('last_name').title()
    password1 = md5(request.json.get('password1').encode()).hexdigest()
    password2 = md5(request.json.get('password2').encode()).hexdigest()

    if len(email) == 0 or len(username) == 0 or password1 == 'd41d8cd98f00b204e9800998ecf8427e' or password2 == 'd41d8cd98f00b204e9800998ecf8427e':
        return {'result': 'error', 'msg': 'One of more fields left blank.'}
    cursor = conn.cursor()
    sql = f'SELECT athlete_id FROM athlete WHERE username = :username'
    cursor.execute(sql, [username])
    row = cursor.fetchone()
    if row:
        return {'result': 'error', 'msg': 'Username is taken.'}
    if len(username) > 25:
        return {'result': 'error', 'msg': 'Username must be 25 characters or less.'}
    if len(password1) < 7:
        return {'result': 'error', 'msg': 'Password must be 7 or more characters.'}
    if password1 != password2:
        return {'result': 'error', 'msg': 'Passwords do not match.'}

    id = get_next_id('athlete')
    cursor = conn.cursor()
    sql = f"INSERT INTO athlete (athlete_id, first_name, last_name, username, password_hash, football_select, golf_select, basketball_select, soccer_select, other_select) VALUES ({id}, '{first_name}', '{last_name}', '{username}', '{password1}', 1, 1, 1, 1, 1)"
    cursor.execute(sql)
    conn.commit()
    return {'auth': True, 'athlete_id': id}

@auth.route('/isAuthed', methods=['GET'])
def isAuthed():
    if current_user:
        return {'isAuthed': 1, 'user': current_user}
    return {'isAuthed': 0}

@auth.route('/toggle-select', methods=['POST'])
def toggle_select():
    athlete_id = request.json.get('athlete_id')
    sport = request.json.get('select')
    cursor = conn.cursor()
    sql = f'SELECT {sport}_select FROM athlete WHERE athlete_id = {athlete_id}'
    cursor.execute(sql)
    select = cursor.fetchone()[0]
    select = (select + 1) % 2
    sql = f'UPDATE athlete SET {sport}_select = {select} WHERE athlete_id = {athlete_id}'
    cursor.execute(sql)
    conn.commit()

    return {'result': 'success'}