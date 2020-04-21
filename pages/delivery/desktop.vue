<template>
  <div class="page-wrap">
    <div style="position: fixed;left: 0;top:0;width:750rpx;"
         :style="{height:menuButtonInfo.top+menuButtonInfo.height+'px'}">
      <!--状态栏-->
      <div class="status-bar" :style="{height:menuButtonInfo.top+'px',backgroundColor:statusBgColor}"></div>
      <!--导航栏-->
      <div class="navigation-bar" :style="{height:menuButtonInfo.height+'px',backgroundColor:menuButtonBgColor}">
        <layout-icon color="#fff" @click="bindBack" class="left-icon" size="18"
                     type="iconicon-arrow-left"></layout-icon>
        <div class="title color-white" :style="{lineHeight:menuButtonInfo.height+'px'}">外卖</div>
      </div>
    </div>
    <div class="head" style="background-image: url('/static/delivery/desktop_top_bg.jpg')">
      <div :style="{height:menuButtonInfo.top+menuButtonInfo.height+15+'px'}"></div>
      <div class="store-info flex-vertical-c flex flex-justify-c">
        <image class="store-logo" src="https://newo2o.bafangka.com/static/member/images/login/loginWeixin.png"></image>
        <span class="store-title fz-16 p-l-8">大漠孤烟直</span>
      </div>
    </div>
    <div class="bg-white" style="height: 60rpx;"></div>
    <div class="container">
      <div class="cate">
        <div v-for="(item,idx) in cateList" :key="idx" class="cate-item" :class="{active:cateActiveIdx===idx}"
             @click="setCateActuveIdx(idx)">
          <block v-if="idx===0">
            <layout-icon display="inline" type="iconicon-fire" color="#FF0000"></layout-icon>
            <span class="p-l-4">{{item.name}}</span>
          </block>
          <block v-else>{{item.name}}</block>
        </div>

      </div>
      <scroll-view scroll-y="true" class="list">
        <div class="goods-item" v-for="(goods,idx) in showList" :key="idx" @click="toDetail(goods)">
          <div class="cover" :style="{backgroundImage:'url('+goods.ImgPath+')'}"></div>
          <div class="info">
            <div class="title">{{goods.Products_Name}}</div>
            <div class="fz-12 c9 p-t-6 p-b-6">销量：{{goods.Products_Sales}}</div>
            <div><span class="price-selling fz-12">￥</span><span
              class="price-selling fz-14">{{goods.Products_PriceX}}</span></div>
          </div>
          <div class="action m-r-20" @click.stop="$noop">
            <div class="btn-open-attr" @click.stop="openAttrLayer(goods)" v-if="goods.skujosn">选择规格</div>
            <div v-else class="flex flex-vertical-c">
              <block v-if="goods.num>0">
                <layout-icon @click.stop="goodsNumMinus(goods)" size="24" color="#26C78D"
                             type="iconicon-minus"></layout-icon>
                <input v-model="goods.num" class="input-num text-center fz-12" />
              </block>
              <layout-icon @click.stop="goodsNumPlus(goods)" size="24" color="#26C78D"
                           type="iconicon-plus"></layout-icon>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>

    <div class="bottom">
      <div class="cart">
        <layout-icon class="cart-icon" type="iconicon-cart"></layout-icon>
        <div class="tag">{{carts.length}}</div>
      </div>
      <div class="flex1">配送费4元</div>
      <div class="buy">￥30元启动</div>
    </div>

    <layout-layer ref="attr" positions="center">
      <div class="attr-form-wrap">
        <div class="attr-head">
          <span class="title">黄焖鸡米饭</span>
          <layout-icon @click="$closePop('attr')" class="close" type="icondelete"></layout-icon>
        </div>
        <div class="form">
          <div class="cartAttr" v-for="(item,i) of product.skujosn" :key="i">
            <div class="sku-title c3">{{i}}</div>
            <div class="sku-val-list">
              <div
                class="sku-val-item"
                :class="parseInt(Math.random()*2+1)===2 || check_attr[item.sku]==index?'checked':''"
                @click="selectAttr(index,i)"
                v-for="(text,index) of item"
                :key="index"
              >{{text}}
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <div><span class="price-selling fz-12">￥</span><span
            class="price-selling fz-14 c3">15.00</span><span>（原味）</span></div>
          <div @click="confirmAdd" class="confirm-btn">加入购物车</div>
        </div>
      </div>
    </layout-layer>

  </div>

</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import {
  getProductDetail,
  getProductList
} from '@/api/product'
import LayoutLayer from '@/componets/layout-layer/layout-layer'

export default {
  name: 'DeliveryDesktop',
  mixins: [BaseMixin],
  components: {
    LayoutLayer,
    LayoutIcon
  },
  data () {
    return {
      product: {},
      cateActiveIdx: 0,
      showList: [],
      pageSize: 999,
      cateList: [
        {
          name: '热销',
          id: '',
          finish: false,
          list: [],
          totalCount: 0,
          page: 1
        },
        {
          name: '进店必买',
          id: 1,
          finish: false,
          list: [],
          totalCount: 0,
          page: 1
        },
        {
          name: '美味套餐',
          id: 1,
          finish: false,
          list: [],
          totalCount: 0,
          page: 1
        },
        {
          name: '盖浇饭',
          id: 1,
          finish: false,
          list: [],
          totalCount: 0,
          page: 1
        },
        {
          name: '麻辣香锅',
          id: 1,
          finish: false,
          list: [],
          totalCount: 0,
          page: 1
        }
      ]
    }
  },
  computed: {
    carts () {
      return [1, 2, 3, 4]
    }
  },
  watch: {
    // cateActiveIdx: {
    //   immediate: true,
    //   handler(val){
    //     console.log(val)
    //     this.changeTab(val)
    //   }
    // }
  },
  methods: {
    toDetail (goodsInfo) {
      this.$linkTo('/pages/delivery/detail?prod_id=' + goodsInfo.Products_ID)
    },
    goodsNumMinus (goodsInfo) {
      const num = goodsInfo.num ? goodsInfo.num - 1 : 0
      this.$set(goodsInfo, 'num', num)
    },
    goodsNumPlus (goodsInfo) {
      const num = goodsInfo.num ? goodsInfo.num + 1 : 1
      this.$set(goodsInfo, 'num', num)
    },
    confirmAdd () {
      this.$closePop('attr')
    },
    openAttrLayer (goodsInfo) {
      console.log(goodsInfo)
      this.product = goodsInfo
      this.$openPop('attr')
    },
    setCateActuveIdx (idx) {
      this.cateActiveIdx = idx
      this.changeTab(idx)
    },
    async changeTab (idx) {
      try {
        const { list = [], page = 1 } = this.cateList[idx]
        // 第一次
        if (list.length === 0 && page === 1) {
          const ret = await getProductList({
            pageSize: this.pageSize,
            page
          }).catch(e => {
            throw Error(e.msg || '获取商品列表失败')
          })
          const list = ret.data.map(goods => {
            return {
              ...goods,
              num: 0
            }
          })
          this.$set(this.cateList[idx], 'list', list)
          this.$set(this.cateList[idx], 'page', page + 1)
          this.$set(this.cateList[idx], 'totalCount', ret.totalCount)
        }
        this.showList = this.cateList[idx].list
      } catch (e) {
        this.showList = []
      }
    }
    // async loadGoods () {
    //   try {
    //     const newData = await getProductList({ pageSize: 999 }, { onlyData: true }).catch(e => { throw Error(e.msg || '获取商品列表失败') })
    //     this.showList = newData
    //   } catch (e) {
    //     this.showList = []
    //   }
    // }
  },
  created () {
    this.changeTab(0)
  }
}
</script>
<style lang="scss" scoped>
  .attr-form-wrap {
    width: 660rpx;
    background: #fff;
    border-radius: 10rpx;

    .actions {
      display: flex;
      height: 90rpx;
      background: #EAEAEA;
      align-items: center;
      justify-content: space-between;
      padding: 0 30rpx;

      .confirm-btn {
        width: 145rpx;
        height: 50rpx;
        background: $fun-primary-color;
        text-align: center;
        line-height: 50rpx;
        border-radius: 5rpx;
        border: none;
        font-size: 12px;
        color: #fff;
      }
    }

    .attr-head {
      padding: 14px;
      text-align: center;
      position: relative;

      .close {
        position: absolute;
        right: 10px;
        top: 14;
      }
    }

    .form {
      padding-bottom: 15px;
    }

    .cartAttr {
      padding: 15px 15px 0;

      .sku-title {
        margin-bottom: 12px;
      }

      .sku-val-list {
        display: flex;
        flex-wrap: wrap;

        .sku-val-item {
          padding: 4px 6px;
          font-size: 12px;
          color: #888;
          border: 1px solid #999;
          margin-right: 20rpx;
          margin-bottom: 20rpx;
          box-sizing: border-box;

          &.checked {
            border: 1px solid $fun-primary-color;
            color: $fun-primary-color;
            background: #E9FFF7;
          }
        }
      }
    }
  }

  .navigation-bar {
    position: relative;

    .left-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .title {
      text-align: center;
      font-size: 16px;
    }
  }

  .head {
    background-color: #fff;
    height: 280rpx;
    @include cover-img();
  }

  .store-info {

    .store-logo {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    .store-title {
      color: #fff;
    }

  }

  .container {
    position: fixed;
    top: 340rpx;
    bottom: 0rpx;
    width: 750rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .cate {
      width: 150rpx;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      background: #F8F8F8;

      .cate-item {
        height: 74rpx;
        line-height: 74rpx;
        text-align: center;
        border-bottom: 1px solid #fff;
        font-size: 13px;
        color: #333;

        &.active {
          background: #fff;
        }
      }
    }

    .list {
      width: 585rpx;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;

      .goods-item {
        display: flex;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 1px solid #E1E1E1;

        .cover {
          width: 118rpx;
          height: 118rpx;
          background: #f2f2f2;
        }

        .info {
          flex: 1;
          padding-left: 20rpx;

          .title {
            font-size: 13px;
            color: #333;
          }
        }

        .action {
          .input-num {
            display: inline;
            width: 50rpx;
          }

          .btn-open-attr {
            background: $fun-primary-color;
            font-size: 10px;
            color: #fff;
            width: 110rpx;
            height: 38rpx;
            line-height: 38rpx;
            border-radius: 19rpx;
            text-align: center;
          }
        }
      }
    }
  }
</style>
