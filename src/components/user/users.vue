<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 搜索用户 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="gteUser.query" clearable @clear="gteUserlist">
            <el-button slot="append" icon="el-icon-search" @click="search_btn"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUser_btn">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表表单 -->
      <el-table style="width: 100%" stripe border :data="Userlist">
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="setUser_btn(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delUser(scope.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="角色分配"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-s-tools" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.gteUser.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addUserVisible" width="50%" @close="addDialogClosed">
      <el-form label-width="70px" :model="addUserForm" :rules="addUserRules" ref="addUserRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserbtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="setUserVisible" width="50%" @close="setDialogClosed">
      <el-form label-width="70px" :model="setUserForm" :rules="setUserRules" ref="setUserRef">
        <el-form-item label="用户名">
          <!-- 禁止修改用户名 -->
          <el-input v-model="setUserForm.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="setUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="setUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="setUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="setUserbtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.gteUserlist()
  },
  data() {
    // 验证邮箱
    var checkemail = (rule, value, callback) => {
      const emailStr = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (emailStr.test(value)) {
        return callback()
      }
      callback(new Error('邮箱格式不正确'))
    }
    // 验证手机号
    var checkmobile = (rule, value, callback) => {
      const mobileStr = /^1[345678]\d{9}$/
      if (mobileStr.test(value)) {
        return callback()
      }
      callback(new Error('手机不正确'))
    }
    return {
      gteUser: {
        // 查询参数
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 2
      },
      // 获取到的用户列表
      Userlist: [],
      // 用户的总数量
      total: null,
      // 控制添加框的显示隐藏
      addUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 数据验证
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [{ validator: checkemail, trigger: 'blur', required: true }],
        mobile: [{ validator: checkmobile, trigger: 'blur', required: true }]
      },
      // 编辑用户
      setUserVisible: false,
      setUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      setUserRules: {
        email: [{ validator: checkemail, trigger: 'blur', required: true }],
        mobile: [{ validator: checkmobile, trigger: 'blur', required: true }]
      },
      // 储存用户id
      id: null
    }
  },
  methods: {
    // 获取用户列表
    async gteUserlist() {
      const { data: res } = await this.$http.get('users', {
        params: this.gteUser
      })
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户列表失败')
      }
      this.total = res.data.total
      this.Userlist = res.data.users
    },
    // 每页的条数
    handleSizeChange(pagesize) {
      this.gteUser.pagesize = pagesize
      this.gteUserlist()
    },
    // 当前页码
    handleCurrentChange(pagenum) {
      this.gteUser.pagenum = pagenum
      this.gteUserlist()
    },
    // 调整用户状态
    async userState(val) {
      const { data: res } = await this.$http.put(
        `users/${val.id}/state/${val.mg_state}`
      )
      if (res.meta.status !== 200) {
        val.mg_state = !val.mg_state
        return this.$message.error('修改用户状态错误')
      }
      this.$message.success('修改用户状态成功')
    },
    // 搜索用户
    search_btn() {
      this.gteUserlist()
      console.log(this.gteUser)
    },
    // 添加用户按钮
    addUser_btn() {
      this.addUserVisible = true
    },
    // 关闭添加框  重置搜索表单
    addDialogClosed() {
      this.$refs['addUserRef'].resetFields()
    },
    // 添加用户
    addUserbtn() {
      // 验证表单
      this.$refs['addUserRef'].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('users', this.addUserForm)
          // console.log(res)
          if (res.meta.status !== 201) {
            return this.$message.error('添加用户失败')
          }
          this.$message.success('添加用户成功')
          this.gteUserlist()
          this.addUserVisible = false
        }
        return false
      })
    },
    // 编辑用户
    setDialogClosed() {
      this.$refs['setUserRef'].resetFields()
    },
    async setUser_btn(id) {
      // 调用接口 获取数据 渲染页面
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户数据失败')
      }
      this.setUserForm.username = res.data.username
      this.setUserForm.email = res.data.email
      this.setUserForm.mobile = res.data.mobile
      this.id = res.data.id
      this.setUserVisible = true
    },
    setUserbtn(id) {
      // 验证数据
      this.$refs['setUserRef'].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.put(
            'users/' + this.id,
            this.setUserForm
          )
          console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.error('修改用户失败')
          }
          this.$message.success('修改用户成功')
          // 更新用户列表
          this.gteUserlist()
          // 关闭编辑框
          this.setUserVisible = false
        }
        return false
      })
    },
    // 删除用户
    delUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 调用接口
          const { data: res } = await this.$http.delete('users/' + id)
          if (res.meta.status !== 200) {
            return this.$message.error('删除用户失败')
          }
          this.$message.success('删除用户成功')
          // 更新用户列表
          this.gteUserlist()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
