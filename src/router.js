import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
Vue.use(Router)

export default new Router({
  // eslint-disable-next-line standard/object-curly-even-spacing
  routes: [{ path: '/', redirect: 'login' }, { path: '/login', component: Login }]
})
