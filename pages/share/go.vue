<template>
  <div class="page-wrap">
    <canvas class="myCanvas" id="myCanvas" canvas-id="myCanvas"/>
    <div class="text-box">
      <div class="flex flex-vertical-c flex-justify-between">
        <span class="c3 fz-16">推广文案</span>
        <span class="text-share-btn" @click="copy">复制文案</span>
      </div>
      <div class="container p-15 fz-12 c3">
        <div class="m-t-10">{{detailData.Products_Name}}</div>
        <div class="m-t-10">已售{{detailData.Products_Sales}}件</div>
        <div class="m-t-10">拼购价:{{detailData.Products_PriceX}}</div>
        <div class="m-t-10">原价:{{detailData.Products_PriceY}}</div>
      </div>
    </div>

    <div class="preivew" style="background-image: url('/static/share/cover-wrap.png')">
      <div class="preivew-cover" :style="{backgroundImage:'url('+detailData.ImgPath+')'}"></div>
      <div class="preivew-title c3 fz-14">{{detailData.Products_Name}}</div>
      <div class="preivew-pricebox flex flex-justify-between flex-vertical-c">
        <div class="price fz-12 flex flex-vertical-b">
          <span class="c6">拼购价：</span><span class="fz-12 price-selling">￥</span><span class="fz-14 price-selling">{{detailData.Products_PriceX}}</span><span class="price-market text-through p-l-10">¥{{detailData.Products_PriceY}}</span>
        </div>
        <div class="count fz-12 color-white">
          <div class="text">{{detailData.click_count}}人正在抢购</div>
        </div>
      </div>
      <div class="preivew-hr"></div>
      <div class="preivew-spread">
        <image :src="userInfo.User_HeadImg" class="headimg"></image>
        <div class="nickname c3 p-l-10 fz-14"><span class="text">{{userInfo.User_NickName}}</span><span class="p-l-6">为您推荐</span></div>
        <image :src="shareInfo.qrcode" class="qrcode"></image>
      </div>
    </div>
    <div class="bottom flex flex-justify-between flex-vertical-c">
      <button class="bottom-share-btn flex flex-vertical-c flex-justify-c" open-type="share">
        <layout-icon color="#FF0000" type="iconicon-share"></layout-icon>
        <span class="p-l-6">转发</span>
      </button>
      <div class="bottom-save-btn flex flex-vertical-c flex-justify-c" @click="createCanvas">
        <layout-icon color="#fff" type="iconxiazai"></layout-icon>
        <span class="p-l-10">保存推广图和文案</span>
      </div>
    </div>

    <div class="safearea-box"></div>

  </div>
</template>

<script>
import { getProductDetail } from '@/api/product'
import { getBizShare } from '@/api/common'
import { hideLoading, modal, showLoading } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import { getEnv } from '@/common/request'
import Promisify from '@/common/Promisify'
import { buildSharePath, cutstrFun } from '@/common/helper'
import { Exception } from '@/common/Exception'
let canvasInstance = null
export default {
  name: 'ShareIndex',
  mixins: [BaseMixin],
  components: {
    LayoutIcon
  },
  data () {
    return {
      wrapPath: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202005051145245485.png',
      prod_id: '',
      shareInfo: {},
      detailData: {}
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  onLoad (options) {
    this.prod_id = options.prod_id
    this._init_func()
  },
  mounted () {
    canvasInstance = uni.createCanvasContext('myCanvas')
    console.log(canvasInstance)
  },
  created () {
    // 用oss的素材
    // this.wrapPath = this.$getDomain('/static/client/share/cover-wrap.png')
  },
  methods: {
    async createCanvas () {
      try {
       
        showLoading('生成中')
        const wrapHeight = 1038
        const ctx = canvasInstance

        const thumbTempFile = await Promisify('getImageInfo', { src: this.detailData.ImgPath }).catch(e => { throw Error(e.errMsg || '缓存商品缩略图失败') })
        const headimgTempFile = await Promisify('getImageInfo', { src: this.userInfo.User_HeadImg }).catch(e => { throw Error(e.errMsg || '缓存商品缩略图失败') })
        const qrimgTempFile = await Promisify('getImageInfo', { src: this.shareInfo.qrcode }).catch(e => { throw Error(e.errMsg || '缓存商品缩略图失败') })
        // const wrapTempFile = await Promisify('getImageInfo', { src: this.wrapPath }).catch(e => { throw Error(e.errMsg || '缓存海报背景失败') })
        console.log(thumbTempFile.path)
        // 绘制底部白色
        // ctx.setFillStyle('#f2f2f2')

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
        ctx.fillText(`￥${this.detailData.Products_PriceX}`, 161, 739)

        ctx.setFillStyle('#999')
        ctx.fillText(`￥${this.detailData.Products_PriceY}`, 286, 739)

        ctx.setFillStyle('#f8f8f8')
        ctx.moveTo(286, 732)
        ctx.setLineWidth(1)
        ctx.lineTo(286 + (`￥${this.detailData.Products_PriceY}`).length * 16, 732)
        ctx.stroke()

        // 右侧

        ctx.drawImage('/static/share/count-bg.png', 430, 710, 245, 38)
        ctx.setFontSize(20)
        ctx.setFillStyle('#fff')
        ctx.textAlign = 'center'
        ctx.fillText(`${this.detailData.click_count}人正在抢购`, 520, 736, 170)

        ctx.textAlign = 'left'
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
        uni.previewImage({
          urls: [tempFilePath] // 需要预览的图片http链接列表
        })
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    },
    async copy () {
      try {
        const str = `${this.detailData.Products_Name},已售${this.detailData.Products_Sales},拼购价只要${this.detailData.Products_PriceX},原价${this.detailData.Products_PriceY}`
        console.log(str)
        await Promisify('setClipboardData', { data: str }).catch(e => {
          throw Error(e.errMsg)
        })
      } catch (e) {
        modal(e.message)
      }
    },
    async _init_func () {
      try {
        showLoading()
        const data = {
          prod_id: this.prod_id
        }
        this.detailData = await getProductDetail(data, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品信息失败')
        })
        this.shareInfo = await getBizShare({
          ...data,
          biz_id: 3,
          qrcode_type: getEnv()
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品信息失败')
        })
        hideLoading()
      } catch (e) {
        modal(e.message)
      }
    }
  },
  // 自定义小程序分享
  onShareAppMessage () {
    const path = '/pages/product/detail?prod_id=' + this.prod_id
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

  .myCanvas {
    position: fixed;
    left: 100%;
    top: 0;
    background: white;
    width: 700px;
    height: 1038px;
  }

  .preivew{
    width: 700rpx;
    margin: 50rpx 25rpx;
    padding: 40rpx 0;
    border-radius: 10rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /*background: white;*/
    &-cover{
      width: 650rpx;
      height: 650rpx;
      margin: 0 auto;
      @include cover-img();
    }
    &-title{
      margin: 30rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    &-pricebox{
      margin: 0rpx 30rpx;
      .count{
        background: #ffe1e1;
        height: 38rpx;
        border-radius: 19rpx;
        width: 245rpx;
      }
      .text{
        margin-right: 40rpx;
        text-align: center;
        height: 38rpx;
        line-height: 38rpx;
        border-radius: 19rpx;
        background:linear-gradient(270deg,rgba(255,0,6,1),rgba(255,132,23,1));
      }
    }
    &-hr{
      margin: 30rpx 70rpx;
      border-bottom: 1px dashed #BBBBBB;
    }
    &-spread{
      display: flex;
      align-items: center;
      padding: 0 70rpx;
      .headimg{
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        overflow: hidden;
      }
      .nickname{
        flex: 1;

        .text{
          font-weight: bold;
        }
      }
      .qrcode{
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
</style>
