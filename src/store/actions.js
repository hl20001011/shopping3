export default {
    addCart(context,payload){
      //通过Promise返回数据是否请求成功
    return new Promise((resolve,reject) =>{
      // state.cartList.push(payload)

      //第一种
      // let  oldProduct = null
      // for (let item of state.cartList){
      //   if (item.iid === payload.iid){
      //     oldProduct = payload
      //   }
      // }

      //第二种
      //如果item.iid === payload.iid 就把item赋给oldProduct
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct){
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('添加商品成功')
      }else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加商品成功')
      }
    })
    }
}
