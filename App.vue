<style>
  /*每个页面公共css */
</style>
<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
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
