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
        '''
        cursor.execute("""SELECT game.game_id, game.athlete_id, game.game_name, game.sport, game.date_playing, game.players_needed, location.name 
                          FROM game NATURAL JOIN location 
                          WHERE game_id = :id""", [game_id])
        '''
        cursor.execute("""SELECT * from game WHERE game_id = :id""", [game_id])
        row = cursor.fetchone()
        if row:
            payload['result'] = 'success'
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M%p").split(' ')
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
        SELECT a.*, athlete.username as owner from athlete, (select game.*, CASE WHEN a.game_id IS null then 0 else 1 end as attending
        FROM game LEFT OUTER JOIN (select game_id from attending_game where athlete_id=:1) a on game.game_id = a.game_id) a
        where a.athlete_id = athlete.athlete_id
        """, [user]
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            user = row[1]
            name = row[2]
            sport = row[3]
            dt = row[4].strftime("%m/%d/%Y %H:%M%p").split(' ')
            date = dt[0]
            time = dt[1]
            needed = row[5]
            location = row[6]
            attending = row[7]
            owner = row[8]
            payload['data'].append({'id':id, 'user':user, 'name':name, 'sport':sport, 'date':date, 'time':time, 'players':needed, 'loc':location, 'attending':attending, 'owner':owner})

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
    conn.commit()
    return {'result':'success'}

@gameapi.route('/leaveGame', methods=['POST'])
def leaveGame():
    user_id = request.json.get('user')
    game_id = request.json.get('game')

    cursor = conn.cursor()
    cursor.execute("""DELETE FROM attending_game WHERE athlete_id = :1 and game_id = :2""", [user_id, game_id])
    conn.commit()
    return {'result':'success'} 

# Get Location Data for a Location
@gameapi.route('/location/<loc_id>', methods=['GET'])
def getLocation(loc_id):
    payload = {'result':'success', 'data':dict()}
    cursor = conn.cursor()
    cursor.execute("""SELECT * FROM location WHERE location_id = :id""", [loc_id])
    row = cursor.fetchone()
    payload['data'] = {'id':row[0], 'name':row[1], 'addy':row[2], 'sports':row[3], 'openHour':row[4].strftime('%H:%M%p'), 'closeHour':row[5].strftime('%H:%M%p')}
    return payload

# Get Roster of people signed up for a game
@gameapi.route('/roster/<game_id>', methods=['GET'])
def getRoster(game_id):
    payload = {'result':'success', 'data':[]}
    cursor = conn.cursor()
    cursor.execute("""SELECT athlete.username FROM athlete NATURAL JOIN attending_game WHERE attending_game.game_id = :id """, [game_id])
    for row in cursor:
        payload['data'].append(row[0])
    return payload