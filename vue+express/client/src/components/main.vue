<template>
  <el-container style="height: 100%">
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">消费记录</el-menu-item>
        <!--<el-menu-item index="2" >消息中心</el-menu-item>-->
        <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        <el-submenu  index="4" style="float: right">
          <template slot="title"><span>欢迎你 {{name}}</span></template>
          <el-menu-item index="4-1" @click="loginout">退出</el-menu-item>
          <el-menu-item index="4-2" @click="dialogVisible = true">修改密码</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-header>
    <el-main>
      <div class="main">
         <div class="mian-content">
             <forms @goinit="init"></forms>
         </div>
        <div class="main-remind">
          <div class="remind">
            <div class="remind-title">整月小结</div>
            <ul>
              <li >月份<el-date-picker   type="month" placeholder="选择日期" format="yyyy-MM"  value-format="yyyy-MM" v-model="month" @change="change" style="width: 150px;float: right"></el-date-picker></li>
              <li >吃饭费用：{{eat}}  &nbsp;早中晚:({{form.breakfast}},{{form.lunch}},{{form.dinner}} )</li>
              <li >交通费用：{{form.traffic}}</li>
              <li >零食费用：{{form.sock}}</li>
              <li >衣服费用：{{form.clothes}}</li>
              <li >游玩费用：{{form.play}}</li>
              <li >其他费用：{{form.others}}</li>
              <li >费用总计：{{count}}</li>
            </ul>
          </div>
        </div>
      </div>
    </el-main>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="500px"
      >
      <el-form ref="passsword"   :model="passsword"  label-width="80px">
        <el-form-item label="原来密码">
            <el-input type="password"  v-model="passsword.origain"></el-input>
        </el-form-item>
        <el-form-item label="新的密码">
          <el-input type="password" v-model="passsword.newword" ></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input type="password" v-model="passsword.remewword" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changePas">确 定</el-button>
  </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import store from '@/store/store'
  import {getSumByDate,changePassword} from '@/assets/userapi'
  import forms from  '@/components/use/forms'

  export default {
    name: "mains",
    store,
    data:function(){
      return {
        list:[1,2],
        activeIndex: '1',
        activeIndex2: '1',
        month:"",
        count:0,
        now:"",
        form: {
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          traffic: 0,
          sock: 0,
          clothes: 0,
          play: 0,
          others: 0,
        },
        dialogVisible: false,
        passsword:{
          origain:"",
          newword:"",
          remewword:""
        }
      }
    },
    mounted:function(){
      let date=new Date();
      let month=date.getMonth()+1
      let year=date.getFullYear()
      month=(month <10)?("0"+month):month
      this.month=year+'-'+month
      console.log(this.nextmonth)
      this.now=year+'-'+month;
      this.init();

    },
    computed: {
      name() {
        return this.$store.state.name
      },
      eat(){
        return this.form.breakfast+this.form.lunch+this.form.dinner
      },
      nextmonth(){
        let arr=this.month.split("-")
        let time=""
         if(parseInt(arr[1])==12){
           time= (parseInt(arr[0])+1)+'-01'
         }else {
          let m=(parseInt(arr[1])+1);
           time= arr[0]+'-'+((m<10)?('0'+m):m)
         }
         return time
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      init(){
        let that=this;
        that.count=0;
        getSumByDate(this.month,this.nextmonth).then(function (data) {
          console.log(data.data.data[0])
          let obj=data.data.data[0]
          let newObj={}
          for(let i in obj){
            if(obj[i]==null){
              that.count+=0;
              let str=i.split(')')[0].split('(')[1]
              that.form[str]=0
            }else{
              that.count+=obj[i];
              console.log(obj[i])
              let str=i.split(')')[0].split('(')[1]

              that.form[str]=obj[i]
            }

          }
        }).catch(function (data) {
          console.log(data)
        })
      },
      change(){
        console.log(this.nextmonth)
        if(this.month<'2018-05'){
          this.month='2018-05';
          this.$message.error('2018-05是最早时间');

        }
        if(this.month>this.now){
          this.month=this.now;
          this.$message.error(this.now+'是最晚时间');

        }
        this.init()
      },
      loginout(){
        this.$confirm('确认退出?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.out();
        }).catch(() => {

        });
      },
      out(){
        sessionStorage.removeItem('name');
        this.$router.push('/')
      },
      changePas(){
        if(this.passsword.origain==''){
          this.$message.error('请输入原来的密码');
          return
        }
        if(this.passsword.newword==''){
          this.$message.error('请输入新的的密码');
          return
        }
        if(this.passsword.remewword==''){
          this.$message.error('重复密码');
          return
        }
        if(this.passsword.remewword!=this.passsword.newword){
          this.$message.error('新的的密码与重复密码不一致');
          return
        }
        let that=this;
        changePassword(this.passsword.origain,this.passsword.newword).then(function (data) {
          console.log(data)
         let  newdata=data.data;
          if(newdata.code==1){
            that.$message.success('修改成功');
            that.dialogVisible=false
          }else{
            that.$message.error(newdata.msg);
          }
        }).catch(function (error) {
          console.log(error)
          that.$message.error('未知异常');

        })

      }

    },
    components:{
      forms
    }


  }
</script>

<style scoped>

  .el-header {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 100px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .main{
    width: 1000px;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin: 10px auto;
    padding: 0 16px;
    min-height: 100vh;
  }
  .mian-content{
    width: 694px;
    padding-bottom: 20px;
  }
  .main-remind{
    width: 296px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .mian-content{
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    text-align: left;
  }


  .remind .remind-title{
    line-height: 40px;
    font-weight: 600;
  }
  .remind ul{
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  .remind li{
    line-height: 40px;
    list-style: none;
    overflow: hidden;
    height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #ddd;
    text-align: left;

  }
  .el-dialog{
    text-align: left;
  }


</style>
