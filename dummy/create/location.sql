create table location
       (location_id number(3),
        name varchar(50) not null,
        address varchar(50),
	sports_playable varchar(30),
	open_time timestamp,
	close_time timestamp,
	constraint location_pk primary key (location_id)
);
