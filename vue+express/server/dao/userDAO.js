var userSqlMap = require('./userSql').userSqlMap
var mysql = require("mysql");
var mysqlConf = require('../conf/conf')
var pool = mysql.createPool(mysqlConf.mysql);
var formats = require('../public/javascripts/format').format
module.exports = {
    getById: function (id, callback) {
        pool.query(userSqlMap.getById, id, function (error, result) {
            if (error) {
                callback(formats.error(error))
                console.log(error)
                return
            }
            ;
            console.log(result);
            callback(formats.success(result));
        });
    }, installuse: function (user, callback) {
        console.log(JSON.stringify(userSqlMap.add))
        pool.query(userSqlMap.add, [user.username, user.password], function (error, result) {
            if (error) {
                callback(formats.error(error))
                console.log(error)
                return
            }
            ;
            callback(formats.success(result));
        });
    },
    selectXiaofei:function (date,callback) {
        pool.query(userSqlMap.getdate, date, function (error, result) {
            if (error) {
                callback(formats.error(error))
                console.log(error)
                return
            }
            callback(formats.success(result));
        })
    },
    inistallXiaofei:function (datakey,dataVal,callback) {
        datakey='insert into xiaofei('+datakey+') values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        pool.query(datakey, dataVal, function (error, result) {
            if (error) {
                callback(formats.error(error))
                console.log(error)
                return
            }
            ;
            callback(formats.success(result));
        });
    },
    updateXiaofei:function (dataSet,dataVal,callback) {
        dataSet='update xiaofei set '+dataSet+' where date=?';
        pool.query(dataSet, dataVal, function (error, result) {
            if (error) {
                callback(formats.error(error))
                console.log(error)
                return
            }
            ;
            callback(formats.success(result));
        });
    },
    getSumByDate:function (data,callback) {
        pool.query(userSqlMap.getSumByDate,data, function (error, result) {
            if (error) {
                callback(formats.error(error))
                console.log(error)
                return
            }
            ;
            callback(formats.success(result));
        });
    }
};