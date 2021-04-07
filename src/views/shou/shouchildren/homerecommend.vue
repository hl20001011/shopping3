<template>
<div class="recommend">
  <div v-for="item in recommends" class="item-recommend">
    <a :href="item.link">
    <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
  export default {
    name: "",
    props:{
        recommends:{
          type: Array,
          default() {
            return [];
          }
        }
    },
  }
</script>

<style scoped>
.recommend{
  text-align: center;
  display: flex;
  padding: 10px 0 40px;
  border-bottom: 10px solid #eee;
}
  .item-recommend{
    flex: 1;
  }
  .item-recommend img{
    width: 75px;
    height:75px;
  }
</style>
