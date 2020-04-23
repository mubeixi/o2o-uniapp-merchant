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

//如果父组件要覆盖样式，那么自己用deep就好了
.product-cover{
  @include cover-img();
  width: 300rpx;
  height: 300rpx;
}
</style>
<template>
  <div class="product-panel" :class="[mode]">
    <slot name="cover">
      <div class="product-cover" :style="{backgroundImage:'url('+item.ImgPath+')'}" ></div>
    </slot>
    <div class="product-info">
      <slot name="title"><div class="title">{{vo.Products_Name}}</div></slot>
      <slot name="sales"><div class="sales">已售{{vo.Products_Sales}}件</div></slot>
      <div>
        <slot name="sellingPrice">
          <span class="price-selling fz-12"><span>￥</span><span class="fz-14">{{vo.Products_PriceX}}</span></span>
        </slot>
        <slot name="marketPrice">
          <span class="price-market fz-12 text-through"><span>￥</span><span class="fz-14">{{vo.Products_PriceY}}</span></span>
        </slot>
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsItem',
  props: {
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
  methods: {}
}
</script>
