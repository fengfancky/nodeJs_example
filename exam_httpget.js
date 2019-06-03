var request = require('request');

request('https://www.baidu.com',function(err,resp,body){
    if(!err & resp.statusCode == 200){
        console.log('Body:'+body);
    }
});