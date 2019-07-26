CREATE DATABASE IF NOT EXISTS webmobile;
USE webmobile;

DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS mem_portfolio;
DROP TABLE IF EXISTS mem_post;
DROP TABLE IF EXISTS memAuth;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS portfolio;
DROP TABLE IF EXISTS post;


CREATE TABLE member(
	idx INT,
    id varchar(50),
    name varchar(50)
);
insert into member values(2,"111","제발");
insert into member values(1,"111","제발");
insert into member values(3,"111","제발");

CREATE TABLE members (
	uid VARCHAR(500) PRIMARY KEY,
	email VARCHAR(50),
    password  VARCHAR(50) NOT NULL,
    phone INT,
    name VARCHAR(50) NOT NULL,
    git_addr VARCHAR(500)
);

CREATE TABLE memAuth (
   member_uid VARCHAR(500),
   auth VARCHAR(50),
   FOREIGN KEY (member_uid) REFERENCES members(uid) ON DELETE CASCADE
);

CREATE TABLE portfolio (
	pf_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content VARCHAR(5000) NOT NULL,
    img_url VARCHAR(1000) NOT NULL,
    created DATE
);

CREATE TABLE post (
	p_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content VARCHAR(5000) NOT NULL,
    created DATE
);

CREATE TABLE mem_portfolio (
	portfolio_pf_id INT,
    member_uid VARCHAR(500),
    FOREIGN KEY (portfolio_pf_id) REFERENCES portfolio(pf_id) ON DELETE CASCADE,
    FOREIGN KEY (member_uid) REFERENCES members(uid) ON DELETE CASCADE
);

CREATE TABLE mem_post (
	post_p_id INT,
    member_uid VARCHAR(500),
    FOREIGN KEY (post_p_id) REFERENCES post(p_id) ON DELETE CASCADE,
    FOREIGN KEY (member_uid) REFERENCES members(uid) ON DELETE CASCADE
);
