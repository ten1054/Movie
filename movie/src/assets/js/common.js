//封装ajax
function newAjax(options) {
    var defaults = {
        type:'get',
        data:{},
        url:'',
        header:{
            //默认为get
            'content-type':'application/x-www-form-urlencoded'
        },
        //成功的执行函数
        success:function (data) {
            console.log(data);
        },
        //失败的执行函数
        error:function (data) {
            console.log(data);
        }
    };
    var  xhr = new XMLHttpRequest();
    //将options里的每一个属性拷贝到defaults中，如有重复则覆盖
    //此时defaults中的每一个属性都是新传入的值
    Object.assign(defaults,options);
    var params = '';
    //遍历defaults.data里的每一个属性，并将其拼接
    for(var key in defaults.data){
        params += key + '='+ defaults.data[key] +'&';
    }
    //去除最后多余的&
    params = params.slice(0,-1);
    console.log(params);
    if(defaults.type === 'get'){
        defaults.url = defaults.url +'?'+ params;
    }
    xhr.open(defaults.type,defaults.url);
    if(defaults.type === 'post'){
        var contenttype = defaults.header['content-type'];
        xhr.setRequestHeader('Content-type',contenttype);
        if (contenttype == 'application/json') {
            xhr.send(JSON.stringify(defaults.data))
        }
        else {
            xhr.send(params)
        }
    }
    else{
        xhr.send();
    }
    //接收请求结果
    xhr.onload = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            defaults.success(xhr.responseText)
        }
        else {
            console.log('false');
        }
    };
}
//封装jsonp函数
function jsonp(options) {
    var defaults = {
        type:'get',
        data:{},
        url:'',
        jsonp:'JSONp',
        //成功的执行函数
        success:function (data) {
            console.log(data);
        },
        //失败的执行函数
        error:function (data) {
            console.log(data);
        }
    };
    //将options里的每一个属性拷贝到defaults中，如有重复则覆盖
    //此时defaults中的每一个属性都是新传入的值
    Object.assign(defaults,options);
    var params = '';
    //遍历defaults.data里的每一个属性，并将其拼接
    for(let key in defaults.data){
        if(defaults.data[key] instanceof Object){
            let obj = defaults.data[key];
           params = deepcopy(obj,params);
        }
        else{
            params += key + '='+ defaults.data[key] +'&'
        }
    }
    //拼接回调函数
    var fname = 'myjsonp' + Math.random().toString().replace('.','');
    params = params + 'callback='+ fname;
    window[fname] = defaults.success;
    defaults.url = defaults.url +'?'+ params;
    //动态添加script标签
    var script = document.createElement('script');
    script.src = defaults.url;
    document.body.appendChild(script);
    //对script标签进行监听，使用完后便删除
    script.onload = function(){
        document.body.removeChild(script)
    };
}
//将对象属性进行拼接
function deepcopy(obj,params) {
    for(let key in obj){
        if(obj[key] instanceof Object){
            params = deepcopy(obj[key],params);
        }
        else{
             params += key + '='+ obj[key] +'&';
        }
    }
    return params
}
//让每一次路由跳转都获取sessionStroage的值
function isLogin(that) {
    try {
        if (getitem().Login.isLogin) {
            //将组件中的islogin状态改为true
            that.islogin = that.$store.state.Login.isLogin;
        }
    }
    catch (e) {
        console.log('没有数据')
    }

}
//存储sessionStorage
function saveitem(value){
    var namespace = 'user';
    var result = sessionStorage.getItem(namespace);//获得sessionStorage中的用户数据
    //判断sessionStorage中是否存储有数据
    if(result){
        result = JSON.parse(result);//将sessionStorage里的字符串转为json对象，方便后面的操作
    }
    else{
        result = {};
    }
    for(let key of Object.keys(value)){
        result[key] = value[key]
    }
    sessionStorage.setItem(namespace,JSON.stringify(result));
}
//获取sessionStorage
function getitem() {
    var namespace = 'user';
    var result = sessionStorage.getItem(namespace);
    if(result){
        result = JSON.parse(result);
        return result;
    }
    else {
        return false
    }
}
export{newAjax,jsonp,isLogin,saveitem,getitem}