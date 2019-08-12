Drop database if exists webmobile;
CREATE DATABASE IF NOT EXISTS webmobile;
USE webmobile;

DROP TABLE IF EXISTS pfSubComment;
DROP TABLE IF EXISTS pfComment;
DROP TABLE IF EXISTS postSubComment;
DROP TABLE IF EXISTS postComment;
DROP TABLE IF EXISTS userSchedule;
DROP TABLE IF EXISTS scheduleCategory;

CREATE TABLE pfComment(
	pfc_id INT auto_increment primary key,
    pfid varchar(100) not null, # pfid는 portfolio id
    pfc_writer varchar(100) not null,
    pfc_writerUid varchar(100) not null,
    pfc_content varchar(500) not null,
    pfc_date DATETIME DEFAULT now()
);

CREATE TABLE pfSubComment(
	spfc_id INT auto_increment primary key,
    pfid varchar(100) not null,
    spfc_writer varchar(100) not null,
    spfc_writerUid varchar(100) not null,
    spfc_content varchar(500) not null,
    spfc_date DATETIME DEFAULT now(),
    pfc_id int,
    foreign key (pfc_id) references pfComment(pfc_id) ON DELETE CASCADE
);

CREATE TABLE postComment(
	pc_id INT auto_increment primary key,
    pid varchar(100) not null,   # pid는 post id
    pc_writer varchar(100) not null,
    pc_writerUid varchar(100) not null,
    pc_content varchar(500) not null,
    pc_date DATETIME DEFAULT now()
);


CREATE TABLE postSubComment(
	spc_id INT auto_increment primary key,
    pid varchar(100) not null,
    spc_writer varchar(100) not null,
    spc_writerUid varchar(100) not null,
    spc_content varchar(500) not null,
    spc_date DATETIME DEFAULT now(),
    pc_id int,
    foreign key (pc_id) references postComment(pc_id) ON DELETE CASCADE
);


insert into pfComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","테스트 완투쓰리",default);
insert into pfComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","테스트 쓰리투완",default);

select * from pfComment where pfid = "becmvtUI87RiknyZApQ2";
delete from pfComment where pfc_id = 3;

insert into pfSubComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","테스트 완투쓰리",default,1);
insert into pfSubComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","테스트",default,cast('1' as unsigned));
select * from pfSubComment where pfc_id = 1;
delete from pfSubComment where spfc_id = 3;

select * from postComment;

CREATE TABLE scheduleCategory(
	scheCat_id INT auto_increment primary key,
    scheCat_name varchar(100) not null,
    scheCat_img varchar(100) not null
);

CREATE TABLE userSchedule(
	sche_id INT auto_increment primary key,
    sche_title varchar(100) not null,
    sche_details varchar(500) not null,
    sche_date DATETIME DEFAULT now(),
    scheCat_id INT,
    uid varchar(100) not null,
    foreign key (scheCat_id) references scheduleCategory(scheCat_id) ON DELETE CASCADE
);

insert into scheduleCategory values(0,"BUSINESS","fas fa-briefcase");
insert into scheduleCategory values(0,"CONTACT", "fas fa-phone-alt");
insert into scheduleCategory values(0,"TRAVEL", "fas fa-plane");
insert into scheduleCategory values(0,"PLAY", "fas fa-gamepad");
insert into scheduleCategory values(0,"CHARGE","far fa-credit-card");
select * from scheduleCategory;
use webmobile;
insert into userSchedule values(0,"Meeting", "SSAFY Team Building", default, 1, "ipFznAij4vWZBGwpDuJVXldCCXv1");
delete from userSchedule where sche_id = 1;
select * from userSchedule where uid = "ipFznAij4vWZBGwpDuJVXldCCXv1";
select * from userSchedule where sche_id = 2;
select s.sche_id, s.sche_title, s.sche_details, s.sche_date, c.scheCat_id, c.scheCat_name, c.scheCat_img, s.uid
from userSchedule s, scheduleCategory c
where s.scheCat_id = c.scheCat_id and s.uid = "ipFznAij4vWZBGwpDuJVXldCCXv1";
select * from userSchedule;

insert into userSchedule values (0, "간식", "먹고싶다","2019-08-07 15:22:15",5,"ipFznAij4vWZBGwpDuJVXldCCXv1");
insert into userSchedule values (0, "간식", "먹고싶다","2019-08-07 15:22:15",5,"tvr72pdW79VbpUavgw74CrRH6L13");
select s.sche_id, s.sche_title, s.sche_details, s.sche_date, c.scheCat_id, c.scheCat_name, c.scheCat_img, s.uid
		from userSchedule s, scheduleCategory c
		where s.scheCat_id = c.scheCat_id and s.uid ="ipFznAij4vWZBGwpDuJVXldCCXv1";

        select s.sche_id, s.sche_title, s.sche_details, s.sche_date, c.scheCat_id, c.scheCat_name, c.scheCat_img, s.uid
		from userSchedule s, scheduleCategory c
		where s.scheCat_id = c.scheCat_id
