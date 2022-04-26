from flask import Blueprint, request, jsonify
from .db import Conn as conn
from datetime import datetime

generalapi = Blueprint('generalapi', __name__)

@generalapi.route('/landingStats', methods=['GET'])
def landingStats():
    cursor = conn.cursor()
    cursor.execute("""SELECT count(*) FROM game""")
    gameTotal = cursor.fetchone()[0]

    cursor.execute("""SELECT count(*) FROM athlete""")
    athleteTotal = cursor.fetchone()[0]

    cursor.execute("""SELECT count(*) FROM team""")
    teamsTotal = cursor.fetchone()[0]

    payload = {'result':'success', 'data': {'game':gameTotal, 'athlete':athleteTotal, 'teams':teamsTotal}}
    cursor.close()
    return payload