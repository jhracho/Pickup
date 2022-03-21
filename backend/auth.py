from flask import Blueprint, request

auth = Blueprint('auth', __name__)

# Log in a user based on supplied credentials
@auth.route('/authenticate-login', methods=['POST'])
def login():
    # Get request data  
    user = request.json.get('username')
    pswd = request.json.get('password')

    # Check with db
    #TODO: sqlalchemy call
    dU = 'jhracho'
    dP = 'test'

    if (dU == user and dP == pswd):
        return {'auth':'success'}  
    else:
         return {'auth':'failure'}