create table team
       (team_id number(3),
        sport varchar(20),
	team_name varchar(50),
	roster_spots number(2),
	constraint team_pk primary key (team_id)
);
