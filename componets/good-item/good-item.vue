<style scoped lang="scss">
.product-panel{
  &.left-right{
    display: flex;
    align-items: center;
    .product-info{
      margin-left: 10px;
      flex: 1;
    }
  }
  &.top-bottom{

  }
}

.product-title{
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

//如果父组件要覆盖样式，那么自己用deep就好了
.product-cover{
  @include cover-img();
  width: 300rpx;
  height: 300rpx;
}
</style>
<template>
  <div class="product-panel" :class="[mode]" :style="{marginBottom}">
    <slot name="cover">
      <div class="product-cover" :style="{backgroundImage:'url('+getDomainUrl(vo.ImgPath)+')',borderRadius:coverRadius}" ></div>
    </slot>
    <div class="product-info">
      <slot name="title"><div class="product-title c3 p-t-10 p-b-10" :style="{FontSize:titleFontSize,height:titleBoxHeight}">{{vo.Products_Name}}</div></slot>
      <slot name="sales"><div v-if="sales" class="sales c9 fz-14">已售{{vo.Products_Sales}}件</div></slot>
      <div class="price-box">
        <slot name="sellingPrice">
          <span class="price-selling fz-12"><span>￥</span><span class="fz-14">{{vo.Products_PriceX}}</span></span>
        </slot>
        <slot name="marketPrice">
          <span v-if="marketPrice" class="price-market fz-12 text-through p-l-4"><span>￥</span><span>{{vo.Products_PriceY}}</span></span>
        </slot>
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
import {
  getDomain
} from '@/common/helper'

export default {
  name: 'GoodsItem',
  props: {
    titleFontSize: {
      type: String,
      default: '14px'
    },
    coverRadius: {
      type: String,
      default: '0px'
    },
    // 文本几行
    titleRowNum: {
      type: Number,
      default: 2
    },
    marginBottom: {
      type: String,
      default: '10px'
    },
    marketPrice: {
      type: Boolean,
      default: false
    },
    sales: {
      type: Boolean,
      default: false
    },
    vo: {
      required: true,
      type: Object
    },
    // 可选值为left-right top-bottom 上下结构和左右结构
    mode: {
      type: String,
      default: 'left-right'
    },
    // 每行几个
    rowNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {}
  },
  computed: {
    titleBoxHeight () {
      const fontSize = parseInt(this.titleFontSize)
      return isNaN(fontSize) ? 'auto' : (fontSize * this.titleRowNum+ 'px')
    }
  },
  methods: {
    getDomainUrl:(url)=>getDomain(url)
  }
}
</script>
