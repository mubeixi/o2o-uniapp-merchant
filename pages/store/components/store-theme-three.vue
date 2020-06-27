<template>
  <div class="page-wrap">
    <div class="fixed-top-box" v-show="headTabSticky" :style="{height: diyHeadHeight+'px'}">
      <layout-page-title :letf-icon-size="18" :letfFn="true" :pageTitle="'店铺详情'" @clickLeft="$back"></layout-page-title>
      <div class="h10"></div>
      <div class="fixed-top-search flex flex-vertical-c">
        <div class="fixed-search-input flex flex-vertical-c">
          <layout-icon size="18" color="#ADADAD" type="iconsearch"></layout-icon>
          <div class="placeholder">请输入商品关键词</div>
        </div>
        <image class="fixed-top-vip" :src="$getDomain('/static/client/store/theme-three/vip.png')"></image>
      </div>
    </div>

    <scroll-view class="store-comp-wrap" @scroll="bindScroll" :scroll-y="!headTabSticky" >
      <div id="topBox" class="top-box" >
        <image class="top-box-bg" :src="$getDomain('/static/client/store/theme-three/top-bg.png')"></image>
        <layout-page-title letf-icon-color="#fff" status-bg-color="none" menu-button-bg-color="none" :letf-icon-size="18" :letfFn="true" @clickLeft="$back"></layout-page-title>
        <div class="h10"></div>
        <div class="store-info">
          <div class="flex">
            <div class="store-info-logo" :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}"></div>
            <div class="store-info-more">
              <div class="store-info-row flex-vertical-c flex-justify-between">
                <div style="max-width: 360rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" class="store-title c3 fz-b">{{storeInfo.biz_shop_name}}</div>
                <div class="actions flex flex-vertical-c">
                  <layout-icon :color="isFavourite?'#E64239':'#999'" @click.stop="taggleFavorite" :plain="false" wrap-bg="#FFECEB" wrap-padding="10rpx" type="iconicon-favorite"></layout-icon>
                  <layout-icon :color="isFavourite?'#E64239':'#999'" @click.stop="$cellPhone(storeInfo.biz_mobile)" style="margin-left: 25rpx" :plain="false" wrap-bg="#FFECEB" wrap-padding="10rpx" type="iconicon-phone"></layout-icon>
                </div>
              </div>
              <div class="store-info-row flex-vertical-c" style="margin: 20rpx 0">
                <layout-icon color="#999" size="14" type="iconicon-address"></layout-icon>
                <div class="c9 fz-12">地址:{{storeInfo.biz_address}}</div>
              </div>
              <div class="store-info-row flex-vertical-c">
                <div class="fz-12 c9">营业时间:{{storeInfo.business_start}}-{{storeInfo.business_end}}</div>
              </div>
            </div>
          </div>
          <div class="activity-info">
            <div class="store-follow">
              <image class="store-follow-bg" :src="$getDomain('/static/client/store/theme-three/follow-num.png')"></image>
              <span class="store-follow-text">{{storeInfo.follow}}人关注</span>
            </div>
            <div class="store-activity">
              <div v-for="(item,idx) in flashActivityList" :key="idx" @click="toActivity(item)" class="activity-item" >{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="section-item coupon-list">
          <div v-for="(coupon,idx) in couponList" :key="idx" @click="getCoupon(coupon,idx)" class="coupon-item">
            <div class="flex flex-vertical-c">
              <div class="coupon-item-l">
                <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
                <div class="sign">{{coupon.Coupon_UseType?'￥':'折'}}</div>
              </div>
              <div class="coupon-item-r">领取</div>
            </div>
          </div>
        </div>
        <div class="top-search flex flex-vertical-c">
          <div class="search-input flex flex-vertical-c">
            <layout-icon size="18" color="#ADADAD" type="iconsearch"></layout-icon>
            <div class="placeholder">请输入商品关键词</div>
          </div>
          <image class="top-vip" :src="$getDomain('/static/client/store/theme-three/vip.png')"></image>
        </div>
      </div>
      <div class="container" :style="{height:systemInfo.windowHeight-diyHeadHeight+'px'}">
        <scroll-view class="container-l" scroll-y>
          <div :class="{active:bizCateNavIndex===-2}" @click="setCateActuveIdx(-2,0)" class="cate-item">
            <div class="cate-underline"></div>
            <div class="cate-title">限时抢购</div>
          </div>
          <div :class="{active:bizCateNavIndex===-1}" @click="setCateActuveIdx(-1,0)" class="cate-item">
            <div class="cate-underline"></div>
            <div class="cate-title">秒杀</div>
          </div>

          <div :class="{active:bizCateNavIndex===idx}" :key="idx" @click="setCateActuveIdx(idx,0)" class="cate-item" v-for="(item,idx) in bizCateList">
            <div class="cate-underline"></div>
            <div class="cate-title">{{item.cate_name}}</div>
          </div>

        </scroll-view>
        <scroll-view class="container-r" scroll-y @scrolltoupper="bindScrollRightTop">
          <div class="goods-box" v-if="showMode==='goods'">
            <div class="cate-child-list">
              <div
                v-for="(item,cidx) in bizCateList[bizCateNavIndex].child"
                :key="cidx"
                @click="setCateActuveIdx(bizCateNavIndex,cidx)"
                :class="{active:bizCateChildNavIndex===cidx}"
                class="cate-item"
              >
                <div class="cate-title">{{item.cate_name}}</div>
              </div>
            </div>
            <div class="goods-list">
              <div :key="idx" class="goods-item" v-for="(goods,idx) in showList">
                <div :style="{backgroundImage:'url('+$getDomain(goods.ImgPath)+')'}" class="cover"></div>
                <div class="info">
                  <div class="title fz-13 c3"><wzw-live-tag :room_id="goods.room_id" :product-info="goods" />{{goods.Products_Name}}</div>
                  <div class="flex flex-vertical-c" style="margin: 20rpx 0">
                    <div class="price-num">已减{{goods.Products_PriceY-goods.Products_PriceX}}元</div>
                    <div class="c9 fz-12">已售{{goods.Products_Sales}}份</div>
                  </div>
                  <div class="flex flex-vertical-c flex-justify-between">
                    <div class="flex flex-vertical-c">
                      <span class="price-selling fz-12">￥</span><span class="price-selling fz-14">{{goods.Products_PriceX}}</span>
                      <div class="text-through price-market fz-12 m-l-6">￥{{goods.Products_PriceY}}</div>
                    </div>
                    <div @click.stop="$noop" class="action">
                      <div @click.stop="openAttrLayer(goods.Products_ID)" class="btn-open-attr m-r-10" v-if="goods.skujosn">
                        选规格
                        <div class="goods-num-tag" v-if="goods.num>0">{{goods.num}}</div>
                      </div>
                      <div @click="setActiveGoodsIdx(idx)" class="flex flex-vertical-c" v-else>
                        <block v-if="goods.num>0">
                          <layout-icon @click.stop="goodsNumMinus(goods)" color="#B2B1B1" size="20" type="iconicon-minus"></layout-icon>
                          <input :value="goods.num" @input="changeGoodsNum" class="input-num text-center fz-12" />
                        </block>
                        <layout-icon @click.stop="goodsNumPlus(goods)" color="#E64239" size="20" type="iconicon-plus"></layout-icon>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div class="spike-box" v-if="showMode==='spike'">
            <div class="spike-list">
              限时抢购
            </div>
          </div>
          <div class="kill-box" v-if="showMode==='kill'">
            <div class="kill-goods-list">
              秒杀
            </div>
          </div>
        </scroll-view>
      </div>
    </scroll-view>
    
    <div class="store-bottom-action">
      <div class="cart-box">
        <div class="cart-icon-box">
          <layout-icon type="iconicon-cart" size="22" color="#fff"></layout-icon>
          <div class="total-num">{{22}}</div>
        </div>
      </div>
      <div class="total-info flex flex-column flex-justify-c">
        <div class="color-white flex flex-vertical-b"><span class="fz-11">￥</span><span class="fz-16">150</span></div>
        <div class="c9 fz-10">已减30元</div>
      </div>
      <div class="go-btn">去结算</div>
    </div>

  </div>
</template>

<script>
import { componetMixin } from '@/mixins/BaseMixin'
import { checkIsExpire, error, hideLoading, modal, showLoading, toast } from '@/common/fun'
import { getAlbumList, getBizInfo, getBizSpikeList, getStoreList } from '@/api/store'
import { getBizProdCateList, getFlashsaleList, getProductList } from '@/api/product'
import { getCommitList, getCouponList } from '@/api/common'
import { checkIsLogin, getCountdownFunc, objTranslate } from '@/common/helper'
import { addFavourite, cancelFavourite, checkFavourite } from '@/api/customer'
import { Exception } from '@/common/Exception'
import LayoutPageTitle from '@/componets/layout-page-title/layout-page-title'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import WzwLiveTag from '@/componets/wzw-live-tag/wzw-live-tag'
var countdownInstance = null
var countdownInstanceByFlash = null
/**
 * 倒计时的模板
 * @type {{s: number, d: number, h: number, is_end: boolean, m: number}}
 */
const countdownTpml = {
  h: 0,
  s: 0,
  m: 0,
  d: 0,
  is_end: false,
  is_start: false
}
export default {
  name: 'store-theme-three',
  components: { WzwLiveTag, LayoutIcon, LayoutPageTitle },
  mixins: [componetMixin],
  props: {
    bid: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      // scrollTopHeight: 0,
      showMode: 'goods',
      commentModalPlaceholder: '请输入内容',
      anchorTop: 0,
      commentModalShow: false,
      bizCateList: [],
      bizCateNavIndex: 0,
      bizCateChildNavIndex: 0,
      scrollTopNum: 0,
      toViewIdx: '',
      headTabTop: 100,
      pageScrollTop: 0,
      headTabIndex: 0,
      isFavourite: false,
      headTabOpacity: 0,
      headTabSticky: false,
      storeInfo: {
        biz_logo: ''
      },
      storeGoodsTotal: 0,
      killList: [],
      flashActivityList: [],
      virtualGoodsLsit: [],
      virtualPaginate: {
        finish: false,
        load: false,
        page: 1,
        pageSize: 3,
        total: 0
      },
      commentItem: {},
      commentValue: '',
      comments: [],
      commentPaginate: {
        finish: false,
        load: false,
        page: 1,
        pageSize: 2,
        total: 0
      },
      couponClassName: '',
      couponList: [],
      storeList: [],
      photoList: [],
      storePhotoTotal: 0,
      spikeList: [],
      activeAttrIdx: 0,
      activeGoodsIdx: 0
    }
  },
  computed: {
    showList () {
      try {
        return this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList
      } catch (e) {
        return []
      }
    }
  },
  watch: {
    bid: {
      immediate: true,
      handler (nval) {
        if (nval) this._init_func()
      }
    }
  },
  methods: {
    bindScroll (e) {
      const { scrollTop } = e.detail
      this.pageScrollTop = scrollTop
      console.log(scrollTop, this.headTabTop)
      this.headTabOpacity = scrollTop >= this.headTabTop ? 1 : scrollTop / this.headTabTop
      this.headTabSticky = scrollTop >= this.headTabTop
    },
    bindScrollRightTop () {
      console.log('emit event bindScrollRightTop')
      this.headTabSticky = false
    },
    async _init_func () {
      try {
        showLoading('加载中')
        const storeInfoData = await getBizInfo({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error(e.msg || '商品信息失败')
        })
        this.storeInfo = storeInfoData[0]
        checkIsExpire(this.storeInfo.biz_expires)
        this.$emit('upStoreInfo', this.storeInfo)

        const base = { biz_ids: this.bid }

        // getProductList({ ...base, pageSize: 1 }).then(({ totalCount }) => {
        //   this.storeGoodsTotal = totalCount
        // }).catch((err) => { throw Error(err.msg) })

        const flashActivitys = await getBizSpikeList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error('获取限时抢购数据失败')
        })

        this.flashActivityList = flashActivitys.map(row => {
          // 句柄也加上
          return { ...row, countdown: { ...countdownTpml } }
        })
        // 启动限时抢购倒计时，牛逼啊霸哥
        countdownInstanceByFlash = setInterval(this.stampFuncByFlash, 1000)

        const killList = await getFlashsaleList({ biz_id: this.bid }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取秒杀列表失败')
        })

        this.killList = killList.map(row => {
          // 句柄也加上
          return { ...row, countdown: { ...countdownTpml } }
        })

        // 启动倒计时，牛逼啊霸哥
        countdownInstance = setInterval(this.stampFuncByKill, 1000)

        const bizCateList = await getBizProdCateList({ biz_id: this.bid, pageSize: 999 }, { onlyData: true }).catch((e) => {
          throw Error('获取商家自定义分类失败')
        })

        const bizCateListData = []
        for (var key in bizCateList) {
          var tempRow = objTranslate(bizCateList[key])
          // 每一行有个特殊的id,就是all
          tempRow.child = [{
            id: 'all',
            cate_img: '',
            cate_name: '全部',
            load: false,
            page: 1,
            // 没有二级，只能用一级啦
            filterObj: {
              biz_cate_id: bizCateList[key].id
            },
            pageSize: 10,
            total: 0,
            finish: false,
            productList: [] // 商品列表
          }]
          for (var ckey in bizCateList[key].child) {
            const crow = Object.assign({}, bizCateList[key].child[ckey], {
              load: false,
              // 可以精确到二级
              filterObj: {
                biz_cate_id: bizCateList[key].child[ckey].id
              },
              page: 1,
              pageSize: 10,
              total: 0,
              finish: false,
              productList: [] // 商品列表
            })
            tempRow.child.push(crow)
          }
          bizCateListData.push(tempRow)
        }

        this.bizCateList = bizCateListData
        console.log(bizCateListData)

        if (this.flashActivityList.length > 0) {
          this.changeCateIdx(-2, 0, true)
        } else if (this.killList.length > 0) {
          this.changeCateIdx(-1, 0, true)
        } else {
          this.changeCateIdx(0, 0, true)
        }

        // 不要赠送的优惠券
        const couponList = await getCouponList({
          biz_id: this.bid,
          front_show: 1,
          status: 3
        }, {
          noUid: 1
        }).then(res => {
          return [...res.data]
        }).catch((e) => {
          throw Error('获取优惠券失败')
        })
        this.$set(this, 'couponList', couponList)
        this.couponClassName = this.couponList.length > 2 ? 'iswrap' : 'isflex'
        console.log(this.couponList)

        if (checkIsLogin(0, 0)) {
          const { is_favourite = 0 } = await checkFavourite({ biz_id: this.bid }, { onlyData: true }).catch(() => {
          })
          this.isFavourite = is_favourite
        }

        this.$nextTick().then(() => {
          const query = uni.createSelectorQuery().in(this)
          query.select('#topBox').boundingClientRect(data => {
            const { windowWidth } = this.systemInfo
            const pixelRatio = windowWidth / 750
            console.log(windowWidth / 750)
            this.pixelRatio = pixelRatio

            // 以后不再怕顶部有rpx了
            this.diyHeadHeight = this.menuButtonInfo.bottom + 10 + 60 * pixelRatio
            console.log(this.diyHeadHeight, this.systemInfo.windowHeight, this.systemInfo.windowHeight - this.diyHeadHeight)

            this.headTabTop = data.height - this.diyHeadHeight
            console.log(this.headTabTop)
          })
          query.exec()
        })

        hideLoading()
      } catch (e) {
        console.log(e)
        hideLoading()
        modal(e.message)
      }
    },
    taggleFavorite () {
      if (!checkIsLogin(1, 1)) return
      this.isFavourite = !this.isFavourite
      const Action = this.isFavourite ? addFavourite : cancelFavourite
      Action({ biz_id: this.bid }).then(res => {
        toast(res.msg)
      }).catch((e) => {
        Exception.handle(e)
      })
    },
    setActiveGoodsIdx (idx) {
      this.activeGoodsIdx = idx
    },
    setActiveAttrIdx (idx) {
      this.activeAttrIdx = idx
    },
    // 商品是没有规格的，所以同意用noattr_xxx，加上商品id来标识attr_id.
    goodsNumMinus (goodsInfo) {
      const num = goodsInfo.num ? goodsInfo.num - 1 : 0
      this.$set(goodsInfo, 'num', num)
      this.$store.commit('delivery/MINUS_GOODS', {
        num: 1,
        product: { attr_id: 'noattr_' + goodsInfo.Products_ID }
      })
    },
    goodsNumPlus (goodsInfo) {
      const num = goodsInfo.num ? goodsInfo.num + 1 : 1
      this.$set(goodsInfo, 'num', num)

      // const attrInfoTmpl = {
      //   num: 0,
      //   attr_id: '', // 规格id
      //   attr_text: '',
      //   price: '', // 价格
      //   count: 0// 库存
      // }
      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        attr_id: 'noattr_' + goodsInfo.Products_ID,
        attr_text: '无规格',
        price: goodsInfo.Products_PriceX,
        count: goodsInfo.Products_Count
      }
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { ...goodsInfo, ...productInfo }
      })
    },
    changeGoodsNum (e) {
      let amount = parseInt(e.detail.value)
      const currentGoods = this.showList[this.activeGoodsIdx]
      if (currentGoods.num === amount) return
      if (amount < 0) {
        amount = currentGoods.num
        error('至少购买一件')
      }
      if (amount > currentGoods.count) {
        amount = currentGoods.count
        error('购买数量不能超过库存量')
      }

      this.$store.commit('delivery/SET_GOODS_NUM', {
        num: amount,
        product: { attr_id: 'noattr_' + currentGoods.Products_ID }
      })
    },
    toActivity (item) {
      this.$linkTo('/pagesA/active/FlashSaleByBiz?biz_id=' + this.bid + '&spike_id=' + item.id)
    },
    setCateActuveIdx (idx, cidx) {
      if (idx === this.bizCateNavIndex && cidx === this.bizCateChildNavIndex) return// 重复点击不要了
      this.bizCateNavIndex = idx
      this.bizCateChildNavIndex = cidx
      this.changeCateIdx(idx, cidx, true)
    },
    // async getCateGoodsList (idx, cidx) {
    //   // 牛逼啊
    //   this.changeCateIdx(idx, cidx, true)
    // },
    /**
     *
     * @param idx 父类id
     * @param cidx 子类id
     * @param more
     * @returns {Promise<void>}
     */
    async changeCateIdx (idx, cidx, more = false) {
      if (idx === -1) {
        this.bizCateNavIndex = idx
        this.bizCateChildNavIndex = 0
        this.showMode = 'kill'
        return
      }

      if (idx === -2) {
        this.bizCateNavIndex = idx
        this.bizCateChildNavIndex = 0
        this.showMode = 'spike'
        return
      }

      this.showMode = 'goods'

      if (!more) {
        if (idx === this.bizCateNavIndex && cidx === this.bizCateChildNavIndex) return// 重复点击不要了
        this.bizCateNavIndex = idx
        this.bizCateChildNavIndex = cidx
      }

      console.log(this.bizCateList[idx].child[cidx])

      if (this.bizCateList[idx].child[cidx].finish) return // 到底了
      const base = { biz_ids: this.bid }
      const ext = { ...this.bizCateList[idx].child[cidx].filterObj } // biz_cate_id: biz_cate.id,

      try {
        const biz_cate = this.bizCateList[idx].child[cidx]
        this.bizCateList[idx].child[cidx].load = true
        const { data: newList, totalCount } = await getProductList({
          ...base,
          ...ext,

          page: biz_cate.page,
          pageSize: biz_cate.pageSize
        }).catch(err => { throw Error(err.msg) })

        this.bizCateList[idx].child[cidx].page++
        this.bizCateList[idx].child[cidx].productList = biz_cate.productList.concat(newList)

        this.bizCateList[idx].child[cidx].finish = this.bizCateList[idx].child[cidx].productList.length >= totalCount
        console.log(this.bizCateList)
        console.log(this.showList)
      } catch (e) {
        Exception.handle(e)
      } finally {
        this.bizCateList[idx].child[cidx].load = false
      }
    },
    stampFuncByKill () {
      for (var idx in this.killList) {
        const data = getCountdownFunc({
          start_timeStamp: this.killList[idx].start_time,
          end_timeStamp: this.killList[idx].end_time,
          getDay: false
        })
        if (data) {
          this.$set(this.killList[idx], 'countdown', { ...data })
        }
      }
    },
    stampFuncByFlash () {
      for (var idx in this.flashActivityList) {
        const data = getCountdownFunc({
          start_timeStamp: this.flashActivityList[idx].start_time,
          end_timeStamp: this.flashActivityList[idx].end_time
        })

        if (data) {
          this.$set(this.flashActivityList[idx], 'countdown', { ...data })
        }
      }
    }
  },
  onReady () {

  }
}
</script>
<style lang="scss" scoped>
.page-wrap{

}
.store-bottom-action{
  position: fixed;
  display: flex;
  background: #262626;
  height: 96rpx;
  width: 750rpx;
  bottom:0;
  left: 0;
  z-index: 6;
  .cart-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 96rpx;
    border-right:  1px solid #656565;
    .cart-icon-box{
      position: relative;
     .total-num{
       position: absolute;
       right: 0;
       top: 0;
       transform: translate(50%,-50%);
       height:34rpx;
       background:#E64239;
       color: #fff;
       border-radius:17rpx;
       font-size: 20rpx;
       padding: 0 7rpx;
       text-align: center;
       line-height: 34rpx;
     }
    }
  }
  .total-info{
    flex: 1;
    padding-left: 58rpx;
  }
  .go-btn{
    height: 96rpx;
    width:180rpx;
    text-align: center;
    line-height: 96rpx;
    color: #fff;
    background: #E64239;
    font-size: 32rpx;
  }
}
.store-comp-wrap{
  position: absolute;
  width: 750rpx;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1;
  overflow-x: hidden;
  background: #fff;

  .container-l{
    position: absolute;
    height: 100%;
    left: 0;
    top: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 160rpx;
    background: #f6f6f6;
    .cate-item{
      width:160rpx;
      height:97rpx;
      position: relative;
      .cate-title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 26rpx;
        margin: 0 30rpx;
        width: 100rpx;
        height:97rpx;
        line-height: 97rpx;
        text-align: center;
      }
      .cate-underline{
        width:5rpx;
        height:50rpx;
        background: #E64239;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        visibility: hidden;
      }
      &.active{
        color: #E64239;
        background: #fff;
        .cate-underline{
          visibility: visible;
        }
      }
    }
  }
  .container-r{
    width: 550rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    position: absolute;
    height: 100%;
    right: 0;
    top: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    
  }
  .goods-box{
    .cate-child-list{
      overflow-y: hidden;
      overflow-x: scroll;
      width: 550rpx;
      margin-bottom: 30rpx;
      white-space: nowrap;
      .cate-item{
        display: inline-block;
        margin-right: 15rpx;
        padding: 12rpx 22rpx;
        height:50rpx;
        box-sizing: border-box;
        background: #F7F8F8;
        border-radius:6rpx;
        color: #666666;
        font-size: 24rpx;
        &.active{
          color: #444;
          background:#FFE9E8;
        }
      }
    }
    .goods-list{
      .goods-item{
        display: flex;
        align-items: center;
        margin: 30rpx 0;
        .cover{
          width: 170rpx;
          height: 170rpx;
          @include cover-img();
        }
        .info{
          width: 360rpx;
          overflow-x: hidden;
          padding-left: 20rpx;
          .title{
            line-height: 16px;
            height: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price-num{
            background: #FFF4F4;
            font-size: 22rpx;
            color: #E64239;
            font-weight: 500;
            margin-right: 18rpx;
            padding: 10rpx 18rpx;
          }
          .input-num{
            width: 32px;
          }
        }
      }
    }
  }
}

.container{
  position: relative;
  left: 0;
  top: 0;
  width: 750rpx;
  z-index: 4;
}

.top-box{
  .top-box-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 750rpx;
    height: 230rpx;
  }
  .store-info{
    position: relative;
    z-index: 5;
    width:710rpx;
    margin: 0 20rpx;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 14rpx 0px rgba(0, 0, 0, 0.25);
    border-radius:10px;
    box-sizing: border-box;
    padding: 30rpx 20rpx;

    .store-info-logo{
      width:105rpx;
      height:105rpx;
      border-radius:6rpx;
      @include cover-img();
    }
    .store-info-more{
      width: 545rpx;
      padding: 0 20rpx;
      .store-info-row{
        display: flex;
      }
    }
    .activity-info{
      display: flex;
      margin-top: 25rpx;
      .store-activity{
        margin-left: 20rpx;
        width: 300rpx;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        .activity-item{
          display: inline-block;
          font-size:20rpx;
          color: #E64239;
          line-height: 20rpx;
          text-align: center;
          padding: 8rpx 10rpx;
          height:20rpx;
          border:1px solid rgba(230,66,57,1);
          border-radius:6rpx;
        }
      }
      .store-follow{
        width:162rpx;
        height:42rpx;
        position: relative;
        .store-follow-bg{
          width:162rpx;
          height:42rpx;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
        }
        .store-follow-text{
          z-index: 3;
          width:162rpx;
          height:42rpx;
          position: absolute;
          left: 0;
          top: 0;
          text-align: center;
          line-height: 42rpx;
          color: #fff;
          font-size: 22rpx;
        }
      }
    }
  }

  .top-search{
    padding: 0 20rpx;
    .search-input{
      width:540rpx;
      height:60rpx;
      background:#f2f2f2;
      border-radius:10rpx;
      padding-left: 32rpx;
      box-sizing: border-box;
      .placeholder{
        color: #ADADAD;
        font-size: 12px;
        margin-left: 18rpx;
      }
    }
    .top-vip{
      width:150rpx;
      height:60rpx;
      opacity:0.9;
      border-radius:5rpx;
      margin-left: 20rpx;
    }
  }

}

.fixed-top-box{
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  width: 750rpx;
  z-index: 3;
  .fixed-top-search{
    padding: 0 20rpx;
  }
  .fixed-search-input{
    width:540rpx;
    height:60rpx;
    background:#f2f2f2;
    border-radius:10rpx;
    padding-left: 32rpx;
    box-sizing: border-box;
    .placeholder{
      color: #ADADAD;
      font-size: 12px;
      margin-left: 18rpx;
    }
  }
  .fixed-top-vip{
    width:150rpx;
    height:60rpx;
    opacity:0.9;
    border-radius:5rpx;
    margin-left: 20rpx;
  }
}

.coupon-list{
  margin:36rpx 0 30rpx 0;
  width: 750rpx;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  .coupon-item{
    position: relative;
    display: inline-block;
    margin-left: 20rpx;
    height: 40rpx;
    color: #fff;
    background-color: #E64239;

    align-items: center;
    &:last-child{
      margin-right: 20rpx;
    }

    .coupon-item-r{
      line-height: 40rpx;
      text-align: center;
      padding: 0 15rpx;
      font-size: 22rpx;
    }
    .coupon-item-l{
      display: flex;
      align-items: center;
      font-size: 22rpx;
      line-height: 40rpx;
      justify-content: center;
      padding: 0 15rpx;
      .sign{

      }
      .num{

      }
    }

  }
}
</style>
