LOAD DATA
INFILE './data/signs_up_for.csv'
BADFILE './logs/signs_up_for.bad'
INTO TABLE signs_up_for
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
(athlete_id, game_id)
