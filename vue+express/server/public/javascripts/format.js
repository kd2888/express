function error(eror) {
    return {code:0,msg:eror}
}
function success(data) {
    return {code:1,data:data}
}
exports.format={
    error,
    success
}