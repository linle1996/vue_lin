<template>
  <el-container>
    <el-header>
      <div>
        <!-- logo -->
        <img src="../assets/hm.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <!-- 退出按钮 -->
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 判断开关是否打开 打开宽度56px  关闭宽度200px -->
      <el-aside :width="iscollapse ? '64px':'200px'">
        <!-- <el-aside width="200px"> -->
        <!-- 收缩按钮 -->
        <div @click="collapse">|||</div>
        <!-- unique-opened 只开启一个侧边栏 collapse是否收缩侧边栏 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
        >
          <!-- router 打开路由跳转 index属性值就是跳转地址 -->
          <el-submenu :index="'/'+item.path" v-for="item in menuarr" :key="item.id">
            <template slot="title">
              <!-- 动态生成icon图标 -->
              <i :class="iconobj[item.id]"></i>
              <span class="authName">{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="'/'+submenu.path"
              v-for="submenu in item.children"
              :key="submenu.id"
            >
              <i class="el-icon-menu"></i>
              {{submenu.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuarr: [],
      iconobj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      //   控制侧导航栏 开关
      iscollapse: false
    }
  },
  created() {
    this.getmenu()
  },
  methods: {
    loginout() {
      // 清除sessionstorage  并跳转到登录页面
      window.sessionStorage.clear()
      this.$router.push('/login')
    }, //   获取左侧边栏数据
    async getmenu() {
      const { data: res } = await this.$http.get('/menus')
      this.menuarr = res.data
    },
    collapse() {
      // flase 关闭 true 打开
      this.iscollapse = !this.iscollapse
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373d41;
    font-size: 22px;
    color: #fff;
    padding-left: 0;
    > div {
      display: flex;
      align-items: center;
      img {
        padding-right: 15px;
      }
    }
  }
  .el-aside {
    background-color: #373d41;
    > div {
      font-size: 10px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
      line-height: 24px;
    }
    .el-menu {
      border-right: none;
    }
    .authName {
      padding-left: 15px;
    }
  }
}
</style>
