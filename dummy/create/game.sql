create table game
       (game_id number(3),
        sport varchar(20),
	date_playing timestamp,
	players_needed number(2),
	location_id number(3),
	constraint game_pk primary key (game_id),
	foreign key (location_id) references location(location_id)
);
