var fs = require('fs')

fs.readFile('input.txt',function(err,data){

    if(err){
        console.log('数据读取错误');
    }else{
        console.log('异步读取完成：'+data.toString());
    }

});

var data = fs.readFileSync('input.txt');
console.log('同步读取完成：'+data.toString());