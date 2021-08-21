const {array} = require('./array');//数据更改
const {pinjie} = require('./array');//查询数据拼接
const mysql = require('mysql');
const express = require('express');
const  path = require('path');
const url = require('url');
const router = express.Router();
const SQL = require('./sql-tj');//数据库条件
const db = {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'movie',//数据库名字
    port:'3306',
};//我的mysql数据库连接
const conn = mysql.createConnection(db);
conn.connect();//开始连接数据库
router.get('/login',(req,res)=>{
    //接受从客户端传来的函数名称
    var  fname = req.query.callback;
    //获得请求中的所有参数
    let logininfo = req.query;
    let user = {user:logininfo.username,pow:logininfo.password};
    //定义数据库查询条件
    const sql_login = SQL.user.select + " where username = '"+ user.user + "'";
    console.log(sql_login);
    // //通过查询数据库并与前端传来的参数进行对比
    conn.query(sql_login,user,(error,result)=>{
        var data ="";
        var userdata = result;
        try{
             if(result[0].username === user.user && result[0].password !== user.pow){
                //代表用户密码错误
                 userdata = JSON.stringify(userdata);
                data = fname + `({state:0,userdata:${userdata}})`;
                res.send(data)
            }
            else if(result[0].username === user.user && result[0].password === user.pow){
                //代表用户正确，登录成功
                 userdata = JSON.stringify(userdata);
                 data = fname + `({state:1,userdata:${userdata}})`;
                res.send(data)
            }
            else {
                 userdata = JSON.stringify(userdata);
                 data = fname + `({state:-1,userdata:${userdata}})`;
                 res.send(data);
                 console.log('没有结果');
             }
        }
        catch (e) {
            //代表用户不存在
            data = fname + '({state:-1})';
            res.send(data);
            console.log('没有结果');
        }

    });
});
router.get('/sign',(req,res)=>{
    var fname = req.query.callback;
    let signinfo = req.query;
    let sign = signinfo.signuser;
    let allinfo = {username:signinfo.signuser,password: signinfo.signpow};
    let sql_sign = SQL.user.select + " where username = '"+ sign + "'";
    var query = new Promise(function (resolve, reject) {
        conn.query(sql_sign,sign,(error,result)=>{
            var data = "";
            if (result == 0){
                resolve(allinfo);
            }
            else{
                reject();
            }
        });
    });
    query.then(function (data) {
        let sql_sign =SQL.user.insert + `('${data.username}','${data.password}')`;
        console.log(sql_sign);
        conn.query(sql_sign,sign,(error,result)=>{
           var  data = fname + '({state:1})';
            res.send(data)

        });
    },function(){
        var  data = fname + '({state:0})';
        res.send(data)
    })
});
router.get('/home',(req,res) =>{
    var sql_movie =SQL.user.selectmovie + ' limit '+ req.query.pagesize + ' offset '+ req.query.pagenum * req.query.pagesize;
    console.log(sql_movie);
    var a = 'success';
    var movie = new Promise(function (resolve, reject) {
        conn.query(sql_movie,a,function (error,result) {
            if(error){
                reject();
            }
            else{
                resolve(result)
            }
        })
    });
    movie.then(function (data) {
        var  fname = req.query.callback;
        var movie =JSON.stringify(data);
        var result = fname + `(${movie})`;
        res.send(result);
    });
});
router.get('/toppic',(req,res) =>{
    var a = 'success';
conn.query(SQL.user.selecttoopic,a,(error,result)=>{
    var fname = req.query.callback;
    var toppic = JSON.stringify(result);
    var data = fname +`(${toppic})`;
    res.send(data);
})
});
router.get('/hot',(req,res)=>{
    var success = 'true'
    conn.query( SQL.user.selecthot,success,(error,result)=>{
        var fname = req.query.callback;
        var hot = JSON.stringify(result);
        var data = fname + `(${hot})`;
        res.send(data);
    })
});
router.get('/Alldata',(req,res)=>{
    var success = 'true';
    conn.query( SQL.user.selectalldata,success,(error,result)=>{
        var fname = req.query.callback;
        var alldata = JSON.stringify(result);
        var data = fname + `(${alldata})`;
        res.send(data);
    })
});
router.get('/introduce',(req,res)=>{
    var success = 'true';
    var allmoviedata;
    var alldata = new Promise((resolve, reject) => {
        conn.query( SQL.user.selectalldata,success,(error,result)=>{
            //所有数据已拿到
            if(result){
                allmoviedata = result
                resolve()
            }
            else{
                reject()
            }

        })
    });
    var userdata = new Promise((resolve, reject) => {
        var name = req.query.username;
        var selectuserdata = `select * from ${name}`;
        conn.query( selectuserdata,success,(error,result)=>{
            //拿到用户单独的数据
            if(result){
                resolve(result)
            }
            else{
                reject()
            }
        })
    });
    alldata.then(function () {
        return userdata;
    });
    userdata.then(function (userdata) {
        array(allmoviedata,userdata);
        var fname = req.query.callback;
        allmoviedata = JSON.stringify(allmoviedata);
        var data = fname + `(${allmoviedata})`;
        res.send(data);
    })

});
router.get('/introduce-save',(req,res)=>{
    var success = 'true';
    var updatename = req.query.name;
    var id = req.query.id;
    var hotstatus = req.query.hotstatus;
    console.log(hotstatus);
    var hot = Number(req.query.number);
    //获取用户名的表名
    var username = req.query.username;
    var insert = `insert into ${username}(name,id,hotstatus) values ("${updatename}",${id},"${hotstatus}")`;
    var delt =` DELETE FROM ${username} WHERE name ="${updatename}"`;
    var numberup =`UPDATE movie SET hot=${hot} where name ="${updatename}"`;
    //根据hotstatus修改数据
        if(hotstatus ==="true"){
            var INSERT = new Promise((resolve, reject) => {
                conn.query( insert,success,(error,result)=>{
                    if(error){
                        return false
                    }
                    else {
                        resolve()
                    }
                })
            });
            INSERT.then(function () {
                conn.query( numberup,success,(error,result)=>{
                    var fname = req.query.callback;
                    var data = fname + `({state:'添加和修改成功'})`;
                    res.send(data);
                });
            })
        }
        else{
            var DELT = new Promise((resolve, reject) => {
                conn.query( delt,success,(error,result)=>{
                    if(error){
                        return false
                    }
                    else {
                        resolve()
                    }
                })
            });
            DELT.then(function () {
                conn.query( numberup,success,(error,result)=>{
                    var fname = req.query.callback;
                    var data = fname + `({state:'删除和修改成功'})`;
                    res.send(data);
                });
            })
        }
});
router.get('/Message',(req,res)=>{
    var success = 'true';
    conn.query( SQL.user.selectmessage,success,(error,result)=>{
        var fname = req.query.callback;
        var message = JSON.stringify(result);
        var data = fname + `(${message})`;
        res.send(data);
    })
});
router.get('/messagedata',(req,res)=>{
    var success = 'true';
    var parentdata;
    var childdata;
    var alldata = {
        parent:parentdata,
        child:childdata
    };
    var p1 = new Promise((resolve) => {
        conn.query( SQL.user.selectparentmessage,success,(error,result)=>{
            if(result){
                parentdata = result;
                resolve()
            }
            else{
                return false
            }
        })
    });
    p1.then(function () {
        conn.query( SQL.user.selectchildmessage,success,(error,result)=>{
            childdata = result;
            var fname = req.query.callback;
            parentdata = JSON.stringify(parentdata);
            childdata = JSON.stringify(childdata);
            var data = fname + `({parent:${parentdata},child:${childdata}})`;
            res.send(data);
        })
    })
});
router.get('/savemessage',(req,res)=>{
    //获取发送过来的数据
    var savedata = req.query;
    var success = 'true';
    var sql = SQL.user.insertparentmessage +  `('${savedata.message1}','${savedata.userid}','${savedata.username}','${savedata.time}')`;
    console.log(sql);
    conn.query( sql,success,(error,result)=>{
        if(error){
            var fname = req.query.callback;
            var data = fname + `({state:0})`;
            res.send(data);
        }
        else{
             fname = req.query.callback;
             data = fname + `({state:1})`;
            res.send(data);
        }
    })
});
router.get('/savechildmessage',(req,res)=>{
    //获取发送过来的数据
    var savedata = req.query;
    //判断获取过来的是否是空字符串
    console.log(typeof req.query.touserID);
    if(req.query.touserID == "null"){
        console.log(1);
        var sql = SQL.user.insertchildmessagefalse +  `('${savedata.message2}','${savedata.fromuser}','${savedata.time}','${savedata.fromuserID}','${savedata.textID}')`;
    }
    else{
        console.log(2);
        sql = SQL.user.insertchildmessagetrue +  `('${savedata.message2}','${savedata.fromuser}','${savedata.touser}','${savedata.time}','${savedata.fromuserID}','${savedata.touserID}','${savedata.textID}')`;
    }
    var success = 'true';
    console.log(sql);
    conn.query( sql,success,(error,result)=>{
        if(error){
            var fname = req.query.callback;
            var data = fname + `({state:0})`;
            res.send(data);
        }
        else{
            fname = req.query.callback;
            data = fname + `({state:1})`;
            res.send(data);
        }
    })
});
module.exports = router;