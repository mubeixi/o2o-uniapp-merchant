<template>
  <div class="page-wrap"  @click="commonClick">

    <div class="store-info">
      <div class="base">
        <div class="logo"
		v-if="storeInfo.biz_logo"
             :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}"></div>
        <div class="title">{{storeInfo.biz_shop_name}}</div>
      </div>
      <div class="actions">
        <div class="action-item"
             @click="$openLocation(storeInfo.biz_lat_gd,storeInfo.biz_lon_gd,storeInfo.biz_shop_name,storeInfo.biz_address)">
          <layout-icon size="26" type="iconicon-address" color="#26C78D"></layout-icon>
        </div>
        <div class="action-item" @click.stop="$cellPhone(storeInfo.biz_mobile)">
          <layout-icon size="26" type="iconicon-phone" color="#26C78D"></layout-icon>
        </div>
        <div class="action-item" @click="taggleFavorite">
          <layout-icon size="26" type="iconicon-favorite" :color="isFavourite?'#26C78D':'#999'"></layout-icon>
        </div>
        <div class="action-item" @click="toShare">
          <layout-icon size="26" type="iconicon-timeline" color="#26C78D"></layout-icon>
        </div>
        <button open-type="share" class="action-item share-btn">
          <layout-icon size="26" type="iconicon-share" color="#26C78D"></layout-icon>
        </button>
        <!--        <image mode="widthFix" class="action-item" src="/static/store/address.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/phone.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/favorite.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/timeline.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/share.png"></image>-->
      </div>
    </div>
    <!--占位-->
    <div style="height:15px;border-top-right-radius: 15px;border-top-left-radius: 15px;background: white;"></div>
    <div class="head" :class="{isStickly:headTabSticky}" id="stickyTab">
      <ul class="tab-box sticky">
        <li @click="headTabIndex=0" class="tab-item" :class="{active:headTabIndex === 0}">首页<span
          v-if="headTabIndex === 0" class="underline"></span></li>
        <li @click="headTabIndex=1" class="tab-item" :class="{active:headTabIndex === 1}">介绍<span
          v-if="headTabIndex === 1" class="underline"></span></li>
        <li @click="headTabIndex=2" class="tab-item" :class="{active:headTabIndex === 2}">相册<span
          v-if="headTabIndex === 2" class="underline"></span></li>
        <li @click="headTabIndex=3" class="tab-item" :class="{active:headTabIndex === 3}">门店<span
          v-if="headTabIndex === 3" class="underline"></span></li>
        <li @click="headTabIndex=4" class="tab-item" :class="{active:headTabIndex === 4}">点评<span
          v-if="headTabIndex === 4" class="underline"></span></li>
      </ul>
    </div>
    <!--  占位-->
    <!--    <div class="h50 bg-white" v-if="headTabSticky"></div>-->

    <swiper
      :current="headTabIndex"
      @change="indexChangeEvent"
      class="tab-container"
      :style="{height:childSwiperHeight}">
      <swiper-item class="tab-page">
        <div id="scrollView1" class="tab-page-wrap">

          <!--优惠券-->
          <div class="coupon-section flex flex-justify-c"  v-if="couponList.length>0">
            <div class="coupon-item" v-for="(coupon,idx) in couponList" :key="idx" @click="getCoupon(coupon,idx)">
              <div class="containier">
                <div class="price">
                  <div class="sign">{{coupon.Coupon_UseType?'￥':'折'}}</div>
                  <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
                </div>
                <div class="info">
                  <span class="condition">满{{coupon.Coupon_Condition}}元可使用</span>
                  <span class="use-end-item">有效期至{{coupon.Coupon_EndTime|formatTime('YYYY.mm.dd')}}</span>
                </div>
              </div>
            </div>
          </div>

          <!--限时抢购-->
          <div  class="activity-list  flex flex-justify-c"  v-if="activityList.length>0">
            <div class="activity-item" v-for="(item,idx) in activityList" :key="idx"
                 @click="$linkTo('/pages/active/FlashSaleByBiz?biz_id='+bid+'&spike_id='+item.id)">{{item.name}}
            </div>
          </div>

          <!--便捷操作-->
          <div class="feature-list">
            <image @click="$linkTo('/pages/delivery/desktop?bid='+bid)" mode="scaleToFill" class="feature-item"
                   :src="'/static/client/store/send.png'|domain"></image>
            <image @click="toOffinePay" mode="scaleToFill" class="feature-item" :src="'/static/client/store/pay.png'|domain"></image>
            <image @click="$linkTo('/pages/product/apply?bid='+bid)" mode="scaleToFill" class="feature-item"
                   :src="'/static/client/store/join.png'|domain"></image>
            <image @click="toVip" mode="scaleToFill" class="feature-item"
                   :src="'/static/client/store/member.png'|domain"></image>
          </div>

          <!--虚拟产品-->
          <div class="block coupon-goods-list" v-if="virtuaGoodsLsit.length>0">
            <div class="block-title">
              <div class="block-title-text">到店券</div>
              <div class="block-title-more flex flex-vertical-center c9 fz-12">
                <span>查看全部</span>
                <icon class="iconright" type="iconright" size="14" color="#999"></icon>
              </div>
            </div>
            <div class="block-content">
              <div class="goods-list">
                <div class="goods-item" v-for="(item,idx) in virtuaGoodsLsit" :key="idx" @click="$toGoodsDetail(item)">
                  <div class="left">
                    <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
                  </div>
                  <div class="right">
                    <h5 class="title"><span>{{item.Products_Name}}</span></h5>
                    <div class="flex flex-justify-between flex-vertical-center">
                      <div class="flex1">
                        <div class="tags" v-if="item.tags && item.tags.length>0">
                          <span class="tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</span>
                        </div>
                        <div class="price-box">
                          <div class="selling-price">
                            <span class="sign">￥</span><span class="num">{{item.Products_PriceX}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="action">
                        <!--<image class="img" :src="'/static/client/store/cart.png'|domain"></image>-->
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--产品专区-->
          <div class="block goods-box">
            <ul class="nav-list">
              <li class="nav-item" @click="goodsNavIndex=0" :class="{active:goodsNavIndex === 0}">推荐产品</li>
              <li class="nav-item" @click="goodsNavIndex=1" :class="{active:goodsNavIndex === 1}">产品分类</li>
              <li class="nav-item" @click="goodsNavIndex=2" :class="{active:goodsNavIndex === 2}">全部产品</li>
            </ul>
            <!-- style="height: 540rpx;overflow-y: hidden"      :style="{height:systemInfo.windowHeight+'px'}"       :style="{height:systemInfo.windowHeight+'px'}"-->
            <swiper
              style="height: 300px"
              @change="prodIndexChangeEvent"
              :current="goodsNavIndex">
              <swiper-item style="overflow-y: scroll">
                <div class="goods-list">
                  <div class="goods-item" @click="$toGoodsDetail(item)"
                       style="height: 220rpx;margin-bottom: 18rpx;" v-for="(item,idx) in recommends" :key="idx">
                    <image class="goods-item-cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></image>
                    <div class="goods-item-right">
                      <div class="title">{{item.Products_Name}}</div>
                      <div class="c8" style="line-height: 16px;max-height: 32px;overflow: hidden;">
                        {{item.Products_BriefDescription}}
                      </div>
                      <div class="flex flex-justify-between flex-vertical-c m-t-10">
                        <div class="selling-price">
                          <span class="sign">￥</span><span class="num">{{item.Products_PriceX}}</span>
                        </div>
                        <div class="btn">购买</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-vertical-c flex-justify-c look-more"  @click="$linkTo('/pages/search/result?biz_id='+bid)">
                  <span class="c9 fz-12">查看更多</span>
                  <layout-icon size="14" color="#999" type="iconicon-arrow-right"></layout-icon>
                </div>
              </swiper-item>
              <swiper-item class="tab-page" style="overflow-y: scroll">
                <div style="width: 700rpx;background: #F7F7F7;box-sizing: border-box;"
                     class="p-t-20 p-l-15 p-b-20 p-r-15">
                  <block v-for="(row,idx1) in bizCateList" :key="idx1">
                    <div class="row p-b-15" v-if="row.child">
                      <div class="fz-14 c3 ">{{row.cate_name}}</div>
                      <span class="column fz-12 c6 p-9 m-r-10 m-t-10" style="background: #FFFFFF;display: inline-block;"
                            v-for="(column,idx2) in row.child" :key="idx2">{{column.cate_name}}</span>
                    </div>
                  </block>
                </div>
              </swiper-item>
              <swiper-item class="tab-page" style="overflow-y: scroll">
                <div class="flex" style="flex-wrap: wrap;width: 710rpx;">
                  <div
                    style="width: 345rpx;border-radius: 8rpx;overflow: hidden;height: 450rpx;margin-bottom: 20rpx;"
                    @click="$toGoodsDetail(item)"
                    v-for="(item,idx) in goodsList" :style="{marginRight:idx%2===0?'20rpx':'0rpx'}"
                    :key="idx">
                    <div class="img-cover" style="width: 345rpx;height: 345rpx"
                         :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
                    <div class="c3 fz-13" style="line-height: 36rpx;height: 72rpx;">{{item.Products_Name}}</div>
                    <div class="flex flex-vertical-c" style="height: 32rpx;">
                      <div class="price-selling"><span class="fz-10">￥</span><span class="fz-12">{{item.Products_PriceX}}</span>
                      </div>
                      <div class="p-l-10 text-through price-market"><span class="fz-10">￥</span><span class="fz-12">{{item.Products_PriceY}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-vertical-c flex-justify-c look-more"  @click="$linkTo('/pages/search/result?biz_id='+bid)">
                  <span class="c9 fz-12">查看更多</span>
                  <layout-icon size="14" color="#999" type="iconicon-arrow-right"></layout-icon>
                </div>
              </swiper-item>
            </swiper>

          </div>

          <!--评论列表-->
          <div class="block comment-box" v-if="comments.length>0">

            <div class="block-title">
              <div class="block-title-text">留言评论</div>
              <div class="block-title-more flex flex-vertical-center c9 fz-12" @click="headTabIndex=4">
                <span>查看全部</span>
                <icon class="iconright" type="iconright" size="14" color="#999"></icon>
              </div>
            </div>
            <div class="block-content">
              <div class="comment-list">
                <div v-for="(item,idx) in comments" :key="idx">
                  <layout-comment :isLast="comments.length-1===idx" :comment="item" @comment="clickComment"></layout-comment>
                  <div class="comment-send" v-if="item.child.length>0">
                    <block v-for="(com,ind) of item.child" :key="ind">
                      <block v-for="(co,indx) of com" :key="indx">
                        <div class="fz-12 c3 comment-send-item" @click.stop="clickCommentSend(item,co.groupid,co.userid)">
                          <block v-if="co.touserid==item.User_ID">
                            <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                          </block>
                          <block v-else>
                            <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span
                            class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                          </block>
                        </div>
                      </block>

                    </block>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!--发布评论-->
          <!--          <view class="commtent-add section">-->
          <!--            <textarea class="textarea" @blur="bindTextAreaBlur" auto-height placeholder="发表你的评论..." />-->
          <!--          </view>-->

          <layout-copyright></layout-copyright>

        </div>
      </swiper-item>
      <swiper-item class="tab-page">
        <div id="scrollView2" class="tab-page-wrap p-t-15">
          <div class="p-10">地址:<span class="p-l-10">{{storeInfo.biz_address}}</span></div>
          <div class="hr h15"></div>
          <div class="p-10">电话:<span class="p-l-10">{{storeInfo.biz_mobile}}</span></div>
          <div class="hr h15"></div>
          <div class="p-10">简介:<span class="p-l-10 fz-14 c6">{{storeInfo.intro}}</span></div>
        </div>
      </swiper-item>
      <swiper-item class="tab-page">
        <div id="scrollView3" class="tab-page-wrap">

          <!--只显示有照片的相册 v-if="imgs.photo && imgs.photo.length>0"-->
          <div class="photo-section" v-for="(imgs,idx1) in photoList" :key="idx1">
            <div class="php-section-title m-b-10 flex flex-vertical-c">
              <div class="label"></div>
              <div class="text flex1 c3">{{imgs.cate_name}}</div>
              <div class="flex flex-vertical-c" @click="$linkTo('/pagesA/store/photo?bid='+bid+'&tab='+idx1)">
                <span class="c9 fz-12">查看更多</span>
                <layout-icon size="14" color="#999" type="iconicon-arrow-right"></layout-icon>
              </div>
            </div>
            <div class="photo-list">
              <div class="photo-item" @click="priviewFn(imgs,idx2)" v-for="(img,idx2) in imgs.photo" :key="idx2"
                   :style="{backgroundImage:'url('+img.photo_img+')'}"></div>
            </div>
          </div>

        </div>
      </swiper-item>
      <swiper-item class="tab-page">
        <div id="scrollView4" class="tab-page-wrap">
          <div class="over store-section">
            <div class="store-list">
              <div class="flex flex-justify-between">
                <div class="store-list-top fz-15" style="color: #333333;font-weight: bold">
                  <span class="block-div"></span>
                  门店列表
                </div>
                <div class="store-list-top">
                  {{storeList.length}}家
                </div>
              </div>
              <div class="store-list-item" v-for="(st,ind) of storeList" :key="ind">
                <div class="store-list-title" @click.stop="goStore(st.biz_id)">
                  {{st.store_name}}
                </div>
                <div class="flex flex-justify-between store-list-address">
                  <div class="store-list-font" @click="$openLocation(st.store_lat,st.store_lon,st.store_name)">
                    {{st.area_address}}
                  </div>
                  <div class="flex flex-vertical-center">
                    <layout-icon type="iconicon-address" size="17" color="#26C78D"
                                 @click="$openLocation(st.store_lat,st.store_lon,st.store_name)"></layout-icon>
                    <span class="store-su"></span>
                    <layout-icon type="iconicon-phone" size="17" color="#26C78D"
                                 @click.stop="$cellPhone(st.store_mobile)"></layout-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item class="tab-page">
        <div id="scrollView5" class="tab-page-wrap comment-section">
          <!--评论列表-->

          <div class="block-content">
            <div class="comment-list" v-if="comments.length>0">
              <div v-for="(item,idx) in comments" :key="idx" class="comment-item">
                <layout-comment :isLast="comments.length-1===idx" :comment="item"
                                @comment="clickComment"></layout-comment>
                <div class="comment-send" v-if="item.child.length>0">
                  <block v-for="(com,ind) of item.child" :key="ind">
                    <block v-for="(co,indx) of com" :key="indx">
                      <div class="fz-12 c3 comment-send-item" @click.stop="clickCommentSend(item,co.groupid,co.userid)">
                        <block v-if="co.touserid==item.User_ID">
                          <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                        </block>
                        <block v-else>
                          <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span
                          class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                        </block>
                      </div>
                    </block>

                  </block>
                </div>
              </div>

            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>

    <layout-modal ref="commentModal">
      <div class="refuseApplyModal">
        <textarea class="reason" @input="bingReasonInput" :value="commentValue" placeholder-style="color:#999" placeholder="请输入评价" auto-height />
        <div class="control">
          <div @click="cancelComent" class="action-btn btn-cancel">取消</div>
          <div @click="sureComment" class="btn-sub action-btn">确定</div>
        </div>

      </div>
    </layout-modal>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getBizInfo, getBizSpikeList, getAlbumList, getStoreList } from '@/api/store'
import { error, hideLoading, modal, showLoading, toast } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { getBizProdCateList, getProductList } from '@/api/product'
import { getCommitList, getCouponList } from '@/api/common'
import LayoutComment from '@/componets/layout-comment/layout-comment'
import LayoutCopyright from '@/componets/layout-copyright/layout-copyright'
import { buildSharePath, checkIsLogin, getArrColumn } from '@/common/helper'
import LayoutModal from '@/componets/layout-modal/layout-modal'
import { addFavourite, cancelFavourite, checkFavourite, commentReply, getUserCoupon } from '@/api/customer'
import { Exception } from '@/common/Exception'

export default {
  name: 'StoreIndex',
  components: {
    LayoutModal,
    LayoutCopyright,
    LayoutComment,
    LayoutIcon
  },
  mixins: [BaseMixin],
  computed: {},
  data () {
    return {
      commentValue: '',
      childSwiperHeight: 'auto',
      isFavourite: false,
      bid: null,
      scrollHeightS: [0, 0, 0, 0],
      storeList: [],
      storeInfo: {},
      couponList: [],
      activityList: [],
      comments: [],
      goodsNavIndex: 0,
      recommends: [],
      bizCateList: [],
      virtuaGoodsLsit: [],
      goodsList: [],
      slide: {
        imgs: [
          'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003221654033886.png',
          'https://qingclouds-server.oss-cn-shanghai.aliyuncs.com/695d1d409a77d695/ffd56752966467a7.jpg',
          'https://qingclouds-server.oss-cn-shanghai.aliyuncs.com/db51fa901ed2c3b9/5514f2e17bbaf475.jpg']
      },
      headTabIndex: 0,
      navs: [
        {
          title: '限时抢',
          name: 'iconxianshi',
          size: 44,
          color: '#26C78D'
        },
        {
          title: '1小时达',
          name: 'iconqiandao',
          size: 44,
          color: '#ae48c7'
        },
        {
          title: '享免单',
          name: 'iconsong',
          size: 44,
          color: '#3345c7'
        },
        {
          title: '分享赚',
          name: 'iconmiandan',
          size: 44,
          color: '#3bc734'
        },
        {
          title: '签到',
          name: 'iconfenxiang1',
          size: 44,
          color: '#c7596c'
        }
      ],
      photoList: [],
      pageScrollTop: 0,
      headTabTop: 0,
      chidScrollTop: 0,
      headTabSticky: false,
      scrollList: [
        {
          scrollTop: 0,
          name: '首页'
        },
        {
          scrollTop: 0,
          name: '介绍'
        },
        {
          scrollTop: 0,
          name: '相册'
        },
        {
          scrollTop: 0,
          name: '门店'
        },
        {
          scrollTop: 0,
          name: '点评'
        }
      ]
    }
  },
  methods: {
    toShare () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo(`/pagesA/store/shareQrcode?biz_id=${this.bid}`)
      }
    },
    toVip () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo('/pagesA/user/VipList?bid=' + this.bid)
      }
    },
    toOffinePay () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo(`/pagesA/store/offlinePay?biz_id=${this.bid}`)
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
    bingReasonInput (e) {
      this.commentValue = e.detail.value
    },
    cancelComent () {
      this.commentValue = ''
      this.$closePop('commentModal')
    },
    async sureComment () {
      if (!this.commentValue) {
        error('评论内容不能为空')
        return
      }
      const data = {
        touserid: this.commentItem.User_ID,
        commit_id: this.commentItem.Item_ID,
        content: this.commentValue
      }
      if (this.commentItem.groupid) {
        data.groupid = this.commentItem.groupid
      }
       commentReply(data).then(res => {
        toast('评论成功')
        this.commentValue = ''
        getCommitList({
          biz_id: this.bid,
          pageSize: 3
        }, { onlyData: true }).then(res=>{
			this.comments=res
		}).catch((e) => {
         error(e.msg||'获取评论数据失败')
        })
        this.$closePop('commentModal')
      }).catch(e => {
        error(e.msg || '评论失败')
        this.$closePop('commentModal')
      })
    },
    getCoupon (coupon, idx) {
      console.log(coupon)
      getUserCoupon({ coupon_id: coupon.Coupon_ID }).then(() => {
        toast('领取成功')
        this.couponList.splice(idx, 1)
      }).catch((err) => {
        error(err.msg)
      })
    },
    clickComment (item) {
      if (!checkIsLogin(1, 1)) return
      this.commentItem = item
      this.$refs.commentModal.show()
      this.commentItem.groupid = ''
    },
    clickCommentSend (item, goupId, userId) {
      if (!checkIsLogin(1, 1)) return
      this.commentItem = item
      this.commentItem.groupid = goupId
      this.commentItem.User_ID = userId
      this.$refs.commentModal.show()
    },
    toActivity (item) {

    },
    priviewFn (imgs, current) {
      const urls = getArrColumn(imgs.photo, 'photo_img')
      uni.previewImage({
        urls,
        current
      })
    },
    testFun (e) {
      console.log(e)
    },
    bindChildScroll (e) {
      console.log(e.detail)
      this.chidScrollTop = e.detail.scrollTop
    },
    bindTextAreaBlur (e) {
      const { value } = e.detail
      console.log(value)
    },
    prodIndexChangeEvent (event) {
      const { current } = event.detail
      this.goodsNavIndex = current
    },
    indexChangeEvent (event) {
      const { current } = event.detail
      this.headTabIndex = current
      this.upSwiperHeight()
    },
    async _init_func () {
      try {
        showLoading('加载中')
        const storeInfoData = await getBizInfo({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error(e.msg || '商品信息失败')
        })
        this.storeInfo = storeInfoData[0]

        const base = { biz_ids: this.bid }
        this.recommends = await getProductList({
          pageSize: 2,
          Is_Recommend: 1,
          ...base
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })

        this.goodsList = await getProductList({ pageSize: 2, ...base }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })
        // 虚拟商品
        this.virtuaGoodsLsit = await getProductList({
          pageSize: 3,
          prod_order_type: 1,
          ...base
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取虚拟商品列表错误')
        })

        this.bizCateList = await getBizProdCateList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error('获取商家自定义分类失败')
        })

        // 不要赠送的优惠券
        this.couponList = await getCouponList({ biz_id: this.bid, front_show: 1 }, { onlyData: true, noUid: 1 }).catch((e) => {
          throw Error('获取优惠券失败')
        })

        this.comments = await getCommitList({
          biz_id: this.bid,
          pageSize: 3
        }, { onlyData: true }).catch((e) => {
          throw Error('获取评论数据失败')
        })

        this.storeList = await getStoreList({
          biz_id: this.bid,
          pageSize: 999
        }, { onlyData: true }).catch((e) => {
          throw Error('获取门店列表数据失败')
        })

        this.photoList = await getAlbumList({
          biz_id: this.bid,
          get_photo: 4
        }, { onlyData: 1 }).catch(e => {
          throw Error(e.msg || '获取相册信息失败')
        })

        this.activityList = await getBizSpikeList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error('获取限时抢购数据失败')
        })

        if (checkIsLogin(0, 0)) {
          const { is_favourite = 0 } = await checkFavourite({ biz_id: this.bid }, { onlyData: true }).catch(() => {
          })
          this.isFavourite = is_favourite
        }

        this.$nextTick().then(() => {
          const query = uni.createSelectorQuery()
          query.select('#scrollView1').boundingClientRect(data => {
            console.log(data)
            this.scrollHeightS[0] = data.height
            this.headTabIndex === 0 && this.upSwiperHeight()
          })
          query.select('#scrollView2').boundingClientRect(data => {
            this.scrollHeightS[1] = data.height
            this.headTabIndex === 1 && this.upSwiperHeight()
          })
          query.select('#scrollView3').boundingClientRect(data => {
            this.scrollHeightS[2] = data.height
            this.headTabIndex === 2 && this.upSwiperHeight()
          })
          query.select('#scrollView4').boundingClientRect(data => {
            this.scrollHeightS[3] = data.height
            this.headTabIndex === 3 && this.upSwiperHeight()
          })
          query.select('#scrollView5').boundingClientRect(data => {
            this.scrollHeightS[4] = data.height
            this.headTabIndex === 4 && this.upSwiperHeight()
          })
          query.exec()
        })
        hideLoading()
      } catch (e) {
        hideLoading()
        modal(e.message)
      }
    },
    upSwiperHeight () {
      try {
        const num = this.scrollHeightS[this.headTabIndex]
        if (num < 1 || num < this.systemInfo.windowHeight) throw Error('高度无效或者低于屏幕，直接设置为屏幕高度好了')
        this.childSwiperHeight = num + 'px'
      } catch (e) {
        if (this.systemInfo.windowHeight) this.childSwiperHeight = this.systemInfo.windowHeight + 'px'
      }
    }
  },

  onPageScroll (e) {
    const { scrollTop } = e
    this.pageScrollTop = scrollTop
    this.headTabSticky = scrollTop > this.headTabTop
  },
  onShow () {

  },
  mounted () {

  },
  onLoad (options) {
    if (!options.biz_id) {
      modal('店铺id缺失')
      return
    }
    this.bid = options.biz_id
    this._init_func()
  },
  created () {

  },
  // 自定义小程序分享
  onShareAppMessage () {
    const path = '/pages/store/index?biz_id=' + this.bid
    const shareObj = {
      title: this.storeInfo.biz_shop_name,
      desc: this.storeInfo.intro,
      imageUrl: this.storeInfo.biz_logo,
      path: buildSharePath(path)
    }
    return shareObj
  },
  onReady () {
    const query = uni.createSelectorQuery()
    query.select('#stickyTab').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      this.headTabTop = res[0].top
    })
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    background: #f2f2f2;
  }

  .refuseApplyModal {
    width: 560rpx;
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;

    .reason {
      font-size: 14px;
      min-height: 200px;
      border: 1px solid #E3E3E3;
      line-height: 1.4;
      height: auto;
      width: auto;
      padding: 10px;
    }

    .control {
      margin-top: 15px;
      display: flex;
      justify-content: center;

      .action-btn {
        width: 70px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        text-align: center;
        color: #666;
        background: #e9e9e9;

        &.btn-sub {
          background: #f43131;
          color: white;
          margin-left: 10px;
        }
      }
    }
  }

  .comment-send {
    width: 700rpx;
    box-sizing: border-box;
    padding: 30rpx 20rpx;
    background-color: #F6F6F6;
    border-radius: 6rpx;
    margin-top: 10px;

    &-item {
      width: 600rpx;
      line-height: 40rpx;
    }
  }

  .comment-section {

    padding: 30rpx 25rpx;
    box-sizing: border-box;
    background: white;

  }
  .color-comment {
    color: #476DB9;
  }

  .comment-item {
    border-bottom: 1px solid #E8E8E8;
    padding-bottom: 30rpx;
  }

  .block-title {
    padding: 20px 0;

    .block-title-text {
      font-weight: bold;
    }
  }

  .comment-list {

  }

  .commtent-add {
    margin: 50rpx 25rpx;
    background: #F7F7F7;
    min-height: 150rpx;
    padding: 20rpx;

    .textarea {
      font-size: 14px;
      line-height: 1.4;

      &::placeholder {
        color: #999;
      }
    }
  }
  .store-section {

    .store-su {
      width: 1px;
      height: 34rpx;
      background-color: #EBEBEB;
      margin: 0px 24rpx;
      display: inline-block;
    }

    .store-base-info {
      width: 750rpx;
      box-sizing: border-box;
      padding: 52rpx 20rpx 20rpx 30rpx;
    }

    .store-info-title {
      width: 540rpx;
      height: 30rpx;
      overflow: hidden;
      line-height: 30rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 30rpx;
      margin-bottom: 24rpx;
    }

    .store-info-call {
      height: 28rpx;
      line-height: 28rpx;
      display: flex;
      font-size: 13px;
      color: #999999;
    }

    .store-list {
      width: 710rpx;
      margin: 0 auto;
      padding-top: 30rpx;
      padding-bottom: 10rpx;
    }

    .store-list-top {
      height: 32rpx;
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #999999;
    }

    .block-div {
      background-color: #26C78D;
      width: 8rpx;
      height: 32rpx;
      margin-right: 16rpx;
      display: inline-block;
    }

    .store-list-item {
      width: 710rpx;
      padding: 30rpx 24rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #EBEBEB;
    }

    .store-list-title {
      width: 600rpx;
      height: 28px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 10rpx;
    }

    .isStickly {
      border-bottom: 1px solid #eee;
    }

    .store-list-address {
      width: 100%;
      box-sizing: border-box;
      padding-left: 2rpx;
      height: 34rpx;
      line-height: 34rpx;
      align-items: center;
    }

    .store-list-font {
      color: #999999;
      font-size: 12px;
      height: 12px;
      line-height: 12px;
    }
  }

  .coupon-section {
    width: 750rpx;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    height: 123rpx;
    margin-bottom: 20rpx;
    background: white;

    .coupon-item {
      display: inline-block;
      vertical-align: top;
      width: 363rpx;
      height: 123rpx;
      margin-left: 30rpx;
      background: #fff;
      color: #fff;
      background-image: url("/assets/img/coupon.jpg");
      @include cover-img();

      .containier {
        vertical-align: top;
        width: 248rpx;
        padding-left: 10rpx;
        height: 123rpx;
        overflow: hidden;
        display: flex;
        align-items: center;

        .price {
          height: 46rpx;
          display: flex;
          align-items: flex-end;

          .sign {
            font-size: 24rpx;
          }

          .num {
            font-size: 40rpx;
          }
        }

        .info {
          font-size: 10px;
          padding-left: 4px;

          .condition {
            margin-bottom: 10rpx;
            display: block;
          }

          .use-end-item {

          }
        }
      }
    }
  }

  .activity {
    &-list {
      overflow-y: hidden;
      overflow-x: scroll;
      width: 750rpx;
      box-sizing: border-box;
      padding: 0 20rpx 10rpx 20rpx;
      white-space: nowrap;
    }

    &-item {
      display: inline-block;
      margin-right: 6px;
      padding: 4px;
      border-radius: 4px;
      font-size: 10px;
      color: $fun-red-color;
      border: 1px solid #FF9090;

    }
  }

  .feature {
    &-list {
      display: flex;
      padding: 30rpx 0;
      justify-content: center;
    }

    &-item {
      margin-right: 14rpx;
      width: 165rpx;
      height: 144rpx;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .store-info {
    .actions {
      width: 750rpx;
      box-sizing: border-box;
      padding: 30rpx 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .action-item {
        flex: 1;
        text-align: center;
        /*width: 40rpx;*/
        /*height: auto;*/
        //padding: 0 40rpx;
        &.share-btn {
          background: none;

          &::after {
            border: none;
          }
        }
      }
    }

    .base {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 30rpx;

      .logo {
        width: 74rpx;
        height: 74rpx;
        background: #f2f2f2;
        @include cover-img();
        /*border-radius: 50%;*/
        /*overflow: hidden;*/
      }

      .title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
        margin-left: 20rpx;
      }
    }
  }

  .tab-container {
    background: #fff;

    .tab-page-wrap {

      width: 750rpx;
    }

  }

  .photo-section {
    margin: 10rpx 10rpx 40rpx;

    .php-section-title {
      .label {
        width: 6rpx;
        height: 30rpx;
        background: #26C78D;
        margin-right: 8px;
      }

      .text {
        font-size: 15px;
        font-weight: bold;
      }
    }

    .photo-list {
      display: flex;
      flex-wrap: wrap;
    }

    .photo-item {
      width: 350rpx;
      height: 350rpx;
      margin-bottom: 10rpx;
      margin-right: 10rpx;
      @include cover-img();

      &:nth-child(even) {
        margin-right: 0;
      }
    }
  }

  .coupon-goods-list {
    padding: 0 25rpx;
    background: white;

    .block-title {
      padding: 20px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .goods-list {
      .goods-item {
        width: 700rpx;
        padding: 0 0 10rpx;
        margin-bottom: 20rpx;
        font-size: 14px;
        /*border-bottom: 1px dashed #eee;*/
        display: flex;

        &:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }

        .left {
          .cover {
            width: 160rpx;
            height: 160rpx;
            @include cover-img()
          }

        }

        .right {
          margin-left: 25rpx;
          font-size: 12px;

          .title {
            font-size: 14px;
            margin-bottom: 10px;
            color: #333;
            line-height: 20px;
            height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;

          }

          .price-box {
            display: flex;
            margin-bottom: 6px;

            .selling-price {
              color: $fun-red-color;

              .num {
                font-size: 14px;
              }
            }

            .market-price {
              display: flex;
              align-items: flex-end;
              text-decoration: line-through;
              color: #999;
            }
          }

          .sale-count {
            margin-bottom: 6px;
            color: #999;
          }

          .tags {
            margin-bottom: 6px;

            .tag {
              display: inline-block;
              margin-right: 4px;
              border-radius: 4px;
              text-align: center;
              background: #fff;
              color: $fun-red-color;
              padding: 0 4px;
              font-size: 10px;
              height: 16px;
              line-height: 16px;
              border: 1px solid #FF9090;
            }
          }

          .action {
            display: flex;
            justify-content: center;

            .img {
              width: 57rpx;
              height: 57rpx;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }

  .goods-box {
    padding: 40rpx 25rpx;
    background: white;

    .nav-list {
      padding-bottom: 40rpx;
      color: #666666;
      display: flex;
      justify-content: center;
      align-items: center;

      .nav-item {
        font-weight: bold;
        padding: 0;
        margin-right: 40rpx;
        height: 32px;
        line-height: 32px;
        display: inline-block;
        color: #333;

        &.active {
          color: $fun-green-color;
          border-bottom: 2px solid $fun-green-color;
        }
      }
    }

    .block-title {
      padding: 25px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .goods-list {

      .goods-item {
        display: flex;

        &:last-child {
          margin-bottom: 0;
        }

        .goods-item-cover {
          width: 220rpx;
          height: 220rpx;
          background-color: red;
          @include cover-img();
        }

        .goods-item-right {
          width: 480rpx;
          padding-left: 30rpx;
          box-sizing: border-box;
          overflow: hidden;
          font-size: 12px;

          .title {
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: bold;
            color: #333;
            line-height: 20px;
            max-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .desc {
            color: #888;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .selling-price {
            color: $fun-red-color;

            .num {
              font-size: 14px;
            }
          }

          .btn {
            background: $fun-red-color;
            color: #fff;
            width: 102rpx;
            height: 48rpx;
            line-height: 48rpx;
            text-align: center;
            border-radius: 24rpx;
          }
        }
      }
    }
  }

  .comment-box {
    border-top: 30rpx solid #f2f2f2;
    border-bottom: 30rpx solid #f2f2f2;
    padding: 0 25rpx;
    background: white;

    .block-title {
      padding: 20px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .comment-list {

    }
  }

  .commtent-add {
    margin: 50rpx 25rpx;
    background: #F7F7F7;
    min-height: 150rpx;
    padding: 20rpx;

    .textarea {
      font-size: 14px;
      line-height: 1.4;

      &::placeholder {
        color: #999;
      }
    }
  }

  .nav {
    background: white;
    /*margin: 15px 0;*/
    &-list {

    }

    &-item {
      padding: 10px 0;
      text-align: center;

      .title {
        margin-top: 10px;
        font-size: 14px;
        color: #444;
      }
    }
  }

  .head {
    position: sticky;
    z-index: 3;
    top: 0;
    height: 50px;
    width: 750rpx;
    box-sizing: border-box;
    background: white;
    padding: 10px 50rpx;
    align-items: center;
    color: #333;

    &.isStickly {
      border-bottom: 1px solid #eee;
    }

    .tab-box {

      display: flex;
      align-items: center;

      .tab-item {
        flex: 1;
        text-align: center;
        margin-right: 40rpx;
        padding-bottom: 8px;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        .underline {
          visibility: hidden;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          height: 2px;
          width: 18px;
          background: $fun-green-color;
        }

        &.active {
          color: $fun-green-color;

          .underline {
            visibility: visible;
          }
        }
      }
    }

    .search-box {
      position: relative;
      margin-right: 20rpx;
      width: 120rpx;
      text-align: right;
      background: rgba(255, 255, 255, .5);

      .iconsearch {
        color: white;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .look-more{
    height: 60rpx;
    line-height: 60rpx;
  }
</style>
