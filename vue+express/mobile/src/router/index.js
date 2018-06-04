import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Register from '@/components/register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      name: 'helloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: Login
    }
    ,
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
