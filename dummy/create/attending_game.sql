create table attending_game
       (athlete_id number(3),
	game_id number(3),
	constraint attending_game_pk primary key (athlete_id, game_id)
);
