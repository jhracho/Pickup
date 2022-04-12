import cx_Oracle
from hashlib import md5

conn =  cx_Oracle.connect('shayden2/shayden2_6968@172.22.135.207/xe')
cursor = conn.cursor()
cursor.execute("""SELECT * FROM game WHERE game_id=:gid""", [1])

#md5(b'password').hexdigest()
game = cursor.fetchone()
print(game)