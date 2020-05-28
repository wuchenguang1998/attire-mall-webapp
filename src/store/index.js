import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      let oldProduct=null
      for(let item of state.cartList){
        if(item.iid===payload.iid){
          oldProduct=item      //oldProduct指向了已有的item对象
        }
      }
      //2.判断oldProduct
      if(oldProduct){
        oldProduct.count+=1

      }else{
        payload.count=1
        payload.checked=true
        state.cartList.push(payload)
      }
    }
  },
  getters
})

//3.挂载到Vue实例上
export default store