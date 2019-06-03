var express = require('express')

var app = new express();

app.get('/',function(req,resp){
    resp.send('Hello World\n 这是首页');
});

app.get('/a',function(req,resp){
    
    resp.send('这是a页面');
});

app.get('/a/b',function(req,resp){
   
    resp.send('这是b页面');
});

app.listen('8009',function(){
    console.log('服务开始...');
});