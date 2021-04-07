import Toast from "./Toast";
//手动创建toast插件
const obj = {}
 obj.install = function (Vue) {
   // console.log('install函数')

   //1.创建组件构造器
   const  toastContrustor = Vue.extend(Toast)

   //2.new的方式，根据组件构造器创建出一个组件对象
   const  toast = new toastContrustor()

   //3.将组件对象手动挂载到某一个元素上
   toast.$mount(document.createElement('div'))

   //4.toast.$el对应的元素就是div  将其增加到body中
   document.body.appendChild(toast.$el)

   //5.将toast组件增加到vue中
   Vue.prototype.$toast = toast
   // console.log(this.$toast)
 }
export default obj
