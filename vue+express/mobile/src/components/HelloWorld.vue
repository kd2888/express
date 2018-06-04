<template>
 <div class="form">
   <tab>
     <tab-item selected @on-item-click="onItemClick(true)">按日期</tab-item>
     <tab-item @on-item-click="onItemClick(false)">按月份</tab-item>
   </tab>
     <day v-show="isDay"></day>
   <month  v-show="!isDay"></month>


 </div>
</template>

<script>
  import day from '@/components/use/day'
  import month from '@/components/use/month'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: "",
      option1: '是',
      options1: ['是', '否'],
      isDay:true
    }
  },
  components:{
    day,
    month
  },
  methods:{
    onItemClick(val){
      this.isDay=val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .form{
    text-align: left;
    background: #fbf9fe;
  }


</style>
