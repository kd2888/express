var express = require('express');
var router = express.Router();
var path = require('path');

var users = require('../modal/user');
/* GET home page. */
router.get('/', function(req, res, next) {
 //   res.sendFile( path.join(__dirname, '../public/dist/index.html'));
    res.redirect('/index.html');
});
router.get('/mobile', function(req, res, next) {
    //   res.sendFile( path.join(__dirname, '../public/dist/index.html'));
    res.redirect('/mobile/index.html');
});
//登录
router.post('/login',users.login );
//注册
router.post('/register',users.register);
//修改密码
router.post('/changePassword',users.changePassword);
//提交消费信息
router.post('/subSpending',users.subSpending);
//获取消费信息
router.post('/getSpending',users.getSpending);
//获取信息总计按月
router.post('/getSumByDate',users.getSumByDate);


module.exports = router;
