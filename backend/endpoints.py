from flask import Blueprint, request, jsonify

endpoint = Blueprint('endpoint', __name__)

# Example API endpoint... we'd use Axios in React to get this data   
@endpoint.route('/test', methods=['GET'])
def test():
    return {'result':'success'}

