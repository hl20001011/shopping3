import BackTop from "../components/content/backTop/BackTop";
import Scroll from "../components/common/scroll/Scroll";
//处理重复代码
export const mix = {
  mounted(){
    // console.log("混入成功")
  }
}

//返回顶部
export const backTopMixin = {
  components:{
    BackTop,
  },
  data(){
    return{
      isShow :false,
    }
  },
  methods:{
    backTop() {
      this.$refs.scroll.ScrollTo(0,0,300)
    },

  }
}
