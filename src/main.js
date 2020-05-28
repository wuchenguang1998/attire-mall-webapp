import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()    //事件总线为一个vue实例，这是可以发射事件并监听

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
