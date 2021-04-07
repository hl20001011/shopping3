<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav"
                   @btnClick="tiaoClick"
                   ref="navBar"
   ></detail-nav-bar>
    <scroll class="detail-scroll"
            ref="scroll"
            :pro="3"
            @scroll="scrollCli">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "./detailChild/DetailNavBar";
  import DetailBaseInfo from "./detailChild/DetailBaseInfo";
  import DetailSwiper from "./detailChild/DetailSwiper";
  import DetailShopInfo from "./detailChild/DetailShopInfo";
  import DetailGoodsInfo from "./detailChild/DetailGoodsInfo";
  import DetailParamInfo from "./detailChild/DetailParamInfo";
  import DetailCommentInfo from "./detailChild/DetailCommentInfo";
  import DetailBottomBar from "./detailChild/DetailBottomBar";

  import GoodsList from "../../components/content/goods/GoodsList";

  import Scroll from "../../components/common/scroll/Scroll";

  import {backTopMixin} from "../../common/mixins";

  import {mapActions} from "vuex"

  import {detail, Goods, GoodsParam, Shop,GetRecommend} from "../../network/detail";
  import {debounce} from "../../components/common/debounce/debounce";

  // import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Detail",
    data(){
      return{
        iid: null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        DetailParamInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        currentIndex:0,
        // show:false,
        // message:'',
      }
    },
    //mixins混入
    mixins:[backTopMixin],

    created() {
      //保存传入的id
      this.iid = this.$route.params.iid
     //根据iid请求详情数据
      detail(this.iid).then(res =>{
        // console.log(res)

        //获取轮播图
        this.topImages = res.data.result.itemInfo.topImages
        let  data = res.data.result

        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo

        //获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //取出评论的信息
        this.commentInfo = data.rate.list[0]

        //请求推荐数据
        GetRecommend().then(res =>{
          // console.log(res)
          this.recommends = res.data.data.list
        })

        //防抖函数  防止请求服务器多次而降低性能
        this.getThemeYopY = debounce(() =>{
          this.themeTopYs = []
          this.themeTopYs.push(0)
          //offsetTop:对应组件根元素到顶部的距离
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //最大值
          this.themeTopYs.push(Number.MAX_VALUE)

          // console.log(this.themeTopYs)
        })
      })
    },
    methods:{
      ...mapActions({
        cart:'addCart'
      }),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeYopY()
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
      },
      tiaoClick(index){
        // console.log(index)
        //ScrollTo:滚动到指定坐标处的位置
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },

      //滚动内容显示对应标题   监听实时位置
      scrollCli(position){
        //获取滚动实时位置
       let positionY = -position.y

        let length = this.themeTopYs.length
        //第一种
        // for (let  i = 0;i < length ;i++){
        //   if ( this.currentIndex !== i &&((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i])
        //   )){
        //     this.currentIndex = i;
        //     // console.log(this.currentIndex)
        //     this.$refs.navBar.currentIndex = this.currentIndex
        //   }
        // }
        //第二种
      for (let i = 0; i < length - 1;i++){
        if ( this.currentIndex !== i &&
          ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))){
          this.currentIndex = i;
          this.$refs.navBar.currentIndex = this.currentIndex
        }
      }
      //返回顶部
        this.isShow = position.y < -1000
      },
      // backTop(){
      //   this.$refs.scroll.ScrollTo(0,0,300)
      //
      // },
      //     监听滚动实时位置
      // shouScroll(position){
       // 判断backTop返回顶部是否显示
       //  this.isShow = position.y < -1000
       //  //判断tab-control是否吸顶   即是否拉到一定位置固定
       //  this.isTabFixed = position.y < -this.tabOffset
        // if (position.y < -this.tabOffset){
        //   console.log(633)
        // }
      // },

      addToCart(){
        const  product = {}
          product.image = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price =  this.goods.realPrice
          product.iid = this.iid;

        //将商品添加到购物车里
        //第一种方案
        // this.$store.dispatch('addCart',product).then(res =>{
        //   console.log(res)
        // })
        //第二种方案   利用mapActions直接引用actions中的内容
        this.cart(product).then(res =>{
          // this.show = true
          // this.message = res
          // setTimeout(() =>{
          //   this.show = false
          //   this.message = ''
          // },1500)
          this.$toast.show(res)

        })
      }
    },
    components:{
      DetailParamInfo,
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,

      // Toast,
      // BackTop,
    }
  }
</script>

<style scoped>

#detail{
  /*微调布局用相对定位*/
  position: relative;
  /*z-index : 一般与relative配套使用*/
  z-index: 9;
  background-color: white;
  height: 100vh;
}
  .detail-scroll{
    height: calc(100% - 44px);
    overflow: hidden;
    margin-top: 44px;
    /*margin-bottom: 50px;*/
  }
.detail-nav{
  position: fixed;
  z-index: 14;
  background-color: white;
}
</style>
