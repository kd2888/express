var userSqlMap = {
    add: 'insert into users(name, password) values(?, ?)',
    getById: 'select password from users where name = ?',
    getAll:'select * from users ',
    getdate:'select *  from xiaofei where date=?',
    getSumByDate:' select sum(breakfast),sum(lunch),sum(dinner),sum(traffic),sum(sock),sum(clothes),sum(play),sum(others) from xiaofei where date>? and date<? ',
    getSumByWork:' select sum(breakfast),sum(lunch),sum(dinner),sum(traffic),sum(sock),sum(clothes),sum(play),sum(others) from xiaofei where  work=?  '
};
exports.userSqlMap= userSqlMap