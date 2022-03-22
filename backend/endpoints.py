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
        pass

    elif request.method == 'POST':
        pass


@endpoint.route('/games', methods=['GET'])
def getGames():
    payload = {'result':''}
    data = True
   
    if data:
        payload['result'] = 'success'
        payload['data'] = list()
        with open('dummy/data/games.csv') as f:
            csv_reader = reader(f)
            if request.method == 'GET':
                for row in csv_reader:
                    id = row[0]
                    sport = row[1]
                    dt = row[2].split(' ')
                    date = dt[0]
                    time = dt[1]
                    location = row[3]
                    needed = row[4]
                    payload['data'].append({'id':id, 'sport':sport, 'date':date, 'time':time, 'location':location, 'needed':needed})
    else:
        payload['result'] = 'error'
        payload['message'] = 'ERROR >:('
    return payload