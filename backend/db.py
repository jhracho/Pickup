import cx_Oracle

# Julia needs this
#cx_Oracle.init_oracle_client('/usr/local/lib')

Conn = cx_Oracle.connect('shayden2/shayden2@172.22.132.222/xe')
#Conn = cx_Oracle.connect('jake/jake@52.87.107.120/xe')