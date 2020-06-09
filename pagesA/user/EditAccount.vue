<template>
  <view @click="commonClick" class="myall">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <view class="wrap">
      <view @click="update(3)" class="item">
        <view>修改手机号码</view>
        <image :src="'/static/client/right.png'|domain" mode=""></image>
      </view>
      <view @click="update(0)" class="item">
        <view>修改登录密码</view>
        <image :src="'/static/client/right.png'|domain" mode=""></image>
      </view>
      <view @click="update(1)" class="item">
        <view>修改支付密码</view>
        <image :src="'/static/client/right.png'|domain" mode=""></image>
      </view>
    
    </view>
    <view @click="logoutFunc" class="btn">退出登录</view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import { confirm, toHome } from '@/common/fun'
import Storage from '@/common/Storage'
import BaseMixin from '@/mixins/BaseMixin'

import { bindUserClientId } from '@/api/customer'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import eventHub from '@/common/eventHub'

export default {
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      setUserInfo: 'user/setUserInfo',
    }),
    // 修改信息
    update (type) {
      // type 0 表示修改登录，1，修改支付
      uni.navigateTo({
        url: '/pagesA/user/UpdateUserPsw?type=' + type,
      })
    },
    logoutFunc () {
      confirm({
        title: '操作提示',
        content: '是否退出登录',
      }).then(res => {
        bindUserClientId({ action: 'clear' }, { errtip: false }).then(() => {
        }).catch(() => {
        })
        
        const users_id = Storage.get('users_id')
        Storage.clear()
        
        Storage.set('users_id', users_id)
        
        // #ifdef H5
        sessionStorage.removeItem('is_send_usrlog')
        // #endif
        
        this.setUserInfo({})
        
        // 取消监听
        if (eventHub.imInstance) {
          eventHub.imInstance.cancalListen()
          eventHub.imInstance.close()
          eventHub.imInstance = null
        }
        
        toHome()
      }).catch(() => {
      
      })
    },
    
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }
  
  .wrap {
    padding: 25rpx 22rpx 0;
  }
  
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 0;
    font-size: 30rpx;
    color: #333;
    border-bottom: 1px solid #E3E3E3;
    
    image {
      width: 15rpx;
      height: 23rpx;
    }
  }
  
  .btn {
    width: 100%;
    height: 86rpx;
    line-height: 86rpx;
    background: #F43131;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    position: fixed;
    bottom: 0;
  }
</style>
