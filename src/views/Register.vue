<template>
  <div class="register">
    <div class="form-container">
      <div class="manage-tip">
        <span class="title">后台管理系统</span>
      </div>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="80px"
               class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="registerForm.password2" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="registerForm.select" placeholder="请选择身份">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="职员" value="staff"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')" class="submit-btn">注册</el-button>
        </el-form-item>
        <div class="tip-area">
          <p>
            已有帐号！现在去
            <router-link to="/login">登录</router-link>
          </p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        password2: '',
        select: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名长度在2-10之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度在6-10之间', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度在6-10之间', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/user/register', this.registerForm)
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: '注册成功，请登录！',
                  type: 'success'
                })
                this.$router.push('/login')
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
              }
            })
        } else {
          this.$message({
            message: '信息验证失败',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .register
    position fixed
    width 100%
    height 100%
    background url("../assets/images/bg.jpg") no-repeat center center
    background-size 100% 100%

    .form-container
      width 370px
      height 210px
      position absolute
      top 100px
      left 50%
      padding 25px
      border-radius 5px
      text-align center
      transform translateX(-50%)

      .manage-tip
        .title
          font-family "Microsoft YaHei"
          font-weight bold
          font-size 26px
          color #fff

      .register-form
        margin 20px auto 0
        background-color #fff
        padding 20px 40px 20px 20px
        border-radius 5px
        box-shadow 0 5px 10px #ccc

        .submit-btn
          width 100%

        .tip-area
          text-align right
          font-size 12px
          color #333

          p
            a
              color #409eff
</style>
