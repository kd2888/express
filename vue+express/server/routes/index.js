var express = require('express');
var router = express.Router();
var path = require('path');

var users = require('../modal/user');
/* GET home page. */
router.get('/', function(req, res, next) {
 //   res.sendFile( path.join(__dirname, '../public/dist/index.html'));
    res.redirect('/index.html');
});
router.post('/login',users.login );
router.post('/register',users.register);
router.post('/subSpending',users.subSpending);
router.post('/getSpending',users.getSpending);
router.post('/getSumByDate',users.getSumByDate);
router.post('/changePassword',users.changePassword);

module.exports = router;
