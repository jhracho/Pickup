LOAD DATA
INFILE './data/attending_game.csv'
BADFILE './logs/attending_game.bad'
INTO TABLE attending_game
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
(athlete_id, game_id)
