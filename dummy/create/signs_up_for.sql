create table signs_up_for
       (athlete_id number(3),
	game_id number(3),
	constraint signs_up_for_pk primary key (athlete_id, game_id)
);
