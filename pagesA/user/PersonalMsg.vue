<template>
  <div class="bgColor-white" @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="msg">
      <div class="item" @click="changeAvator">
        <div class="item-name">头像</div>
        <div class="info">
          <image class="image" :src="userInfo.User_HeadImg"></image>
        </div>
        <div class="go">
          <layout-icon size="16" type="iconicon-arrow-right"></layout-icon>
        </div>
      </div>
      <div class="item" @click="update(0)">
        <div class="item-name">用户名</div>
        <div class="info">
          {{userInfo.User_Name}}
        </div>
        <div class="go">
          <layout-icon size="16" type="iconicon-arrow-right"></layout-icon>
        </div>
      </div>
      <div class="item" @click="update(1)">
        <div class="item-name">昵称</div>
        <div class="info">
          {{userInfo.User_NickName}}
        </div>
        <div class="go">
          <layout-icon size="16" type="iconicon-arrow-right"></layout-icon>
        </div>
      </div>
      <div class="item" @click="update(2)">
        <div class="item-name">生日</div>
        <div class="info">
          {{userInfo.User_Birthday==0?'':userInfo.User_Birthday}}
        </div>
        <div class="go">
          <layout-icon size="16" type="iconicon-arrow-right"></layout-icon>
        </div>
      </div>
      <div class="item" @click="update(3)">
        <div class="item-name">邮箱</div>
        <div class="info">
          {{userInfo.User_Email}}
        </div>
        <div class="go">
          <layout-icon size="16" type="iconicon-arrow-right"></layout-icon>
        </div>
      </div>
      <div class="item" @click="update(4)">
        <div class="item-name">详细地址</div>
        <div class="info">
          {{userInfo.User_Province_name}}{{userInfo.User_City_name}}{{userInfo.User_Area_name}}{{userInfo.User_Tow_name}}{{userInfo.User_Address}}
        </div>
        <view class="go">
          <layout-icon size="16" type="iconicon-arrow-right"></layout-icon>
        </view>
      </div>
    </div>


  </div>
</template>

<script>


import { getUserInfo, updateUserInfo } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { chooseImageByPromise, getArrColumn, uploadImages } from '@/common/helper'
import { hideLoading, showLoading } from '@/common/fun'
import { mapActions } from 'vuex'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  mixins: [BaseMixin],
  components: { WzwImTip, LayoutIcon },
  data () {
    return {
      userInfo: {},
    }
  },
  methods: {
    update (num) {
      if (num === 2) {
        if (this.userInfo.User_Birthday !== 0) {
          uni.showToast({
            title: '生日不允许再次修改',
            icon: 'none',
          })
          return
        }
      }
      let url = '/pagesA/user/EditPersonalMsg?type=' + num
      this.$linkTo(url)
    },
    async changeAvator () {
      try {
        showLoading('loading')
        const files = await chooseImageByPromise({ count: 1 }).catch(e => {
          throw Error(e.msg)
        })
        const imgs = getArrColumn(files, 'path')
        const ossUrls = await uploadImages({ imgs }).catch(() => {
          throw Error('文件批量上传失败')
        })
        let info = await updateUserInfo({ User_HeadImg: ossUrls[0] }, { onlyData: true }).catch(e => {
          throw  Error(e.msg)
        })
        this.userInfo.User_HeadImg = info.User_HeadImg
        this.setUserInfo(this.userInfo)

      } catch (e) {
        console.log(e.message)
      } finally {
        hideLoading()
      }

    },
    async init () {
      this.userInfo = await getUserInfo({}, {
        onlyData: true,
        tip: '加载中',
      }).catch(e => {
        error(e.msg || '获取信息失败')
      })
    },
    ...mapActions({
      setUserInfo: 'user/setUserInfo',
    }),
  },
  computed: {
    userInfoCom () {
      return this.$store.getters['user/getUserInfo']()
    },
  },
  onShow () {
    this.init()
  },
}
</script>

<style scoped lang="scss">
  .bgColor-white {
    height: 100vh;
  }

  .msg {
    padding: 0 22rpx;

    .item {
      display: flex;
      align-items: center;
      padding: 39rpx 0;
      border-bottom: 1px solid #E3E3E3;

      .item-name {
        font-size: 30rpx;
        color: #333;
      }

      .info {
        display: flex;
        align-items: center;
        flex: 1;
        text-align: right;
        margin-right: 20rpx;
        justify-content: flex-end;
        font-size: 26rpx;
        color: #999999;

        .image {
          width: 88rpx;
          height: 88rpx;
          border-radius: 44rpx;
        }
      }

      .go {
        display: flex;
        align-items: center;
        width: 15rpx;
        height: 23rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
