<style lang="scss">
  /*每个页面公共css */
  @import "./assets/app.scss";
</style>
<script>
import { users_id } from '@/common/env'
import Storage from '@/common/Storage'
import eventHub from '@/common/eventHub'
import IM from '@/common/Im/Im'

export default {
  globalData: {
    videoInstance: []
  },
  onLaunch: function () {
    console.log('App Launch')
    Storage.set('users_id', users_id)
    this.$store.dispatch('system/loadInitData')
    this.$store.dispatch('theme/refreshTheme')

    // 初始化信息
    const userInfo = this.$store.getters['user/getUserInfo']()
    console.log(userInfo)
    if (userInfo && userInfo.User_ID) {
      // IM全局
      const imInstance = new IM()
      // 设置本地用户信息
      imInstance.setSendInfo({ type: 'user', id: userInfo.User_ID, name: userInfo.User_NickName, avatar: userInfo.User_HeadImg })
      imInstance.start().then(() => {
        imInstance.openListen()
        eventHub.imInstance = imInstance // 全局用一个句柄
      }).catch((e) => { console.log(e) })
    }
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
