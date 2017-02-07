// Mysql数据库连接配置
module.exports = {
	mysql: {
		host:'127.0.0.1',
		user:'root',
		password:'miss',
		database:'expressdb',
		port:3306
	}
}

/*
//mysql的数据 库脚本
drop database if exists expressdb;
create database expressdb;
use expressdb;
drop table if exists user;
#创建数据表 
create table user(
	id int primary key auto_increment,
	name varchar(50) default null,
	mobile varchar(20) unique default null
)engine=InnoDB auto_increment=1 default charset=utf8;
*/