from flask import Blueprint, request, jsonify

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
    payload = {'result':''}
    data = True
   
    if data:
        payload['result'] = 'success'
        payload['data'] = list()
        with open('dummy/data/games.csv') as f:
            csv_reader = reader(f)
            for row in csv_reader:
                id = row[0]
                name = row[1]
                sport = row[2]
                dt = row[3].split(' ')
                date = dt[0]
                time = dt[1]
                location = row[4]
                needed = row[5]
                payload['data'].append({'id':id, 'name':name, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})
    else:
        payload['result'] = 'error'
        payload['data'] = 'ERROR >:('
    
    return payload