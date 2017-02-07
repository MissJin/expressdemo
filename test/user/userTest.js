var should = require('should');
var supertest = require('supertest');
var express = require('express');
var app = express();
// var app = require('../../app');
var userDao = require('../../dao/userDao');

app.use('/users',function(req, res, next){
	userDao.add(req, res, next);
})


var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};



describe('测试开始',function(){
	describe('第一组测试',function(){
		it('第一个测试实例',function(done){
			(5).should.be.exactly(5).and.be.a.Number();
			done();
		})
		it('第二个测试实例',function(done){
			user.should.have.property('name', 'tjj');
			done();
		})

	})
	describe('第二组测试',function(){
		it('第一个测试实例',function(done){
			(5).should.be.exactly(5).and.be.a.Number();
			done();
		})
		it('第二个测试实例',function(done){
			user.should.have.property('pets').with.lengthOf(4);

			done();
		})

	})
	describe('第三组测试',function(){
		it('第一个测试实例:新增用户数据',function(done){
			supertest(app)

			// .get('http://127.0.0.1:2017/users/addUser?name=xxx&mobile=14787895217')
			.post('/users?name=xxx&mobile=14787895211')
			.send({
				name:'测试',
				mobile:'14787895215'
			})
			.expect(200, function(err, res){
				console.log(JSON.stringify(res));
				should.not.exist(err);
				res.text.should.containEql('新增成功');
				done();
			})		

		})
		it('第二个测试实例',function(done){
			supertest(app)
			.get('http://www.baidu.com')
			.expect(404,function(err,res){
				should.not.exist(err);
				console.log(JSON.stringify(res));
				done();
			})

			done();
		})

	})


})