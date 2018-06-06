<template>
  <div class="talk">
      <header><h2>聊天</h2></header>
     <div class=""></div>
    <div class="mian">
      <div class="content"></div>
      <div class="submit">
        <button @click="clickButton">sadasdasda</button>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "talk",
      data:function () {
        return  {

        }
      },
      sockets:{
        connect: function(){
          console.log('socket connected')
        },
        customEmit: function(val){
          console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
          console.log(val)
        }
      },
      methods: {
        clickButton: function(){
          // $socket is socket.io-client instance
          this.$socket.emit('click', "socket");
        }
      }
    }
</script>

<style scoped>
  .talk{
    width: 1000px;
    margin: auto;
  }
  .content{
    height: 400px;
    overflow-y: auto;
  }

</style>
