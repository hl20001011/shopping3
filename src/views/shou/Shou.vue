<template>
<!--    <router-link to="/shou/news" tag="button">新闻</router-link>-->
<!--    <router-link to="/shou/message" tag="button">消息</router-link>-->
<!--    <router-view></router-view>-->
<keep-alive>
    <div id="home">
      <nav-bar class="nav-back"><div slot="center">购物车</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']"
                   ref="tabControl1" @btnClick="fatherClick" class="tab" v-show="isTabFixed" >
      </tab-control>
<!-- 上拉加载更多:: :pullUpLoad="true" @pullingUp="pullUp"     -->
      <scroll class="content" ref="scroll" :pro="3" @scroll="shouScroll"   :pullUpLoad="true" @pullingUp="pullUp" >
   <homeswiper :banners="banners" @fatherSwriper="fatherSwriper"></homeswiper>
    <homerecommend :recommends="recommends"></homerecommend>
    <home-feature></home-feature>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl" @btnClick="fatherClick" v-show="!isTabFixed"></tab-control>
    <goods-list :goods="show"></goods-list>
      </scroll>
<!--      .native组件事件修饰符-->
      <back-top @click.native="backTop" v-show="isShow"></back-top>
    </div>
</keep-alive>
</template>
<script>


  import homeswiper from "./shouchildren/homeswiper";
  import homerecommend from "./shouchildren/homerecommend";
  import homeFeature from "./shouchildren/HomeFeature";

  import navBar from 'components/common/navbar/NavBar'
  import  Scroll from 'components/common/scroll/Scroll'
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  // import BackTop from "../../components/content/backTop/BackTop";
  //如果导出的内容是有具体名字的，那么导入时必须在{}写上对应的名字，千万不能自定义名字 ！！！！！
  import  {debounce} from 'components/common/debounce/debounce'

  import {getHomeMultidata,getHomeGoods} from "../../network/home"

  import {backTopMixin} from "../../common/mixins";


  export default {
    name: "",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        //记住此步骤 ！！！！
        currentType:'pop',
        // isShow:false,
        tabOffset:633,
        isTabFixed :false,
        saveY:0
      }
    },
    mixins:[backTopMixin],
    components: {
      homeswiper,
      homerecommend,
      homeFeature,
      navBar,
      Scroll,
      GoodsList,
      // BackTop,
      TabControl,
    },
    created() {
      // console.log('shou被创建')
      this.GetHomeMultidata();
      this.GetHomeGoods('pop');
      this.GetHomeGoods('new');
      this.GetHomeGoods('sell')
    },
    mounted() {
      //事件总线  当前组件一旦被创建  爷爷就会来接收孙子发射的事件了  因为爷爷要监听孙子发射的内容
      //爷爷括号里的事件 与 孙子发射的事件是一致的
       let refresh = debounce(this.$refs.scroll.refresh,80)
      this.$bus.$on('imgLoadEmit',()=>{
        refresh()
      });
       //对应组件还没加载图片时的高度   offsetTop
       // console.log(this.$refs.tabControl.$el.offsetTop)
    },

    destroyed() {
      console.log('shou被销毁')
    },
    activated() {
      //组件被恢复活性时，返回滚动到指定的位置
            this.$refs.scroll.ScrollTo(0,this.saveY,0)
      //保存滚动到指定的位置后 做一次滚动的页面的刷新，已重新计算加载图片后的滚动页面的高度，保持前后高度一致
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //组件活性消失时，记录当前组件的滚动的位置
      this.saveY = this.$refs.scroll.scrollY()
    },
    computed: {
      show() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       *    监听相关方法
       **/
      fatherClick(index) {
        switch (index) {
          case 0 :
            this.currentType = 'pop';
            break;
          case 1 :
            this.currentType = 'new';
            break;
          case  2 :
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },

      // 返回顶部
      // backTop(){
      //      //time：延迟300毫秒返回顶部
      //   this.$refs.scroll.ScrollTo(0,0,300)
      // },

          // 监听滚动实时位置
      shouScroll(position){
       // 判断backTop返回顶部是否显示
        this.isShow = position.y < -1000
        //判断tab-control是否吸顶   即是否拉到一定位置固定
        this.isTabFixed = position.y < -this.tabOffset
        // if (position.y < -this.tabOffset){
        //   console.log(633)
        // }
      },



      //上拉加载更多
      pullUp(){
        //监听图片什么时候加载完
        this.GetHomeGoods(this.currentType)

        //再刷新需滚动的高度  有滑动页面顺滑作用
        // this.$refs.scroll.scroll.refresh()
      },

      //监听轮播图的加载            后offsetTop的高度
      fatherSwriper(){
          this.tabOffset = this.$refs.tabControl.$el.offsetTop
      },

      /**
       * 网络请求相关方法
       **/
      GetHomeMultidata() {
        getHomeMultidata().then(res => {
          //1,请求多个数据
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
          //因为getHomeMultidata()这个函数会返回promise，是异步操作，所以可能会导致这个函数还没执行完，就执行console.log(this.result)了
          // console.log(this.result)  //null
        })
      },
      GetHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 第一种
          // for (let  num  of res.data.list){
          //   this.goods[type].list.push(num)
          // }
          //第二种
          this.goods[type].list.push(...res.data.data.list)

          this.goods[type].page += 1
          //持续加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
/*.router-link-active{*/
/*  !*color: deeppink;*!*/
/*}*/
#home{
  /*margin-top: 44px;*/
  position: relative;
  height: 100vh;

}
  .active{
    color: deeppink;
  }
 .nav-back{
   background-color: var(--color-tint);
  color: #ffffff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
 .fixed{
   /* position: fixed;*/
   /*left: 0;*/
   /*right: 0;*/
   /*top: 44px;*/
   /*margin-top: 44px;*/
}
  .tab{
    margin-top: 44px;
  }
</style>
