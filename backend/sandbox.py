import cx_Oracle
from hashlib import md5

conn =  cx_Oracle.connect('shayden2/shayden2_6968@172.22.135.207/xe')
cursor = conn.cursor()
cursor.execute(
    """
    SELECT * 
    FROM game
    WHERE players_needed != 0
    """
)

#md5(b'password').hexdigest()
game = cursor.fetchone()
print(game[3])
date = game[3].strftime("%m/%d/%Y %H:%M:%S")
print(date)