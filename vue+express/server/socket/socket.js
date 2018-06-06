/*
封装socket.io,为了获取server以便监听.
2016年8月8日10:28:24
 */
var socketio = {};
var socket_io = require('socket.io');

//获取io
socketio.getSocketio = function(server){
     console.log('socket')
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        console.log('连接成功');
        socket.emit('connect', '连接成功');
        socket.on('click',function(val){
            console.log('监听点击事件');
            socket.emit('customEmit','laivbb');
        })

    })
};

module.exports = socketio;