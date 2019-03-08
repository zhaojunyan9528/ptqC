var http = require('http')
var fs = require('fs')
var Mock = require('mockjs')
var documentRoot = './'
var RS = function(_tpl) {
    return JSON.stringify({
        "errcode": 0,
        "errmsg": "ok",
        "status": 1,
        "result": Mock.mock(_tpl)
    })
}
var mock_abc = {
    "items|100": [{
        'word': '@name'
    }]
}
var mock_cf = {
    "items|10-100": [{
        'word': '@name',
        "a|123.10": 1.123,
        'adrs':"@county(true)"
    }]
}
var server = http.createServer(function(req, res) {
    res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});
    var url = req.url;
    switch (url) {
        case "/abc":
            res.write(RS(mock_abc));
            break;
        case "/cf/asdfasdf":
            res.write(RS(mock_cf));
            break;
    }
    res.end();

}).listen(80);
console.log('服务器开启成功');