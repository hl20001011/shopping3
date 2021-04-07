<template>
  <div class="goods">
  <goods-item v-for="(item,index) in goods" :goods-item="item" :key="index">{{item}}</goods-item>
  </div>
</template>

<script>
  import GoodsItem from "./GoodsItem";
  export default {
    name: "",
    props:{
     goods: {
       type: Array,
       default() {
         return []
       }
     }
    },
    components:{
      GoodsItem
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  /*flex-wrap: wrap:可以让父元素宽度包含一定有限数量的子元素，从而不会在display: flex情况下使所有子元素在父元素一行中全部显示*/
  flex-wrap: wrap;
  /*空白部分均等分*/
  justify-content: space-evenly;
}
</style>
