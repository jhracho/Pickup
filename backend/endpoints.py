from flask import Blueprint, request, jsonify
from .db import Conn as conn

#TODO: Delete this when connection is set up
from csv import reader

endpoint = Blueprint('endpoint', __name__)

# Returns data about a specific game
@endpoint.route('/game/<game_id>', methods=['GET', 'POST'])
def singleGame(game_id):
    if request.method == 'GET':
        payload = {'result':'', 'data':dict()}
        # TODO: sqlalchemy Request Goes Here
        cursor = conn.cursor()
        cursor.execute("""SELECT * FROM game WHERE game_id = :id""", [game_id])
        row = cursor.fetchone()
        if row:
            payload['result'] = 'success'
            id = row[0]
            name = row[1]
            sport = row[2]
            dt = row[3].split(' ')
            date = dt[0]
            time = dt[1]
            location = row[4]
            needed = row[5]
            payload['data'] = {'id':id, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed}
        
        else:
            payload['result'] = 'error'
            payload['data'] = 'Game ID Not Found'

    elif request.method == 'POST':
        pass
    
    
    return payload

# Returns all games that need at least one player
@endpoint.route('/games', methods=['GET'])
def getGames():
    payload = {'result':'', 'data':list()}
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT * 
        FROM game
        WHERE players_needed != 0
        """
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            name = row[1]
            sport = row[2]
            dt = row[3].strftime("%m/%d/%Y %H:%M:%S").split(' ')
            date = dt[0]
            time = dt[1]
            location = row[4]
            needed = row[5]
            payload['data'].append({'id':id, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})

    else:
        payload['result'] = 'error'
        payload['data'] = 'ERROR >:('

    return payload

@endpoint.route('/addGame', methods=['POST'])
def addGame():
    name = request.json.get('game')
    sport = request.json.get('sport')
    date = request.json.get('date')
    time = request.json.get('time')
    location = request.json.get('loc')
    players = request.json.get('players')
    return {'result':'success', 'id':1}