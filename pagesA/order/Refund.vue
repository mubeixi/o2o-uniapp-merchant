<template>
  <div class="wrap" @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
    <!-- #endif -->


    <div :key="item" class="pro" v-for="(item,index) of refundInfo.refund_prod_list">
      <div class="pro-div">
        <image :src="item.prod_img" alt="" class="pro-img" />
      </div>
      <div class="pro-msg">
        <div class="pro-name">{{item.prod_name}}</div>
        <div class="attr" v-if="item.attr_info"><span>{{item.attr_info.attr_name}}</span></div>
        <div class="attr" style="background-color:#fff;" v-else><span></span></div>
        <div class=""><span class="span amount">x{{item.prod_count}}</span></div>
        <div class="fz-14  graytext2  c9">
          <div>退回余额:<span class="fz-16 danger-color"><span class="span fz-12">￥</span>{{item.refund_money_fee}} </span>
          </div>
          <div>原路退回:<span class="fz-16 danger-color"><span class="span fz-12">￥</span>{{item.refund_pay_fee}} </span>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20rpx;width: 100%;background-color: #F3F3F3;">

    </div>
    <div @click="showReason" class="item ">
      <div class="item-left">退款原因</div>
      <div class="item-right flex flex-vertical-c">
        <span>{{reasonDes?reasonDes: '请选择'}}</span>
        <layout-icon class="img" size="16" type="iconicon-arrow-right"></layout-icon>
      </div>
    </div>
    <div class="item spe">
      <div class="item-left">退款说明</div>
      <input @blur="inputHandle" placeholder="请输入退款说明" placeholder-style="font-size:24rpx;color:#B8B8B8" type="text">
    </div>
    <div class="item noborder">上传凭证</div>
    <div class="imgs">
      <view :key="index" class="shangchuans" v-for="(item,index) of imgs">
        <image :src="item" @click="yulan(index)" class="image"></image>
        <layout-icon @click="delImg(index)" class="image del" size="20" type="iconicon-test"></layout-icon>

      </view>
      <view @click="addImg" class="shangchuan" v-if="imgs.length<9">
        <view class="heng"></view>
        <view class="shu"></view>
      </view>
    </div>
    <div style="height: 50px;"></div>
    <div @click="submit" class="bottom">提交</div>

    <popup-layer :direction="'top'" ref="popup" style="z-index: 99;">
      <div class="bMbx">
        <div class="fMbx">退款原因</div>
        <div :key="index" class="iMbx" v-for="(item,index) in refundInfo.shop_reason">
          <radio-group @change="ShipRadioChange" style="display: block;width: 100%;">
            <label class="flex flex-between flex-vertical-center" style="width: 100%">
              <div class="flex1">
                {{item.Reason_Name}}
              </div>
              <div>
                <radio :checked="index==current" :value="index+''" color="#F43131" style="float:right;" />
              </div>
            </label>
          </radio-group>
        </div>

      </div>
      <div @click="closeReason" class="sure">
        确定
      </div>
    </popup-layer>

  </div>
</template>

<script>
import popupLayer from '@/componets/layout-popup/layout-popup'
import { getRefund, orderRefund } from '@/api/order'
import { error, hideLoading, showLoading, toast } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { chooseImageByPromise, getArrColumn, uploadImages } from '@/common/helper'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    popupLayer,
    LayoutIcon
  },
  data () {
    return {
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        {
          url: 'https://cloud-image',
          isImage: true
        }
      ],
      onlyRefund: 0,
      imgs: [], // 上传图片预览
      Order_ID: 0, // 退款商品id
      refundInfo: '', // 商品信息
      arr: [], // 上传成功的图片
      reasonDes: '', // 退款原因
      current: 0,
      reason_id: 0, // 退款原因id
      refund_desc: '' // 退款说明
    }
  },
  onLoad (option) {
    this.Order_ID = option.Order_ID
  },
  onShow () {
    this.getRefund()
  },
  created () {

  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    }
  },
  methods: {
    // 退款说明
    inputHandle (e) {
      this.refund_desc = e.detail.value
    },
    // 退款原因选择
    ShipRadioChange (e) {
      this.current = e.detail.value
    },
    // 图片预览
    yulan (index) {
      uni.previewImage({
        urls: this.imgs,
        indicator: 'default',
        current: index
      })
    },
    // 获取申请退货退款页面
    getRefund () {
      getRefund({ Order_ID: this.Order_ID }).then(res => {
        for (var i in res.data) {
          if (i === 'refund_prod_list') {
            for (var j in res.data[i]) {
              for (var k in res.data[i][j]) {
                if (k === 'attr_info') {
                  if (res.data[i][j][k]) {
                    res.data[i][j][k] = JSON.parse(res.data[i][j][k] && res.data[i][j][k])
                  }
                }
              }
            }
          }
        }
        this.refundInfo = res.data
      }).catch(e => {

      })
    },
    // 提交
    submit () {
      // 按照订单退款
      if (!this.reason_id) {
        error('退款原因必选')
        return
      }
      const arr = []
      for (const item of this.arr) {
        arr.push(item[0])
      }
      orderRefund({
        image_path: JSON.stringify(arr),
        reason_id: this.reason_id,
        refund_desc: this.refund_desc,
        Order_ID: this.Order_ID
      }).then(res => {
        toast('提交成功')
        setTimeout(() => {
          this.$back()
        }, 1500)
      }).catch(() => {
      })
    },
    // 删除某张预览图片
    delImg (index) {
      this.imgs.splice(index, 1)
      this.arr.splice(index, 1)
    },
    async addImg () {
      try {
        showLoading('loading')
        const files = await chooseImageByPromise({ count: 9 - this.arr.length }).catch(e => {
          throw Error(e.msg)
        })
        const imgs = getArrColumn(files, 'path')
        const ossUrls = await uploadImages({ imgs }).catch(() => {
          throw Error('文件批量上传失败')
        })

        imgs.map(item => {
          this.imgs.push(item)
        })
        ossUrls.map(item => {
          this.arr.push(item)
        })
      } catch (e) {
        console.log(e.message)
      } finally {
        hideLoading()
      }
    },
    showMethod () {
      this.$refs.popupRef.show()
    },
    showReason () {
      this.$refs.popup.show()
    },
    closeMethod () {
      this.$refs.popupRef.close()
    },
    closeReason () {
      this.reasonDes = this.refundInfo.shop_reason[this.current].Reason_Name
      this.reason_id = this.refundInfo.shop_reason[this.current].Reason_ID
      this.$refs.popup.close()
    }
  }
}
</script>

<style lang="scss" scoped>
  .shangchuans {
    width: 146rpx;
    height: 146rpx;
    border: 1px solid rgba(186, 186, 186, 1);
    position: relative;
    margin-right: 28rpx;
    margin-bottom: 28rpx;

    .image {
      width: 100%;
      height: 100%;
    }

    .del {
      width: 38rpx;
      height: 38rpx;
      position: absolute;
      top: -19rpx;
      right: -19rpx;
      z-index: 9;
    }
  }

  .shangchuan {
    width: 146rpx;
    height: 146rpx;
    border: 1px solid rgba(186, 186, 186, 1);
    position: relative;
    margin-bottom: 28rpx;

    .heng {
      width: 76rpx;
      height: 3rpx;
      background-color: #BABABA;
      position: absolute;
      top: 72rpx;
      left: 35rpx;
    }

    .shu {
      width: 3rpx;
      height: 76rpx;
      background-color: #BABABA;
      position: absolute;
      top: 35rpx;
      left: 72rpx;

    }
  }

  .wrap {
    /*   height: 100vh; */
    background: #fff;
  }

  .pro {
    display: flex;
    margin-bottom: 30rpx;
    margin-top: 30rpx;
  }

  .pro-msg {
    margin-left: 27rpx;
    width: 476rpx;
  }

  .pro-div {
    width: 200rpx;
    height: 200rpx;
  }

  .pro-img {
    width: 100%;
    height: 100%;
  }

  .pro-name {
    font-size: 26rpx;
    margin-bottom: 20rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .attr {
    display: inline-block;
    height: 50rpx;
    line-height: 50rpx;
    background: #FFF5F5;
    color: #666;
    font-size: 24rpx;
    padding: 0 20rpx;
    margin-bottom: 20rpx;
  }

  .pro-price {
    color: #F43131;
    font-size: 36rpx;
  }

  .pro-price .span {
    font-size: 24rpx;
    font-style: normal;
  }

  .amount {
    font-size: 30rpx;
    float: right;
    color: #333;
  }

  .item {
    display: flex;
    height: 50px;
    padding: 0 10px;
    width: 95%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    border-bottom: 1px solid #E3E3E3;
  }

  .spe {
    justify-content: flex-start;
  }

  .item-left {
    margin-right: 10px;
    font-size: 28rpx;
  }

  .item-right {
    color: #888;
    font-size: 24rpx;
  }

  .noborder {
    border: none;
  }

  .item-right .img {
    width: 15rpx;
    height: 23rpx;
    margin-left: 25rpx;
  }

  /* 上传图像 */
  .imgs {
    display: flex;
    padding: 0 20rpx;
    padding-right: 0rpx;
    flex-wrap: wrap;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 86rpx;
    line-height: 86rpx;
    font-size: 32rpx;
    color: #fff;
    text-align: center;
    background: #F43131;
    z-index: 8;
  }

  /* 退款 */
  .methods,
  .reason {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    background: #fff;
    padding-top: 20px;
  }

  .m-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .confirm-method {
    background: #F43131;
    color: #fff;
    text-align: center;
    line-height: 50px;
    width: 100%;
    margin-top: 20px;
  }

  .bMbx {
    padding: 0rpx 20rpx;

    .fMbx {
      font-size: 32rpx;
      height: 30rpx;
      line-height: 30rpx;
      text-align: center;
      padding: 36rpx 0rpx;
    }

    .iMbx {
      display: flex;
      justify-content: space-between;
      height: 104rpx;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      align-items: center;
      font-size: 28rpx;
    }
  }

  .sure {
    height: 90rpx;
    width: 100%;
    background-color: #F43131;
    color: #fff;
    font-size: 32rpx;
    margin-top: 96rpx;
    line-height: 90rpx;
    text-align: center;
  }

  .danger-color {
    color: #f43131;
  }
</style>
