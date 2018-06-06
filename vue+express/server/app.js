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
var history = require('connect-history-api-fallback');
var morgan = require('morgan');
var fs = require('fs');



//生成一个 SessionStore 实例的参数
var options =mysqlConf.mysql;
    options['resave']=false;
    options['saveUninitialized']=true;
var app = express();
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

app.use(morgan('combined'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// 自定义token
morgan.token('from', function(req, res){
    let date=new Date();
    date='--------'+date;
    return date || '-';
});

// 自定义format，其中包含自定义的token
morgan.format('joke', '[joke] :method :url :status :res[content-length] - :response-time ms :from');
app.use(morgan('joke', {stream: accessLogStream}));
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

// //登录拦截器
// app.use(function (req, res, next) {
//     // var url = req.originalUrl;
//     var pathUrl= url.parse(req.url, true).pathname
//     console.log({path: req.path, baseUrl: req.baseUrl, originalUrl: req.originalUrl, url: req.url,header:req.headers});
//     console.log(req.session.name)
//     if (req.session.name||(pathUrl.indexOf('register')!=-1)||pathUrl=='/') {
//         console.log("keyi")
//         next();
//     }else{
//         console.log("buxing")
//         return res.redirect("/");
//     }
// });
// app.use(history(
//     {
//         htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
//     }
// ))
app.use(express.static(path.join(__dirname, 'public')));





;

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

       next(createError(404));

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


// var http = require('http');
var io= require('./socket/socket')


var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
io.getSocketio(server)
