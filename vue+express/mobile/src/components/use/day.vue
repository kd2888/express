<template>

  <div>
    <x-button class="date" type="primary" plain @click.native="showPlugin">日期：{{form.date}}</x-button>
  <group  :title="eat">
    <x-input   text-align="right" type="number" title="早餐" v-model="form.breakfast"  @on-blur="blurInput('breakfast')"></x-input>
    <x-input text-align="right" title="中餐" type="number" v-model="form.lunch" @on-blur="blurInput('lunch')"></x-input>
    <x-input text-align="right" title="午餐" type="number" v-model="form.dinner" @on-blur="blurInput('dinner')"></x-input>
  </group>
  <group>
    <x-input text-align="right" title="交通费用" type="number" v-model="form.traffic" @on-blur="blurInput('traffic')"></x-input>
  </group>
  <group>
    <x-input text-align="right" title="零食费用" type="number" v-model="form.sock" @on-blur="blurInput('sock')"></x-input>
  </group>
  <group>
    <x-switch text-align="right" title="今天上班" :value-map="[0, 1]" v-model="form.work"></x-switch>
  </group>
  <group>
    <x-input text-align="right" title="游玩费用" type="number" v-model="form.play" @on-blur="blurInput('play')"></x-input>
    <x-textarea placeholder="游玩费用备注" v-model="form.playRemind"></x-textarea>
  </group>
  <group>
    <x-input text-align="right" title="服装费用" type="number" v-model="form.clothes" @on-blur="blurInput('clothes')"></x-input>
    <x-textarea placeholder="服装费用备注" v-model="form.clothesRemind"></x-textarea>
  </group>
  <group>
    <x-input text-align="right" title="其他费用" type="number" v-model="form.others" @on-blur="blurInput('others')"></x-input>
    <x-textarea placeholder="其他费用备注" v-model="form.othersRemind"></x-textarea>
  </group>
    <group >
      <div class="zongji"> 总计：{{all}}</div>

    </group>
  <x-button style="width: 80%;margin: 20px auto;display: block;" type="primary" @click.native="gosubmit">提交</x-button>
  </div>
</template>

<script>
  import store from '@/store/store'
  import {formatDate} from '@/assets/js/tool'
  import {subSpending,getSpending,login} from '@/assets/userapi'
    export default {
        name: "day",
      store,
      data () {
        return {
          form: {
            date: '',
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            traffic: 0,
            sock: 0,
            work: 1,
            clothes: 0,
            clothesRemind: "",
            play: 0,
            playRemind: "",
            others: 0,
            othersRemind: "",
            user:""
          },
          now:"",
        }
      },
      mounted: function () {
        let date=new Date()
        this.now= this.form.date = formatDate(date, "yyyy-MM-dd")
        this.form.user=this.$store.state.name
        console.log( this.form.user)
        this.init()


      },
      computed:{
        eat(){
          return '吃饭费用（总计：'+(parseFloat(this.form.breakfast)+parseFloat(this.form.lunch)+parseFloat(this.form.dinner))+'）'
        },
        all(){
          return parseFloat(this.form.breakfast)+parseFloat(this.form.lunch)+parseFloat(this.form.dinner)+parseFloat(this.form.traffic)+parseFloat(this.form.sock)+parseFloat(this.form.clothes)+parseFloat(this.form.play)+parseFloat(this.form.others)
        }
      },
      methods:{
          gosubmit(){
            const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
            console.log("asdasdas")
            this.$vux.confirm.show({
              // 组件除show外的属性
              content:"确认提交？",
              onCancel () {
                console.log(this) // 非当前 vm
                console.log(_this) // 当前 vm
              },
              onConfirm () {
                _this.onSubmit()
              }
            })
          },
        showPlugin(){
          let that=this
          this.$vux.datetime.show({
            cancelText: '取消',
            confirmText: '确定',
            format: 'YYYY-MM-DD',
            value: this.form.date,
            onConfirm (val) {
              console.log(that.form.date)
              that.form.date=val
              if(that.form.date<'2018-05-29'){
                that.form.date='2018-05-29';
                that.$vux.toast.error('2018-05-29是最早时间');

              }
              if(that.form.date>that.now){
                that.form.date=that.now;
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
        onSubmit() {
          var obj = this.form;
          let flag = 1;
          let error = ""
          for (let i in obj) {
            if (!(i == "playRemind" || i == "clothesRemind" || i == "othersRemind"||i == "date"||i=='user')) {
              console.log((obj[i]))
              if ((obj[i]+"")=="") {
                flag = 0;
                error = i+'没填'
                break
              }
              obj[i]=parseFloat(obj[i])
              console.log((obj[i]))
            }
          }
          if(flag==0){
            this.$vux.toast.error(error)
            return
          }
          var that=this;
          console.log(obj)
          subSpending(obj).then(function (data) {
            data=data.data
            if(data.code==1){
              that.$vux.toast.show("提交成功")
              that.$emit('goinit')
            }else{
              console.log(error)
              that.$vux.toast.error("提交失败")
            }
          }).catch(function (error) {
            that.$vux.toast.error('提交失败');
            console.log(error);
          });

        },
        init(){
          var that=this
          getSpending(this.form.date).then(function (data) {
            console.log(data)
            data=data.data
            if(data.code==1){
              if(data.data.length>0){
                that.form=data.data[0]
              }else{
                for(let i in that.form){
                  console.log(i)
                  if (!(i == "playRemind" || i == "clothesRemind" || i == "othersRemind"||i == "date"||i=='user')) {
                    that.form[i]=0
                  }else {
                    if(i != "date"){
                      that.form[i]=""
                    }
                  }

                }
              }
            }else{
              that.$vux.toast.error('系统异常');
            }

          }).catch(function (error) {
            that.$vux.toast.error('系统异常');
          })
        },
        formatInput(val){

        },
        blurInput(val){
          console.log(val)
          let that=this;
          let num=this.form[val]+"";
          console.log(num)
          num=num.replace(/[^\-?\d.]/g,'');
          if(num==""){
            num=0
          }
          this.$set(that.form,val,num)

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
  .zongji{
   padding: 10px;
  }
</style>
