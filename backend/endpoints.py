from flask import Blueprint, request, jsonify
from .db import Conn as conn

#TODO: Delete this when connection is set up
from csv import reader

endpoint = Blueprint('endpoint', __name__)

# Example API endpoint... we'd use Axios in React to get this data 
@endpoint.route('/test', methods=['GET'])
def test():
    return {'result':'success'}

@endpoint.route('/game/<game_id>', methods=['GET', 'POST'])
def singleGame(game_id):
    if request.method == 'GET':
        payload = {'result':''}
        # TODO: sqlalchemy Request Goes Here
        payload['result'] = 'success'
        found = False
        with open('dummy/data/games.csv') as f:
            csv_reader = reader(f)
            for row in csv_reader:
                if row[0] == game_id:
                    id = row[0]
                    name = row[1]
                    sport = row[2]
                    dt = row[3].split(' ')
                    date = dt[0]
                    time = dt[1]
                    location = row[4]
                    needed = row[5]
                    payload['data'] = {'id':id, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed}
                    found = True
        if not found:
            payload['result'] = 'error'
            payload['data'] = 'Game ID Not Found'

    elif request.method == 'POST':
        pass
    
    
    return payload

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