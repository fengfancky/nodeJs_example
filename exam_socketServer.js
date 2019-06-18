var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');

httpd.listen(4001);

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
        socket.emit('serverMessage',{value:content,current:true,name:keyNameId[socket.id]});
        socket.broadcast.emit('serverMessage',{value:content,current:false,name:keyNameId[socket.id]});
    });


    socket.on('login',function(username){
        
        if(username == null){
            keyNameId[socket.id] = socket.id;
        }else{
            keyNameId[socket.id] = username;
        }
        
        socket.emit('serverTipMessage','你已加入聊天');
        socket.broadcast.emit('serverTipMessage', username +' 加入聊天');
        
    });

    // socket.on('disconnect',function(){
    //     socket.emit('serverTipMessage','你已退出聊天');
    //     socket.broadcast.emit('serverTipMessage', keyNameId[socket.id]+' 退出聊天');
    // });

    socket.emit('login');
})