var  Login = {
    namespace:true,
    state:{
        isLogin:false,//用户验证用户当前的登录状态，如果为fasle则跳转登录页面
        username:'',
        password:'',
    },
    //用户同步方法
    mutations:{
        Loginchange(state,a) {
            for(var key of Object.keys(a)){
                state[key] = a[key];
            }
        }
    },
    //可添加异步方法
    actions:{
        LoginChange({commit}){
            var a = {
                isLogin:true
            };
            commit('Loginchange',a)
        }
    },
}
export {Login}