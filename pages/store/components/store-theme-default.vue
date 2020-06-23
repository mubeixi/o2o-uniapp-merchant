<template>
  <div class="store-comp-wrap">
    <scroll-view class="store-comp-scroll" scroll-y>
      <div class="store-info">
        <div class="base">
          <div :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}"
               class="logo"
               v-if="storeInfo.biz_logo"></div>
          <div class="title">{{storeInfo.biz_shop_name}}</div>
        </div>
        <div class="actions">
          <div @click="$openLocation(storeInfo.biz_lat_gd,storeInfo.biz_lon_gd,storeInfo.biz_shop_name,storeInfo.biz_address)"
               class="action-item">
            <layout-icon color="#26C78D" size="26" type="iconicon-address"></layout-icon>
          </div>
          <div @click.stop="$cellPhone(storeInfo.biz_mobile)" class="action-item">
            <layout-icon color="#26C78D" size="26" type="iconicon-phone"></layout-icon>
          </div>
          <div @click="taggleFavorite" class="action-item">
            <layout-icon :color="isFavourite?'#F53636':'#26C78D'" size="26" type="iconicon-favorite"></layout-icon>
          </div>
          <div @click="toShare" class="action-item">
            <layout-icon color="#26C78D" size="26" type="iconicon-timeline"></layout-icon>
          </div>
          <button class="action-item share-btn" open-type="share">
            <layout-icon color="#26C78D" size="26" type="iconicon-share"></layout-icon>
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
      <div :class="{isStickly:headTabSticky}" class="head" id="stickyTab">
        <ul class="tab-box sticky">
          <li :class="{active:headTabIndex === 0}" @click="headTabIndex=0" class="tab-item">首页<span
            class="underline" v-if="headTabIndex === 0"></span></li>
          <li :class="{active:headTabIndex === 1}" @click="headTabIndex=1" class="tab-item">介绍<span
            class="underline" v-if="headTabIndex === 1"></span></li>
          <li :class="{active:headTabIndex === 2}" @click="headTabIndex=2" class="tab-item">相册<span
            class="underline" v-if="headTabIndex === 2"></span></li>
          <li :class="{active:headTabIndex === 3}" @click="headTabIndex=3" class="tab-item">门店<span
            class="underline" v-if="headTabIndex === 3"></span></li>
          <li :class="{active:headTabIndex === 4}" @click="headTabIndex=4" class="tab-item">点评<span
            class="underline" v-if="headTabIndex === 4"></span></li>
        </ul>
      </div>
      <!--  占位-->
      <!--    <div class="h50 bg-white" v-if="headTabSticky"></div>-->

      <swiper
        :current="headTabIndex"
        :style="{height:childSwiperHeight}"
        @change="indexChangeEvent"
        class="tab-container">
        <swiper-item class="tab-page">
          <div class="tab-page-wrap" id="scrollView1">

            <!--优惠券-->
            <div class="coupon-section flex flex-justify-c" v-if="couponList.length>0">
              <div :key="idx" @click="getCoupon(coupon,idx)" class="coupon-item" v-for="(coupon,idx) in couponList">
                <div class="containier">
                  <div class="price">
                    <div class="sign">{{coupon.Coupon_UseType?'￥':'折'}}</div>
                    <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
                  </div>
                  <div class="info">
                    <span class="condition">满{{coupon.Coupon_Condition}}元可使用</span>
                    <span class="use-end-item">有效期至{{coupon.Coupon_EndTime|formatTime('YYYY-MM-DD')}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!--限时抢购-->
            <div class="activity-list  flex flex-justify-c" v-if="activityList.length>0">
              <div :key="idx" @click="$linkTo('/pagesA/active/FlashSaleByBiz?biz_id='+bid+'&spike_id='+item.id)" class="activity-item"
                   v-for="(item,idx) in activityList">{{item.name}}
              </div>
            </div>

            <!--便捷操作-->
            <div class="feature-list">
              <!--$linkTo()-->
<!--              <image :src="'/static/client/store/send.png'|domain" @click="toDelivery" class="feature-item"-->
<!--                     mode="scaleToFill"></image>-->
              <image :src="'/static/client/store/pay.png'|domain" @click="toOffinePay" class="feature-item"
                     mode="scaleToFill"></image>
              <image :src="'/static/client/store/join.png'|domain" @click="$linkTo('/pages/product/apply?bid='+bid)" class="feature-item"
                     mode="scaleToFill"></image>
              <image :src="'/static/client/store/member.png'|domain" @click="toVip" class="feature-item"
                     mode="scaleToFill"></image>
            </div>

            <!--虚拟产品-->
            <div class="block coupon-goods-list" v-if="virtualGoodsLsit.length>0">
              <div class="block-title">
                <div class="block-title-text">到店券</div>
                <div class="block-title-more flex flex-vertical-center c9 fz-12" @click="$linkTo('/pagesA/store/virtualGoods?biz_id='+bid)">
                  <span>查看全部</span>
                  <icon class="iconright" color="#999" size="14" type="iconright"></icon>
                </div>
              </div>
              <div class="block-content">
                <div class="goods-list">
                  <div :key="idx" @click="$toGoodsDetail(item)" class="goods-item" v-for="(item,idx) in virtualGoodsLsit">
                    <div class="left">
                      <div :style="{backgroundImage:'url('+item.ImgPath+')'}" class="cover"></div>
                    </div>
                    <div class="right">
                      <h5 class="title"><span>{{item.Products_Name}}</span></h5>
                      <div class="flex flex-justify-between flex-vertical-center">
                        <div class="flex1">
                          <div class="tags" v-if="item.tags && item.tags.length>0">
                            <span :key="idx" class="tag" v-for="(tag,idx) in item.tags">{{tag}}</span>
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
                <li :class="{active:goodsNavIndex === 0}" @click="goodsNavIndex=0" class="nav-item">推荐产品</li>
                <li :class="{active:goodsNavIndex === 1}" @click="goodsNavIndex=1" class="nav-item">产品分类</li>
                <li :class="{active:goodsNavIndex === 2}" @click="goodsNavIndex=2" class="nav-item">全部产品</li>
              </ul>
              <!-- style="height: 540rpx;overflow-y: hidden"      :style="{height:systemInfo.windowHeight+'px'}"       :style="{height:systemInfo.windowHeight+'px'}"-->
              <swiper
                :current="goodsNavIndex"
                @change="prodIndexChangeEvent"
                style="height: 300px">
                <swiper-item style="overflow-y: scroll">
                  <div class="goods-list">
                    <div :key="idx" @click="$toGoodsDetail(item)"
                         class="goods-item" style="height: 220rpx;margin-bottom: 18rpx;" v-for="(item,idx) in recommends">
                      <image :style="{backgroundImage:'url('+item.ImgPath+')'}" class="goods-item-cover"></image>
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
                  <div @click="$linkTo('/pages/search/result?biz_id='+bid)"
                       class="flex flex-vertical-c flex-justify-c look-more">
                    <span class="c9 fz-12">查看更多</span>
                    <layout-icon color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                  </div>
                </swiper-item>
                <swiper-item class="tab-page" style="overflow-y: scroll">
                  <div class="p-t-20 p-l-15 p-b-20 p-r-15"
                       style="width: 700rpx;background: #F7F7F7;box-sizing: border-box;">
                    <block :key="idx1" v-for="(row,idx1) in bizCateList">
                      <div class="row p-b-15" v-if="row.child">
                        <div class="fz-14 c3 ">{{row.cate_name}}</div>
                        <span :key="idx2" class="column fz-12 c6 p-9 m-r-10 m-t-10"
                              style="background: #FFFFFF;display: inline-block;" v-for="(column,idx2) in row.child">{{column.cate_name}}</span>
                      </div>
                    </block>
                  </div>
                </swiper-item>
                <swiper-item class="tab-page" style="overflow-y: scroll">
                  <div class="flex" style="flex-wrap: wrap;width: 710rpx;">
                    <div
                      :key="idx"
                      :style="{marginRight:idx%2===0?'20rpx':'0rpx'}"
                      @click="$toGoodsDetail(item)" style="width: 345rpx;border-radius: 8rpx;overflow: hidden;height: 450rpx;margin-bottom: 20rpx;"
                      v-for="(item,idx) in goodsList">
                      <div :style="{backgroundImage:'url('+item.ImgPath+')'}" class="img-cover"
                           style="width: 345rpx;height: 345rpx"></div>
                      <div class="c3 fz-13" style="line-height: 36rpx;height: 72rpx;overflow-x: hidden">{{item.Products_Name}}</div>
                      <div class="flex flex-vertical-c" style="height: 32rpx;">
                        <div class="price-selling"><span class="fz-10">￥</span><span class="fz-12">{{item.Products_PriceX}}</span>
                        </div>
                        <div class="p-l-10 text-through price-market"><span class="fz-10">￥</span><span class="fz-12">{{item.Products_PriceY}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div @click="$linkTo('/pages/search/result?biz_id='+bid)"
                       class="flex flex-vertical-c flex-justify-c look-more">
                    <span class="c9 fz-12">查看更多</span>
                    <layout-icon color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                  </div>
                </swiper-item>
              </swiper>

            </div>

            <!--评论列表-->
            <div class="block comment-box" v-if="comments.length>0">

              <div class="block-title">
                <div class="block-title-text">留言评论</div>
                <div @click="headTabIndex=4" class="block-title-more flex flex-vertical-center c9 fz-12">
                  <span>查看全部</span>
                  <icon class="iconright" color="#999" size="14" type="iconright"></icon>
                </div>
              </div>
              <div class="block-content">
                <div class="comment-list">
                  <div :key="idx" v-for="(item,idx) in comments">
                    <layout-comment :comment="item" :isLast="comments.length-1===idx"
                                    @comment="clickComment"></layout-comment>
                    <div class="comment-send" v-if="item.child.length>0">
                      <block :key="ind" v-for="(com,ind) of item.child">
                        <block :key="indx" v-for="(co,indx) of com">

                          <block v-if="co.touserid==item.User_ID">
                            <div @click.stop="clickCommentSend(item,co.groupid,co.userid)"
                                 class="fz-12 c3 comment-send-item">
                              <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                            </div>
                          </block>
                          <block v-else>
                            <div @click.stop="clickCommentSend(item,co.groupid,co.userid)"
                                 class="fz-12 c3 comment-send-item p-l-10">
                              <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span
                              class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                            </div>
                          </block>

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
          <div class="tab-page-wrap p-t-15" id="scrollView2">
            <div class="p-10">地址:<span @click="$openLocation(storeInfo.biz_lat,storeInfo.biz_lon)" class="p-l-10">{{storeInfo.biz_address}}</span></div>
            <div class="hr h15"></div>
            <div class="p-10">电话:<span class="p-l-10" @click="$cellPhone(storeInfo.biz_mobile)">{{storeInfo.biz_mobile}}</span></div>
            <div class="hr h15"></div>
            <div class="p-10">简介:<span class="p-l-10 fz-14 c6">{{storeInfo.intro||'暂无简介'}}</span></div>
          </div>
        </swiper-item>
        <swiper-item class="tab-page">
          <div class="tab-page-wrap" id="scrollView3">

            <!--只显示有照片的相册 v-if="imgs.photo && imgs.photo.length>0"-->
            <div :key="idx1" class="photo-section" v-for="(imgs,idx1) in photoList">
              <div class="php-section-title m-b-10 flex flex-vertical-c">
                <div class="label"></div>
                <div class="text flex1 c3">{{imgs.cate_name}}</div>
                <div @click="$linkTo('/pagesA/store/photo?bid='+bid+'&tab='+idx1)" class="flex flex-vertical-c">
                  <span class="c9 fz-12">查看更多</span>
                  <layout-icon color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                </div>
              </div>
              <div class="photo-list">
                <div :key="idx2" :style="{backgroundImage:'url('+img.photo_img+')'}" @click="priviewFn(imgs,idx2)" class="photo-item"
                     v-for="(img,idx2) in imgs.photo"></div>
              </div>
            </div>

          </div>
        </swiper-item>
        <swiper-item class="tab-page">
          <div class="tab-page-wrap" id="scrollView4">
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
                <div :key="ind" class="store-list-item" v-for="(st,ind) of storeList">
                  <div @click.stop="goStore(st.biz_id)" class="store-list-title">
                    {{st.store_name}}
                  </div>
                  <div class="flex flex-justify-between store-list-address">
                    <div @click="$openLocation(st.store_lat,st.store_lon,st.store_name)" class="store-list-font">
                      {{st.area_address}}
                    </div>
                    <div class="flex flex-vertical-center">
                      <layout-icon @click="$openLocation(st.store_lat,st.store_lon,st.store_name)" color="#26C78D" size="17"
                                   type="iconicon-address"></layout-icon>
                      <span class="store-su"></span>
                      <layout-icon @click.stop="$cellPhone(st.store_mobile)" color="#26C78D" size="17"
                                   type="iconicon-phone"></layout-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item class="tab-page">
          <div class="tab-page-wrap comment-section" id="scrollView5">
            <!--评论列表-->

            <div class="block-content">
              <div class="comment-list" v-if="comments.length>0">
                <div :key="idx" class="comment-item" v-for="(item,idx) in comments">
                  <layout-comment :comment="item" :isLast="comments.length-1===idx"
                                  @comment="clickComment"></layout-comment>
                  <div class="comment-send" v-if="item.child.length>0">
                    <block :key="ind" v-for="(com,ind) of item.child">
                      <block :key="indx" v-for="(co,indx) of com">

                        <block v-if="co.touserid==item.User_ID">
                          <div @click.stop="clickCommentSend(item,co.groupid,co.userid)" class="fz-12 c3 comment-send-item">
                            <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                          </div>
                        </block>
                        <block v-else>
                          <div @click.stop="clickCommentSend(item,co.groupid,co.userid)" class="fz-12 c3 comment-send-item p-l-10">
                            <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span
                            class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                          </div>
                        </block>

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
        <textarea :value="commentValue" @input="bingReasonInput" auto-height class="reason"
                  placeholder="请输入评价" placeholder-style="color:#999" />
          <div class="control">
            <div @click="cancelComent" class="action-btn btn-cancel">取消</div>
            <div @click="sureComment" class="btn-sub action-btn">确定</div>
          </div>

        </div>
      </layout-modal>
    </scroll-view>
  </div>
</template>

<script>
import LayoutModal from '@/componets/layout-modal/layout-modal'
import LayoutCopyright from '@/componets/layout-copyright/layout-copyright'
import LayoutComment from '@/componets/layout-comment/layout-comment'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { componetMixin } from '@/mixins/BaseMixin'
import { checkIsLogin, getArrColumn } from '@/common/helper'
import { error, hideLoading, modal, showLoading, toast } from '@/common/fun'
import { addFavourite, cancelFavourite, checkFavourite, commentReply, getUserCoupon } from '@/api/customer'
import { Exception } from '@/common/Exception'
import { getCommitList, getCouponList } from '@/api/common'
import { getAlbumList, getBizInfo, getBizSpikeList, getStoreList } from '@/api/store'
import { getBizProdCateList, getProductList } from '@/api/product'

export default {
  name: 'store-theme-default',
  mixins: [componetMixin],
  components: {
    LayoutModal,
    LayoutCopyright,
    LayoutComment,
    LayoutIcon
  },
  props: {
    bid: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      commentItem: {},
      commentValue: '',
      childSwiperHeight: 'auto',
      isFavourite: false,

      scrollHeightS: [0, 0, 0, 0],
      storeList: [],
      liveStatus: 0,
      storeInfo: {},
      couponList: [],
      activityList: [],
      comments: [],
      goodsNavIndex: 0,
      recommends: [],
      bizCateList: [],
      virtualGoodsLsit: [],
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
  watch: {
    bid: {
      immediate: true,
      handler (nval) {
        if (nval) this._init_func()
      }
    }
  },
  methods: {
    toRoom () {
      // const roomId = this.storeInfo.room_id // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
      // const customParams = encodeURIComponent(JSON.stringify({
      //   path: 'pages/store/index?biz_id=' + this.bid,
      //   owner_id: this.$store.getters['user/getUserId']()// 公共参数
      // }))
      // // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，
      // // 详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
      // wx.navigateTo({
      //   url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
      // })
    },
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
    toDelivery () {

      if (checkIsLogin(1, 1)) {
        this.$linkTo('/pages/delivery/desktop?bid=' + this.bid)
      }
    },
    toOffinePay () {
      this.$linkTo(`/pagesA/store/offlinePay?biz_id=${this.bid}`)
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
      this.commentItem = {}
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
        }, { onlyData: true }).then(res => {
          this.comments = res
        }).catch((e) => {
          error(e.msg || '获取评论数据失败')
        })
        this.$closePop('commentModal')
      }).catch(e => {
        error(e.msg || '评论失败')
        this.commentItem = {}
        this.commentValue = ''
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
      this.commentItem = Object.assign({}, item)
      this.$refs.commentModal.show()
      this.commentItem.groupid = ''
    },
    clickCommentSend (item, goupId, userId) {
      if (!checkIsLogin(1, 1)) return
      this.commentItem = Object.assign({}, item)
      this.commentItem.groupid = goupId
      this.commentItem.User_ID = userId
      this.$refs.commentModal.show()
    },
    priviewFn (imgs, current) {
      const urls = getArrColumn(imgs.photo, 'photo_img')
      uni.previewImage({
        urls,
        current
      })
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

        this.$emit('upStoreInfo', this.storeInfo)

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
        this.virtualGoodsLsit = await getProductList({
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
        this.couponList = await getCouponList({
          biz_id: this.bid,
          front_show: 1
        }, {
          onlyData: true,
          noUid: 1
        }).catch((e) => {
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
          const query = uni.createSelectorQuery().in(this)
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
  created () {

  },
  ready () {
    const query = uni.createSelectorQuery().in(this)
    query.select('#stickyTab').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      this.headTabTop = res[0].top
    })
  }
}
</script>
<style lang="scss" scoped>
  .store-comp-wrap{
    position: absolute;
    width: 750rpx;
    left: 0;
    top: 0;
    z-index: 2;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .store-comp-scroll{
    width: 100%;
    height: 100%;
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
    line-height: 50rpx;
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

  .look-more {
    height: 60rpx;
    line-height: 60rpx;
  }
  .comment-send-item{
    overflow-x: hidden;
  }
</style>
