import {jsonp,getitem} from "../../assets/js/common";
//foot动画
function footanimation() {
    var iconboxs = document.querySelectorAll('.iconbox');
    var txts = document.querySelectorAll('.border_txt');
    var foot = document.getElementsByClassName('foot')[0];
    var borderbox = document.getElementsByClassName('border')[0];
    var footheight = foot.offsetTop;
    //获得滚动条滚动的高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //获得视口高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if(footheight< scrollTop + windowHeight){
        iconboxs.forEach(function (value) {
            var name = value.getAttribute('name');
            switch (name) {
                case 'middle':
                    borderbox.style.opacity = "1";
                    value.style.opacity = "1";
                    value.style.transform = "translateY(-50%) translateX(-50%)";
                    break;
                default:
                    borderbox.style.opacity = "1";
                    value.style.opacity = "1";
                    value.style.transform = "translateY(-50%)";
                    break;
            }
        });
        txts.forEach(function (value) {
            var name = value.getAttribute('name');
            switch (name) {
                case 'middle':
                    borderbox.style.opacity = "1";
                    value.style.opacity = "1";
                    value.style.transform = "translateY(-50%) translateX(-50%)";
                    break;
                default:
                    borderbox.style.opacity = "1";
                    value.style.opacity = "1";
                    value.style.transform = "translateY(-50%)";
                    break;
            }
        });
        window.removeEventListener('mousewheel',footanimation);
    }
}
//方法二请求数据
function Messagedata(that) {
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/messagedata',
        //处理数据
        success:function(data){
            var ID;
            var a={};
            var b =[];
            for(var i=0;i<data.parent.length;i++){
                a[i]={
                    open: false,
                    huifu:"回复",
                    text:""
                };
                b[i]=[];
                var keys = Object.keys(data.parent[i]);
                b[i][0]={};
                b[i][1]=[];
                keys.forEach(value=>{
                    b[i][0][value] = data.parent[i][value];
                });
                ID=b[i][0].textID;
                //初始化子数据
                data["child"].forEach(value=>{
                    if(value.textID == ID){
                        b[i][1].push(value)
                    }
                })
            }
            that.alldatastatus = a;
            that.messagedata = b;
            that.childdata.fromuser=getitem().Login.username;
            that.childdata.fromuserID=getitem().Login.userid;
            console.log(that.messagedata);
        },
        error:function(data){
            console.log(data);
        },
    });
}
//父表发送请求添加内容
function addMessage(that){
    var text = that.textarea;
    if(text){
        var username =  getitem().Login;
        //匹配特殊字符
        var reg = /[`·~^<>&'$/\\]+/g;
        text =text.replace(reg,"");
        var time = date();
        //讲文本内容添加进要传的参数中
        username.message1=text;
        username.time=time;
        console.log(username);
       jsonp({
           //请求方式
           type:'get',
           //请求地址
           url:'http://localhost:4000/savemessage',
           data:{
               userdata:username
           },
           //处理数据
           success:function(data){
               switch (data.state) {
                   case 0:
                       that.$message({
                           showClose: true,
                           message: '您当前网络不稳定，发送失败',
                           type: 'error'
                       });
                       break;
                   case 1:
                       that.$message({
                           showClose: true,
                           message: '发布成功',
                           type: 'success'
                       });
                       that.textarea="";
                       break;
               }
           },
           error:function(data){
               console.log(data);
           },
       });
    }
    else{
        that.$message({
            showClose: true,
            message: '发布内容为空',
            type: 'error'
        });
    }
}
//子表发送请求添加内容
function addmessage(that,e) {
    //点击后立刻清除所有的文本框内的内容
    var length = that.messagedata.length;
    for(var i=0;i<length;i++){
        that.alldatastatus[i].text="";
    }
    //给要传后端的数据中的time和textID添加值
    var textID= e.target.getAttribute('textID');
    that.childdata.time = date();
    that.childdata.textID = textID;
    console.log(that.childdata);
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/savechildmessage',
        data:{
            data:that.childdata
        },
        //处理数据
        success:function(data){
            switch (data.state) {
                case 0:
                    that.$message({
                        showClose: true,
                        message: '您当前网络不稳定，发送失败',
                        type: 'error'
                    });
                    break;
                case 1:
                    that.$message({
                        showClose: true,
                        message: '发布成功',
                        type: 'success'
                    });
                    that.textarea="";
                    break;
            }
        },
        error:function(data){
            console.log(data);
        },
    });
}
function date() {
    //获得当前点击时间
    var myDate =new Date();
    var myyear=myDate.getFullYear(); //获取当前年份
    var mymonth=myDate.getMonth()+1; //获取当前月
    var myday=myDate.getDay()+15; //获取当前日
    var myhours=myDate.getHours(); //获取当前小时
    var myminutes=myDate.getMinutes(); //获取当前分
    var myseconds=myDate.getSeconds(); //获取当前秒
    return  myyear+'年' + mymonth+'月' + myday+'日' + myhours+':'+ myminutes+':' + myseconds;
}
//回复动画
function animation() {

}
//起始高度
function initHeight() {
    var rightheight = document.getElementsByClassName('right-content');
    var contentbox = document.getElementsByClassName('content_box');
    console.log(contentbox);
    rightheight.forEach((value,index)=>{
        console.log(value,index);
    })
}
export {footanimation,animation,initHeight,addMessage,addmessage,Messagedata}