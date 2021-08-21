import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import {Login} from  "./Login"
import createPersistedState from "vuex-persistedstate";
//引入登录模块
export default new Vuex.Store({
    modules:{
        Login
    },
    plugins:[createPersistedState({
            storage: window.sessionStorage,
            key:'user', //用于保存数据的key名字
        // // 方法1：用reducer，这里的val是由store里面的所有state，不加reducer为储存所有，reducer为指定存储
        //     reducer(val)  {
        //         return {
        //             // 只储存state中的name
        //             isLogin: val.Login.isLogin
        //         }
        //     },

        // 方法2：用paths,数组里面填模块名，存储指定模块
            paths:['Login'],//模块后直接加state里的数据名可单独存储,不加则是全部
        }
    )]//会自动保存创建的状态。刷新还在
})