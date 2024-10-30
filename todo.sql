drop table if exists task;
drop table if exists account;

create table account (
	id serial primary key,
	email varchar(50) unique not null,
	password varchar(255) not null
);

create table task (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values ('Test 1');
insert into task (description) values ('Test 2');