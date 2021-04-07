<template>

    <tbar>
      <tbar-item path="/shou" activeColor="deeppink">
        <img slot="icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="icon1" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="text">首页</div>
        <router-link to="/shou/news" tag="button">新闻</router-link>
        <router-link to="/shou/message" tag="button">消息</router-link>
        <router-view></router-view>
      </tbar-item>
      <tbar-item path="/fen" activeColor="deeppink">
        <img slot="icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="icon1" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="text">分类</div>
      </tbar-item>
      <tbar-item path="/gou" activeColor="deeppink">
        <img slot="icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="icon1" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="text">购物车</div>
      </tbar-item>
      <tbar-item path="/my" activeColor="deeppink">
        <img slot="icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="icon1" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="text">我的</div>
      </tbar-item>
    </tbar>

</template>

<script>
  import tbar from "../common/tabbar/Tbar";
  import tbarItem from "../common/tabbar/TbarItem";
  export default {
    name: "",
    components: {
      tbar,
      tbarItem
    }
  }
</script>

<style scoped>

</style>
