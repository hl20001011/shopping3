<template>
<div class="bottom-bar">
  <div class="bottom-div">
  <check-button :is-checked="isChecked"
                class="check-button"
                @click.native="allClick"></check-button>
  <span class="span">全选</span>
  </div>
  <div class="heJi" >
    <span>合计: {{Su}}</span>
  </div>
  <div class="qu" @click="compute">
    <p>去计算: {{Qu}}</p>
  </div>
</div>
</template>

<script>
  import CheckButton from "components/content/CheckButton/CheckButton";
  import {mapGetters} from "vuex"
  import cartList from "./cartList";
  export default {
    name: "",
    components:{
      CheckButton,
    },
    computed:{
      ...mapGetters(['cartList']),
      Su(){
        return '￥' + this.cartList.filter(item =>{
          return item.checked  //过滤掉没有被选中的
        }).reduce((preValue,item) =>{
              return preValue + item.price * item.count //前一个值加上被选中的值
        },0).toFixed(2)
      },
      Qu(){
        return this.cartList.length
      },
      isChecked(){
        //没有商品时是不选中状态
        if (this.cartList.length === 0) return false
        //find函数方案
        // return !this.cartList.find(item => !item.checked)
        //filter过滤器方案   过滤掉被选中的  返回没有被选中的
        return  !this.cartList.filter(item =>!item.checked).length
        //for遍历
        for(let item of this.cartList){
          if (!item.checked){
               return false;
               break;
          }else{
            return true
          }

        }
      }
    },
    methods:{
      allClick(){
        //计算属性中的isChecked
        if (this.isChecked){
          //for循环增强遍历
             this.cartList.forEach(item => item.checked = false)
        }else {
             this.cartList.forEach(item => item.checked = true)
        }
      },
      compute(){
        if (!this.isChecked){
          this.$toast.show('请选择购买的商品',1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    display: flex;
  }
.bottom-div{
  display: flex;
  width: 110px;
}
 .check-button{
  width: 20px;
   height: 20px;
   margin-top: 10px;
   margin-left: 20px;
   margin-right: 10px;
 }
  .span{
    margin-top: 10px;
  }
  .heJi{
    margin-top: 10px;
    margin-left: 10px;
    flex: 1;
  }
  .qu{
   width: 90px;
    background-color: yellow;
    text-align: center;
    /*margin-left: 80px;*/
  }
  .qu p{
    margin-top: 10px;
  }
</style>
