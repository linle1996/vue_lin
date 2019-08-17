import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入公共CSs样式
import './assets/css/global.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
