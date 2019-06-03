var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');

httpd.listen(4000);

var keyNameId = {};

function handler(req,res){

    if(req.url == '/example'){
        res.writeHead(200,{'Content-Type':'text/html'});
        var data = fs.readFileSync('clientSocket.html');
        res.end(data);
    }
   
}

io.sockets.on('connection',function(socket){

    socket.on('clientMessage',function(content){
        socket.emit('serverMessage','你 : '+content);
        socket.broadcast.emit('serverMessage',keyNameId[socket.id]+ ' : ' +content);
    });


    socket.on('login',function(username){
        
        keyNameId[socket.id] = username;
        socket.emit('serverMessage','已加入聊天室');
        socket.broadcast.emit('serverMessage', username +' 加入聊天室');

    });

    socket.emit('login');
})