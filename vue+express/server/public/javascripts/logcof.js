var path = require('path');
var fs = require('fs');
var errorLogfile = fs.createWriteStream(path.join(__dirname, 'error.log'), {flags: 'a'});
var sucesssLogfile = fs.createWriteStream(path.join(__dirname, 'success.log'), {flags: 'a'});

exports.logerr=function (err) {
    var meta = '[' + new Date() + '] ' + '\n';
    errorLogfile.write(meta + JSON.stringify(err) + '\n');
}
exports.logsuc=function (data) {
    var meta = '[' + new Date() + '] ' + '\n';
    sucesssLogfile.write(meta +JSON.stringify(data) + '\n');
}