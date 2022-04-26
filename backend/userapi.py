from flask import Blueprint, request
from .db import Conn as conn
import datetime
from hashlib import md5

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
    cursor.close()
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
    cursor.close()
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
        cursor.close()
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
            if dt[0] > begin_period and dt[0] < end_period:
                payload['games'].append({'game_id': row[0], 'game_name': row[1], 'sport': row[2], 'date': dt[0], 'time': dt[1], 'location': row[4]})
    cursor.close()
    return payload

@userapi.route('/change-password', methods=['POST'])
def change_password():
    old_password = md5(request.json.get('old_password').encode()).hexdigest()
    password1 = md5(request.json.get('password1').encode()).hexdigest()
    password2 = md5(request.json.get('password2').encode()).hexdigest()
    athlete_id = request.json.get('athlete_id')

    if len(old_password) == 0 or len(password1) == 0 or len(password2) == 0:
        return {'result': 'error', 'msg': 'One or more fields left blank.'}
    
    cursor = conn.cursor()
    sql = f'SELECT password_hash FROM athlete WHERE athlete_id = {athlete_id}'
    cursor.execute(sql)
    row = cursor.fetchone()
    if not row:
        return {'result': 'error', 'msg': 'Something went wrong.'}
    if old_password != row[0]:
        return {'result': 'error', 'msg': 'Password incorrect.'}
    if password1 != password2:
        return {'result': 'error', 'msg': 'Passwords do not match.'}
    if old_password == password1:
        return {'result': 'error', 'msg': 'New password cannot be the same as old password.'}
    
    cursor = conn.cursor()
    sql = f"UPDATE athlete SET password_hash = '{password1}' WHERE athlete_id = {athlete_id}"
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    return {'result': 'success'}

@userapi.route('/get-home-page-info', methods=['GET'])
def get_home_page_info():
    athlete_id = request.args.get('athlete_id')
    payload = {'result': 'success', 'games': [], 'selects': {}, 'upcoming': [], 'teams': []}
    cursor = conn.cursor()
    sql = f'SELECT football_select, golf_select, basketball_select, soccer_select, other_select FROM athlete WHERE athlete_id = {athlete_id}'
    row = cursor.execute(sql).fetchone()
    if not row:
        return {'result': 'error'}
    
    football = row[0]
    golf = row[1]
    basketball = row[2]
    soccer = row[3]
    other = row[4]

    if football:
        cursor.execute(
        """
        SELECT game.game_id, athlete.username, game.game_name, game.sport, game.date_playing, location.name, game.players_needed
        FROM game NATURAL JOIN athlete NATURAL JOIN location
        WHERE players_needed != 0
        AND sport = 'Football' AND game.game_id NOT IN (SELECT game_id FROM attending_game WHERE athlete_id = :athlete_id)
        """, [athlete_id]
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'players':needed})
    if golf:
        cursor.execute(
        """
        SELECT game.game_id, athlete.username, game.game_name, game.sport, game.date_playing, location.name, game.players_needed
        FROM game NATURAL JOIN athlete NATURAL JOIN location
        WHERE game.players_needed != 0
        AND game.sport = 'Golf' AND game.game_id NOT IN (SELECT game_id FROM attending_game WHERE athlete_id = :athlete_id)
        """, [athlete_id]
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'players':needed})
    if basketball:
        cursor.execute(
        """
        SELECT game.game_id, athlete.username, game.game_name, game.sport, game.date_playing, location.name, game.players_needed
        FROM game NATURAL JOIN athlete NATURAL JOIN location
        WHERE players_needed != 0
        AND sport = 'Basketball' AND game.game_id NOT IN (SELECT game_id FROM attending_game WHERE athlete_id = :athlete_id)
        """, [athlete_id]
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'players':needed})
    if soccer:
        cursor.execute(
        """
        SELECT game.game_id, athlete.username, game.game_name, game.sport, game.date_playing, location.name, game.players_needed
        FROM game NATURAL JOIN athlete NATURAL JOIN location
        WHERE players_needed != 0
        AND sport = 'Soccer' AND game.game_id NOT IN (SELECT game_id FROM attending_game WHERE athlete_id = :athlete_id)
        """, [athlete_id]
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'players':needed})
    if other:
        cursor.execute(
        """
        SELECT game.game_id, athlete.username, game.game_name, game.sport, game.date_playing, location.name, game.players_needed
        FROM game NATURAL JOIN athlete NATURAL JOIN location
        WHERE players_needed != 0
        AND (sport != 'Football' AND sport != 'Golf' AND sport != 'Basketball' AND sport != 'Soccer') AND game.game_id NOT IN (SELECT game_id FROM attending_game WHERE athlete_id = :athlete_id)
        """, [athlete_id]
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'players':needed})
    
    payload['games'].sort(key=lambda x: x['id'])
    payload['games'].sort(key=lambda x: x['time'])
    payload['games'].sort(key=lambda x: x['date'])

    cursor.execute(
        """
        SELECT football_select, golf_select, basketball_select, soccer_select, other_select
        FROM athlete
        WHERE athlete_id = :athlete_id
        """, [athlete_id]
    )
    row = cursor.fetchone()
    payload['selects'] = {
        'football': row[0],
        'golf': row[1],
        'basketball': row[2],
        'soccer': row[3],
        'other': row[4]
    }

    cursor.execute(
        """
        SELECT a.game_id, athlete.username, a.game_name, a.sport, a.date_playing, location.name, a.players_needed
        FROM athlete, location,
            (SELECT game.*, CASE WHEN a.game_id IS null then 0 else 1 end as attending
            FROM game LEFT OUTER JOIN
                (SELECT game_id
                FROM attending_game
                WHERE athlete_id=:1) a 
            ON game.game_id = a.game_id) a
        WHERE a.athlete_id = athlete.athlete_id AND a.location_id = location.location_id AND a.attending = 1
        """, [athlete_id]
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['upcoming'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'players': needed, 'location':location})
    cursor.close()
    return payload