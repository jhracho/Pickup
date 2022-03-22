LOAD DATA
INFILE './data/locations.csv'
BADFILE './logs/location.bad'
INTO TABLE location
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
(location_id, name, address, sports_playable, open_time, close_time)
