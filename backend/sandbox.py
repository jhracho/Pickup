import cx_Oracle
import datetime
from hashlib import md5

conn = cx_Oracle.connect('shayden2/shayden2@172.22.132.222/xe')
#conn = cx_Oracle.connect('jake/jake@172.22.133.101/XE')

def gid(table):
    cursor = conn.cursor()
    sql = f'SELECT {table}_id from (SELECT * FROM {table} order by {table}_id desc) WHERE rownum=1'
    cursor.execute(sql)
    nid = cursor.fetchone()[0]
    return (nid+1)

def main():
    '''
    date = '03/18/2022'
    time = '08:18'
    string = date + " " + time
    print(string)
    dt = datetime.datetime.strptime(string, "%m/%d/%Y %H:%M")
    print(dt.date())
    print(gid('game'))
    '''
    cursor = conn.cursor()
    cursor.execute("""SELECT game.*, athlete.username AS owner
        FROM game, athlete 
        WHERE game.athlete_id = athlete.athlete_id AND game.game_id NOT IN (SELECT game_id FROM attending_game WHERE athlete_id = :1) ORDER BY game_id DESC""", [202])

    for l in cursor.fetchall():
        print(l)
    
    conn.close()
    

if __name__ == '__main__':
    main()
