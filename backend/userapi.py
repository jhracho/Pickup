from flask import Blueprint, request
from .db import Conn as conn
import datetime

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

@userapi.route('/get-profile-page-info', methods=['GET'])
def get_profile_page_info():
    athlete_id = request.args.get('athlete_id')
    cursor = conn.cursor()
    payload = {
        'result': 'success',
        'athlete': {},
        'games': [],
        'teams': []
    }
    sql = f'SELECT first_name, last_name, username FROM athlete WHERE athlete_id = {athlete_id}'
    cursor.execute(sql)
    row = cursor.fetchone()
    if row:
        payload['athlete'] = {
            'first_name': row[0],
            'last_name': row[1],
            'username': row[2]
        }
    else:
        return {'result': 'error'}

    cursor.execute(
        """
        SELECT game.game_id, game.game_name, game.sport, game.date_playing, location.name
        FROM game, attending_game, location
        WHERE attending_game.athlete_id = :athlete_id
        AND game.game_id = attending_game.game_id
        AND game.location_id = location.location_id
        """, [athlete_id]
    )
    results = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in results:
            begin_period = datetime.datetime.today().date().strftime("%m/%d/%Y")
            end_period = (datetime.datetime.today().date() + datetime.timedelta(days=5)).strftime("%m/%d/%Y")
            dt = row[3].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            print(dt[0])
            if dt[0] > begin_period and dt[0] < end_period:
                payload['games'].append({'game_id': row[0], 'game_name': row[1], 'sport': row[2], 'date': dt[0], 'time': dt[1], 'location': row[4]})
    
    return payload