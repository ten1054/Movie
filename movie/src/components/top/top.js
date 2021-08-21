// //头部同名都变化
// function topopacity(){
//     console.log('滚动条划过的高度',document.body.scrollTop);
//     console.log('可视区的高度',window.innerHeight);
// }
//设置页面滚动监听事件从而改变header盒子的透明度
function headopacity(){
    var top2 = document.getElementById('head2');//获取top盒子元素
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 500){
        top2.style.opacity ="0.9";
    }
    else if(scrollTop < 500){
        top2.style.opacity ="0.2";
    }

}
//设置头像鼠标移入出现菜单列表
function enter() {
    var mean = document.getElementById('mean');
    mean.style.display="flex";
    // mean.style.visibility = 'visible';
}
function leave() {
    var mean = document.getElementById('mean');
    mean.style.display="none";
    // mean.style.visibility = 'hidden';
}
export{
    headopacity,enter,leave
}
