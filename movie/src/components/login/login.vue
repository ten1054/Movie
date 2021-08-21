<template>
    <div class="loginPage">
        <div id="top">
            <img src="../../assets/img/logo2.png">
            <span><i class="iconfont icon-baojingjilu">&nbsp;&nbsp;</i>界面改进请联系</span>
        </div>
        <div id="center">
            <div id="log-sig">
                <div class="switch">
                    <div class="login" @click="changelog"><b>立刻登录</b></div>
                    <div class="sign" @click="changesig"><b>免费注册</b></div>
                </div>
                <div class="Login">
                    <div class="use">
                        <div class="usericon">
                            <i class="iconfont icon-wangzhantubiaoji2_huaban1fuben23"></i>
                        </div>
                        <div class="useript"><input id="user" type="text" placeholder="用户名称/邮箱" v-model="login.username" autofocus autocomplete="off"/></div>
                    </div>
                    <div class="pow">
                        <div class="powicon">
                            <i class="iconfont icon-denglumima1"></i>
                        </div>
                        <div class="powipt"><input id="pass" type="password" placeholder="请输入登录密码" v-model="login.password" /></div>
                    </div>
                    <div class="enter">
                        <button id="enterbtn" @click="Login"><b>登录</b></button>
                    </div>
                    <div class="remember">
                        <input id="check" type="checkbox" /><span>记住账户</span>
                    </div>
                </div>
                <div class="Sign">
                    <div class="suser" name="sipt">
                        <div class="susericon">
                            <i class="iconfont icon-weibiaoti1"></i>
                        </div>
                        <div class="suseript">
                            <input class="ipt" id="suser" autocomplete="off" type="text" placeholder="用户名称/邮箱" v-model="sign.signuser" autofocus />
                        </div>
                    </div>
                    <span class="tips">以大写字母开头的7位数</span>
                    <div class="spow" name="sipt">
                        <div class="susericon">
                            <i class="iconfont icon-denglumima1"></i>
                        </div>
                        <div class="suseript">
                            <input class="ipt" id="spow" autocomplete="off" type="password" placeholder="密码" v-model="sign.signpow" autofocus />
                        </div>
                    </div>
                    <span class="tips">请输入注册密码</span>
                    <div class="spow2" name="sipt">
                        <div class="susericon">
                            <i class="iconfont icon-denglumima1"></i>
                        </div>
                        <div class="suseript">
                            <input class="ipt" id="spow2" autocomplete="off" type="password" placeholder="确认密码" v-model="sign.confirepow" autofocus />
                        </div>
                    </div>
                    <span class="tips">请再次输入密码</span>
                    <div class="Code" name="sipt">
                        <div class="codetext">
                            随机码:
                        </div>
                        <div class="codeipt">
                            <input  type="text" v-model="sign.code" placeholder="请输入验证码" name="sipt" />
                        </div>
                        <div class="RandomCode">
                            <span id="random"></span>
                        </div>
                    </div>
                    <div class="senter">
                        <button id="sbtn" @click="Sign"><b>注册</b></button>
                    </div>
                </div>
            </div>
        </div>
        <div id="foot">
            <div class="footbox">
                <ul>
                    <li><b>电影</b></li>
                    <li>电影推荐</li>
                    <li>观看须知</li>
                </ul>
            </div>
            <div class="footbox">
                <ul>
                    <li><b>服务支持</b></li>
                    <li>自助服务</li>
                    <li>问题咨询</li>
                </ul>
            </div>
            <div class="footbox">
                <ul>
                    <li><b>关于本站</b></li>
                    <li>官方微信</li>
                    <li>技术博客</li>
                    <li>图片资源</li>
                </ul>
            </div>
            <div class="footbox">
                <ul>
                    <li><b>电影</b></li>
                    <li>电影推荐</li>
                    <li>观看须知</li>
                </ul>
            </div>
        </div>
        <!--<div class="loading-wrapper" v-show ="!show">-->
            <!--<loading></loading>-->
        <!--</div>-->
    </div>
</template>

<script>
    import {logininit,signinte,randomcode,changecode,Signup,login,
        getitem,confire} from './login.js'
    export default {
        name: "login",
        data(){
            return{
                login:{
                    username:'',
                    password:'',
                },
                //注册模块里的参数
                sign:{
                    signuser:'',
                    signpow:'',
                    confirepow:'',
                    code:''
                },
                // show:'false'
            }
        },
        mounted() {
            // console.log('进入前',this.$store.state.Login.isLogin);
            logininit();//登录获得焦点事件
            signinte();//注册获得焦点事件
            randomcode();//随机验证码
            changecode();//点击更改验证码
            confire(this.sign,this);//给注册输入框添加onkeyup事件
            // console.log(this.$store.state);
            this.Remember();
        },
        methods:{
            //切换登录
            changelog:function(){
                var borderlog = document.getElementsByClassName('login')[0];
                var bordersig = document.getElementsByClassName('sign')[0];
                var login = document.getElementsByClassName('Login')[0];
                var sign = document.getElementsByClassName('Sign')[0];
                login.style.transform = 'rotateY(0deg)';
                sign.style.transform = 'rotateY(180deg)';
                borderlog.style.borderBottom = '2px solid #522c57';
                bordersig.style.borderBottom = '';

            },
            //切换注册
            changesig:function () {
                var borderlog = document.getElementsByClassName('login')[0];
                var bordersig = document.getElementsByClassName('sign')[0];
                var login = document.getElementsByClassName('Login')[0];
                var sign = document.getElementsByClassName('Sign')[0];
                login.style.transform = 'rotateY(-180deg)';
                sign.style.transform = 'rotateY(0deg)';
                borderlog.style.borderBottom = '0px';
                bordersig.style.borderBottom = '2px solid #522c57';
            },
            //登录
            Login:function () {
                login(this);
            },
            //注册
            Sign:function () {
               Signup(this.sign,this)
            },
            //页面根据session存储自动填入账户密码
            Remember:function () {
                try {
                    this.login.username = getitem().Login.username;
                    this.login.password = getitem().Login.password;
                }
                catch (e) {
                    console.log('session中没有用户数据')
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .iconfont{
        font-size: 0.3rem;
    }
    .loginPage{
        width:100%;
        height:100vh;
        /*background-color: rgb(17, 17, 17);*/
        #top{
            position: relative;
            margin: 0 auto;
            box-sizing: border-box;
            padding:0rem 1rem;
            line-height: 1.5rem;
            width:100%;
            height:1.5rem;
            background-color: #191918;
            z-index:10;
            border-bottom:1px solid #343434;
            img{
                width: 1.4rem;
                height:1.4rem;
            }
            span{
                float: right;
                cursor: pointer;
                font-size: 0.3rem;
                color: #858585;
                &:hover{
                    color: #977bcb;
                }
            }
        }
        #center{
            position: relative;
            width: 100%;
            height:@center-size;
            background-image: url("../../assets/img/bg4.jpg");
            background-size: cover;
            background-position:center;
            background-repeat: no-repeat;
            #log-sig{
                display: flex;
                flex-wrap: wrap;
                position: absolute;
                padding: 0.1rem;
                top:50%;
                left:10%;
                transform: translateY(-50%);
                width:5rem;
                height:5.5rem;
                background-color: rgba(35, 35, 35, 0.5);
                perspective:10rem ;
                .switch{
                    display: flex;
                    box-sizing: border-box;
                    padding: 0rem 0.4rem;
                    width:5rem;
                    height:0.6rem;
                    font-size: 0.25rem;
                    color: #b0b0b0;
                    .login{
                        cursor: pointer;
                        width:auto;
                        height:0.6rem;
                        line-height: 0.6rem;
                        text-align: center;
                        border-bottom: 2px solid #522c57;
                        font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;;
                    }
                    .sign{
                        cursor: pointer;
                        margin-left:0.4rem;
                        width:auto;
                        height:0.6rem;
                        line-height: 0.6rem;
                        text-align: center;
                    }
                }
                .Login{
                    backface-visibility: hidden;
                    display: flex;
                    flex-wrap: wrap;
                    position: absolute;
                    box-sizing: border-box;
                    padding: 0.2rem 0rem;
                    top:1rem;
                    width:4.4rem;
                    height:4rem;
                    margin-left: 0.3rem;
                    background-color: #212121;
                    transition: 1s;
                    border-radius: 10px;
                    .use{
                        margin-left: 0.2rem;
                        width:4rem;
                        height:0.6rem;
                        display: flex;
                        transition: .5s;
                        border-radius: 10px;
                        overflow: hidden;
                        &:hover{
                            box-shadow: 0px 0px 2px 2px rgb(181, 23, 216);
                        }
                        .usericon{
                            position: relative;
                            width:0.6rem;
                            height:0.6rem;
                            background-color: #999999;
                            i{
                                position: absolute;
                                color: #000000;
                                top:-2px;
                                font-size: 0.6rem;
                            }
                        }
                        .useript{
                            position: relative;
                            width:3.4rem;
                            height: 0.6rem;
                            input{
                                position: absolute;
                                outline:0;
                                width:3.3rem;
                                height:0.6rem;
                                padding: 0 0 0 0.1rem;
                                color: #480b48;
                                background-color: rgb(210, 210, 210);
                                font-size: 0.2rem;
                                outline:none;
                                border:none;
                            }
                        }
                    }
                    .pow{
                        margin-left: 0.2rem;
                        width:4rem;
                        height:0.6rem;
                        display: flex;
                        transition: .5s;
                        border-radius: 10px;
                        overflow: hidden;
                        &:hover{
                            box-shadow: 0px 0px 2px 2px rgb(181, 23, 216);
                        }
                        .powicon{
                            position: relative;
                            width:0.6rem;
                            text-align: center;
                            height:0.6rem;
                            background-color: #999999;
                            i{
                                position: absolute;
                                top:50%;
                                transform: translateX(-50%) translateY(-50%);
                                color: rgba(54, 54, 54, 0.83);
                                font-size: 0.5rem;
                            }
                        }
                        .powipt{
                            position: relative;
                            width:3.4rem;
                            height: 0.6rem;
                            input{
                                position: absolute;
                                width:3.3rem;
                                height:0.6rem;
                                padding: 0 0 0 0.1rem;
                                color: #480b48;
                                background-color: rgb(210, 210, 210);
                                font-size: 0.2rem;
                                outline:none;
                                border:none;
                            }
                        }
                    }
                    .enter{
                        margin-left: 0.2rem;
                        width:4rem;
                        height:0.6rem;
                        #enterbtn{
                            width:4rem;
                            padding:0;
                            color: #1d1d1d;
                            border: 1px solid #2f1c4b;
                            height:0.6rem;
                            background-color: #bcbcbc;
                            position: absolute;
                            transition: 0.5s;
                            font-size: 0.2rem;
                            letter-spacing:5px;
                            text-align: center;
                            outline:0;
                            border-radius: 10px;
                            cursor: pointer;
                            &:hover{
                                color: #795da3;
                                border: 1px solid #8432b6;
                                box-shadow: 0px 0px 5px 3px;
                            }
                        }
                    }
                    .remember{
                        position: relative;
                        margin-left: 0.2rem;
                        width:4rem;
                        height:0.3rem;
                        line-height: 0.2rem;
                        input[type=checkbox]{
                            width:0.2rem;
                            height:0.2rem;
                            position: absolute;
                            top: 0px;
                            margin: 0;
                            &:checked ~ span{
                                color: #c584ff;
                            }
                        }
                        span{
                            display: inline-block;
                            position: absolute;
                            color: #f9f9f9;
                            top:0px;
                            left:0.25rem;
                            font-size: 0.2rem;
                        }
                    }
                }
                .Sign{
                    position: absolute;
                    backface-visibility: hidden;
                    box-sizing: border-box;
                    background-color: #212121;
                    transition: 1s;
                    padding: 0.2rem 0rem 0rem 0rem;
                    display: flex;
                    flex-wrap: wrap;
                    top:1rem;
                    width:4.4rem;
                    margin-left: 0.3rem;
                    height:4.5rem;
                    transform: rotateY(180deg);
                    border-radius: 10px;
                    .suser,.spow,.spow2{
                        margin-left: 0.2rem;
                        width:3.8rem;
                        height:0.4rem;
                        display: flex;
                        transition: .5s;
                        flex-wrap: wrap;
                        border-radius: 5px;
                        overflow: hidden;
                            &:hover{
                                box-shadow: 0px 0px 2px 2px rgb(181, 23, 216);
                            }
                            .susericon{
                                position: relative;
                                width:0.4rem;
                                height:0.4rem;
                                background-color: #999999;
                                i{
                                    position: absolute;
                                    color: #000000;
                                    top:50%;
                                    left:50%;
                                    transform: translateY(-50%) translateX(-50%);
                                    font-size: 0.35rem;
                                }
                            }
                            .suseript{
                                position: relative;
                                width:3.4rem;
                                height: 0.4rem;
                                input{
                                    position: absolute;
                                    width:3.3rem;
                                    height:0.4rem;
                                    padding: 0 0 0 0.1rem;
                                    color: #480b48;
                                    background-color: rgb(210, 210, 210);
                                    font-size: 0.2rem;
                                    outline:none;
                                    border:none;
                                }
                            }
                    }
                    .tips{
                        display: block;
                        width:3.8rem;
                        height: 0.4rem;
                        padding-left:0.6rem;
                        font-size: 0.1rem;
                        /*color: #a03ede;*/
                        color: #d6d6d6;
                    }
                    .Code{
                        margin-left: 0.2rem;
                        width:3.8rem;
                        flex-wrap: wrap;
                        height:0.4rem;
                        display: flex;
                        transition: .5s;
                        .codetext{
                            width:0.6rem;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            font-size: 0.1rem;
                            color: #bcbcbc;
                        }
                        .codeipt{
                            position: relative;
                            width:1.8rem;
                            height:0.4rem;
                            input{
                                width:1.2rem;
                                height:0.4rem;
                                margin: 0;
                                border: 0;
                                outline: none;
                                position: absolute;
                                border-radius: 5px;
                                padding: 0 0 0 0.1rem;
                                color: #480b48;
                                background-color: rgb(210, 210, 210);
                                font-size: 0.1rem;
                            }
                        }
                        .RandomCode{
                            box-sizing: border-box;
                            width:1rem;
                            height: 0.4rem;
                            border: 1px solid #bcbcbc;
                            background-color: #c1c1c1;
                            font-size: 0.2rem;
                            text-align: center;
                            line-height: 0.4rem;
                            color: #c31bf5;
                            letter-spacing: 2px;
                            cursor: pointer;
                            font-family: "华文琥珀";
                        }
                    }
                    .senter{
                        display: flex;
                        margin-left: 0.2rem;
                        width:4rem;
                        height:0.5rem;
                        justify-content: center;
                        #sbtn{
                            cursor: pointer;
                            width:4rem;
                            padding:0;
                            color: #1d1d1d;
                            border: 1px solid #2f1c4b;
                            height:0.5rem;
                            background-color: #bcbcbc;
                            position: absolute;
                            transition: .5s;
                            font-size: 0.2rem;
                            letter-spacing:5px;
                            text-align: center;
                            border-radius: 10px;
                            outline:0;
                            &:hover{
                                color: #795da3;
                                border: 1px solid #8432b6;
                                box-shadow: 0px 0px 5px 3px;
                            }
                        }
                    }
                }
            }
        }
        #foot{
            display: flex;
            flex-wrap: wrap;
            width:100%;
            box-sizing: border-box;
            height:calc(~'100vh - @{center-size} - 1.5rem');
            min-height: 2.7rem;
            background-color: rgb(17, 17, 17);
            justify-content: space-around;
            align-content: center;
            .footbox{
                width:25%;
                box-sizing: border-box;
                height:auto;
                font-size: 0.1rem;
                color: #666666;
                text-align: center;
                ul{
                    list-style: none;
                    padding: 0;
                    li{
                        height:0.5rem;
                        &:nth-child(1){
                            font-size: 0.2rem;
                            height:0.5rem;
                            color: #9b9b9b;
                        }
                        &:hover{
                            cursor: pointer;
                            color: #795da3;
                        }
                    }
                }
            }
        }
        .loading-wrapper{
            position: absolute;
            top:0px;
            text-align: center;
            width:100%;
            height:10rem;
        }
    }
    @import "./login.less";


</style>