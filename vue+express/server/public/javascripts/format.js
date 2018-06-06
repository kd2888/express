
var log = require('./logcof');
function error(eror) {
    log.logerr(eror)
    return {code:0,msg:eror}
}
function success(data) {
    log.logsuc(data)
    return {code:1,data:data}
}
exports.format={
    error,
    success
}