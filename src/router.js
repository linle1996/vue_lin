import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
// 导入home页面
import Home from './components/home.vue'
// 导入Welcome页面
import Welcome from './components/Welcome.vue'
// 导入users 页面
import Users from './components/user/users.vue'
Vue.use(Router)
// 设置导航卫士
const router = new Router({
  // eslint-disable-next-line standard/object-curly-even-spacing
  routes: [{ path: '/', redirect: 'login' }, { path: '/login', component: Login }, { path: '/home', redirect: '/welcome', component: Home, children: [{ path: '/welcome', component: Welcome }, { path: '/users', component: Users }] }]
})
router.beforeEach((to, from, next) => {
  // 要是登录页面 就可以进去
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 判断 要是没有token就强制跳转到登录页面 要是有token就可以继续浏览
  if (!tokenStr) return next('/login')
  next()
})
export default router
