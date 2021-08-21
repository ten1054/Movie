<template>
    <div class="information">
        <div class="informationbox">
            <div class="top">请留下你们的宝贵意见</div>
            <div class="content">
                <div class="content_box" v-for="(value,index) in messagedata" :key="index">
                    <div class="userinfo">
                        <div class="userimg">
                            <div class="touxiang"><img src="../../assets/img/touxiang.png"/></div>
                        </div>
                        <div class="username">
                            <span>{{value[0].username}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-content">{{value[0]["message1"]}}</div>
                        <div class="right-foot">
                            <div class="huifu">
                                <div class="data">{{value[0].time}}</div>
                                <el-badge :value="value[1].length" class="item" type="primary">
                                    <el-button size="small" @click="openmore" :dataid="index"><span :dataid="index">{{alldatastatus[index].huifu}}</span></el-button>
                                </el-badge>
                            </div>
                            <div class="otherdata" v-show="alldatastatus[index].open">
                                <div class="Message" v-for="(data,i) in messagedata[index][1]"  :key="i">
                                    <div class="userTOuser"><span>{{data.fromuser}}</span> 回复 <span>{{data.touser}}</span>:</div>
                                    <div class="content-text">{{data.message2}}</div>
                                    <div class="Huifu">
                                        <div class="Huifu-text" :fromuser="data.fromuser" :touser="data.touser" :fromuserID="data.fromuserID" :touserID="data.touserID"  :textID="data.textID" :parentid="index" @click="childmessage">回复</div>
                                        <div class="time">{{data.time}}</div>
                                    </div>
                                </div>
                                <div class="foot-message">
                                    <div class="leaveMessage">
                                        <el-input
                                                :parentid="index"
                                                class="textareabox2"
                                                type="textarea"
                                                @change="changetext"
                                                :autosize="{ minRows: 2, maxRows: 3}"
                                                placeholder="请输入您的意见"
                                                v-model="alldatastatus[index].text">
                                        </el-input>
                                    </div>
                                    <div class="Send"><el-button :parentid="index"  :textID="messagedata[index][0].textID" @click="addchildmessage" class="sendbutton" size="mini" round><span :parentid="index" :textID="messagedata[index][0].textID">发布</span></el-button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="message">
                <div class="messagebox">
                    <el-input
                            class="textareabox"
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 5}"
                            placeholder="请输入您的意见"
                            v-model="textarea">
                    </el-input>
                </div>
                <div class="messagesend">
                    <div class="send"><el-button @click="addparentmessage" class="sendbutton" size="mini" round>发布</el-button></div>
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
    import {footanimation,addMessage,addmessage,Messagedata} from './information.js'
    export default {
        name: "informaiton",
        data(){
            return{
                //绑定最下面大的输入文本框
                textarea:"",
                //绑定每一条帖子回复内容的打开和关闭，回复内容input的绑定
                alldatastatus:{},
                //所有帖子的数据
                messagedata:[],
                //y要发送给后端的数据
                childdata:{
                    message2:"",
                    fromuser:"",
                    touser:"",
                    time:"",
                    fromuserID:'',
                    touserID:'',
                    textID:''
                },
                //点击回复后改变状态，
                childhuifu:{
                    txt:"",
                    length:"",
                },
            }
        },
        created(){
            //方法二请求数据
            Messagedata(this);
        },
        mounted(){
            //开始就触发一次
            footanimation();
            //底部动画
            window.addEventListener('mousewheel',footanimation);
            // //设置起始高度
            // initHeight(this);
        },
        methods:{
            openmore:function (e) {
                var id = Number(e.target.getAttribute('dataid'));
                this.alldatastatus[id].open =!this.alldatastatus[id].open;
                //判断当前的打开状态
                if(this.alldatastatus[id].open){
                    this.alldatastatus[id].huifu="收起回复"
                }
                else{
                    this.alldatastatus[id].huifu="回复"
                }
            },
            addparentmessage:function () {
               //添加内容
                addMessage(this);
            },
            childmessage:function (e) {
                var length = this.messagedata.length;
                //获得A回复B的名称A和B以及他们的id
                var fromuser = e.target.getAttribute('fromuser');
                var obj={
                    touser: fromuser,
                    touserID : e.target.getAttribute('fromuserid'),
                    // textID: e.target.getAttribute('textid')
                };
                var id = e.target.getAttribute('parentid');
                //存放"回复@"+ touser+":"的长度和文本内容，以便判断用户使用backspack回退后清空点击回复前的状态
                this.childhuifu.txt="回复@"+ fromuser+":";
                this.childhuifu.length=this.childhuifu.txt.length;
                for(var i=0;i<length;i++){
                    this.alldatastatus[i].text="";
                }
                //更改发布框的内容
                this.alldatastatus[id].text = this.childhuifu.txt;
                //修改需要传递的参数
                Object.assign(this.childdata,obj);
            },
            addchildmessage:function (e) {
                var id= e.target.getAttribute('parentid');
                if(this.alldatastatus[id].text ==""){
                    this.$message({
                        showClose: true,
                        message: '请输入内容',
                        type: 'warning'
                    });
                }
                else{
                    addmessage(this,e);
                }
            },
            changetext:function (newvalue) {
                var length = this.childhuifu.length;
                var result = newvalue.substring(length);
                var txt = newvalue.substring(0,length);
                //已点击回复，并且字符串的开头是A回复B的模板
                if(txt ==this.childhuifu.txt && txt!==""){

                    this.childdata.message2 = result
                }
                else{
                    this.childdata.message2 = result;
                    this.childdata.touser=null;
                    this.childdata.touserID=null;
                }
            }
        },
        watch:{

        },
        destroyed() {
            //移除底部动画
            window.removeEventListener('mousewheel',footanimation);
        }
    }
</script>

<style scoped lang="less">
.information{
    margin-top: -1.2rem;
    width:100%;
    height:auto;
    .informationbox{
        width:80%;
        background-image: linear-gradient(to top, #c0b6c2, #a68cac, #8b6497, #703b81, #530c6c);
        box-shadow: 0px 0px 2px 2px #cbccd0;
        height:auto;
        margin: 0 auto;
        .top{
            width:100%;
            height:1rem;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: linear-gradient(to right, #cf06f7, #109efc, #8c2ffd,#e99cfc,#759ade,#80fc9f,#ded87d);
            font-size: 0.5rem;
            text-align: center;
            line-height: 1rem;
            font-family: "Times New Roman", Times, serif;
        }
        .content{
            width:100%;
            height:auto;
            min-height:6rem;
            background-color: #d0d0d0;
            display: flex;
            flex-wrap: wrap;
            .content_box{
                width:100%;
                height:auto;
                min-height: 1rem;
                border: 1px solid #770492;
                background-color: rgba(198, 198, 198, 0.78);
                display: flex;
                transition: 1s;
                .userinfo{
                    width:1.5rem;
                    height:2rem;
                    .userimg{
                        width:100%;
                        height:80%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        .touxiang{
                            width:70%;
                            height:70%;
                            border: 5px double #d0d0d0;
                            background-color: #770492;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                    }
                    .username{
                        width:100%;
                        height:20%;
                        color: #795da3;
                        font-family: "Times New Roman", Times, serif;
                        font-weight: 900;
                        font-size: 0.2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }

                    }
                }
                .right{
                    position: relative;
                    height:auto;
                    width:calc(100% - 1.5rem);
                    background-color: rgba(229, 229, 229, 0.84);
                    display: flex;
                    flex-wrap: wrap;
                    align-content: space-between;
                    .right-content{
                        width:100%;
                        height:auto;
                        min-height: 2.5rem;
                        word-break:break-all;
                        padding:0.1rem 0.1rem 0 0;
                        box-sizing: border-box;
                        font-size: 0.3rem;
                    }
                    .right-foot{
                        width:100%;
                        height:auto;
                        min-height: 0.5rem;
                        background-color: rgba(229, 229, 229, 0.84);
                        display: flex;
                        flex-direction: row-reverse;
                        flex-wrap: wrap;
                        padding-bottom: 0.1rem;
                        .huifu{
                            height: 0.5rem;
                            display: flex;
                            width:auto;
                            .data{
                                width:auto;
                                height:0.5rem;
                                font-size: 0.2rem;
                                line-height: 0.5rem;
                                margin-right: 0.2rem;
                            }
                            .item{
                                height:100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                        .otherdata{
                            width:90%;
                            height:auto;
                            margin: 0 auto;
                            background-color: rgba(181, 206, 253, 0.24);
                            display: flex;
                            flex-wrap: wrap;
                            transition: 1s;
                            align-content: space-between;
                            padding:0 10px;
                            .Message{
                                width:100%;
                                height: auto;
                                word-break:break-all;
                                font-size: 0.2rem;
                                padding:0.1rem;
                                box-sizing: border-box;
                                .userTOuser{
                                    float: left;
                                    width:auto;
                                    font-size: 0.25rem;
                                    span{
                                        color: #48a6ff;
                                    }
                                }
                                .content-text{
                                  font-size: 0.2rem;
                                  line-height: 0.4rem;
                                }
                                .Huifu{
                                    width:100%;
                                    height:0.3rem;
                                    display: flex;
                                    flex-direction: row-reverse;
                                    align-items: center;
                                    border-bottom: 1px solid #b7b7b7;
                                    .time{
                                        width:auto;
                                        height:0.3rem;
                                        line-height: 0.3rem;
                                    }
                                    .Huifu-text{
                                        width: auto;
                                        padding: 0.1rem;
                                        font-size: 0.15rem;
                                        color: #4b74ff;
                                        cursor: pointer;
                                    }
                                }
                            }
                            .foot-message{
                                width:100%;
                                height:auto;
                                display: flex;
                                flex-direction: row-reverse;
                                flex-wrap: wrap;
                                .leaveMessage{
                                    margin-top: 10px;
                                    width:100%;
                                    height:auto;
                                    font-size: 0.1rem;
                                    cursor: pointer;
                                    box-sizing: border-box;
                                    background-color: #e8e8e8;
                                    border-radius: 5px;
                                }
                                .Send{
                                    width:100%;
                                    display: flex;
                                    flex-direction: row-reverse;
                                    height:0.5rem;
                                    align-items: center;
                                    .sendbutton{
                                        color: #d886da;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .message{
            width:100%;
            height:auto;
            background-color: #808183;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            .messagebox{
                width:100%;
                height:auto;
                background-color: #fffdef;
                .textareabox{
                    font-size: 0.3rem;
                }
            }
            .messagesend{
                width:100%;
                height:0.5rem;
                background-color: #795da3;
                display: flex;
                flex-direction: row-reverse;
                .send{
                    height:0.5rem;
                    width:1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .sendbutton{
                        left:0px;
                        color: #d886da;
                    }
                }
            }
        }
    }
    .foot{

        margin-top: 1rem;
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
@keyframes change {
    0%{
        height: 3rem;
    }
    100%{
        height: auto;
    }
}
    @import "./information.less";
</style>