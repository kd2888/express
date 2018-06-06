// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/store'
import io from 'vue-socket.io';
Vue.use(io, 'http://localhost:3000');


Vue.use(Vuex)
Vue.prototype.$ajax = axios
Vue.use(ElementUI);

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    console.log(store.state.name)
    if (sessionStorage.getItem('name')) {  // 通过vuex state获取当前的token是否存在
          next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
