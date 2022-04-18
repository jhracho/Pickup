import cx_Oracle
import datetime
from hashlib import md5

conn =  cx_Oracle.connect('shayden2/shayden2_6968@172.22.135.207/xe')

def gid(table):
    cursor = conn.cursor()
    sql = f'SELECT {table}_id from (SELECT * FROM {table} order by {table}_id desc) WHERE rownum=1'
    cursor.execute(sql)
    nid = cursor.fetchone()[0]
    return (nid+1)

def main():
    date = '03/18/2022'
    time = '08:18'
    string = date + " " + time
    print(string)
    dt = datetime.datetime.strptime(string, "%m/%d/%Y %H:%M")
    print(dt.date())
    print(gid('game'))

if __name__ == '__main__':
    main()
