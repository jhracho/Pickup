from flask import Blueprint, request, jsonify
from .db import Conn as conn
from datetime import datetime

#TODO: Delete this when connection is set up
from csv import reader

gameapi = Blueprint('gameapi', __name__)

def get_next_id(table):
    cursor = conn.cursor()
    sql = f'SELECT {table}_id from (SELECT * FROM {table} order by {table}_id desc) WHERE rownum=1'
    cursor.execute(sql)
    nid = cursor.fetchone()[0]
    return (nid+1)

# Returns data about a specific game
@gameapi.route('/game/<game_id>', methods=['GET'])
def singleGame(game_id):
    if request.method == 'GET':
        payload = {'result':'', 'data':dict()}
        # TODO: sqlalchemy Request Goes Here
        cursor = conn.cursor()
        cursor.execute("""SELECT game.game_id, game.athlete_id, game.game_name, game.sport, game.date_playing, game.players_needed, location.name 
                          FROM game NATURAL JOIN location 
                          WHERE game_id = :id""", [game_id])
        row = cursor.fetchone()
        if row:
            payload['result'] = 'success'
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            needed = row[5]
            location = row[6]
            payload['data'] = {'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed}
        
        else:
            payload['result'] = 'error'
            payload['data'] = 'Game ID Not Found'

    return payload

# Returns all games that need at least one player
@gameapi.route('/games', methods=['GET'])
def getGames():
    user = request.args.get('user')
    payload = {'result':'', 'data':list()}
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT game.*, CASE WHEN a.game_id IS null then 0 else 1 end as attending
        FROM game LEFT OUTER JOIN (select game_id from attending_game where athlete_id=:1) a on game.game_id = a.game_id
        """, [user]
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
            attending = row[7]
            payload['data'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'players':needed, 'loc':location, 'attending':attending})

    return payload

@gameapi.route('/addGame', methods=['POST'])
def addGame():
    name = request.json.get('name')
    sport = request.json.get('sport')
    date = request.json.get('date')
    time = request.json.get('time')
    location = request.json.get('loc')
    players = request.json.get('players')
    
    dt = datetime.strptime(date + " " + time, "%Y-%m-%d %H:%M")

    cursor = conn.cursor()
    nid = get_next_id('game')
    cursor.execute("""INSERT INTO game VALUES (:id, 10, :name, :sport, :dt, :location, :players)""", [nid, name, sport, dt, location, players])
    
    return {'result':'success', 'id':nid}

@gameapi.route('/editGame', methods=['POST'])
def editGame():
    id = request.json.get('id')
    name = request.json.get('name')
    owner = request.json.get('owner')
    sport = request.json.get('sport')
    date = request.json.get('date')
    time = request.json.get('time')
    location = request.json.get('loc')
    players = request.json.get('players')
    print(f'{name}, {sport}, {date}, {time}, {location}, {players}')
    return {'result':'success', 'id':1}

@gameapi.route('/joinGame', methods=['POST'])
def joinGame():
    user_id = request.json.get('user')
    game_id = request.json.get('game')
    
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO attending_game(athlete_id, game_id) VALUES(:1, :2)""", [user_id, game_id])
    return {'result':'success'}

@gameapi.route('/leaveGame', methods=['POST'])
def leaveGame():
    user_id = request.json.get('user')
    game_id = request.json.get('game')
    
    cursor = conn.cursor()
    cursor.execute("""DELETE FROM attending_game WHERE athlete_id = :1 and game_id = :2""", [user_id, game_id])
    return {'result':'success'}


@gameapi.route('/get-home-page-info', methods=['GET'])
def get_home_page_info():
    athlete_id = request.args.get('athlete_id')
    cursor = conn.cursor()
    sql = f'SELECT football_select, golf_select, basketball_select, soccer_select, other_select FROM athlete WHERE athlete_id = {athlete_id}'
    row = cursor.execute(sql).fetchone()
    if not row:
        return {'result': 'error'}
    
    payload = {'result': 'success', 'games': [], 'selects': {}}
    
    football = row[0]
    golf = row[1]
    basketball = row[2]
    soccer = row[3]
    other = row[4]

    if football:
        cursor.execute(
        """
        SELECT * 
        FROM game
        WHERE players_needed != 0
        AND sport = 'Football'
        """
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = [1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})
    if golf:
        cursor.execute(
        """
        SELECT * 
        FROM game
        WHERE players_needed != 0
        AND sport = 'Golf'
        """
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = [1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})
    if basketball:
        cursor.execute(
        """
        SELECT * 
        FROM game
        WHERE players_needed != 0
        AND sport = 'Basketball'
        """
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = [1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})
    if soccer:
        cursor.execute(
        """
        SELECT * 
        FROM game
        WHERE players_needed != 0
        AND sport = 'Soccer'
        """
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = [1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})
    if other:
        cursor.execute(
        """
        SELECT * 
        FROM game
        WHERE players_needed != 0
        AND (sport != 'Football' AND sport != 'Golf' AND sport != 'Basketball' AND sport != 'Soccer')
        """
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = [1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[5]
            needed = row[6]
            payload['games'].append({'id':id, 'owner':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})
    
    payload['games'].sort(key=lambda x: x['id'])

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

    return payload