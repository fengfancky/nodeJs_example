var net = require('net');

var server = net.createServer();
var sockets = [];

server.on('connection',function(socket){
    console.log('Got a new connection');

    sockets.push(socket);
    
    socket.on('data',function(data){
        console.log('Got data :'+data);

        sockets.forEach(function(otherSockets){
            if(otherSockets && otherSockets != socket){
                otherSockets.write(data);
            }
        });
    });

    socket.on('close',function(){
        console.log('sockte close');
        var index = sockets.indexOf(socket);
        sockets.splice(index,1);

    });

    socket.on('error',function(err){
        console.log('Sockte error:'+err.message);
    });
});

server.on('error',function(err){
    console.log('Server error:'+err.message);
});

server.on('close',function(){
    console.log('Server close');
});

server.listen(4001);

