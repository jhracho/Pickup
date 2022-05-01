import cx_Oracle
import datetime
from hashlib import md5

cx_Oracle.init_oracle_client('/usr/local/lib')
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
    team_id = 10
    athlete_id = 20
    cursor = conn.cursor()
    cursor.execute("""SELECT * FROM team_comprised_of
    """
    )
    for l in cursor.fetchall():
        print(l)
    
    conn.close()
    

if __name__ == '__main__':
    main()
