<template>
  <div>
   <nav-bar  class="Gou">
     <div slot="center" class="Gou-d">购物车({{length}})</div>
   </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import cartList from "./childCart/cartList";
  import CartBottomBar from "./childCart/CartBottomBar";

  import {mapGetters} from "vuex"
  export default {
    name: "Gou",
    computed:{
      //直接将getters中的数据传给组件
      //    ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    },
    components:{
      NavBar,
      cartList,
      CartBottomBar,
    }
  }
</script>

<style scoped>
.Gou{
  background-color: #ff5777;
}
  .Gou-d{
    color: white;
  }
  .cart-bottom-bar{
    background-color: #eee;
    position: relative;
    bottom: 40px;
    height: 40px;
  }
</style>
