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
  actions:{
    addCart(context,payload){
      return new Promise((resolve, reject) => {
        let oldProduct=null
      for(let item of context.state.cartList){
        if(item.iid===payload.iid){
          oldProduct=item      //oldProduct指向了已有的item对象
        }
      }
      //2.判断oldProduct
      if(oldProduct){
        oldProduct.count+=1
        resolve('当前商品数量加一')
      }else{
        payload.count=1
        payload.checked=true
        context.state.cartList.push(payload)
        resolve('添加新商品')
      }
      })
    }
  },
  getters
})

//3.挂载到Vue实例上
export default store