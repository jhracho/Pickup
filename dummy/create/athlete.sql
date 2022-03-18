create table athlete
       (user_id number(3),
        username varchar(30) not null,
        first_name varchar(30),
        last_name varchar(30),
        password_hash raw(16),
        football_select number(1),
        golf_select number(1),
        basketball_select number(1),
        soccer_select number(1),
        other_select number(1),
	constraint user_pk primary key (user_id)
);
