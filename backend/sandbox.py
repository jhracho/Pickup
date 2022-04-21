import cx_Oracle
import datetime
from hashlib import md5

conn = cx_Oracle.connect('shayden2/shayden2@172.22.132.222/xe')
#conn = cx_Oracle.connect('jake/jake@52.87.107.120/xe')

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
    cursor.execute(
        """
        SELECT a.*, athlete.username as owner from athlete, (select game.*, CASE WHEN a.game_id IS null then 0 else 1 end as attending
        FROM game LEFT OUTER JOIN (select game_id from attending_game where athlete_id=:1) a on game.game_id = a.game_id) a
        where a.athlete_id = athlete.athlete_id
        """, [10]
    )
    for row in cursor.fetchall():
        print(row)

    cursor = conn.cursor()
    cursor.execute("""SELECT count(*) FROM game""")
    gameTotal = cursor.fetchone()
    print(gameTotal)

if __name__ == '__main__':
    main()
