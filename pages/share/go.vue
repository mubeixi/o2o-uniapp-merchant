<template>
  <div class="page-wrap">
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
    <div class="bottom flex flex-justify-between flex-vertical-c">
      <div class="bottom-share-btn flex flex-vertical-c flex-justify-c">
        <layout-icon color="#FF0000" type="iconicon-share"></layout-icon>
        <span class="p-l-6">转发</span>
      </div>
      <div class="bottom-save-btn flex flex-vertical-c flex-justify-c">
        <layout-icon color="#fff" type="iconxiazai"></layout-icon>
        <span class="p-l-10">保存推广图和文案</span>
      </div>
    </div>
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

export default {
  name: 'ShareIndex',
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
  },
  data () {
    return {
      prod_id: '',
      shareInfo: {},
      detailData: {},
      goodsList: [],
      adData: ['https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191033295234.png', 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191039274962.png', 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191044146586.jpg'],
    }
  },
  methods: {
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
          prod_id: this.prod_id,
        }
        this.detailData = await getProductDetail(data, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品信息失败')
        })
        this.shareInfo = await getBizShare({
          ...data,
          biz_id: 3,
          qrcode_type: getEnv(),
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品信息失败')
        })
        hideLoading()
      } catch (e) {
        modal(e.message)
      }
    },
  },
  onLoad (options) {
    this.prod_id = options.prod_id
    this._init_func()
  },
  created () {
  
  },
}
</script>
<style lang="scss" scoped>
  
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
