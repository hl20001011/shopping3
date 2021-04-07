<template>
  <div class="fen" ref="aaaa">
    <ul>
      <button @click="btn">按钮</button>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    <li>分类</li>
    </ul>
  </div>
</template>

<script>
  import  BScroll from 'better-scroll'
  export default {
    name: "",
    data(){
      return{
        scroll:null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.fen'),{
        //实时监听滚动的位置
        probeType:3,
        //允许click事件在滚动内容中发生
        click:false,
        //是否允许加载更多
        pullUpLoad:true
      })
      //this.scroll是BScroll的实例对象
      // this.scroll.on('scroll',(position)=>{
      //   console.log(position)
      // })
      // console.log(BScroll)

      this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多')
        setTimeout(()=> {
          this.scroll.finishPullUp()
        },2000)
      })
    },
    methods:{
      btn(){
        console.log("点击了")
      }
    }
  }
</script>

<style scoped>
.fen{
  height: 200px;
  background-color: #ff5777;
  overflow: hidden;
  /*overflow-y:scroll ;*/
}
</style>
