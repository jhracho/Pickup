LOAD DATA
INFILE './data/team_comprised_of.csv'
BADFILE './logs/team_comprised_of.bad'
INTO TABLE team_comprised_of
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
(athlete_id, team_id)
