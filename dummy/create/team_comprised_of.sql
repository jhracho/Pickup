create table team_comprised_of
       (athlete_id number(3),
	team_id number(3),
	constraint team_comprised_of_pk primary key (athlete_id, team_id)
);
