<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "",
  //   props:{
  //     message:{
  //       type:String,
  //       default:''
  //     },
  //     show:{
  //       type: Boolean,
  //       default: false
  // }
  //   }
    data(){
      return{
        message:'',
        isShow: false
      }
    },
    methods:{
      //这里message,duration可以设置默认值
      show(message,duration=1500){
        this.isShow = true
        this.message =  message
        setTimeout(()=>{
          this.isShow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
.toast{
 position: fixed;
  z-index: 12;
  top: 50%;
  left: 50%;
  padding: 10px 10px;
  /*相对自己的宽度(高度)偏移，第一个-50%(相对height)向上偏移自身height的50%  第二个-50%(相对width)向左偏移自身width的50%*/
  transform: translate(-50%,-50%);
  color: #eeeeee;
  background-color: rgba(0,0,0,.7);
}
</style>
