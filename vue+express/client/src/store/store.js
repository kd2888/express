import Vue from 'vue'
import Vuex from  'vuex'

Vue.use(Vuex)

const state={
      name:""
}
if(sessionStorage.getItem('name')){
  state.name=sessionStorage.getItem('name');
}
const mutations={
  changeName(state,name){
    state.name=name
  }
}
export default new Vuex.Store({
  state,
  mutations
})
