<template>
  <div @click="commonClick" class="page-wrap" v-if="isReady">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <layout-page-loading :show="isShowFullLoading"></layout-page-loading>
    <canvas canvas-id="myCanvas" class="myCanvas" id="myCanvas" />
    <div class="text-box">
      <div class="flex flex-vertical-c flex-justify-between">
        <span class="c3 fz-16">推广文案</span>
        <span @click="copy" class="text-share-btn">复制文案</span>
      </div>
      <div class="container p-15 fz-12 c3">
        <textarea :value="shareText" @input="bindShareTextChange" style="line-height: 1.6"></textarea>
        <!--        <div class="m-t-10">{{detailData.Products_Name}}</div>-->
        <!--        <div class="m-t-10">已售{{detailData.Products_Sales}}件</div>-->
        <!--        <div class="m-t-10">拼购价:{{detailData.Products_PriceX}}</div>-->
        <!--        <div class="m-t-10">原价:{{detailData.Products_PriceY}}</div>-->
      </div>
    </div>

    <div class="preivew" style="background-image: url('/static/share/cover-wrap.png')">
      <div :style="{backgroundImage:'url('+detailData.ImgPath+')'}" class="preivew-cover"></div>
      <div class="preivew-title c3 fz-14">{{detailData.Products_Name}}</div>
      <div class="preivew-pricebox flex flex-justify-between flex-vertical-c">
        <div class="price fz-12 flex flex-vertical-b">
          <span class="c6">拼购价：</span>
          <span class="fz-12 price-selling">￥</span>
          <span class="fz-14 price-selling">
            <block v-if="mode==='spike' || mode==='seckill'">{{detailData.price}}</block>
            <block v-else-if="detailData.is_pintuan">{{detailData.pintuan_pricex}}</block>
            <block v-else>{{detailData.Products_PriceX}}</block>
          </span>
          <span class="price-market text-through p-l-10">¥
          <block
            v-if="mode==='spike' || mode==='seckill' || detailData.is_pintuan">{{detailData.Products_PriceX}}</block>
          <block v-else>{{detailData.Products_PriceY}}</block>
          </span>
        </div>
        <div class="count fz-12 color-white">
          <div class="text">{{detailData.click_count}}人正在抢购</div>
        </div>
      </div>
      <div class="active-info fz-12" v-if="mode==='spike' || mode==='seckill'">
        <div class="active-btn color-white">
          <block v-if="mode==='spike'">拼团</block>
          <block v-if="mode==='seckill'">秒杀</block>
        </div>
        <div class="active-endtime c6">截止时间:{{detailData.end_time_text}}</div>
      </div>
      <div class="preivew-hr"></div>
      <div class="preivew-spread">
        <image :src="userInfo.User_HeadImg" class="headimg"></image>
        <div class="nickname c3 p-l-10 fz-14"><span class="text">{{userInfo.User_NickName}}</span><span class="p-l-6">为您推荐</span>
        </div>
        <image :src="shareInfo.img_url" class="qrcode"></image>
      </div>
    </div>
    <div class="bottom flex flex-justify-between flex-vertical-c">
      <button class="bottom-share-btn flex flex-vertical-c flex-justify-c" open-type="share">
        <layout-icon color="#FF0000" type="iconicon-share"></layout-icon>
        <span class="p-l-6">转发</span>
      </button>
      <div @click="saveImg" class="bottom-save-btn flex flex-vertical-c flex-justify-c">
        <layout-icon color="#fff" type="iconxiazai"></layout-icon>
        <span class="p-l-10">保存推广图和文案</span>
      </div>
    </div>

	<div class="h20"></div>
    <div class="safearea-box" style="background-color: #f8f8f8 !important;"></div>

    <layout-modal  ref="commentModal" :autoClose="false" positions="center">
      <div class="refuseApplyDialog">
        <div class="c3 fz-14 modal-title">
          是否开启相册权限
        </div>
        <div class="fz-12 m-b-20 m-t-10 c9">
          很抱歉，该功能您需开启相册授权才能保存
        </div>
        <div class="control">
          <button @click="backSetting" class="action-btn-sure ">取消</button>
          <button open-type="openSetting" bindopensetting="openSetting" class="btn-sub action-btn-sure">确定</button>
        </div>
      </div>
    </layout-modal>

  </div>
</template>

<script>
import { getFlashsaleDetail, getProductDetail, getProductSharePic, spikeProdDetail } from '@/api/product'
import { hideLoading, modal, showLoading, error, toast } from '@/common/fun'
import LayoutIcon from '@/components/layout-icon/layout-icon'
import LayoutModal from '@/components/layout-modal/layout-modal'
import BaseMixin from '@/mixins/BaseMixin'
import Promisify from '@/common/Promisify'
import { buildSharePath, checkIsLogin, cutstrFun, saveImageToDisk } from '@/common/helper'
import { Exception } from '@/common/Exception'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import LayoutPageLoading from '@/components/layout-page-loading/layout-page-loading'
let canvasInstance = null
export default {
  name: 'ShareIndex',
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutIcon,
    LayoutModal,
    LayoutPageLoading
  },
  data () {
    return {
		userInfo:{},
      isShowFullLoading:false,
      current_url: '',
      isReady: false,
      mode: 'default',
      flashsale_id: '',
      spike_good_id: '', // 限时抢购专用
      wrapPath: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202005051145245485.png',
      prod_id: '',
      shareText: '',
      shareInfo: {},
      // 倒计时
      activeInfo: {
        start_time: '',
        end_time: ''
      },
      detailData: {
        price: '',
        Products_Name: '',
        Products_PriceX: '0',
        Products_PriceY: '0',
        Products_JSON: {},
        Products_Description: '',
        userInfo: null
      }
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    // userInfo () {
    //   return this.$store.getters['user/getUserInfo']()
    // }
  },
  onLoad (options) {
    const { mode, spike_good_id, flashsale_id, prod_id } = options
    if (!prod_id) {
      modal('产品id必传')
      setTimeout(() => {
        this.$back()
      }, 1000)
    }
    this.prod_id = prod_id
    if (mode) this.mode = mode
    if (spike_good_id) this.spike_good_id = spike_good_id
    if (flashsale_id) this.flashsale_id = flashsale_id

    this._init_func(options)
  },
  mounted () {
    canvasInstance = uni.createCanvasContext('myCanvas')
    console.log(canvasInstance)
  },
  created () {
    // 用oss的素材
    // this.wrapPath = this.$getDomain('/static/client/share/cover-wrap.png')
  },
  onShow () {
    this.$refs.commentModal && this.$refs.commentModal.close()
  },
  methods: {
    async saveFn () {
      const handleRT = await saveImageToDisk({
        fileUrl: this.current_url,
        type: 'local'
      })
      if (handleRT === false) {
        error('保存失败')
        return
      }
      toast('保存成功')
    },
    saveImg () {
      const _self = this
      uni.getSetting({
        success: (res) => {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            // this.$refs.commentModal.show()
            this.openSetting()
          } else { // 用户已经授权过了
            _self.saveFn()
          }
        }
      })
    },
    backSetting () {
      this.$refs.commentModal.close()
    },
    openSetting () {
      const _self = this
      uni.authorize({
        scope: 'scope.writePhotosAlbum',
        success () {
          _self.saveFn()
        },
        fail () {
          _self.$refs.commentModal.show()
          error('拒绝相册授权,保存失败')
        }
      })
    },
    bindShareTextChange (e) {
      this.shareText = e.detail.value
    },
    async createCanvas () {
      if (!checkIsLogin(1, 1)) return
      try {
        this.isShowFullLoading=true
        const wrapHeight = 1038
        const ctx = canvasInstance

        const thumbTempFile = await Promisify('getImageInfo', { src: this.detailData.ImgPath }).catch(e => {
          throw Error(e.errMsg || '缓存商品缩略图失败')
        })
        const headimgTempFile = await Promisify('getImageInfo', { src: this.userInfo.User_HeadImg }).catch(e => {
          throw Error(e.errMsg || '缓存头像失败')
        })
        const qrimgTempFile = await Promisify('getImageInfo', { src: this.shareInfo.img_url }).catch(e => {
          throw Error(e.errMsg || '缓存二维码失败')
        })
        // const wrapTempFile = await Promisify('getImageInfo', { src: this.wrapPath }).catch(e => { throw Error(e.errMsg || '缓存海报背景失败') })
        console.log(thumbTempFile.path)
        // 绘制底部白色
        ctx.setFillStyle('#f4f4f4')

        ctx.fillRect(0, 0, 700, wrapHeight)
        ctx.drawImage('/static/share/cover-wrap.png', 0, 0, 700, wrapHeight)

        // 商品缩略图
        ctx.drawImage(thumbTempFile.path, 50, 50, 600, 600)

        // 商品名称
        ctx.setFillStyle('#333333')
        ctx.setFontSize(28)
        ctx.textAlign = 'center'
        const showProductName = cutstrFun(this.detailData.Products_Name, parseInt(640 / 24)) // 只显示一行
        ctx.fillText(showProductName, 350, 680)

        // 商品价格box
        ctx.textAlign = 'left'
        ctx.setFontSize(24)
        ctx.setFillStyle('#666666')
        ctx.fillText('拼购价：', 63, 739)
        ctx.setFillStyle('#E41515')

        var price = this.detailData.Products_PriceX
        if (this.detailData.is_pintuan) {
          price = this.detailData.pintuan_pricex
        }
        if (this.mode === 'spike' || this.mode === 'seckill') {
          price = this.detailData.price
        }

        ctx.fillText(`￥${price}`, 161, 739)

        var Products_PriceY = this.detailData.Products_PriceY
        if (this.mode === 'spike') {
          Products_PriceY = this.detailData.Products_PriceX
        }
        if (this.mode === 'seckill') {
          Products_PriceY = this.detailData.Products_PriceX
        }

        ctx.setFillStyle('#999')
        ctx.fillText(`￥${Products_PriceY}`, 286, 739)

        ctx.setFillStyle('#eeeeee')
        ctx.moveTo(286, 732)
        ctx.setLineWidth(1)
        ctx.lineTo(286 + (`￥${Products_PriceY}`).length * 16, 732)
        ctx.stroke()

        // 右侧

        ctx.drawImage('/static/share/count-bg.png', 430, 710, 245, 38)
        ctx.setFontSize(20)
        ctx.setFillStyle('#fff')
        ctx.textAlign = 'center'
        ctx.fillText(`${this.detailData.click_count}人正在抢购`, 520, 736, 170)

        ctx.textAlign = 'left'

        if (this.mode === 'spike' || this.mode === 'seckill') {
          var activeType = ''
          if (this.mode === 'spike') {
            activeType = '限时抢购'
          }
          if (this.mode === 'seckill') {
            activeType = '秒杀活动'
          }
          ctx.drawImage('/static/share/acitve-btn.png', 70, 780, 72, 32)
          ctx.setFontSize(16)
          ctx.setFillStyle('#fff')

          ctx.fillText(`${activeType}`, 75, 804, 170)
          price = this.detailData.price

          ctx.setFontSize(20)
          ctx.setFillStyle('#666')
          ctx.fillText(`截止时间: ${this.detailData.end_time_text}`, 170, 800)
        }

        // 分割线
        ctx.moveTo(71, 858)
        ctx.setLineWidth(1)
        ctx.lineTo(558 + 71, 858)
        ctx.setFillStyle('#eee')
        ctx.setLineDash([10, 6], 0)
        ctx.stroke()

        // 头像(需要画个圆角)
        ctx.save()
        ctx.beginPath()
        ctx.arc(68 + 50, 886 + 50, 50, 0, 2 * Math.PI)
        ctx.clip()
        ctx.drawImage(headimgTempFile.path, 68, 886, 100, 100)
        ctx.restore()

        ctx.setFontSize(28)
        ctx.setFillStyle('#333')
        ctx.font = 'bold'
        const showNickname = cutstrFun(this.userInfo.User_NickName, 10)
        ctx.fillText(showNickname, 191, 944)

        ctx.font = 'normal'
        ctx.fillText('为你推荐', 191 + 28 * (showNickname.length), 944)

        // 二维码
        ctx.drawImage(qrimgTempFile.path, 520, 883, 110, 110)

        await new Promise(resolve => {
          ctx.draw(false, function () {
            console.log('draw done')
            resolve()
          })
        })

        const { tempFilePath } = await Promisify('canvasToTempFilePath', { canvasId: 'myCanvas' })
        console.log(tempFilePath)
        this.current_url = tempFilePath
        // uni.previewImage({
        //   urls: [tempFilePath] // 需要预览的图片http链接列表
        // })
      } catch (e) {
        e.type = 'modal'
        Exception.handle(e)
      } finally {
        this.isShowFullLoading=false
      }
    },
    async copy () {
      try {
        const str = this.shareText
        console.log(str)
        await Promisify('setClipboardData', { data: str }).catch(e => {
          throw Error(e.errMsg)
        })
      } catch (e) {
        modal(e.message)
      }
    },
    async _init_func (options) {
      try {
        this.isShowFullLoading=true

        this.userInfo = await this.$store.dispatch('user/getUerInfo', { stroage: 'online' })

        const data = {
          prod_id: this.prod_id
        }
        const detailData = await getProductDetail(data, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品信息失败')
        })

        detailData.end_time_text = uni.$moment(detailData.end_time).format('YYYY-MM-DD h:m:s')

        this.detailData = detailData
        // this.shareText = `${detailData.Products_Name},已售${detailData.Products_Sales}件,拼购价:${detailData.Products_PriceX},原价:${detailData.Products_PriceY}`
        this.shareText = `${detailData.Products_BriefDescription}`
        // 秒杀
        if (this.mode === 'seckill') {
          const seckillInfo = await getFlashsaleDetail({ flashsale_id: this.flashsale_id }).then(res => {
            return res.data
          }).catch(e => {
            throw Error(e.msg || '获取秒杀信息错误')
          })

          Object.assign(this.detailData, seckillInfo)
          this.activeInfo.start_time = seckillInfo.start_time
          this.activeInfo.end_time = seckillInfo.end_time
        }

        // 限时抢购
        if (this.mode === 'spike') {
          const spikeInfo = await spikeProdDetail({ spike_good_id: this.spike_good_id }).then(res => {
            return res.data
          }).catch(e => {
            throw Error(e.msg || '获取限时抢购详情错误')
          })

          Object.assign(this.detailData, spikeInfo)
          this.activeInfo.start_time = spikeInfo.start_time
          this.activeInfo.end_time = spikeInfo.end_time
        }

        // 秒杀
        if (this.mode === 'seckill') {
          this.shareText = `${detailData.Products_Name},已售${detailData.Products_Sales}件,秒杀价:${detailData.price},原价:${detailData.Products_PriceX}`
        }

        // 限时抢购
        if (this.mode === 'spike') {
          this.shareText = `${detailData.Products_Name},已售${detailData.Products_Sales}件,拼购价:${detailData.price},原价:${detailData.Products_PriceX}`
        }

        const productShareInfo = await getProductSharePic({ product_id: this.prod_id }).then(res => res.data).catch(err => {
          throw Error(err.msg || '获取商品分享信息错误')
        })
        console.log(productShareInfo)

        this.shareInfo = productShareInfo
        // this.shareInfo = await getBizShare({
        //   ...data,
        //   biz_id: this.detailData.biz_id,
        //   qrcode_type: getEnv()
        // }, { onlyData: true }).catch(e => {
        //   throw Error(e.msg || '获取商品信息失败')
        // })

        this.isReady = true
        this.isShowFullLoading=false
        this.createCanvas()
      } catch (e) {
        console.log(e)
        modal(e.message)
      }
    }
  },
  // 自定义小程序分享
  onShareAppMessage () {
    var path = '/pages/product/detail?prod_id=' + this.prod_id

    // 限时抢购
    if (this.mode === 'spike' && this.spike_good_id) {
      path += `&mode=spike&spike_good_id=${this.spike_good_id}`
    }
    // 秒杀
    if (this.mode === 'seckill' && this.flashsale_id) {
      path += `&mode=seckill&flashsale_id=${this.flashsale_id}`
    }

    const shareObj = {
      title: this.detailData.Products_Name,
      desc: this.detailData.Products_BriefDescription,
      imageUrl: this.detailData.ImgPath,
      path: buildSharePath(path)
    }
    return shareObj
  }
}
</script>
<style lang="scss" scoped>

  .active-info {
    display: flex;
    align-items: center;
    margin: 20rpx 30rpx 0;

    .active-btn {
      background: linear-gradient(270deg, rgba(255, 0, 6, 1), rgba(255, 132, 23, 1));
      border-radius: 4rpx;
      padding: 2px 4px;
      margin-right: 10px;
    }
  }

  .myCanvas {
    position: fixed;
    left: 100%;
    top: 0;
    background: white;
    width: 700px;
    height: 1038px;
  }

  .preivew {
    width: 700rpx;
    margin: 50rpx 25rpx;
    padding: 40rpx 0;
    border-radius: 10rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /*background: white;*/
    &-cover {
      width: 650rpx;
      height: 650rpx;
      margin: 0 auto;
      @include cover-img();
    }

    &-title {
      margin: 30rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

    &-pricebox {
      margin: 0rpx 30rpx;

      .count {
        background: #ffe1e1;
        height: 38rpx;
        border-radius: 19rpx;
        width: 245rpx;
      }

      .text {
        margin-right: 40rpx;
        text-align: center;
        height: 38rpx;
        line-height: 38rpx;
        border-radius: 19rpx;
        background: linear-gradient(270deg, rgba(255, 0, 6, 1), rgba(255, 132, 23, 1));
      }
    }

    &-hr {
      margin: 30rpx 70rpx;
      border-bottom: 1px dashed #BBBBBB;
    }

    &-spread {
      display: flex;
      align-items: center;
      padding: 0 70rpx;

      .headimg {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        overflow: hidden;
      }

      .nickname {
        flex: 1;

        .text {
          font-weight: bold;
        }
      }

      .qrcode {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }

  .page-wrap {
    padding-top: 46rpx;
    background: #f8f8f8;
    min-height: 100vh;
  }

  .text-box {
    width: 700rpx;
    margin: 0 25rpx;
    background: white;
    box-sizing: border-box;
    padding: 20rpx;

    .top {

    }

    .text-share-btn {
      background: linear-gradient(to right, #FF0006, #FF8417);
      width: 160rpx;
      height: 62rpx;
      color: #fff;
      text-align: center;
      line-height: 62rpx;
      border-radius: 4rpx;
    }

    .container {
      margin-top: 15px;
      background: #F4F4F4;
    }
  }

  .bottom {
    color: #fff;
    margin: 55rpx 25rpx;

    .bottom-share-btn {
      border-radius: 4rpx;
      width: 186rpx;
      height: 78rpx;
      border: 1px solid #FF0000;
      color: #FF0000;
    }

    .bottom-save-btn {
      border-radius: 4rpx;
      width: 484rpx;
      height: 78rpx;
      background: linear-gradient(to right, #FF0006, #FF8417);
    }
  }

  .control{
    display: flex;
    width: 100%;
    align-items: center;
    .action-btn-sure{
      flex: 1;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 16px;
      background-color: #FFFFFF;
      border: 0px;
    }
    button::after{
      width: 0;
      height: 0;
    }
  }

  .refuseApplyDialog{
    width: 560rpx;
    box-sizing: border-box;
    padding-left: 40rpx;
    padding-right: 40rpx;
    .modal-title{
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-weight: bold;
    }
    .btn-sub{
      color: #1aac19;
    }

  }
</style>
