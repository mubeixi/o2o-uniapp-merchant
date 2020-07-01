<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="active-fixed flex flex-vertical-c">
      <img class="img-logo m-r-5"  :src="$getDomain('/static/client/active/activeLogo.png')"  />
      <div class="active-fixed-title m-r-12">
        及贝
      </div>
      <div class="fz-12">
        专业的自营配送系统
      </div>
    </div>
    <div class="active-first"   :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeBgTop.jpg')+')'}" >
      <div class="active-first-title">
        专注商家自营配送,为配送而生
      </div>
      <div class="active-first-content flex flex-vertical-c m-b-20">
        <div class="divCube m-r-5"></div>
        <span>1分钟搭建出自己的配送平台</span>
      </div>
      <div class="active-first-content flex flex-vertical-c m-b-20">
        <div class="divCube"></div>
        <span>“0”抽成 “0”手续费，让利消费者</span>
      </div>
      <div class="active-first-content flex flex-vertical-c ">
        <div class="divCube m-r-5"></div>
        <span>搭建自营数字化配送平台，增加销售渠道</span>
      </div>
      <img class="first-active"  :src="$getDomain('/static/client/active/firstActive.png')" >

    </div>
    <div class="active-second" :style="{backgroundImage: 'url('+$getDomain('/static/client/active/secondActive.png')+')'}" >
      商家为什么要做自营配送平台？
    </div>
    <img class="secondActiveContent"  :src="$getDomain('/static/client/active/secondActiveContent.png')" >

    <div class="active-three"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/threeActive.png')+')'}"  >
      及贝业务模型
    </div>
    <div class="active-text m-b-12">
      1. 快递收单（例某通）
    </div>
    <div class="active-three-img">
      <img class="full-img"   :src="$getDomain('/static/client/active/activeThree1.png')" >
    </div>
    <div class="active-text m-b-12">
      2. 同城配送（例跑腿）
    </div>
    <div class="active-three-img">
      <img class="full-img"  :src="$getDomain('/static/client/active/activeThree2.png')">
    </div>
    <div class="active-text m-b-12">
      3. 自主配送
    </div>
    <div class="active-three-img" style="height: 310rpx !important;margin-bottom: 0px">
      <img class="full-img"  :src="$getDomain('/static/client/active/activeThree3.png')">
    </div>

    <div class="active-four" :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeFour.png')+')'}"  >
      部分功能展示
    </div>
    <div class="active-four-img" style="width: 712rpx">
      <img class="full-img"  :src="$getDomain('/static/client/active/activeFour1.png')" >
    </div>
    <div class="active-four-img" style="height: 441rpx;margin-bottom: 94rpx">
      <img class="full-img" :src="$getDomain('/static/client/active/activeFour2.png')">
    </div>
    <div class="active-four-img" style="height: 428rpx;margin-bottom: 58rpx">
      <img class="full-img" :src="$getDomain('/static/client/active/activeFour3.png')">
    </div>
    <div class="active-four-img" style="height: 418rpx;">
      <img class="full-img" :src="$getDomain('/static/client/active/activeFour4.png')">
    </div>

    <div class="active-five" :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeFive.png')+')'}"   >
      营销工具,助力业务增长
    </div>
    <div class="active-five-div"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeFive1.png')+')'}"   >
      <div class="active-five-zhibo active-five-text" style="top: 64rpx;">
            <span class="c-F7D81B fz-13">
              直播
            </span>
        <span>
              ：开启卖货新机遇，助力商家流量高效变现
            </span>
      </div>
      <div class="active-five-zhibo active-five-text" style="top: 162rpx;">
              <span class="c-F7D81B fz-13">
                团购
              </span>
        <span>
                ：有效激励用户购买/传播，销售/裂变利器
              </span>
      </div>
      <div class="active-five-zhibo active-five-text" style="top: 258rpx;">
                <span class="c-F7D81B fz-13">
                  秒杀
                </span>
        <span>

                                ：同一时间以超低价格吸引、活跃、转化用户

                </span>
      </div>
      <div class="active-five-zhibo active-five-text" style="top: 356rpx;">
                <span class="c-F7D81B fz-13">
                  优惠券
                </span>
        <span>

                                ：抵扣等值现金，留存、成交、增加复购率

                </span>
      </div>
      <div class="active-five-zhibo active-five-text" style="top: 452rpx;">
                    <span class="c-F7D81B fz-13">
                      满减
                    </span>
        <span>

                                ：满100元减50元，吸引用户成交，提升客单价

                    </span>
      </div>
      <div class="active-five-zhibo active-five-text" style="top: 550rpx;">
                    <span class="c-F7D81B fz-13">
                      会员
                    </span>
        <span>

                                ：会员制的基础，对留存及转化起到关键性作用

                    </span>
      </div>
    </div>

    <div class="active-six"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/avtiveSix.png')+')'}"   >
      19.8元得到什么
    </div>

    <div class="active-six-div"   :style="{backgroundImage: 'url('+$getDomain('/static/client/active/avtiveSixImg.png')+')'}"  >

        <div class="active-six-text" style="top:52rpx">
          无需小程序认证，省掉300元
        </div>
        <div class="active-six-text" style="top:126rpx">
          自主配送/同城配送/快递收单系统
        </div>
        <div class="active-six-text" style="top:198rpx">
          直播导购场景搭建，快速流量变现
        </div>
        <div class="active-six-text" style="top:270rpx">
          主流营销插件，吸粉，裂变，转化
        </div>
        <div class="active-six-text" style="top:342rpx">
          不满意，七天无理由退款
        </div>

    </div>

    <div class="active-seven"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeSeven.png')+')'}"  >
      万家商家选择,好评无数
    </div>

    <div class="active-seven-div">
      <img   :src="$getDomain('/static/client/active/activeSevenImg.png')" class="full-img">
    </div>

    <div class="know-ji-bei"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeBgBottom.jpg')+')'}"  >
      <div class="active-last"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeLast.png')+')'}" >
        了解及贝
      </div>
      <div class="last-text">
        及贝专业的自营配送平台，解决商家经营配送难题而开发的一套配送小程序，包含调度系统、配送员系统、自定义配送体系等围绕着配送体系和位置服务深度开发了多项实用的功能。及贝完美的对接第三方配送平台，商家可实现同城本地配送，礼品鲜花配送、酒水饮品配送，为商家提供专业、短距、超快的配送需求，更适用于社区、校园、周边的配送服务。
      </div>

    </div>

    <div class="active-last-fixed">
      <div class="active-bottom-fixed flex flex-vertical-c flex-justify-between">

        <div class="fz-14 c3" style="line-height: 60rpx">
            <span>
              首月特惠<span class="c-FF0101 m-l-2 m-r-2">¥</span>
            </span>
            <span class="c-FF0101 fz-18">
              19.8
            </span>
            <span class="m-l-12">
              续费<span class="c-FF0101  m-l-2 m-r-2">¥</span>
            </span>
            <span class="c-FF0101 fz-18">
              56.6
            </span>
            <span>
              /月
            </span>
        </div>
        <div class="last-btn" @click="buyActiveCodeFn">
            立即激活
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import layoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import { buyActiveCode } from '@/api/order'
import Pay from '@/common/Pay'
import { error, toast } from '@/common/fun'
import Promisify from '@/common/Promisify'
export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip
  },
  data () {
    return {
      order_id: ''
    }
  },
  methods: {
    paySuccessCall () {
      toast('支付成功')
      const _self = this
      const url = '/pagesA/active/ActivationCodeSuccess?order_id=' + this.order_id
      setTimeout(function () {
        _self.$linkTo(url)
      }, 1000)
    },
    payFailCall (err) {
      const { msg, errMsg } = err
      if (errMsg === 'requestPayment:fail cancel') {
        error('用户取消支付')
        return
      }

      error(msg || '支付失败')
    },
    async buyActiveCodeFn () {
      try {
        const pay_type = 'wx_h5'
        // 获取code
        const _self = this
        const wxLoginRt = await Promisify('login').catch(() => {
          throw Error('微信login错误')
        })
        const { code } = wxLoginRt
        await buyActiveCode({ code }, { tip: '加载中' }).then(res => {
          this.order_id = res.data.order_id
          Pay(_self, pay_type, res)
        }).catch(e => {
          error(e.msg || '获取code错误')
        })
      } catch (e) {
        console.log(e)
        error(e.message)
      }
    }
  }

}
</script>
<style lang="scss" scoped>
  .page-wrap {
    min-height: 100vh;
    box-sizing: border-box;
    background-color: #170130;
    padding-top: 70rpx;
  }

  .c-F7D81B {
    color: #f7d81b !important;
  }
  .c-FF0101{
    color: #FF0101 !important;
  }

  .active-fixed {
    height: 70rpx;
    width: 750rpx;
    padding-left: 26rpx;
    box-sizing: border-box;
    background-color: #FFFFff;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;

    .img-logo {
      width: 50rpx;
      height: 50rpx;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    &-title {
      height: 50rpx;
      line-height: 50rpx;
      font-size: 26rpx;
      font-family: MF YueYuan Noncommercial;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }

  .active-first {
    width: 750rpx;
    height: 710rpx;
    padding-top: 80rpx;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &-title {
      width: 750rpx;
      height: 54rpx;
      line-height: 54rpx;
      font-size: 48rpx;
      color: #FFFFff;
      font-weight: bold;
      text-align: center;
      margin-bottom: 50rpx;
    }

    &-content {
      width: 750rpx;
      box-sizing: border-box;
      padding-left: 106rpx;
      font-size: 30rpx;
      color: #FFF000;
      height: 30rpx;
    }

    .divCube {
      width: 10rpx;
      height: 10rpx;
      background-color: #FFFFff;
    }

    .first-active {
      width: 700rpx;
      height: 200rpx;
      margin: 78rpx auto 0rpx;
      display: block;

    }

  }

  .active-second {
    width: 620rpx;
    height: 66rpx;
    background-size: 100% 100%;
    margin: 0 auto;
    font-size: 40rpx;
    color: #FFFFff;
    display: flex;
    align-items: flex-start;
    padding-left: 50rpx;
    box-sizing: border-box;
  }

  .active-three {
    width: 450rpx;
    height: 66rpx;
    background-size: 100% 100%;
    margin: 0 auto;
    font-size: 40rpx;
    color: #FFFFff;
    display: flex;
    align-items: flex-start;
    padding-left: 110rpx;
    box-sizing: border-box;
    margin-bottom: 74rpx;
  }

  .active-four {
    width: 450rpx;
    height: 66rpx;
    background-size: 100% 100%;
    margin: 90rpx auto 32rpx;
    font-size: 40rpx;
    color: #FFFFff;
    display: flex;
    align-items: flex-start;
    padding-left: 110rpx;
    box-sizing: border-box;
  }

  .active-five {
    width: 580rpx;
    height: 66rpx;
    background-size: 100% 100%;
    margin: 100rpx auto 60rpx;
    font-size: 40rpx;
    color: #FFFFff;
    display: flex;
    align-items: flex-start;
    padding-left: 84rpx;
    box-sizing: border-box;
  }
  .active-six{
    width: 490rpx;
    height: 66rpx;
    background-size: 100% 100%;
    margin: 0rpx auto 52rpx;
    font-size: 40rpx;
    color: #FFFFff;
    display: flex;
    align-items: flex-start;
    padding-left: 110rpx;
    box-sizing: border-box;
  }
  .active-seven{
    width: 590rpx;
    height: 66rpx;
    background-size: 100% 100%;
    margin: 0rpx auto 66rpx;
    font-size: 40rpx;
    color: #FFFFff;
    display: flex;
    align-items: flex-start;
    padding-left: 82rpx;
    box-sizing: border-box;
  }
  .active-last{
    width: 350rpx;
    height: 66rpx;
    background-size: 100% 100%;
    margin: 70rpx auto 56rpx;
    font-size: 40rpx;
    color: #FFFFff;
    display: flex;
    align-items: flex-start;
    padding-left: 102rpx;
    box-sizing: border-box;
  }
  .secondActiveContent {
    display: block;
    width: 700rpx;
    height: 380rpx;
    margin: 54rpx auto 94rpx;
  }

  .active-text {
    width: 750rpx;
    box-sizing: border-box;
    height: 28rpx;
    line-height: 28rpx;
    font-size: 28rpx;
    color: #FFFFFF;
    padding-left: 28rpx;
  }

  .active-three-img {
    display: block;
    margin: 0 auto 56rpx;
    width: 710rpx;
    height: 320rpx;
  }

  .active-four-img {
    display: block;
    margin: 0 auto 50rpx;
    width: 710rpx;
    height: 496rpx;
  }

  .full-img {
    width: 100%;
    height: 100%;
  }

  .active-five-div {
    width: 710rpx;
    height: 644rpx;
    background-size: 100% 100%;
    margin: 0 auto 90rpx;
    position: relative;
  }

  .active-five-text {
    width: 528rpx;
    height: 26rpx;
    font-size: 12px;
    line-height: 26rpx;
    color: #FFFFFF;
    font-weight: bold;
    position: absolute;
    left: 126rpx;
  }

  .active-six-div{
    width: 710rpx;
    height: 422rpx;
    background-size: 100% 100%;
    position: relative;
    margin:0 auto 94rpx;
  }
  .active-six-text{
    width: 420rpx;
    height: 28rpx;
    font-size: 28rpx;
    line-height: 28rpx;
    color:#333333;
    position: absolute;
    left: 166rpx;
  }

  .active-seven-div{
    width: 700rpx;
    height: 920rpx;
    margin: 0 auto;
  }
  .know-ji-bei{
    width: 750rpx;
    height: 680rpx;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .last-text{
    width: 650rpx;
    margin: 0 auto 74rpx;
    font-size: 26rpx;
    line-height:48rpx;
    color: #FFFFff;
  }

  .active-last-fixed{
    z-index: 9;
    width: 750rpx;
    height:106rpx;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0rpx;
    bottom: 0rpx;
    /* #ifdef MP */
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    /* #endif */
  }
  .active-bottom-fixed{
    width:700rpx;
    height:106rpx;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 24rpx 0px rgba(0, 0, 0, 0.5);
    border-radius:50rpx;
    box-sizing: border-box;
    padding-left: 28rpx;
    padding-right: 36rpx;

  }
  .last-btn{
    width:150rpx;
    height:58rpx;
    line-height: 58rpx;
    text-align: center;
    font-size: 26rpx;
    color: #FFFFff;
    background:rgba(83,36,185,1);
    border-radius:6rpx;
  }

</style>
