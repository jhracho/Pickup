from flask import Blueprint, request, jsonify
from .db import Conn as conn
from datetime import datetime

#TODO: Delete this when connection is set up
from csv import reader

teamapi = Blueprint('teamapi', __name__)

def get_next_id(table):
    cursor = conn.cursor()
    sql = f'SELECT {table}_id from (SELECT * FROM {table} order by {table}_id desc) WHERE rownum=1'
    cursor.execute(sql)
    nid = cursor.fetchone()[0]
    return (nid+1)

# Get all teams
@teamapi.route('/teams', methods=['GET'])
def getAllTeams():
    payload = {'result':'', 'data':list()}
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT * 
        FROM team
        """
    )
    result = cursor.fetchall()
    if cursor.rowcount != 0:
        for row in result:
            id = row[0]
            sport = row[1]
            name = row[2]
            spots = row[3]
            payload['data'].append({'id':id, 'sport':sport, 'name':name, 'spots':spots})

    return payload

# Get teams athelete is NOT on
# @teamapi.route('/teams', methods=['GET'])
# def getTeams():
#     athlete = request.args.get('athlete')
#     payload = {'result':'', 'data':list()}
#     cursor = conn.cursor()
#     cursor.execute(
#         """
#         SELECT team.id, team.sport, team.name, team.spots 
#         team FROM NATURAL JOIN team_comprised_of
#         WHERE team_comprised_of.athlete_id != :1
#         """
#     , [athlete])
#     result = cursor.fetchall()
#     if cursor.rowcount != 0:
#         for row in result:
#             id = row[0]
#             sport = row[1]
#             name = row[2]
#             spots = row[3]
#             payload['data'].append({'id':id, 'sport':sport, 'name':name, 'spots':spots})

#     return payload


# Get data for team by ID
@teamapi.route('/team/<team_id>', methods=['GET'])
def singleTeam(team_id):
    if request.method == 'GET':
        payload = {'result':'', 'data':dict()}
        cursor = conn.cursor()
        cursor.execute("""SELECT team.team_id, team.sport, team.team_name, team.roster_spots
                          FROM team
                          WHERE team_id = :id""", [team_id])
        row = cursor.fetchone()
        if row:
            payload['result'] = 'success'
            id = row[0]
            sport = row[1]
            name = row[2]
            spots = row[3]
            payload['data'] = {'id':id, 'sport':sport, 'name':name, 'spots':spots}
        
        else:
            payload['result'] = 'error'
            payload['data'] = 'Team ID Not Found'

    return payload

@teamapi.route('/team/joinTeam', methods=['POST'])
def joinTeam():
    if request.method == 'POST':
        athlete_id = request.json.get('athlete')
        team_id = request.json.get('team')
    
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO team_comprised_of(athlete_id, team_id) VALUES (:1, :2)""" ,[athlete_id, team_id])

        cursor.commit()
        return {'result':'success'}

@teamapi.route('/leaveTeam', methods=['POST'])
def leaveTeam():
    athlete_id = request.json.get('athlete')
    team_id = request.json.get('team')

    cursor = conn.cursor()
    cursor.execute("""DELETE FROM team_comprised_of WHERE athlete_id = :1 and team_id = :2""", [athlete_id, team_id])
    conn.commit()
    return {'result':'success'}

# Get team roster
@teamapi.route('/teamRoster/<team_id>', methods=['GET'])
def getRoster(team_id):
    payload = {'result':'success', 'data':[]}
    cursor = conn.cursor()
    cursor.execute("""SELECT athlete.username FROM athlete NATURAL JOIN team_comprised_of WHERE team_comprised_of.team_id = :id """, [team_id])
    for row in cursor:
        payload['data'].append(row[0])
    return payload 
