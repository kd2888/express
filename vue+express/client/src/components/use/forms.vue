<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="消费时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.date" @change="change" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="吃饭费用" class="eat">
      <el-input v-model="form.breakfast" placeholder="早" maxlength="5" @input="formatInput('breakfast')" @blur="blurInput('breakfast')"></el-input>
      <el-input v-model="form.lunch" placeholder="中" maxlength="5" @input="formatInput('lunch')" @blur="blurInput('lunch')"></el-input>
      <el-input v-model="form.dinner" placeholder="晚" maxlength="5" @input="formatInput('dinner')" @blur="blurInput('dinner')"></el-input>
      <span>总计：{{eat}}</span>
    </el-form-item>
    <el-form-item label="交通费用">
      <el-input type="" v-model="form.traffic" @input="formatInput('traffic')" @blur="blurInput('traffic')"></el-input>
    </el-form-item>
    <el-form-item label="零食费用">
      <el-input v-model="form.sock" @input="formatInput('sock')" @blur="blurInput('sock')"></el-input>
      <span>包含饮料，零食，大包零食记录首天</span>
    </el-form-item>
    <el-form-item label="是否上班">
      <el-radio-group v-model="form.work">
        <el-radio :label=1>是</el-radio>
        <el-radio :label=0>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="游玩费用">
      <el-input v-model="form.play" @input="formatInput('play')" @blur="blurInput('play')"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="textarea" v-model="form.playRemind" placeholder="游玩费用备注(非必填)"></el-input>
    </el-form-item>
    <el-form-item label="服装费用">
      <el-input v-model="form.clothes" @input="formatInput('clothes')" @blur="blurInput('clothes')"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="textarea" v-model="form.clothesRemind" placeholder="服装费用备注(非必填)"></el-input>
    </el-form-item>
    <el-form-item label="其他费用">
      <el-input v-model="form.others" @input="formatInput('others')" @blur="blurInput('others')"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="textarea" v-model="form.othersRemind" placeholder="其他费用备注(非必填)"></el-input>
    </el-form-item>
    <el-form-item label="费用总计">
      {{all}}
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="gosubmit">提交</el-button>
      <!--<el-button>取消</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {formatDate} from '@/assets/js/tool'
  import {subSpending,getSpending} from '@/assets/userapi'
  export default {
    name: "forms",
    data: function () {
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
      this.init()
      this.form.user=this.$store.state.name
    },
    computed:{
      eat(){
        return parseFloat(this.form.breakfast)+parseFloat(this.form.lunch)+parseFloat(this.form.dinner)
      },
      all(){
        return parseFloat(this.eat)+parseFloat(this.form.traffic)+parseFloat(this.form.sock)+parseFloat(this.form.clothes)+parseFloat(this.form.play)+parseFloat(this.form.others)
      }
    },
    methods: {
      gosubmit:function(){
        this.$confirm('确认提交消费?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.onSubmit();
        }).catch(() => {

        });
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
          this.$message.error(error)
          return
        }
        var that=this;
        console.log(obj)
        subSpending(obj).then(function (data) {
          data=data.data
          if(data.code==1){
            that.$message.success("提交成功")
          }else{
            console.log(error)
            that.$message.error("提交失败")
          }
        }).catch(function (error) {
          that.$message.error('提交失败');
          console.log(error);
        });

      },
      change(){
        console.log(this.form.date)
        if(this.form.date<'2018-05-29'){
          this.form.date='2018-05-29';
          this.$message.error('2018-05-29是最早时间');

        }
        if(this.form.date>this.now){
          this.form.date=this.now;
          this.$message.error(this.now+'是最晚时间');

        }
        this.init()
      },
      init(){
        var that=this
        getSpending(this.form.date).then(function (data) {
          console.log(data)
          data=data.data
          if(data.code==1){
            if(data.data.length>0){
              that.form=data.data[0]
            }
          }else{
            this.$message.error('系统异常');
          }

        }).catch(function (error) {
          this.$message.error('系统异常');
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
  .el-input {
    width: 217px;
  }

  .eat .el-input {
    width: 100px;
    margin-right: 20px;
  }

</style>
