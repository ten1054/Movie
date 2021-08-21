import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/all'
Vue.use(VueRouter);
const routes = [
    {
        path:'/SHAO',
        component:() =>import('../components/top/top.vue'),
        meta:{
            title:'电影首页'
        },
        children:[
            {
                path:'',
                redirect:'home'
            },
            {
                path:'home',
                component: () =>import('../components/home/home.vue'),
                meta:{
                    title:'电影首页'
                },
            },
            {
                path:'introduce',
                component: () =>import('../components/introduce/introduce.vue'),
                meta:{
                    title:'推荐观影',
                    isLogin:true
                },
            },
            {
                path:'information',
                component: () =>import('../components/information/informaiton.vue'),
                meta:{
                    title:'留言板',
                    isLogin:true
                },
            }
        ]
    },
    {
        path:'/login',
        name:'Login',
        component:()=>import('../components/login/login.vue'),
        meta:{
            title:'请登录',
        },
    },
    {
        path:'',
        redirect:'/login'
    }

];
const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }), //路由跳转后页面回到顶部
    base: process.env.BASE_URL,
    routes
});
router.beforeEach(function (to,from,next) {
    document.title = to.meta.title;
    next();
    if(to.meta.isLogin && !store.state.Login.isLogin){
        next({name:'Login'});
    }
    else {
       next()
    }
});


export  default router