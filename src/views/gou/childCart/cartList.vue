<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in list"  :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import Scroll from "components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";
  export default {
    name: "",
    computed:{
      //直接将getters中的数据传给组件
      //    ...mapGetters(['cartList'])
      ...mapGetters({
        list:'cartList'
      })
    },
    components:{
      Scroll,
      CartListItem,
    },
    //处理页面不能滚动时，处于活跃时 刷新
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    margin-top: 44px;
    height: calc(100vh -  44px - 49px );
  }
.content{
  height: 100% ;
  /*overflow:可以防止鼠标滑动而滑动页面*/
  overflow: hidden;
}
</style>
