<style lang="scss">
  /*每个页面公共css */
  @import "./assets/app.scss";
</style>
<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    this.$store.dispatch('system/loadInitData')
    this.$store.dispatch('theme/refreshTheme')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>
