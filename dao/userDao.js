// 实现mysql的交互
"use strict"
var mysql = require('mysql');
var $config = require('../config/db.js');
// var $util = require('../util/util');
var $sql = require('./userSql.js');

// 使用链接池
var pool = mysql.createPool($config.mysql);

// json返回值的封装
var jsonReturn = function(res, ret){
	if(typeof ret === 'undefined'){
		res.json({
			code:'1',
			msg:'操作失败！'
		});
	}else{
		res.json(ret);
	}
};

module.exports = {
	add: function(req, res, next){
		pool.getConnection(function(err, connection){
			// 获取提交的数据
			var query = req.query || req.params;
			var queryArr = []; //接受post的数据
			console.log("提交的查询数据："+JSON.stringify(query));
			req.on("data",function(data){
				queryArr.push(data);
			}).on("end",function(){
				console.log("post提交的数据："+queryArr);
			});
			connection.query($sql.insert, [query.name, query.mobile], function(err, result){
				if(err){
					console.log("错误信息："+JSON.stringify(err));
				}
				if(result){
					console.log("添加后的数据返回结果："+JSON.stringify(result));
					result ={
						code:200,
						msg:'新增成功'
					};
				}
				jsonReturn(res,result);
				// 断开连接
				connection.release();
			});
		});
	}
};