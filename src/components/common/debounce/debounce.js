//防抖函数  防止请求服务器多次，能请求一个来达到目的，就尽量请求一次
export function
debounce(func,delay){
  let  timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
