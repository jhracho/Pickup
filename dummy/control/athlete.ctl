LOAD DATA
INFILE './data/athletes.csv'
BADFILE './logs/athlete.bad'
INTO TABLE athlete
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
(user_id, first_name, last_name, username, password_hash, football_select, golf_select, basketball_select, soccer_select, other_select)
