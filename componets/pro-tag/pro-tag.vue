<template>
	<div class="product" @click="openNext">
		<image mode="heightFix" :src="pro_src" class="pro-img"></image>
		<div class="pro-name">{{pro_name}}</div>
		<div class="pro-price flex">
			<div class="new-price"><div class="small-font">￥</div>{{pro_price}}</div>
			<div class="old-price small-font">￥{{pro_price}}</div>
		</div>
	</div>
</template>
<script>
import {linkToEasy} from '@/common/fun'

export default {
  props: {
		prod_id: {
			type: String,
			default: ''
		},
    pro_src: {
      type: String,
	    default: ''
    },
	  pro_name: {
      type: String,
		  default: ''
	  },
	  pro_price: {
      type: [String,Number],
		  default: '0.00'
	  },
	  pro_price_old: {
      type: [String, Number],
		  default: '0.00'
	  }
  },
	methods:{
		openNext(){
			let url='/pages/product/detail?prod_id='+this.prod_id
			linkToEasy(url)
		}
	}
}
</script>
<style lang="scss" scoped>
	.product {
		width: 310rpx;
		margin-bottom: 50rpx;
		.pro-img {
			display: block;
			width: 100%;
			height: 310rpx;
		}
		.pro-name {
			font-size: 26rpx;
			color: #333;
			margin: 20rpx 0;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.pro-price {
			align-items: center;
		}
		.small-font {
			display: inline;
			font-size: 24rpx;
		}
		.new-price {
			color: #E41515;
			font-size: 34rpx;
			margin-right: 10rpx;
		}
		.old-price {
			color: #AFAFAF;
			text-decoration: line-through;
		}
	}
</style>
