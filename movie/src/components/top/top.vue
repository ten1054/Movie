<template>
    <div class="page" @scroll="head">
        <div class="header">
            <div class="top" id="head">
                <div class="logo"><img src="../../assets/img/logo2.png"></div>
                <div class="nav-content"><i class="iconfont icon-shouye1" @click="tohome">&nbsp;</i><span @click="tohome">电影首页</span></div>
                <div class="nav-content"><i class="iconfont icon-shu1" @click="tointroduce">&nbsp;</i><span @click="tointroduce">推荐观影</span></div>
                <div class="nav-content"><i class="iconfont icon-lunchuan-huolun" @click="tomess">&nbsp;</i><span @click="tomess">留言板</span></div>
                <div class="nav-content" id='box' @mouseleave="leave" v-if="islogin">
                    <div class="pic" id="list"  @mouseenter="enter"><img src="../../assets/img/touxiang.png"></div>
                    <div class="mean" id="mean">
                        <span>用户名:{{username}}</span>
                        <span>个人中心</span>
                        <span @click="outlogin">退出</span>
                    </div>
                </div>
                <div class="nav-content" v-else><i class="iconfont icon-4">&nbsp;</i><span @click="tologin">登录/</span><span @click="tologin">注册</span></div>
            </div>
        </div>
        <div class="header2" >
            <div class="top2" id = head2></div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import {isLogin} from "../../assets/js/common";
    import {headopacity,enter,leave} from './top.js' //引入top.vue的js文件（事件处理方法）
    export default {
        name: "top",
        data(){
            return{
                islogin:false,
                username:'Shao'
            }
        },
        mounted() {
            //头部透明度变化
            document.addEventListener('scroll',headopacity);
            //查看seesionStorage中用户状态并更改
            isLogin(this);
        },
        methods:{
            //监听页面滚动事件，改变header盒子的透明度
            head:function () {
               headopacity()
            },
            //跳转首页
            tohome:function () {
                this.$router.push('/SHAO/home').catch(()=>{})
            },
            //跳转阅评页面
            tointroduce:function () {
                this.$router.push({
                    path:'/SHAO/introduce',
                        query:{
                    name:this.username
                }
                }).catch(()=>{})
            },
            //跳转登陆页面
            tologin:function () {
                this.$router.push('/login').catch(()=>{})
            },
            tomess:function () {
                this.$router.push({
                        path:'/SHAO/information',
                        query:{
                            name:this.username
                        }
                    }).catch(()=>{})
            },
            //鼠标移入出现菜单
            enter:function () {
                enter();
            },
            //鼠标移出出现菜单
            leave:function () {
                leave();
            },
            //退出登录
            outlogin:function () {
                var a = {
                    isLogin:false
                };
                this.$store.commit('Loginchange',a);
                //返回登录页面
                this.$router.push('/');
                //清空sessionStorage
                sessionStorage.removeItem("user");
            }
        },
        destroyed() {
            document.removeEventListener('scroll',headopacity);
        }
    }
</script>

<style scoped lang="less">
    @import './top-media.less';
    .iconfont{
        color: #ffffff;
        font-size: 0.3rem;
    }
.page{
    width: 100%;
    height:auto;
    background-image:url("./../../assets/img/bg6.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color:#959C9C;
    .header2{
        position:relative;
        top: -1.2rem;
        margin: 0 auto;
        z-index: 9;
        width:80%;
        height:1.2rem;
        .top2{
            position: fixed;
            top:0px;
            width:80%;
            height:1.2rem;
            transition: 1s;
            background-color: black;
            opacity: .2;
        }
    }
    .header{
        position: relative;
        margin: 0 auto;
        z-index: 10;
        width:80%;
        height:1.2rem;;
        .top{
            position: fixed;
            display: flex;
            justify-content: space-between;
            top:0px;
            width:80%;
            height:1.2rem;
            .logo{
                width:20%;
                text-align: center;
                font-size: 0.2rem;
                height:1.2rem;
                perspective:1rem;
                img{
                    width:1rem;
                    height:1rem;
                   border-radius: 50%;
                    transition: 2s;
                    &:hover{
                        transform: rotateY(360deg);
                    }
                }
            }
            .nav-content{
                color: #cbcbcb;
                font-size: 0.1rem;
                width:20%;
                text-align: center;
                height:1.2rem;
                line-height: 1.2rem;
                transition: 1s;
                overflow: hidden;
                &:hover{
                  background-color: #4c0a5e;
                }
                span{
                    cursor: pointer;
                    transition: 1s;
                    &:hover{
                        letter-spacing: 1px;
                        color: #ffffff;
                    }
                }
            }
            .nav-content:nth-child(5){
                overflow: visible;
                .pic{
                    cursor: pointer;
                    position: relative;
                    margin:0.2rem auto ;
                    width:0.8rem;
                    height:0.8rem;
                    border-radius: 50%;
                    transition: 1s;
                    z-index: 10;
                    &:before{
                        content: "";
                        position: absolute;
                        top:50%;
                        left:50%;
                        transform: translateY(-50%) translateX(-50%);
                        width:0.7rem;
                        height: 0.7rem;
                        border-radius: 50%;
                        background-color: rgb(169, 49, 239);
                    }
                    &:hover{
                        background-color: #50ba49;
                    }
                    img{
                        position: absolute;
                        top:50%;
                        left:50%;
                        transform: translateY(-50%) translateX(-50%);
                        width:0.4rem;
                        height:0.4rem;
                    }
                }
                .mean{
                    z-index: -1;
                    width:60%;
                    margin: 0% 20%;
                    height:1rem;
                    background-color: #dbdbdb;
                    display: none;
                    flex-wrap: wrap;
                    align-content: space-around;
                    border-radius: 5px;
                    span{
                        display: block;
                        line-height: 0.3rem;
                        width:100%;
                        height:30%;
                        color: #6b1f98;
                        font-family: "Times New Roman", Times, serif;
                        &:hover{
                            letter-spacing: normal;
                            background-color: #b090ef;
                        }
                    }
                }
                &:hover{
                  background-color: transparent;
                }
            }
        }
    }
}
</style>