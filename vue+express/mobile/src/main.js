// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import { Group } from 'vux'
Vue.component('group', Group)
import { XInput } from 'vux'
Vue.component('x-input', XInput)
import { DatetimePlugin } from 'vux'
Vue.use(DatetimePlugin)
/* eslint-disable no-new */
import { XSwitch } from 'vux'
Vue.component('x-switch', XSwitch)

import { XTextarea } from 'vux'
Vue.component('x-textarea', XTextarea)

import { XButton } from 'vux'
Vue.component('x-button', XButton)

import { Tab, TabItem } from 'vux'
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
// 默认参数
Vue.use(ToastPlugin, {position: 'top'})

import Vuex from 'vuex'
Vue.use(Vuex)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import { Cell } from 'vux'
Vue.component('cell', Cell)

import { Flexbox, FlexboxItem } from 'vux'

Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
