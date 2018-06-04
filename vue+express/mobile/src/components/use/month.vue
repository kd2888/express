<template>
    <div>
      <x-button class="date" type="primary" plain @click.native="showPlugin">日期：{{month}}</x-button>
      <div class="remind-title">整月小结</div>
      <ul>
        <li >吃饭费用：{{eat}}  &nbsp;早中晚:({{form.breakfast}},{{form.lunch}},{{form.dinner}} )</li>
        <li >交通费用：{{form.traffic}}</li>
        <li >零食费用：{{form.sock}}</li>
        <li >衣服费用：{{form.clothes}}</li>
        <li >游玩费用：{{form.play}}</li>
        <li >其他费用：{{form.others}}</li>
        <li >费用总计：{{count}}</li>
      </ul>
    </div>
</template>

<script>
  import store from '@/store/store'
  import {getSumByDate,changePassword} from '@/assets/userapi'

    export default {
        name: "month",
      store,
      data:function () {
        return {
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
          return (this.form.breakfast+this.form.lunch+this.form.dinner).toFixed(2)
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
        showPlugin(){
          let that=this
          this.$vux.datetime.show({
            cancelText: '取消',
            confirmText: '确定',
            format: 'YYYY-MM',
            value: this.month,
            onConfirm (val) {
              that.month=val
              console.log(that.nextmonth)
              if(that.month<'2018-05'){
                that.month='2018-05';
                that.$vux.toast.error('2018-05是最早时间');

              }
              if(that.month>that.now){
                that.month=that.now;
                that.$vux.toast.error(that.now+'是最晚时间');

              }
              that.init()
            },
            onShow () {
              console.log('plugin show')
            },
            onHide () {
              console.log('plugin hide')
            }
          })
        },
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
            this.$vux.toast.error('请输入原来的密码');
            return
          }
          if(this.passsword.newword==''){
            this.$vux.toast.error('请输入新的的密码');
            return
          }
          if(this.passsword.remewword==''){
            this.$vux.toast.error('重复密码');
            return
          }
          if(this.passsword.remewword!=this.passsword.newword){
            this.$vux.toast.error('新的的密码与重复密码不一致');
            return
          }
          let that=this;
          changePassword(this.passsword.origain,this.passsword.newword).then(function (data) {
            console.log(data)
            let  newdata=data.data;
            if(newdata.code==1){
              that.$vux.toast.show('修改成功');
              that.dialogVisible=false
            }else{
              that.$vux.toast.error(newdata.msg);
            }
          }).catch(function (error) {
            console.log(error)
            that.$vux.toast.error('未知异常');

          })

        },
        getTwo(val){
          return parseInt(val*100)/100.0
        }

      }
    }
</script>

<style scoped>
  .date{
    width: 80%;
    margin: 20px auto;
    display: block;
  }
  .remind-title{
    background: #fff;
    padding: 10px 15px;
    line-height: 1.41176471;
    font-size: 17px;
    border-bottom: 1px solid #ddd;
  }


  ul{
    margin: 0;
    padding: 0;
  }
  ul li{
    background: #fff;
    padding: 10px 15px;
    line-height: 1.41176471;
    font-size: 17px;
    list-style: none;
    border-bottom: 1px solid #ddd;
  }
</style>
