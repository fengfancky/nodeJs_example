var fs = require('fs');
var http = require('http');

http.createServer(function(req,resp){
    resp.writeHead(200,{'Content-Type':'video/mp4'});
    var rs = fs.createReadStream('./vod/yu.mp4');
    rs.pipe(resp);
}).listen(4000);