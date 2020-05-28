<style lang="scss">
  /*每个页面公共css */
  @import "./assets/app.scss";
</style>
<script>
import { users_id } from '@/common/env'
import Storage from '@/common/Storage'

export default {
  globalData: {
    videoInstance: []
  },
  onLaunch: function () {
    console.log('App Launch')
    Storage.set('users_id', users_id)
    this.$store.dispatch('system/loadInitData')
    this.$store.dispatch('theme/refreshTheme')
  },
  onShow: function () {
    
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  onError: function (e) {
    console.log(e)
    // #ifdef MP-WEIXIN
    // uni.$fundebug.notify('onAppError', JSON.stringify(e))
    // #endif
  }
}
</script>
