<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <!-- 头像 -->
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单验证 -->
      <el-form class="form_box" :model="FormLogin" :rules="loginForm" ref="ruleForm">
        <!-- 帐号 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="FormLogin.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            type="password"
            v-model="FormLogin.password"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="login_btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      FormLogin: {
        username: 'admin',
        password: '123456'
      },
      loginForm: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    login() {
      //  登录前验证
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        // 验证成功 调用接口  对象解构赋值
        const { data: res } = await this.$http.post('/login', this.FormLogin)
        // 判断是否登录成功  失败成功都提示
        if (res.meta.status != 200) {
          return this.$message.error('登录失败')
        }
        // 登录成功提示消息
        this.$message.success('登录成功')
        console.log(res)

        // 将token保存在本地存储中
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转到home页面
        this.$router.push('/home')
      })
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
    transform: translate(-50%, -50%);
    .avatar_box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
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
