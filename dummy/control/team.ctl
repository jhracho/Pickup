LOAD DATA
INFILE './data/teams.csv'
BADFILE './logs/team.bad'
INTO TABLE team
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
(team_id, sport, team_name, roster_spots)
