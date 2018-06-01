<template>
  <div class="conent">
    <h3>登陆</h3>
  <el-form ref="form" :model="form" label-width="0px">
    <el-form-item label="">
      <el-input v-model="form.name"  placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="">
    <el-input v-model="form.passsword" placeholder="密码"  @keyup.enter.native="onSubmit"></el-input>
  </el-form-item>


    <el-form-item>
      <el-button type="primary" style="margin-right: 20px" @click="onSubmit">登陆</el-button>
      <router-link to="/register">
      <el-button >注册</el-button>
      </router-link>

    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import {login} from '@/assets/userapi'
  import store from '@/store/store'

    export default {
        name: "index",
      store,
      data:function () {
        return{
          form: {
            name: '',
            passsword: ''
          }
        }
      },
      methods:{
        onSubmit() {
          var that=this;
          var datas={name:this.form.name,password:this.form.passsword}
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          login(this.form.name,this.form.passsword).then(function (data) {
            loading.close()
            data=data.data
            if(data.code==1){
              that.$message.success({message:'登陆成功','duration':2000,onClose:function () {
                  that.$store.commit('changeName', that.form.name)
                  sessionStorage.setItem("name", that.form.name);
                  that.$router.push("main")

                }})
            }else{
              that.$message.error(data.msg);
            }

          }).catch(function (error) {
            that.$message.error('登陆失败');
            console.log(error);
          });
        }
      },
      mounted:function () {
        console.log(login)
      }
    }
</script>

<style scoped>
  .conent{
    width: 400px;
    margin: auto;
    padding-top: 60px;
  }
</style>
