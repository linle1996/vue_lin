<template>
  <div class="login_container">
      <div class="login_box">
       <div class="avatar_box">
         <!-- 头像 -->
          <img src="../assets/logo.png" alt="">
       </div>
       <el-form class="form_box" :model="FormLogin">
         <!-- 帐号 -->
        <el-form-item >
          <el-input  prefix-icon="iconfont icon-user" v-model="FormLogin.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item >
          <el-input  prefix-icon="iconfont icon-3702mima" type="password" v-model="FormLogin.password"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="login_btn">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
       </el-form>

      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      FormLogin: {
        username: 'admin',
        password: '123456'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 3px;
    transform: translate(-50%,-50%);
    .avatar_box {
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 130px;
      height: 130px;
      background-color: #fff;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}
.form_box {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .login_btn {
      display: flex;
      justify-content: flex-end;
    }
}

</style>
