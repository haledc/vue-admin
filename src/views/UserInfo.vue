<template>
  <div class="user-info">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user-avatar">
          <img :src="userInfo.avatar" alt="avatar"/>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="user-detail">
          <div class="user-item">
            <i class="el-icon-circle-check-outline"></i>
            <span>{{ userInfo.username }}</span>
          </div>
          <div class="user-item">
            <i class="el-icon-menu"></i>
            <span>{{ userInfo.role === 'admin' ? '管理员' : '职员' }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'user-info',
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  }
}
</script>

<style scoped lang="stylus">
  .user-info
    margin-top 300px
    display flex
    flex-direction column
    justify-content center

    .user-avatar
      text-align center

      img
        width 150px
        height 150px
        border-radius 50%

    .user-detail
      .user-item
        position relative
        padding 26px
        font-size 28px
        color #333

        span
          text-align center
          margin-top 20px
          margin-left 20px
          font-size 20px
          font-weight bolder
</style>
