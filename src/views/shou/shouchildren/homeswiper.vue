<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index"  >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swriper">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "",
    data() {
      return {
        isLoad: false,
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        },
      },
    },
      components: {
        Swiper,
        SwiperItem
      },
    methods: {
      swriper() {
        if (!this.isLoad) {
          this.$emit('fatherSwriper')
          this.isLoad = true
        }
      }

    }
  }
</script>

<style scoped>

</style>
