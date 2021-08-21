import {jsonp,saveitem,getitem} from '../../assets/js/common'
//登录获得焦点事件
function logininit() {
    var user = document.getElementById('user');//获取用户名输入框元素
    var pass = document.getElementById('pass');//获取密码输入框元素
    var use =document.getElementsByClassName('use')[0];//获取用户名输入框外的盒子元素
    var pow =document.getElementsByClassName('pow')[0];//获取密码输入框外的盒子元素
    //添加用户名输入框获得焦点事件
    user.onfocus =function () {
        use.style.boxShadow ='0px 0px 2px 2px rgb(181, 23, 216)';//设置包含用户名输入框的盒子元素的盒子阴影
    };
    //添加用户名输入框失去焦点事件
    user.onblur = function(){
        use.style.boxShadow ='';//设置包含用户名输入框的盒子元素的盒子阴影为空
    };
    //添加密码输入框获得焦点事件
    pass.onfocus = function () {
        pow.style.boxShadow ='0px 0px 2px 2px rgb(181, 23, 216)'//设置包含密码输入框的盒子元素的盒子阴影
    }
    //添加密码输入框失去焦点事件
    pass.onblur = function(){
        pow.style.boxShadow ='';//设置包含密码输入框的盒子元素的盒子阴影为空
    };
}
//注册获得焦点事件,使用的是事件代理的方式。
function signinte() {
    var sign = document.getElementsByClassName("Sign")[0];//获取注册的盒子
    var input = document.getElementsByName('sipt');
    var arr = [...input];
    sign.onclick = function (e) {
        if(e.target.type == 'text'||e.target.type == 'password'){
            arr.forEach(function (array) {
                array.style.boxShadow ='';
            })
            if(e.target.parentNode.className =='codeipt'){
                e.target.style.boxShadow ='0px 0px 2px 2px rgb(181, 23, 216)';
            }
            else{
                var graparent = e.target.parentNode.parentNode;
                graparent.style.boxShadow ='0px 0px 2px 2px rgb(181, 23, 216)';
            }
        }
        if(e.target.id =="sbtn"){
            arr.forEach(function (array) {
                array.style.boxShadow ='';
            })
        }
    }

}
//随机验证码
function randomcode() {
    var string = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
    var arr =string.split("");
    var result ="";
    for(var i=0;i<5;i++){
        var num = Math.floor(Math.random()*arr.length);
        result += arr[num];
    }
    document.getElementById('random').innerHTML=result;
}
//点击更换验证码
function changecode() {
    var change = document.getElementsByClassName('RandomCode')[0];
    change.onclick =function () {
        randomcode()
    }
}
//点击登录事件
function login(that) {
    var user;
    //显示出loading组件
    //使用jsonp继续跨域处理
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/login',
        data:{
            login:that.login
        },
        //处理数据
        success:function(data){
            switch (data.state) {
                case -1:
                    that.$message({
                        showClose: true,
                        message: '请输入正确的用户',
                        type: 'error'
                    });
                    break;
                case 0:
                    that.$message({
                        showClose: true,
                        message: '密码错误',
                        type: 'error'
                    });
                    break;
                case 1:{
                    that.$message({
                        showClose: true,
                        message: '登陆成功',
                        type: 'success'
                    });
                    //监听checkbox
                    var check = document.getElementById('check');
                    if(check.checked){
                         user = {
                            username:that.login.username,
                            password:that.login.password,
                             userid:data.userdata[0].id,
                            isLogin:true
                        };
                        // //将数据存放在sessionStorage中
                        // saveitem(user);
                        //将vuex中的isLogin状态改为true，并进行数据持久化
                        that.$store.commit('Loginchange',user);
                    }
                    else{
                         user = {
                            isLogin:true,
                             username:"",
                             password:"",
                        };
                        // //将数据存放在sessionStorage中
                        // saveitem(login);
                        that.$store.commit('Loginchange',user);
                    }
                    // //将vuex中的登录状态改为true
                    // that.$store.commit('Loginchange',true);
                    //跳转页面
                    that.$router.push('/SHAO');
                    break;
                }
            }
        },
        error:function(data){
            console.log(data);
        },
    });
}
//点击注册事件
function Signup(sign,that) {
    //正则表达式
    var reg = /^[A-Z]\w{6}$/;
    //获得验证码
    var codeipt = document.getElementById('random');
    //验证各个输入框的正确
    if(reg.test(sign.signuser) && sign.signpow ===sign.confirepow &&codeipt.innerText ===sign.code){
        //向数据库发送请求添加用户
        jsonp({
            //请求方式
            type:'get',
            //请求地址
            url:'http://localhost:4000/sign',
            data:{
                Sign:sign
            },
            //处理数据
            success:function(data){
                switch (data.state) {
                    case 0:
                        that.$message({
                            showClose: true,
                            message: '用户名已存在，请重新输入',
                            type: 'warning'
                        });
                        break;
                    case 1:{
                        that.$message({
                            showClose: true,
                            message: '注册成功',
                            type: 'success'
                        });
                        break;
                    }
                }
            },
            error:function(data){
                console.log(data);
            },
        });
    }
    else {
        that.$message({
            showClose: true,
            message: '请按照格式填写账户或验证码',
            type: 'error'
        });
    }
}
//验证注册信息
function confire(sign) {
    //获得input标签，用于keyup事件
    var ipt = document.getElementsByClassName('ipt');
    //获得用户提示信息的span标签
    var tips = document.getElementsByClassName('tips');
    //将为数组转为数组，使其可以使用数组的方法
    var span = Array.from(tips);
    //验证用户账户的准确
    ipt[0].onkeyup = function (){
           var time = null;
           clearTimeout(time);
            time =  setTimeout(function () {
               //注册账户的正则表达式
               var reg = /^[A-Z]\w{6}$/;
               if (!reg.test(sign.signuser)) {
                   span[0].innerHTML = "请输入正确的账户";
                   span[0].style.color = '#F0002F';
               }
               else {
                   span[0].innerHTML = "账户可用";
                   span[0].style.color = '#977bcb';
               }
           },1000)
       };
    //验证两次密码是否都正确
    ipt[1].onkeyup = function () {
        var time = null;
        clearTimeout(time);
        time =  setTimeout(function () {
            if( sign.confirepow && sign.signpow !== sign.confirepow){
                span[2].innerHTML = '两次密码不一致';
                span[2].style.color = '#cb3d29';
            }
        },1000)
    };
    ipt[2].onkeyup = function () {
        var time = null;
        clearTimeout(time);
        time =  setTimeout(function () {
            if(sign.signpow === sign.confirepow && sign.signpow){
                span[2].innerHTML = '两次密码一致';
                span[2].style.color = '#977bcb';
            }
            else if(!sign.confirepow){
                span[2].innerHTML = '请再次输入密码';
                span[2].style.color = '';
            }
            else{
                span[2].innerHTML = '两次密码不一致';
                span[2].style.color = '#cb3d29';
            }
        },1000)
    }
}
export {logininit,signinte,randomcode, changecode,login,Signup,
    saveitem,getitem,confire}
