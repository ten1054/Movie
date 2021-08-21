import {jsonp,getitem} from "../../assets/js/common";
//进入时更改背景
function changebg() {
    var bg = document.querySelector('.page');
    bg.style.backgroundImage="linear-gradient(to top, #931596, #5c3088, #30326c, #1c2a47, #1c1e21)";
}
//离开时改变背景
function endchangebg() {
    var bg = document.querySelector('.page');
    bg.style.backgroundImage = 'url(' + require('./../../assets/img/bg6.jpg') + ')';
}
//请求所有数据
function initdata(that){
    var username = getitem().Login.username;
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/introduce',
        data:{
            username:username
        },
        //处理数据
        success:function(data){
            data.forEach( function (value) {
                var repath = value.path;
                value.path =  "http://localhost:3000" + repath;
            });
            that.introduce_movie = data;
        },
        error:function(data){
            console.log(data);
        },
    });
}
//随机5个数据
function Randomdata(that) {
    var result = [];
    while(result.length!== 5){
        const number = Math.floor(Math.random()*15);
        var flag = result.findIndex(value=>
            value.name == that.introduce_movie[number].name
        );
        if(flag ==-1){
            result.push(that.introduce_movie[number]);
        }
    }
    that.fivedate =result;
    result.forEach((value,index)=>{
        that.hot_up[index].number =value.hot;
        that.hot_up[index].name =value.name;
        that.hot_up[index].isup =value.hotstatus;
    });
    that.hot_up.forEach(value=>{
        if(value.isup ==="false"){
            value.isup = false
        }
        else{
            value.isup = true
        }
    });
    var allname = document.querySelector('.introdece_name');
    allname.removeEventListener('click',changemovie );
    //清空所有添加的状态
    var bottom_lines =document.querySelectorAll('.bottom_line');
    bottom_lines.forEach(value=>{
        value.style.width="0%";
    });
    var boxs = document.querySelectorAll('.box');
    boxs.forEach(value=>{
            var id= value.getAttribute('dataid');
            value.classList.remove(`box${id}`);
            value.children.forEach(value=>{
            value.classList.remove(`box${id}_child`);
        });
    });
}
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
//点击刷新数据的事件
function Animation(that) {
    var refreshbox = document.querySelector('.refresh_box');
    var i = document.querySelector('.ball_logo').firstChild;
    i.className="iconfont icon-tuijian5";
    refreshbox.className='refresh_boxtwo';
    setTimeout(()=>{
        refreshbox.className='refresh_box';
        i.className="iconfont icon-tuijian6";
    },1000);
    Randomdata(that)
}
//点击电影名展示对于板块
function Showmovie(){
    var allname = document.querySelector('.introdece_name');
    var bottom_lines =document.querySelectorAll('.bottom_line');
    bottom_lines[0].style.width="100%";
    allname.addEventListener('click',changemovie );
}
function changemovie(e) {
        var classname = e.target.getAttribute('class');
        var bottom_lines =document.querySelectorAll('.bottom_line');
        if(classname == 'text_box'){
            var id = e.target.getAttribute('dataid');
            var idtwo = id;
            var boxs = document.querySelectorAll('.box');
            //点击的下边框样式
            bottom_lines.forEach(value=>{
                value.style.width="0%";
            });
            bottom_lines[id].style.width="100%";
            //开始添加class,点击目前之前消失
            while(id>0){
                boxs[id-1].classList.add(`box${id-1}`);
                boxs[id-1].children.forEach(value=>{
                    value.classList.add(`box${id-1}_child`);
                });
                id--;
            }
            //点击目前之前出现
            for(var i=idtwo;i<5;i++){
                boxs[i].classList.remove(`box${i}`);
                boxs[i].children.forEach(value=>{
                    value.classList.remove(`box${i}_child`);
                });
            }

        }
}
//点击爱心i标签事件
function hot_up(that) {
    var loves = document.querySelectorAll('.bottom_right');
    loves.forEach((value,index)=>{
        value.lastChild.onclick=function () {
            if(that.hot_up[index].isup){
                //被修改数据的名字
                var name = that.hot_up[index].name;
                //通过名字在所有数据中找到要修改的数据
                var data_change = that.introduce_movie.find(value=> value.name === name);
                //将数据修改到源数据中
                data_change.hotstatus = "false";
                data_change.hot -= 1;
                //根据情况放入updata数组当中
                if(that.updata.includes(data_change)){
                    //在updata中找到重复的数据索引
                    var i = that.updata.findIndex(value=>value.name === data_change.name);
                    //将该数据的hotstatus修改为false
                    that.updata[i].hotstatus = "false"
                }
                else{
                    that.updata.push(data_change);
                }
                that.hot_up[index].number -=1;
                that.hot_up[index].isup =false;
                that.hot_click = false;
            }
            else{
                //被修改数据的名字
                 name = that.hot_up[index].name;
                //在所有数据中找到要修改的数据
                data_change = that.introduce_movie.find(value=> value.name === name);
                //将数据修改到源数据中
                data_change.hotstatus = "true";
                data_change.hot += 1;
                if(that.updata.includes(data_change)){
                    //在updata中找到重复的数据索引
                     i = that.updata.findIndex(value=>value.name === data_change.name);
                    //将该数据的hotstatus修改为true
                    that.updata[i].hotstatus = "true"
                }
                else{
                    that.updata.push(data_change);
                }
                that.hot_up[index].number +=1;
                that.hot_up[index].isup =true;
                that.hot_click = true;
            }
        }
    });
}
//结束发送请求存储数据
function endsavedata(that) {
    var username = getitem().Login.username;
    var upadata={
        name:that.updata[0]?.name,
        id:that.updata[0]?.id,
        hotstatus:that.updata[0]?.hotstatus,
        number:that.updata[0]?.hot
    };
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/introduce-save',
        data:{
            hotdata:upadata,
            username: username
        },
        //处理数据
        success:function(data){
            console.log(data);
        },
        error:function(data){
            console.log(data);
        },
    });
}
export {footanimation,Animation,initdata,Randomdata,Showmovie,changebg,endchangebg,hot_up,endsavedata}