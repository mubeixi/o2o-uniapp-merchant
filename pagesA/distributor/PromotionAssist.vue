<template>
  <view @click="commonClick">
    <view class="banner">
      <image class="src" :src="'/static/clientpop_default.jpg'|domain"></image>
      <form report-submit @submit="submit">
        <view class="content">
          <view class="title">推广小助手</view>
          <view class="item">
            <view class="sub-title">内容链接</view>
            <input class="website" v-model="postData.wx_url" type="text" placeholder="请在这里粘贴网址">
          </view>
          <view class="item">
            <view class="sub-title">选择链接</view>
            <text>链接方式：</text>
            <radio-group @change="radioChange" style="display: inline-block;">
              <label class="radio" v-for="(item,index) in radioArr" :key="index">
                <radio color="#F43131" style="transform:scale(0.7)" :checked="idx==index" :value="item.value" />
                {{item.name}}</label>
            </radio-group>
            <picker mode="selector" :range="arr" :index="index" @change="pickHandle" class="picker">
              <view>{{arr[index]}}</view>
              <view class="down">
                <image :src="'/static/clientgo.png'|domain" mode=""></image>
              </view>
            </picker>
          </view>
          <view class="item msg">
            <view class="sub-title">联系方式</view>
            <input class="input" type="text" v-model="postData.name" placeholder="请在此输入你的姓名" />
            <input class="input" type="text" v-model="postData.mobile" placeholder="请在此输入你的电话" />
            <input class="input" type="text" v-model="postData.qq" placeholder="请在此输入你的QQ" />
            <input class="input" type="text" v-model="postData.email" placeholder="请在此输入你的邮箱" />
            <view class="btns">
              <button class="submit" form-type="submit">提交</button>
              <button class="share">转发详情</button>
            </view>
          </view>
        </view>
      </form>
    </view>
  </view>
</template>

<script>
import { addPromotionArticle } from '@/api/customer'

import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      val: 'r1',
      idx: 0, // 选中下标
      radioArr: [
        {
          value: '1',
          name: '商城链接',
        },
        {
          value: '2',
          name: '图文展示',
        },
      ],
      arr: [],
      arr1: [
        '商城首页', '全部分类', '服装', '鞋子',
      ],
      index: 0,
      arr2: ['微砍价', '微助力', '微众筹'],
      postData: {
        wx_url: '', // 文章微信原地址
        link_type: '1', // 链接方式  1 商城链接  2 图文链接
        link_url: '1', // 链接
        name: '',
        mobile: '',
        qq: '',
        email: '',
      },
    }
  },
  onLoad () {

  },
  onShow () {
    this.arr = this.arr1
  },
  methods: {
    // 改变方式
    radioChange (e) {
      const val = e.detail.value
      if (val === '1') {
        this.arr = this.arr1
        this.postData.link_type = 1
      } else {
        this.arr = this.arr2
        this.postData.link_type = 2
      }
    },
    // 下拉选择
    pickHandle (e) {
      this.index = e.detail.value
      this.postData.link_url = e.detail.value
    },
    submit (e) {
      // add_template_code({
      // 	code: e.detail.formId,
      // 	times: 1
      // })
      const isMobileOK = /^1(3|5|6|7|8|9)[0-9]{9}$/.test(this.postData.mobile)
      const isEmailOK = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,4})$/.test(this.postData.email)
      const isQQ = /[1-9][0-9]{4,10}/.test(this.postData.qq)
      if (!isMobileOK) {
        uni.showToast({
          title: '手机格式不正确',
          icon: 'none',
        })
        return
      } else if (!isEmailOK) {
        uni.showToast({
          title: '邮箱不正确',
          icon: 'none',
        })
        return
      } else if (!isQQ) {
        uni.showToast({
          title: 'qq号不正确',
          icon: 'none',
        })
        return
      } else if (this.postData.name === '') {
        uni.showToast({
          title: '姓名不能为空',
          icon: 'none',
        })
        return
      } else if (this.postData.wx_url === '') {
        uni.showToast({
          title: '链接不能为空',
          icon: 'none',
        })
        return
      }
      addPromotionArticle({
        wx_url: this.postData.wx_url,
        link_type: this.postData.link_type,
        link_url: this.postData.link_url,
        name: this.postData.name,
        mobile: this.postData.mobile,
        qq: this.postData.qq,
        email: this.postData.email,
      }).then(res => {
        uni.showToast({
          title: res.msg,
        })
      }).catch(err => {
        uni.showToast({
          title: err.msg,
        })
      })
    },
  },
}
</script>

<style scoped lang="scss">
  .banner {
    width: 100%;
    height: 400rpx;

    .src {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    font-size: 28rpx;
    padding: 0 30rpx;

    .title {
      line-height: 100rpx;
      font-size: 32rpx;
      font-weight: 700;
    }

    .item {
      .sub-title {
        font-size: 30rpx;
        font-weight: 700;
        line-height: 80rpx;
      }

      .website {
        border: 1px solid #efefef;
        height: 70rpx;
        line-height: 70rpx;
        padding-left: 20rpx;
      }

    }
  }

  .msg .input {
    border: 1px solid #efefef;
    margin: 20rpx 0;
    height: 70rpx;
    line-height: 70rpx;
    padding-left: 60rpx;
  }

  /*form .msg input[type='text']:nth-of-type(1) {*/
  /*	background: url(/static/client/tuiguang/center.png) no-repeat 10rpx center ;*/
  /*	background-size: 40rpx 40rpx;*/
  /*}*/
  /*form .msg input[type='text']:nth-of-type(2) {*/
  /*	background: url(/static/client/tuiguang/dianhua.png) no-repeat 10rpx center ;*/
  /*	background-size: 40rpx 40rpx;*/
  /*}*/
  /*form .msg input[type='text']:nth-of-type(3) {*/
  /*	background: url(/static/client/tuiguang/qq.png) no-repeat 10rpx center ;*/
  /*	background-size: 40rpx 40rpx;*/
  /*}*/
  /*form .msg input[type='text']:nth-of-type(4) {*/
  /*	background: url(/static/client/tuiguang/youxiang.png) no-repeat 10rpx center ;*/
  /*	background-size: 40rpx 40rpx;*/
  /*}*/
  .btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 40rpx;
    color: #fff;

    .submit, .share {
      background: #F43131;
      color: #fff;
      width: 200rpx;
      height: 80rpx;
      text-align: center;
      line-height: 80rpx;
      font-size: 28rpx;
    }
  }

  .picker {
    position: relative;
    text-align: center;
    border: 1px solid #efefef;
    margin: 10rpx 0;
    height: 70rpx;
    line-height: 70rpx;

    .down {
      position: absolute;
      right: 0;
      top: 15rpx;
      width: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      transform: rotate(90deg);
    }
  }
</style>
