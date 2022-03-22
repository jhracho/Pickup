from flask import Blueprint, request
from .models import User
from sqlalchemy import insert
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

# Log in a user based on supplied credentials
@auth.route('/login', methods=['POST'])
def login():
    # Get request data  
    username = request.json.get('username')
    pswd = request.json.get('password')

    if username is None or pswd is None:
        return {'auth':False, 'msg':'One or more fields is left empty...'}

    # Check with db
    #TODO: sqlalchemy call
    '''
    session = Session()
    user = session.query(User).filter(username=user).first()
    session.close()
    if user:
        if check_password_hash(pswd, user.password):
            return {'auth':True}
    return {'auth':False, 'msg':'Incorrect username and/or password...'}
    '''
    dU = 'jhracho'
    dP = 'test'

    if (dU == username and dP == pswd):
        return {'auth':True}  
    else:
         return {'auth':False, 'msg':'Incorrect username and/or password...'}

@auth.route('/signup', methods=['POST'])
def signup():
    '''
    session = Session()
    newUser = User(put in column data here)
    session.add(newUser)
    session.commit()
    session.close()
    '''
    return 