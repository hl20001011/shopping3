export default {
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      //对象模型
      payload.checked = true

      state.cartList.push(payload)
  },
}
