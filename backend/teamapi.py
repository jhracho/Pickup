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
@teamapi.route('/allTeams', methods=['GET'])
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
@teamapi.route('/teams', methods=['GET'])
def getTeams():
    athlete = request.args.get('athlete')
    payload = {'result':'', 'data':list()}
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT *
        FROM team
        WHERE team_id NOT IN
        (SELECT team_id
        FROM team_comprised_of
        WHERE athlete_id = :1)
        ORDER BY team_name ASC
        """, [athlete]
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


# Get data for team by ID
@teamapi.route('/team/<team_id>/<athlete_id>', methods=['GET'])
def singleTeam(team_id, athlete_id):
    if request.method == 'GET':
        payload = {'result':'', 'data':dict()}
        cursor = conn.cursor()
        cursor.execute("""SELECT team.team_id, team.sport, team.team_name, team.roster_spots, a.onteam
                FROM team, (SELECT
                CASE WHEN EXISTS
                    (
                        SELECT *
                        FROM team_comprised_of
                        WHERE team_id = :1 and athlete_id = :2 
                    )
                THEN 1
                ELSE 0
                END as onteam
                FROM DUAL) a
                WHERE team_id = :1
                """, [team_id, athlete_id]
        )
        row = cursor.fetchone()
        if row:
            payload['result'] = 'success'
            id = row[0]
            sport = row[1]
            name = row[2]
            spots = row[3]
            on_team = row[4]
            payload['data'] = {'id':id, 'sport':sport, 'name':name, 'roster_spots':spots, 'on_team':on_team}
        
        else:
            payload['result'] = 'error'
            payload['data'] = 'Team ID Not Found'

    return payload

@teamapi.route('/joinTeam', methods=['POST'])
def joinTeam():
    athlete_id = request.json.get('athlete')
    team_id = request.json.get('team')

    cursor = conn.cursor()
    cursor.execute("""INSERT INTO team_comprised_of(athlete_id, team_id) VALUES (:1, :2)""" ,[athlete_id, team_id])
    cursor.execute("""UPDATE team SET roster_spots=roster_spots-1 WHERE team_id = :1 """, [team_id])

    conn.commit()
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
    cursor.execute("""SELECT athlete.username, athlete.first_name, athlete.last_name FROM athlete, team_comprised_of WHERE athlete.athlete_id = team_comprised_of.athlete_id and team_comprised_of.team_id = :id """, [team_id])

    #cursor.execute("""SELECT athlete.username FROM athlete NATURAL JOIN team_comprised_of WHERE team_comprised_of.team_id = :id """, [team_id])
    for row in cursor:
        payload['data'].append(row[0])
    return payload 
