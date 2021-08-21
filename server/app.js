const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const router = require('./router');
// 解析 application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());//解析请求过来的json数据
// const cors = require('cors');//跨域插件
//cors方法1.只添加下面这个代码，表示所有的请求都会进行跨域处理
// app.use(cors());
//cors方法2.
// //第一种跨域解决办法,只使用router的方式
// app.all('*', function (req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
app.use(router);
app.listen(4000);
console.log('服务器启动成功');