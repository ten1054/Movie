<template>
    <div class="introduce">
        <div class="introduce-content">
            <div class="introdece_name">
                <div class="name" v-for="(value,index) in fivedate" :key="value.id">
                    <div class="name_text" :dataid=index>
                        <div class="text_box" :dataid=index>{{value.name}}</div>
                    </div>
                    <div class="name_bottom">
                        <div class="bottom_line" :dataid=index></div>
                    </div>
                </div>
            </div>
            <div class="introdece_movie">
                <div class="left">
                    <div class="left_text">
                        <div class="refresh_box">
                            <div class="refresh_ball">
                                <div class="ball_logo" @click="Movechange">
                                    <i class="iconfont icon-tuijian6"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="right_box">
                        <div class="box" v-for="(value,index) in fivedate" :key="value.id" :dataid=index>
                            <div class="bg"><img :src=value.path></div>
                            <div class="bg_introduce">
                                <div class="introduce_nav">{{value.name}}</div>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{value.introduce}}</span>
                                <div class="bg_bottom">
                                    <div class="bottom_left">
                                        <i class="iconfont icon-weibo"></i>
                                        <i class="iconfont icon-qq-copy"></i>
                                        <i class="iconfont icon-douban"></i>
                                        <i class="iconfont icon-renren"></i>
                                    </div>
                                    <div class="bottom_right">{{hot_up[index].number}}
                                        <i class="iconfont" :class="[hot_up[index].isup ? 'icon-icon_dianzan-xuanzhong':'icon-tubiaozhizuomoban-13']"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class ="foot">
            <div class="footbox">
                <div class="footbox_txt">该网站用于电影宣传，将电影推荐给用户</div>
                <div class="footbox_txt">
                    <div class="border">
                        <div class="border_box">
                            <div class="iconbox" name="top"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="top"><span>one</span></div>
                        </div>
                        <div class="border_box">
                            <div class="iconbox" name="middle"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="middle"><span>HUNDRED</span></div>
                        </div>
                        <div class="border_box">
                            <div class="iconbox" name="middle"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="middle"><span>THOUSAND</span></div>
                        </div>
                        <div class="border_box">
                            <div class="iconbox" name="bottom"><i class="iconfont icon-icon_wode"></i></div>
                            <div class="border_txt" name="bottom"><span>MILLION</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {footanimation,Animation,initdata,Randomdata,
        Showmovie,changebg,endchangebg,hot_up,endsavedata} from "./introduce.js";
    import {getitem} from '../../assets/js/common.js';
    export default {
        name: "introduce",
        created() {
            //重置上个组件的onmousewheel
            window.onmousewheel = function () {};
        },
        data(){
            return {
                //全部数据
                introduce_movie:[],
                //5个随机数据
                fivedate:[],
                //爱心标签点击数据
                hot_up:[
                    {
                        number:'',
                        name:"",
                        isup:false
                    },
                    {
                        number:'',
                        name:"",
                        isup:false
                    },
                    {
                        number:'',
                        name:"",
                        isup:false
                    },
                    {
                        number:'',
                        name:"",
                        isup:false
                    },
                  {
                        number:'',
                        name:"",
                        isup:false
                    },
                ],
                //修改的全部数据整合
                updata:[]
            }
        },
        mounted() {
            //请求所有数据并初始化
            this.initdata();
            //开始就触发一次
            footanimation();
            //底部动画
            window.addEventListener('mousewheel',footanimation);
            //触发修改vuex的islogin状态
            this.isLogin();
            //进入时更改背景
            changebg();
        },
        methods:{
            //初始化数据
            initdata:function(){
                initdata(this);
            },
            //将vuex中的islogin改为true，如果本地中有账户信息则修改
            isLogin:function () {
                try {
                    var islogin = getitem().Login.isLogin;
                    if(islogin && !this.$store.state.Login.isLogin){
                        console.log('修改');
                        //将vuex中的islogin改为true
                        this.$store.dispatch('LoginChange');
                    }
                }
                catch (e) {
                    console.log('出错了');
                }
             },
            //点击事件
            Movechange:function () {
                Animation(this);
            },
            showmovie:function () {
                Showmovie();
            }
        },
        watch:{
            introduce_movie(){
                let that =this;
                this.$nextTick(()=>{
                    //获得随机5个数据
                    Randomdata(that);
                })
            },
            fivedate(){
                this.$nextTick(()=>{
                    //添加点击事件
                    Showmovie();
                    //给爱心i标签添加点击事件
                    hot_up(this);
                })
            },
            // updata(){
            //     //点击爱心后发送请求更新数据
            //     endsavedata(this);
            // }
            updata:{
                handler: function () {
                    //点击爱心后发送请求更新数据
                        endsavedata(this);
                },
                // 开启深度监听：只要obj中的任何一个属性发生改变，都会触发相应的代码
                deep: true
            }
        },
        destroyed() {
            //离开时重新更换背景
            endchangebg();
            //移除底部动画
            window.removeEventListener('mousewheel',footanimation);
        }

    }
</script>

<style scoped lang="less">
    .introduce{
        width:100%;
        height: auto;
        margin-top: -1.2rem;
        .introduce-content{
            width:100%;
            height:9rem;
            min-height: 7rem;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            background-color: transparent;
            .introdece_name{
                width:100%;
                height:10%;
                display: flex;
                flex-wrap: wrap;
                .name{
                    width:20%;
                    height:100%;
                    font-size: 0.3rem;
                    justify-content: center;
                    display: flex;
                    flex-wrap: wrap;
                    box-sizing: border-box;
                    .name_text{
                        width:100%;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        color: #dadbdd;
                        font-weight: 900;
                        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
                        .text_box{
                            display: flex;
                            align-items: center;
                            width:auto;
                            height: auto;
                            cursor: pointer;
                        }
                    }
                    .name_bottom{
                        width:50%;
                        height:5px;
                        display: flex;
                        justify-content: center;
                        .bottom_line{
                            transition: 0.5s;
                            width:0px;
                            height:80%;
                            border-radius: 20px;
                            background-color: #992dcb;
                        }
                    }
                }
            }
            .introdece_movie{
                width:100%;
                height:90%;
                display: flex;
                .left{
                    position: relative;
                    width:15%;
                    height:100%;
                    display: flex;
                    overflow: hidden;
                    .refresh_box{
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%) translateY(-20%);
                        height:60%;
                        width:0.1rem;
                        background-image: linear-gradient(to top, #931596, #5c3088, #30326c, #1c2a47, #1c1e21);
                        transition: 1s;
                        .refresh_ball{
                            position: absolute;
                            bottom:-1rem;
                            left:-0.48rem;
                            width:1rem;
                            height:1rem;
                            background-image: radial-gradient(circle, #931596, #5c3088, #30326c);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: 1s;
                            animation: light 5s infinite ;
                            .ball_logo{
                                display: flex;
                                align-items: center;
                                i{
                                    color: #ffe159;
                                    font-size: 0.6rem;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
                .right{
                    width:85%;
                    height:100%;
                    display: flex;
                    align-items: center;
                    perspective:500px;
                    overflow: hidden;
                    .right_box{
                        position: relative;
                        margin: 0 auto;
                        width:7.5rem;
                        height:5rem;
                        .box{
                            position: absolute;
                            width:100%;
                            height:100%;
                            padding: 1.5%;
                            box-sizing: border-box;
                            overflow: hidden;
                            border-radius: 10px;
                            border: 4px solid rgba(63, 43, 96, 0.98);
                            background-color: rgb(203, 204, 208);
                            transition: 1s;
                            .bg{
                                width:50%;
                                height:50%;
                                float: left;
                                img{
                                    width:100%;
                                    height:100%;
                                }
                            }
                            .bg_introduce{
                                height:100%;
                                word-break:break-all;
                                font-size: 0.3rem;
                                .introduce_nav{
                                    color: #67198a;
                                    font-weight: 900;
                                    text-align: right;
                                }
                                span{
                                    font-size: 0.2rem;
                                    font-family: "Times New Roman", Times, serif;
                                    color: #333435;
                                }
                                .bg_bottom{
                                    position: absolute;
                                    bottom: 0px;
                                    left:0px;
                                    width:100%;
                                    height:auto;
                                    background-color: #925ac9;
                                    display: flex;
                                    justify-content: space-between;
                                    box-sizing: border-box;
                                    padding: 5px;
                                    .bottom_left{
                                        width:30%;
                                        display: flex;
                                        justify-content: space-between;
                                        i{
                                            font-size: 0.4rem;
                                            cursor: pointer;
                                            color: #e5e5e5;
                                            &:nth-child(1){
                                                &:hover{
                                                    color: #f44715;
                                                }
                                            }
                                            &:nth-child(2){
                                                &:hover{
                                                    color: #ffc80c;
                                                }
                                            }
                                            &:nth-child(3){
                                                &:hover{
                                                    color: #05bf1c;
                                                }
                                            }
                                            &:nth-child(4){
                                                &:hover{
                                                    color: #519dff;
                                                }
                                            }
                                        }
                                    }
                                    .bottom_right{
                                        color: #d2cce8;
                                        i{
                                            font-size: 0.4rem;
                                            cursor: pointer;
                                            color: #ff1e9b;
                                        }
                                    }
                                }
                            }
                            &:nth-child(1){
                                transition: 1.5s;
                                z-index: 5;
                                box-shadow: 10px 10px 5px 1px rgba(23, 23, 23, 0.25);
                            }
                            &:nth-child(2){
                                top:0.1rem;
                                left:0.1rem;
                                z-index: 4;
                                box-shadow: 10px 10px 5px 1px rgba(23, 23, 23, 0.4);
                                transition: 1.25s;
                            }
                            &:nth-child(3){
                                top:0.2rem;
                                left:0.2rem;
                                z-index: 3;
                                box-shadow: 10px 10px 5px 1px rgba(23, 23, 23, 0.52);
                                transition: 1s;
                            }
                            &:nth-child(4){
                                top:0.3rem;
                                left:0.3rem;
                                z-index: 2;
                                box-shadow: 10px 10px 5px 1px rgba(23, 23, 23, 0.77);
                                transition: 0.75s;
                            }
                            &:nth-child(5){
                                top:0.4rem;
                                left:0.4rem;
                                z-index: 1;
                                box-shadow: 10px 10px 5px 1px rgba(23, 23, 23, 0.69);
                            }
                        }
                    }
                }
            }
        }
        .foot{
            width:100%;
            height:2.5rem;
            background-color: rgb(27, 27, 27);
            .footbox{
                width:80%;
                height:2.5rem;
                margin:  0 auto;
                display: flex;
                flex-wrap: wrap;
                .footbox_txt{
                    width:100%;
                    height:0.8rem;
                    font-size: 0.3rem;
                    &:nth-child(1){
                        text-align: center;
                        line-height: 0.8rem;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-image: linear-gradient(to right, #cf06f7, #109efc, #8c2ffd,#e99cfc,#759ade,#80fc9f,#ded87d);
                    }
                    &:nth-child(2){
                        height:1.7rem;
                        position: relative;
                        .border{
                            position: absolute;
                            top:50%;
                            left:50%;
                            transform: translateY(-50%) translateX(-50%);
                            width:80%;
                            height:2px;
                            background-image: linear-gradient(to right,#2c3e50,#27ae60,#2980b9,#e7594c,#8e44ad,#eb6582,#7c70ad,#4bad72,#ad7362);
                            background-size:200% 200%;
                            opacity: 0;
                            transition: 0.75s;
                            animation: bgchange 5s infinite linear;
                            .border_box{
                                position: relative;
                                display: inline-block;
                                width:25%;
                                height:0.5rem;
                                font-family: "华文琥珀";
                                &:nth-child(1){
                                    .iconbox{
                                        position: absolute;
                                        transform: translateY(-250%);
                                        width:auto;
                                        height:auto;
                                        transition: 1s;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #b61fba;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        transition: 1.5s;
                                        top:0.4rem;
                                        font-size: 0.2rem;
                                        color: #b61fba;
                                        transform: translateY(150%);
                                        opacity: 0;
                                    }
                                }
                                &:nth-child(2){
                                    .iconbox{
                                        position: absolute;
                                        left:50%;
                                        transition: 1s;
                                        transform: translateY(100%) translateX(-50%);
                                        width:auto;
                                        height:auto;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #27AE60;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        transition: 1.5s;
                                        top:-0.4rem;
                                        left:50%;
                                        transform: translateY(-250%) translateX(-50%);
                                        font-size: 0.2rem;
                                        color: #27AE60;
                                        opacity: 0;
                                    }
                                }
                                &:nth-child(3){
                                    .iconbox{
                                        position: absolute;
                                        transition: 1s;
                                        left:50%;
                                        transform: translateY(-250%) translateX(-50%);
                                        width:auto;
                                        height:auto;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #31acf3;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        transition: 1.5s;
                                        top:0.4rem;
                                        left:50%;
                                        transform: translateY(100%) translateX(-50%);
                                        font-size: 0.2rem;
                                        color: #31acf3;
                                        opacity: 0;
                                    }
                                }
                                &:nth-child(4){
                                    .iconbox{
                                        position: absolute;
                                        right:0px;
                                        transform: translateY(100%);
                                        transition: 1s;
                                        width:auto;
                                        height:auto;
                                        opacity: 0;
                                        background-color: rgb(27, 27, 27);
                                        i{
                                            color: #ffcd4d;
                                            font-size: 0.35rem;
                                        }
                                    }
                                    .border_txt{
                                        position: absolute;
                                        top:-0.4rem;
                                        right:0px;
                                        transform: translateY(-250%);
                                        transition: 1.5s;
                                        font-size: 0.2rem;
                                        color: #ffcd4d;
                                        opacity: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .box0{
        visibility: hidden;
        opacity: 0;
        transform: translateY(-70%) translateX(-40%)  rotate(-70deg) skew(-20deg) scale(0.5);
        background-color: #ff2a9e;
    }
    .box0_child{
        transition: 0.8s;
        opacity: 0;
    }
    .box1{
        visibility: hidden;
        opacity: 0;
        transform: translateY(-70%) translateX(50%)  rotate(70deg) skew(-20deg) scale(0.5);
        background-color: #ff2a9e;
    }
    .box1_child{
        transition: 0.8s;
        opacity: 0;
    }
    .box2{
        visibility: hidden;
        opacity: 0;
        transform: translateY(-60%) translateX(-50%)  rotate(-40deg) skew(-20deg) scale(0.5);
        background-color: #ff2a9e;
    }
    .box2_child{
        transition: 0.8s;
        opacity: 0;
    }
    .box3{
        transition: 0.75s;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-50%) translateX(50%)  rotate(30deg) skew(-20deg) scale(0.5);
        background-color: #ff2a9e;
    }
    .box3_child{
        transition: 0.8s;
        opacity: 0;
    }
    .box4{
     transition: 1.5s;
     visibility: hidden;
     opacity: 0;
     background-color: #ff2a9e;
    }
    .box4_child{
     transition: 0.8s;
     opacity: 0;
    }
    @keyframes bgchange {
        0%{
            background-position: 0% 0%;
        }
        50%{
            background-position: 100% 100%;
        }
        100%{
            background-position: 0% 0%;
        }
    }
    @keyframes light {
        0%{
            box-shadow: 0px 0px 1px 1px #781791;
        }
        50%{
            box-shadow: 0px 0px 10px 2px #fc6dff;
        }
        100%{
            box-shadow: 0px 0px 1px 1px #781791;
        }
    }
    .refresh_boxtwo{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        transition: 1s;
        height:60%;
        width:0.1rem;
        background-image: linear-gradient(to top, #931596, #5c3088, #30326c, #1c2a47, #1c1e21);
        .refresh_ball{
            position: absolute;
            bottom:-1rem;
            left:-0.48rem;
            width:1rem;
            height:1rem;
            background-image: radial-gradient(circle, #931596, #5c3088, #30326c);
            border-radius: 50%;
            transition: 1s;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: light 5s infinite ;
            .ball_logo{
                display: flex;
                align-items: center;
                i{
                    color: #ffe159;
                    font-size: 0.6rem;
                    cursor: pointer;
                }
            }
        }
    }
    @import "./introduce.less";
</style>