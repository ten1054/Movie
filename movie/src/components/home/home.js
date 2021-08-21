import {jsonp} from "../../assets/js/common";
//获得轮播图数据
function toppic(that) {
     jsonp({
         type:'get',
         url:"http://localhost:4000/toppic",
         data:{},
         success:function (data) {
             data.forEach( function (value) {
                 var repath = value.path;
                 value.path =  "http://localhost:3000" + repath;
             });
             that.toppic = data;
         }
     })
}
//轮播图的右侧设置鼠标移入和移出事件
function checkpic() {
    //获得右侧栏的内容
    var img = document.querySelectorAll('#PIC');
    var ulist = document.getElementById('ulist');
    var lis = document.querySelectorAll('li[id=li]');
    var ps = document.querySelectorAll('p[id=p]');
    ps[0].className ='pshow';
    lis[0].className ='lishow';
    ulist.addEventListener('mouseover',e=>{
        move = false;
        lunbo();
        for(let i=0;i<img.length;i++){
            img[i].style.display = 'none';
            // ps[i].style.display = 'none';
            ps[i].className ='phidden';
            lis[i].className = 'lihidden'
        }
        var li = e.target;
        var id = li.getAttribute('dataid');
        //获得鼠标移入的li所对应的那个img元素
        img[id].style.display ='block';
        // ps[id].style.display ='block';
        ps[id].className ='pshow';
        lis[id].className = 'lishow';
        index = id;
    });
    ulist.addEventListener('mouseout',()=>{
        move = true;
        lunbo();
    });
}
//轮播图自动翻页
var move = true;//轮播是否在继续
var index = -1; //轮播的图片索引
var timer = null;//初始化定时器
function lunbo() {
    if(move){
        var img = document.querySelectorAll('#PIC');
        var lis = document.querySelectorAll('li[id=li]');
        var ps = document.querySelectorAll('p[id=p]');
        timer = setInterval(function () {
                index++;
                if(index>img.length-1){
                    index =0;
                }
                for(var i=0;i<img.length;i++){
                    img[i].style.display = 'none';
                    lis[i].className = 'lihidden';
                    ps[i].className= 'phidden';
                }
                img[index].style.display ='block';
                ps[index].className= 'pshow';
                lis[index].className = 'lishow'
        },5000);
    }
    else{
        clearInterval(timer);
    }
}
//在页面加载时发送请求获取电影数据
function init(that){
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/home',
        data:{
            pagesize:that.pagesize,
            pagenum:that.pagenum
        },
        //处理数据
        success:function(data){
            that.movie = data;
            data.forEach( function (value) {
                var repath = value.path;
               value.path =  "http://localhost:3000" + repath;
            });
        },
        error:function(data){
            console.log(data);
        },
    });
}
// //懒加载
function lazyload() {
        var imgs = document.querySelectorAll('.movie-all .movie-pic img');
        //获得滚动条的高度
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var innerhright = window.innerHeight;
        for(let i=0;i<imgs.length;i++){
            var datasrc = imgs[i].getAttribute('data-src');
            var src = imgs[i].src;
            if(imgs[i].offsetTop < scrollTop +innerhright && src !== datasrc){
                imgs[i].src = imgs[i].getAttribute('data-src');
            }
        }
}
//防抖
function debounce() {
    var  timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
            timer = setTimeout(function () {
                lazyload();
            },1000)
        }
        else{
            timer = setTimeout(function () {
                lazyload();
            },1000)
        }
    }
}
function bottomscroll(that) {
    var timer = null;
    return function (e) {
        var scrollHeight1 = document.documentElement.scrollHeight;
        var scrollHeight2 = document.body.scrollHeight;
        //获得文档总高度
        var  scrollheight = (scrollHeight1 - scrollHeight2)?scrollHeight1:scrollHeight2;
        //获得滚动条滚动的高度
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //获得视口高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if(scrollheight -1 < scrollTop + windowHeight && e.wheelDelta < 0){
            that.loading = true;
            if(timer){
                clearTimeout(timer);
                timer = setTimeout(function () {
                    that.pagenum = that.pagenum + 1;
                    jsonp({
                        //请求方式
                        type:'get',
                        //请求地址
                        url:'http://localhost:4000/home',
                        data:{
                            pagesize:that.pagesize,
                            pagenum:that.pagenum
                        },
                        //处理数据
                        success:function(data){
                            if(data.length === 0){
                                that.loading = false;
                                that.tipshow = false;
                                console.log('没有数据了')
                            }
                            else{
                                data.forEach( function (value) {
                                    var repath = value.path;
                                    value.path =  "http://localhost:3000" + repath;
                                });
                                that.movie.push(...data);
                                that.loading = false;
                            }
                        },
                        error:function(data){
                            console.log(data);
                        },
                    });
                },1000)
            }
            else{
                timer = setTimeout(function () {
                    that.pagenum = that.pagenum + 1;
                    jsonp({
                        //请求方式
                        type:'get',
                        //请求地址
                        url:'http://localhost:4000/home',
                        data:{
                            pagesize:that.pagesize,
                            pagenum:that.pagenum
                        },
                        //处理数据
                        success:function(data){
                            if(data.length === 0){
                                that.loading = false;
                                that.tipshow = false;
                                console.log('没有数据了')
                            }
                            else{
                                data.forEach( function (value) {
                                    var repath = value.path;
                                    value.path =  "http://localhost:3000" + repath;
                                });
                                that.movie.push(...data);
                                that.loading = false;
                            }
                        },
                        error:function(data){
                            console.log(data);
                        },
                    });
                },1000)
            }
        }
    }
}
//热播榜前十
function Hotmovie(that) {
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/hot',
        //处理数据
        success:function(data){
            data.forEach( function (value) {
                var repath = value.path;
                value.path =  "http://localhost:3000" + repath;
            });
            that.hotmovie = data;
        },
        error:function(data){
            console.log(data);
        },
    });
}
//鼠标移入电影标题展示更多
function Moviemore(that) {
    var movienavs = document.querySelectorAll('.home .movie .introduce-text .movie-type .type .content-one .show-txt');
   [...movienavs].forEach(function (value) {
       value.onmouseenter = function(e){
           var show = e.target.getAttribute('name');
           that.showmore[show] = true;
       };
       value.onmouseleave = function(e){
           var show = e.target.getAttribute('name');
           that.showmore[show] = false;
       };
   })
}
//将所有数据进行分类并统计到一个对象中，每类数据只取前三
function moreMovie(that) {
    jsonp({
        //请求方式
        type:'get',
        //请求地址
        url:'http://localhost:4000/Alldata',
        //处理数据
        success:function(data){
            data.forEach( function (value) {
                var repath = value.path;
                value.path =  "http://localhost:3000" + repath;
                that.alldata[value.type].push(value);
            });
            for (var value in  that.alldata){
                that.threedata[value] = that.alldata[value].slice(0,3);
            }
        },
        error:function(data){
            console.log(data);
        },
    });
}
//foot动画
function footanimation() {
    var iconboxs = document.querySelectorAll('.iconbox');
    var txts = document.querySelectorAll('.border_txt');
    var foot = document.getElementsByClassName('foot')[0];
    var borderbox = document.getElementsByClassName('border')[0];
    var footheight = foot.offsetTop;
    //获得foot元素的高度
    var height = parseInt(window.getComputedStyle(foot,null).height)/4;
    //获得滚动条滚动的高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //获得视口高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if(footheight + height< scrollTop + windowHeight){
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
// //测试死否能在mounted中拿到元素,只能在一秒后才能拿到数据
// function get() {
//     setTimeout(function () {
//         var imgs = document.querySelectorAll('.movie-all .movie-pic img');
//         console.log(imgs);
//     },1000)
// }
export {init,debounce,lazyload,bottomscroll,toppic,checkpic,lunbo,Hotmovie,Moviemore,moreMovie,footanimation}