import axios from "axios";
export function request(config) {
  //创建对象
  const instance1 = axios.create({
    //公共url配置
    baseURL:'http://123.207.32.32:8000',
    //请求时间限制
    timeout:5000
  });



//   //axios拦截器    请求拦截
//   instance1.interceptors.request.use(config =>{
//     console.log(config)
//     return config
//   },error => {
//     console.log(error)
//   })
//
//   //响应拦截
//   instance1.interceptors.response.use(res=>{
//     console.log(res)
//     return res.data
//   },error => {
//     console.log(error)
//   })
  return instance1(config)

}
export  function require(config) {
  const instance2 = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })
  return instance2(config)
}
