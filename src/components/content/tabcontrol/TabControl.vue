<template>
  <div class="tab-control">
<div v-for="(item,index) in titles" class="item" :class="{active:index === currentIndex}" @click="btnIndex(index)">
  <span >{{item}}</span>
</div>
  </div>
</template>

<script>
  export default {
    name: "",
    props:{
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      //这里传了参数，对应得点击事件中一定要传参数，切记！！！！
      btnIndex(index){
          this.currentIndex = index
        // console.log(index)
        this.$emit('btnClick',index)
      }
    }
  }
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  background-color: white;

}
  .item{
    flex: 1;
    height: 40px;
    line-height: 40px;

  }
  .active span{
    padding: 10px;
    color: deeppink;
    border-bottom: 5px solid deeppink;
  }
</style>
