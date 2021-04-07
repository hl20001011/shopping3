<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
  box-shadow: 0 2px 1px rgba(100,100,100,.1);
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 7;
}
  .left ,.right{
    width: 60px;

  }
  .center{
    flex: 1;

  }
</style>
