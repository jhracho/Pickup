LOAD DATA
INFILE './data/games.csv'
BADFILE './logs/game.bad'
INTO TABLE game
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
(game_id, sport, date_playing, players_needed, location_id)
