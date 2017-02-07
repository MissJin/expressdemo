// userSql.js
// crud 语句
 
var user= {
	// insert: 'insert into user(id,name,mobile) values(0,?,?)',
	insert: 'insert into user(name,mobile) values(?,?)',
	update: 'update user set name=?,mobile=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};

module.exports = user;
