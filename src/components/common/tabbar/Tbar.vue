<template>
    <div id="bar">
      <slot></slot>
    </div>
</template>

<script>

  export default {
    name: "Tabr",
  }
</script>

<style scoped>
  #bar{
    /*水平展示 flex*/
    display: flex;
    background-color: #eeeeee;
    position: fixed;
    left: 0;
    right: 0;
    bottom:0;
    /*x y  阴影*/
    box-shadow: 0 -2px 10px rgba(100,100,100,.1);

  }

</style>
