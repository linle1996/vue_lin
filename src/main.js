import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入公共CSs样式
import './assets/css/global.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'
// 引入axios
import axios from 'axios'
// 设置base Url
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置axios 拦截器 设置请求头
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 将axios 挂载到vue实例上
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
