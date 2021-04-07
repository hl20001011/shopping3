<template>
  <div class="bar-item" @click="tiao">
    <div v-if="!isActive"><slot name="icon"></slot></div>
    <div v-else><slot name="icon1" ></slot></div>
    <div :style="isActiveColor"><slot name="text"></slot></div>

  </div>
</template>

<script>
  export default {
    name: "TbarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    //属性在data里面定义
   data(){
      return{

      }
   },
    methods:{
      //核心，实现路由跳转
      tiao(){
        this.$router.push(this.path)
      }
    },
    computed:{
      isActive(){
        //包含    当前活跃的url是否包含当前url   === -1 : 不包含   ！== -1 包含
        return this.$route.path.indexOf(this.path) !== -1
      },
      isActiveColor(){
        //三元运算符
        return this.isActive ? {color:this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .bar-item{
    /*flex:1  均分*/
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .bar-item img{
    width: 27px;
    height: 27px;
  }
</style>