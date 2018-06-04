<template>
  <div class="register">
    <div class="title">
      注册
    </div>
    <div class="remind">这是一个简单的记账本<br>可以让你知道你的钱花在哪了</div>
    <group>
      <x-input  placeholder="用户名" v-model="form.name"></x-input>
      <x-input  placeholder="密码" v-model="form.passsword"></x-input>
      <x-input  placeholder="重复密码" v-model="form.repPasssword"></x-input>
    </group>
    <flexbox>
      <flexbox-item>
        <x-button type="primary" @click.native="onSubmit" >注册</x-button>
      </flexbox-item>
    </flexbox>

  </div>

</template>

<script>
  import {register} from '@/assets/userapi'
  import store from '@/store/store'
    export default {
        name: "register",
      store,
      data: function () {
        return {
          form: {
            name: '',
            passsword: '',
            repPasssword: ""

          }
        }
      },
      methods: {
        onSubmit() {
          if(this.form.name==''){
            this.$vux.toast.error('请输入用户名');
            return
          }
          if(this.form.passsword==''){
            this.$vux.toast.error('请输入密码');
            return
          }
          if(this.form.passsword!=this.form.repPasssword){
            this.$vux.toast.error("重复密码与密码不一致")
            return
          }
          var that=this
          this.$vux.loading.show({
            text: 'Loading'
          })
          register(this.form.name,this.form.passsword).then(function (data) {
            that.$vux.loading.hide()
            data=data.data
            if(data.code==1){
              that.$vux.toast.show('注册成功');
              let time=setTimeout(function () {
                that.$store.commit('changeName', that.form.name)
                sessionStorage.setItem("name", that.form.name);
                that.$router.push("helloWorld");
                clearTimeout(time)
              },2000)

            }else{

              that.$vux.toast.error(data.msg)
            }

          }).catch(function (error) {
            console.log(error)
            that.$vux.loading.hide()
            that.$vux.toast.error("注册失败")
          })

        }
      }
    }
</script>

<style scoped>
  .register{
    background: #fbf9fe;
    padding-top: 40px;
    height: 100%;
  }
  .title{
    font-size: 20px;
    margin-bottom: 20px;
  }
  .remind{
    font-size: 14px;
    color: #999;
    margin-bottom: 50px;
  }
  .vux-flexbox{

    width: 90%;
    margin:auto;
    margin-top: 20px;
  }
</style>
