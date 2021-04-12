<template>
  <div id="app">
<!--    keep-alive:使对应组件保持活性，不会再destoryed函数下被销毁-->
    <keep-alive >
     <router-view></router-view>
    </keep-alive>
    <mains></mains>
  </div>
</template>

<script>
import  mains from './components/content/Main'

export default {
  name: 'App',
  components: {
     mains
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
