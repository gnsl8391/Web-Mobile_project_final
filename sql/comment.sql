CREATE DATABASE IF NOT EXISTS webmobile;
USE webmobile;

DROP TABLE IF EXISTS pfSubComment;
DROP TABLE IF EXISTS pfComment;

CREATE TABLE pfComment(
	pfc_id INT auto_increment primary key,
    pfid varchar(100) not null,
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

insert into pfComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","테스트 완투쓰리",default);
insert into pfComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","테스트 쓰리투완",default);

select * from pfComment where pfid = "becmvtUI87RiknyZApQ2";
delete from pfComment where pfc_id = 3;

insert into pfSubComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","테스트 완투쓰리",default,1);
insert into pfSubComment values(0,"becmvtUI87RiknyZApQ2","정총무","ipFznAij4vWZBGwpDuJVXldCCXv1","피자",default,1);
select * from pfSubComment where pfc_id = 1;
delete from pfSubComment where spfc_id = 3;
