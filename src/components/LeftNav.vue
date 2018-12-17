<template>
  <div class="left-nav">
    <el-row>
      <el-col>
        <el-menu
          mode="vertical"
          class="el-menu-vertical-bar"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link to="/index/home">
            <el-menu-item index="0">
              <i class="el-icon-tickets"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <div v-for="(item, index) in items" :key="index">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </template>
              <router-link v-for="(subItem, index) in item.children" :to="subItem.path" :key="index">
                <el-menu-item :index="subItem.path">
                  <span slot="title">{{ subItem.name }}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'left-nav',
  data() {
    return {
      items: [
        {
          icon: 'el-icon-goods',
          name: '资金管理',
          path: 'fund',
          children: [
            { path: 'fundList', name: '资金流水' }
          ]
        },
        {
          icon: 'el-icon-date',
          name: '信息管理',
          path: 'Info',
          children: [
            { path: 'userInfo', name: '个人信息' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
  .left-nav
    position absolute
    top 81px
    left 0
    z-index 99

    .el-menu-vertical-bar
      width 200px
      min-height 800px
</style>
