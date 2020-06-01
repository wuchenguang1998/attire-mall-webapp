import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()    //事件总线为一个vue实例，这是可以发射事件并监听

//安装toast插件
Vue.use(toast)

//使用懒加载技术
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
