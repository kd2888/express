var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mysql = require('mysql'),
    session = require('express-session'),
    SessionStore = require('express-mysql-session')
var mysqlConf = require('./conf/conf')

//生成一个 SessionStore 实例的参数
var options =mysqlConf.mysql;
    options['resave']=false;
    options['saveUninitialized']=true;
var app = express();


app.use(cookieParser());
// 使用SessionStore 中间件
app.use(session({
    key: 'name',
    secret: '123456',
    store: new SessionStore(options),
    cookie: {
        maxAge: 6 * 60 * 60 * 1000
    },
}))





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var pathUrl= url.parse(req.url, true).pathname
    console.log(pathUrl)
    console.log(req.session.name)
   if(req.session.name||(pathUrl.indexOf('register')!=-1)){
       next(createError(404));
   } else{
       res.redirect('/');
    }

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    console.log("qweqwewqewq");
    console.log("Error happens",err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;

var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
