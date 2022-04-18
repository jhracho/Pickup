from flask import Blueprint, request
from .db import Conn as conn

userapi = Blueprint('userapi', __name__)

@userapi.route('/toggle-select', methods=['POST'])
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

@userapi.route('/get-athlete-from-id', methods=['GET'])
def get_athlete_from_id():
    athlete_id = request.args.get('athlete_id')
    cursor = conn.cursor()
    sql = f'SELECT first_name, last_name, username, football_select, golf_select, basketball_select, soccer_select, other_select FROM athlete WHERE athlete_id = {athlete_id}'
    cursor.execute(sql)
    row = cursor.fetchone()
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

@userapi.route('/get-user-basic-info', methods=['GET'])
def get_user_basic_info():
    athlete_id = request.args.get('athlete_id')
    cursor = conn.cursor()
    sql = f'SELECT first_name, last_name, username FROM athlete WHERE athlete_id = {athlete_id}'
    cursor.execute(sql)
    row = cursor.fetchone()
    if row:
        return {
            'result': 'success',
            'athlete': {
                'first_name': row[0],
                'last_name': row[1],
                'username': row[2]
            }
        }
    return {'result': 'error'}