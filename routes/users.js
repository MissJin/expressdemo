var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.send('respond with a resource');
});

router.post('/addUser', function(req, res, next) {
	// 测试的url: localhost:2017/users/addUser?name=xx&mobile=14787895215
  	userDao.add(req, res, next);
});

module.exports = router;
