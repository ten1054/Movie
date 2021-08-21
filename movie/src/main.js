import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import '../static/iconfont/iconfont.css'
import store from './store/all'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(less);
//定义全局变量
Vue.prototype.$message = Message;
new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app');