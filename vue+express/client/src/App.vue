<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import store from '@/store/store'
  import {getUser} from '@/assets/userapi'

export default {
  name: 'App',
  store,
  beforeCreate:function(){
    let that=this

    getUser().then(function (data) {
      console.log(data.data)
      if(data.data.code==1){
          let name=data.data.data
        that.$store.commit('changeName', name)
        sessionStorage.setItem("name",name);
      }else{
        that.$store.commit('changeName', '')
        sessionStorage.removeItem("name");
        // that.$router.push("/")
      }

    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

}
  html,body{
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
