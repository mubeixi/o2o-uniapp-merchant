<template>
	<view v-if="isShow">
		<layout-popup  ref="productSku"  :showPop="true"  @maskClicked="close">
		<!-- 	<div class="cartSku">
				<div class="cartTop">
					<image  class="image" @click="yulanDetail" :src="skuImg?skuImg+'-r200':(product.Products_JSON.ImgPath[0]?product.Products_JSON.ImgPath[0]+'-r200':'')" ></image>
					<div class="cartTitle">
						<div class="cartTitles">{{product.Products_Name}}</div>
						<div class="addInfo">
							<div class="addPrice">{{postData.productDetail_price}}元</div>
							<div class="proSale">库存{{postData.count}}</div>
						</div>
					</div>
				</div>
				<div class="cartCenter">
					<div class="cartAttr" v-for="(item,i) of product.skujosn_new" :key="i">
						<div class="sku">
							{{item.sku}}
						</div>
						<div class="skuValue" v-if="gift == 0">
							<div class="skuview" :class="check_attr[item.sku]==index?'skuCheck':''" @click="selectAttr(index,item.sku)"  v-for="(mbx,index) of item.val" :key="index">{{mbx}}</div>
						</div>
						<div class="skuValue" v-else>
							<div class="skuview" :class="skuval[i]==index?'skuCheck':'unablechoose'"  v-for="(mbx,index) of item.val" :key="index">{{mbx}}</div>
						</div>
					</div>
				</div>
				<div class="numBer" v-if="gift == 0">
					<div class="numBers">
						数量
					</div>
					<div class="inputNumber">
							<div class="clicks" @click="delNum">-</div>
							<input class="inputq"  type="number" v-model="postData.qty" @blur="setCount">
							<div class="clicks" @click="addNum">+</div>
					</div>
				</div>
				<div class="numBer" v-else>
					<div class="numBers">
						数量
					</div>
					<div class="inputNumber">
							<div class="clicks">-</div>
							<input class="inputq"  type="number" value="1"  disabled>
							<div class="clicks">+</div>
					</div>
				</div>
			</div>
			<form report-submit @submit="skuSub">
			<button formType="submit" class="cartSub"  :class="submit_flag?'':'disabled'">
				确定
			</button>
			</form> -->
			55
		</layout-popup>
	</view>
</template>

<script>

import layoutPopup from '@/componets/layout-popup/layout-popup.vue'
export default {
  components: { layoutPopup },
  props: {
    proList: {
      type: Object,
      default: {}
    }
  },
  watch: {
    proList: {
			  handler (newVal, oldVal) {
				  console.log(newVal, 'ss')
			   this.list = newVal
			  }
    }
  },
  data () {
    return {
      isShow: false,
      list: {}
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cartSku{
		padding: 0rpx 20rpx;
		.cartTop{
			position: relative;
			display: flex;
			padding-top: 20rpx;
			.image{
				width: 220rpx;
				height: 220rpx;
			}
			.cartTitle{
				margin-left: 20rpx;
				font-size: 32rpx;
				//width: 420rpx;
				flex: 1;
				.cartTitles{
					height: 80rpx;
					overflow: hidden;
					margin-top: 20rpx;
					line-height: 40rpx;
				}
				.addInfo{
					width: 450rpx;
					margin-top: 70rpx;
					display: flex;
					flex-flow: row;
					justify-content: space-between;
					align-items: flex-end;
					.addPrice{
						font-size: 42rpx;
						color: #ff4200;
					}
					.proSale{
						font-size: 24rpx;
						color: #999;
						justify-content: flex-end;
					}
				}
			}
		}
		.cartCenter{
			margin-top: 20rpx;
			.cartAttr{
				//display: flex;
				padding: 15rpx 0rpx;
				.sku{
					font-size: 28rpx;
					height: 70rpx;
					line-height: 70rpx;
					width: 140rpx;
					padding-left: 10px;
					margin-bottom: 5px;
				}
				.skuValue{
					display: flex;
					//flex:1;
					flex-wrap: wrap;
					.skuview{
						margin-bottom: 10px;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 14px;
						border-radius: 10rpx;
						color: #000;
						background-color: #F2F2F2;
						padding-left: 20rpx;
						padding-right: 20rpx;
						margin-right: 20rpx;
						//border: 1px solid #ccc;
					}
					.unablechoose {
						background: #ddd;
					}
				}
			}
		}
		.numBer{
			margin-top: 20rpx;
			display: flex;
			padding: 15rpx 0rpx;
			justify-content: space-between;
			.numBers{
				font-size: 28rpx;
				height: 70rpx;
				line-height: 70rpx;
				width: 140rpx;
			}
			.inputNumber{
				border: 1px solid #ccc;
				border-radius: 6rpx;
				height: 50rpx;
				//margin-right: 50rpx;
				display: flex;
				.inputq{
					color: black;
					margin: 0 auto;
					width: 80rpx;
					height: 50rpx;
					text-align: center;
					font-size: 24rpx;
					border-left: 2rpx solid #ccc;
					border-right: 2rpx solid #ccc;
				}
				.clicks{
					height: 50rpx;
					line-height: 50rpx;
					width: 60rpx;
					text-align: center;
				}
			}
		}
	}
	.cartSub{
		width: 100%;
		height: 90rpx;
		background-color: #F43131;
		font-size:20px;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		margin-top: 30rpx;
		border-radius: 0;
		border: none;
		&.disabled {
			background: #999;
		}
	}
	.skuCheck{
		color: #fff !important;
		background-color: #ff4200 !important;
	}

</style>
