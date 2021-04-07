import Vue from "vue";
import Vuex from "vuex"
import mutations from "./mulations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)

const  state = {
    cartList:[]
}

const  store = new Vuex.Store({
  state,
  mutations,
  //context:里有两个参数 state commit
  actions,
  getters,
})

export default store
