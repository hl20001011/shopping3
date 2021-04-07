<template>
    <nav-bar>
      <div slot="left"class="img" @click="backShou">
        <img src="~assets/img/back-img/back.svg" alt="">
      </div>
      <div slot="center" class="title">
<!-- v-for一定要放在item那一行标签里面       -->
        <div  v-for="(item,index) in title" class="title-item" :key="index"
        :class="{active:currentIndex === index}" @click="btnTitle(index)">{{item}}</div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";


  export default {
    name: "DetailNavBar",
    data(){
      return{
      title:['商品','参数','评论','推荐'],
        currentIndex : 0,
      }
    },
    components:{
      NavBar,
    },
    methods:{
      btnTitle(index){
        this.currentIndex = index
        this.$emit('btnClick',index)
      },
      backShou(){
        //第一种 :跳转返回
        // this.$router.back();
        //第二种
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
.title{
  display:flex;
}
  .title-item{
    flex: 1;
  }
  .active{
    color: deeppink;
  }
  .img{
    margin-top: 5px;
  }
</style>
