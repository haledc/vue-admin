<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/images/logo.png" alt="logo" class="logo">
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user-panel">
        <div class="user-info">
          <img :src="userInfo.avatar" alt="avatar" class="avatar">
          <div class="welcome">
            <p class="wel">欢迎</p>
            <p class="name">{{userInfo.username}}</p>
          </div>
          <span class="dropdown">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="goInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'header-nav',
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    goInfo() {
      this.$router.push('/index/userInfo')
    },
    logout() {
      localStorage.removeItem('authorization')
      localStorage.removeItem('userInfo')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="stylus">
.header-nav
  width: 100%
  height: 60px
  min-width: 600px
  padding: 10px
  position: relative
  background-color: #324057
  color: #fff
  border-bottom: 1px solid #1f2d3d

  .logo-container
    line-height: 60px
    min-width: 400px

    .logo
      width: 50px
      height: 50px
      margin-right: 5px
      vertical-align: middle
      display: inline-block

    .title
      vertical-align: middle
      font-size: 22px
      font-family: 'Microsoft YaHei'
      letter-spacing: 3px

  .user-panel
    position: absolute
    right: 40px
    line-height: 60px
    text-align: right
    vertical-align: middle
    display: inline-block

    .user-info
      .avatar
        width: 40px
        height: 40px
        border-radius: 50%
        vertical-align: middle
        display: inline-block

      .welcome
        display: inline-block
        width: auto
        vertical-align: middle
        padding: 0 5px

        p
          line-height: 20px
          text-align: center
          font-size: 14px

        .wel
          font-size: 12px

        .name
          color: #409eff
          font-weight: bolder

      .dropdown
        cursor: pointer
        margin-right: 5px
</style>
