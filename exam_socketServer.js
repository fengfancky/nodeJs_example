var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');

httpd.listen(4001);

var socketId = "";
var socketArray = new Array();

function handler(req,res){

    if(req.url == '/example'){
        res.writeHead(200,{'Content-Type':'text/html'});
        var data = fs.readFileSync('clientSocket.html');
        res.end(data);
    }
}

function getTargetSocketId(name){
    
    for(var data in socketArray){
        if(data.username === name){
            socketId = data.id;
            break;
        }
    }

}


io.sockets.on('connection',function(socket){

    socket.on('clientMessage',function(content){
        // socket.emit('serverMessage',content);
        // socket.broadcast.emit('serverMessage',content);
        console.log(content)
        getTargetSocketId(content.targetUser)
        
        if(socketId !='' & socketId!=null){
            io.to(socketId).emit('serverMessage',content.msg);
        }else{
            socket.emit('serverMessage','无此用户');
        }


        
    });


    socket.on('login',function(username){
        // socket.emit('serverTipMessage','你已加入聊天');
        // socket.broadcast.emit('serverTipMessage', username +' 加入聊天');
        var data = {id:socket.id,name:username};
        socketArray.push(data);

        // if(username === "TV"){
        //     socketId = socket.id;
        // }
    });

    socket.on('disconnect',function(){
        socket.emit('serverTipMessage','你已退出聊天');
        // socket.broadcast.emit('serverTipMessage', keyNameId[socket.id]+' 退出聊天');
    });

    socket.emit('login');
})