<template>

    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>

</template>

<script>
  import  BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    //props不是放在data里面的，它是与data平级的 记住！！！！！
    props:{
      pro: {
        type: Number,
        default:0
      },
      // 上拉加载更多
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null,

      }
    },
    mounted() {
      this.scroll =  new BScroll(this.$refs.wrapper,{
        //是否允许滚动内容中的点击事件是否有效
             click:true,
          //是否允许实时监听位置
             probeType:this.pro,
           //是否允许滚动上拉加载
             pullUpLoad:this.pullUpLoad
      })

      //监听滚动实时位置
      if (this.pro === 2 || this.pro === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
          //  console.log(position)
        })
      }

      // 监听scroll滑动到底部，实现上拉加载一次
     if (this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods:{
        //封装   返回顶部
        ScrollTo(x,y,time){
          this.scroll.scrollTo(x,y,time)
        },
      // 封装持续加载更多
      finishPullUp(){
          setTimeout(()=> {
            this.scroll.finishPullUp()
          },2000)
      },
      //防抖  防止页面加载不出或加载不完指定的内容
      refresh(){
        // console.log('-----')
          this.scroll.refresh()
      },
      scrollY(){
          return this.scroll.y ?  this.scroll.y : 0
      }
      }
  }
</script>

<style scoped>

</style>
