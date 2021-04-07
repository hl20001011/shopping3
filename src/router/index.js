import Vue  from 'vue'
import VueRouter from "vue-router";

//路由懒加载
const  Shou  =  () => import("../views/shou/Shou")
const Fen = () => import("../views/fen/Fen")
const  Gou = () => import("../views/gou/Gou")
const  My = () => import("../views/my/MY")
const Detail = () => import("../views/detail/Detail")

//安装插件
Vue.use(VueRouter)


//创建路由对象
const router = new VueRouter({
    routes:[
        {
            path:'',
            redirect:'/shou'
        },
        {
            path:'/shou',
            component:Shou,
        },
        {
            path:'/fen',
            component:Fen
        },
        {
            path:'/gou',
            component:Gou
        },
        {
            path:'/my',
            component:My
        },
      {
        // path:'/detail',
        path:'/detail/:iid',
        component:Detail
      }
    ],
    mode:'history',
    //linkActiveClass:修改类名的
    //类名
    linkActiveClass:'active'
})
//导出
export default  router
