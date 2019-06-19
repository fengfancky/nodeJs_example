var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');

httpd.listen(4001);

var socketId = '';
var socketArray = new Array();

function handler(req,res){

    if(req.url == '/example'){
        res.writeHead(200,{'Content-Type':'text/html'});
        var data = fs.readFileSync('clientSocket.html');
        res.end(data);
    }
}

//根据 name 获取socket的id
function getTargetSocketId(name){
    
    for(var i =0;i<socketArray.length;i++){
        var socket = socketArray[i];
        console.log("socket:"+socket.name)
        if(socket.name == name){
            socketId = socket.id;
            break;
        }
    }

}

//判断用户是否已经添加到数组中
function isInArray(name){

    for(var j=0;j<socketArray.length;j++){
        var socket = socketArray[j];
        if(socket.name == name){
            return true;
        }
    }

    return false;

}


io.sockets.on('connection',function(socket){

    socket.on('clientMessage',function(content){
        // socket.emit('serverMessage',content);
        // socket.broadcast.emit('serverMessage',content);
       
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
        if(!isInArray(username)){
            var data = {id:socket.id,name:username};
            socketArray.push(data);
        }
        
    });

    socket.on('disconnect',function(){
        socket.emit('serverTipMessage','你已退出聊天');
    });

    socket.emit('login');
})