<template>
  <view class="myall" @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <view class="user-info">
      <view class="user-avator" @click="changeAvator">
        <image class="imgs" :src="Shop_Logo" mode=""></image>
        <view class="xiangji"
              :style="{backgroundImage:'url('+$fun.domainFn('/static/client/distributor/xj.png')+')'}"></view>
      </view>
      <view class="change" @click="changeAvator">更换头像</view>
    </view>
    <view class="content">
      <view class="c_1">
        <text>店名</text>
        <input class="inputs" type="text" v-model="Shop_Name" /></view>
      <view class="c_2">
        <text>公告</text>
        <textarea v-model="Shop_Announce" class="text-content"></textarea></view>
    </view>
    <view class="submit" @click="save">保存</view>
  </view>
</template>

<script>
// import {
//   createToken,
//   GET_ACCESS_TOKEN,
//   GET_ENV,
//   get_User_ID,
//   get_Users_ID,
//   getUserDisInfo,
//   updateUserDisInfo,
//   uploadImage,
// } from '../../common/fetch.js'
import { getUserDisInfo, updateUserDisInfo } from '@/api/customer'

import { hideLoading, showLoading } from '@/common/fun'
import { mapActions } from 'vuex'
import BaseMixin from '@/mixins/BaseMixin'
import { chooseImageByPromise, getArrColumn, uploadImages } from '@/common/helper'
import { Exception } from '@/common/Exception'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      userDisInfo: {},
      Shop_Name: '', // 自定义店铺名称
      Shop_Logo: '', // 自定义头像
      Shop_Announce: '', // 自定义分享与
      imgs: [],
      arr: [],
      tem_Shop_Logo: '', // 临时图片
    }
  },
  onLoad () {
    this.getUserDisInfo()
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
  },
  methods: {
    getUserDisInfo () {
      getUserDisInfo({}).then(res => {
        this.userDisInfo = res.data
        this.Shop_Name = this.userDisInfo.Shop_Name
        this.Shop_Logo = this.userDisInfo.Shop_Logo
        this.Shop_Announce = this.userDisInfo.Shop_Announce
      }).catch(() => {
      })
    },
    async changeAvator () {
      try {
        showLoading()
        const files = await chooseImageByPromise({ count: 1 }).catch(e => {
          throw Error(e.msg)
        })
        const imgs = getArrColumn(files, 'path')
        const ossUrls = await uploadImages({ imgs }).catch(() => {
          throw Error('文件上传失败')
        })

        this.Shop_Logo = ossUrls[0]
        this.tem_Shop_Logo = ossUrls[0]

        // 是否可以提交
        this.isSubmit = true
      } catch (e) {
        Exception.handle(e)
        this.isSubmit = false
      } finally {
        hideLoading()
      }
    },
    // 保存
    save () {
      updateUserDisInfo({
        Shop_Name: this.Shop_Name,
        Shop_Logo: this.tem_Shop_Logo,
        Shop_Announce: this.Shop_Announce,
      }).then(res => {
        uni.showToast({
          title: '修改成功',
          icon: 'success',
        })
        setTimeout(function () {
          uni.navigateTo({
            url: '/pages/distributor/Main',
          })
        }, 1000)
      })
    },
    ...mapActions(['getInitData']),
  },
  onShow: function () {

  },
  async created () {
    const initData = initData
    uni.setNavigationBarTitle({
      title: initData.commi_rename.commi + '信息',
    })
  },
}
</script>

<style scoped lang="scss">
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .user-info {
    padding-top: 47rpx;
    text-align: center;
    font-size: 26rpx;
    color: #777;

    .user-avator {
      position: relative;
      width: 120rpx;
      height: 120rpx;
      margin: 0 auto;

      .xiangji {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        border-radius: 60rpx;
        background-color: rgba(0, 0, 0, .4);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 42rpx 34rpx;
      }
    }

    .imgs {
      width: 100%;
      height: 100%;
      border-radius: 60rpx;
      margin-bottom: 14rpx;
    }

    .change {
      margin-top: 14rpx;
    }
  }

  .content {
    font-size: 30rpx;
    margin-top: 57rpx;
    color: #333;
    padding-left: 19rpx;

    .c_1 {
      display: flex;
      align-items: center;
      margin-bottom: 39rpx;

      .inputs {
        width: 600rpx;
        height: 62rpx;
        border: 1rpx solid rgba(231, 231, 231, 1);
        margin-left: 23rpx;
        padding-left: 20rpx;
        box-sizing: border-box;
      }
    }

    .c_2 {
      display: flex;
      align-items: center;

      .text-content {
        width: 600rpx;
        height: 170rpx;
        border: 1rpx solid rgba(231, 231, 231, 1);
        margin-left: 23rpx;
        padding-left: 20rpx;
        padding-top: 20rpx;
        box-sizing: border-box;
      }
    }
  }

  .submit {
    height: 80rpx;
    width: 640rpx;
    background: #F43131;
    color: #fff;
    font-size: 30rpx;
    margin: 179rpx auto 0;
    border-radius: 10rpx;
    text-align: center;
    line-height: 80rpx;
  }

  .cannot {
    background: #999;
  }
</style>
