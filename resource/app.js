var http = require('http')
var server = http.createServer();
var fs = require('fs');
// request请求事件处理函数，需要接受两个参数
// Request 请求对象   用来获取客户端的一些请求信息，如请求路劲
// Response 响应对象
//   响应对戏可以用来给客户端发送响应消息
//同步获取
let files = fs.readdirSync('./picture');
//异步获取
// fs.readdir('./picture',(err,files)=>{
//     if (err){
//         console.log(err);
//     }
//     else {
//         pictures = files;
//     }
// });
// console.log(pictures);
server.on('request',function(Request,Response){
    files.forEach(function (file) {
        //将每一个图片进行开放
        if(Request.url == '/picture/' + file){
            fs.readFile('./picture/'+ file,function (error,data) {
                if(error){
                    console.log('获取图片失败');
                    Response.end('false')
                }
                else{
                    Response.setHeader('Content-type','image/jpeg');
                    Response.end(data);
                }
            })
        }
    })
});
server.listen(3000,function(){
    console.log('服务器启动成功')
});