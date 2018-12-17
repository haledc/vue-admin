<template>
  <div class="index">
    <Header/>
    <left-nav/>
    <div class="right-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import LeftNav from '../components/LeftNav'

export default {
  name: 'index',
  components: {
    Header,
    LeftNav
  }
}
</script>

<style scoped lang="stylus">
  .index
    .right-container
      position relative
      left 200px
      width calc(100% - 200px)
      height calc(100% - 70px)
</style>
