<template>
  <div class="conent">
    <h3>注册</h3>
  <el-form ref="form" :model="form" label-width="0px">
    <el-form-item label="">
      <el-input v-model="form.name" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input v-model="form.passsword" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input v-model="form.repPasssword" placeholder="重复密码"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="onSubmit">注册</el-button>
    </el-form-item>
  </el-form>
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

      if(this.form.passsword!=this.form.repPasssword){
        this.$message.error("重复密码与密码不一致")
        return
      }
      var that=this
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        register(this.form.name,this.form.passsword).then(function (data) {
          loading.close()
          data=data.data
          if(data.code==1){
            that.$message.success({message:'注册成功','duration':2000,onClose:function () {
                that.$store.commit('changeName', that.form.name)
                sessionStorage.setItem("name", that.form.name);
                that.$router.push("main")
              }})


          }else{
            console.log(error)
            that.$message.error("注册失败")
          }

        }).catch(function (error) {
          console.log(error)
          that.$message.error("注册失败")
        })

      }
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
