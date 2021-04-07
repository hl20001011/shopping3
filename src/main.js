import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "./components/common/toast";
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false

//安装插件时会执行install函数
Vue.use(toast)

//把vue实例赋给$bus   $bus就可以使用了
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// import  {request} from "./network/index";
// request({
//   url:'/home  /multidata',
// }).then(res =>{
//   console.log(res)
// }).catch(err =>{
//   console.log(err)
// })
