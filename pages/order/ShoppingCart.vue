<template>
	<div>
		<div class="content">
			<div class="cartbox" >
				<div class="order_msg" >
					<div class="biz_msg">
						<div class="item-cart" >
							<layout-icon type="iconicon-check" size="18" color="#F43131"></layout-icon>
						</div>
						<img src="https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202001051047432513.jpg" class="biz_logo" />
						<text class="biz_name">名字</text>
					</div>
							<div class="pro">
								<div class="item-cart" >
									<layout-icon type="iconradio" size="18" color="#F43131"></layout-icon>
								</div>
								<img class="pro-img" src="https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202001051047432513.jpg" />
								<div class="pro-msg">
									<div class="pro-name">名字</div>
									<div class="attr" >
										<span>32</span>
									</div>
									<div class="pro-price">
										<span class="span">￥</span>{{attr.ProductsPriceX}}
										<span class="amount">
									  <span class="plus" :class="attr.Qty == 1 ? 'disabled' : ''" @click="updateCart(pro_id,attr_id,-1)">-</span>
									  <input class="attr_num" v-model="attr.Qty" type="number" @focus="setActiveAttr(pro_id,attr_id)" @blur="setAttrNum" />
									  <span class="plus" @click="updateCart(pro_id,attr_id,1)">+</span>
									</span>
									</div>
								</div>
							</div>
				</div>
			</div>
<!--			<div v-else class="none">-->
<!--				<image class="img" src="/static/box.png" />-->
<!--				<div><span>购物车空空如也</span><span class="tobuy" @click="gotoBuy">去逛逛</span></div>-->
<!--			</div>-->

	</div>
	</div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import  {CartList} from  '@/api/customer'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

	export default {
		mixins:[BaseMixin],
		components:{LayoutIcon},
		data() {
			return {
				CartList:[],
				bizList:[],
				total_count:'',
				total_price:'',

			};
		},
		methods:{
			async init(){
				let cart = await CartList({cart_key:'CartList'},{onlyData:true}).catch(e=>{throw Error(e.msg||'获取购物车产品失败')})

				this.total_count= cart.total_count;
				this.total_price= cart.total_price;
				//this.initCheck();
				this.CartList = cart.CartList;
				this.bizList = cart.biz_list;
			}
		},
		onShow(){
			this.init()
		}

	}
</script>

<style lang="scss" scoped>
	.wrap{
		background-color: #F8F8F8 !important;
		min-height: 100%;
		/* #ifdef APP-PLUS */
		//padding-top: var(--status-bar-height);
		/* #endif */
	}
	.status_bar{
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		background: white;
	}
	.nav-title {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 999;
		width: 100%;
		/* #ifdef APP-PLUS */
		top: var(--status-bar-height);
		/* #endif */
	}
	.space-div{
		padding-top: var(--status-bar-height);
		height: 86rpx;
		background: white;
	}
	.spaceDiv{
		height: 86rpx;
		background: #f8f8f8;
	}
	.content {
		/* #ifndef H5 */
		/*margin-top: 86rpx;*/
		/* #endif */
		padding-top: 30rpx;
		padding-bottom: 160rpx;

	}
	.cartbox{
		margin: 0 30rpx;
	}
	.van-checkbox {
		margin-right: 5px;
	}
	/* 订单信息 start */
	.order_msg {
		padding: 20rpx 19rpx 0px;
		background: #fff;
		overflow: hidden;
		//margin-bottom: 20px;
	}
	.biz_msg {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	.biz_logo {
		width: 70rpx;
		height: 70rpx;
		margin-right: 20rpx;
		border-radius: 35rpx;
	}
	.biz_name {
		font-size: 28rpx;
	}
	.pro {
		display: flex;
		margin-bottom: 50rpx;
	}
	.pro-msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.pro-img {
		width: 200rpx;
		height: 200rpx;
		margin-right: 32rpx;
	}
	.pro-name {
		font-size: 26rpx;
		margin-bottom: 18rpx;
		width: 390rpx;
		line-height: 28rpx;
		height: 56rpx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp:2;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}
	.attr {
		display: inline-block;
		height: 50rpx;
		line-height: 50rpx;
		color: #666;
		font-size: 24rpx;
		// padding: 0 20rpx;
		// margin: 25rpx 0 24rpx;
		span {
			padding: 14rpx 20rpx;
			margin: 25rpx 0 24rpx;
			background: #FFF5F5;
		}
	}
	.pro-price {
		color: #F43131;
		font-size: 36rpx;
	}
	.pro-price .span {
		font-size: 24rpx;
		font-style: normal;
	}
	.amount {
		float: right;
		display: flex;
		color: #666;
		height: 50rpx;
		width: 168rpx;
	}
	.amount {
		.attr_num {
			width: 72rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 28rpx;
			text-align: center;
			border: 1px solid #D1D1D1 {
				left: 0;
				right: 0;
			};
			box-sizing: border-box;
			min-height: 0;
		}
	}
	.plus {
		width: 48rpx;
		height: 50rpx;
		border: 1px solid #D1D1D1;
		text-align: center;
		line-height: 50rpx;
		box-sizing: border-box;
		&.disabled {
			background: #efefef;
		}
	}
	/* 订单信息 end */
	/* 猜你喜欢 */
	.container{
		margin-top: 30rpx;
		padding: 0 20rpx;
	}
	.fenge {
		text-align: center;
		padding: 30rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.caini{
		font-size: 30rpx;
		margin-left: 13rpx;
		margin-right: 13rpx;
	}
	.prolist {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.pro-item {
		width: 48%;
		margin-bottom: 15px;
		background: #fff;
	}
	.pro-item img {
		width: 345rpx;
		height: 345rpx;
	}
	.item-name {
		font-size: 24rpx;
		padding: 0 10rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.red {
		background-color: #F43131;
		display: inline-block;
		height: 3rpx;
		width: 44rpx;
	}
	.price {
		margin-top: 20rpx;
		padding: 0 10rpx 20rpx;
	}
	.n_price {
		color: #ff0000;
		font-size: 34rpx;
		span{
			font-size: 24rpx;
		}
	}
	.o_price {
		margin-left: 15rpx;
		color: #afafaf;
		font-size: 24rpx;
		text-decoration: line-through;
	}
	/* 购物车为空 */
	.none {
		text-align: center;
		margin-bottom: 40rpx;
		color: #B0B0B0;
		font-size: 26rpx;
	}
	.none .img {
		height: 220rpx;
		width: 200rpx;
	}
	.tobuy {
		color: #F43131;
		border: 2rpx solid #F43131;
		height: 50rpx;
		line-height: 50rpx;
		padding: 4rpx 20rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
	}
	/* 结算 */
	.checkout {
		position: fixed;
		bottom: 50px;
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		box-sizing: border-box;
	}
	// #ifdef  MP
	.checkout {
		bottom: 0;
	}
	// #endif
	// #ifdef APP-PLUS
	.checkout {
		bottom: 0;
	}
	// #endif
	.checkbtn {
		background: #F43131;
		color: #fff;
		width: 126rpx;
		text-align: center;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 28rpx;
		border-radius: 8px;
	}
	.total {
		flex: 1;
		text-align: right;
		margin-right: 40rpx;
		font-size: 26rpx;
	}
	.total>span {
		color: #F43131;
		font-size: 26rpx;
	}
	.total>span>span {
		font-style: normal;
		font-size: 32rpx;
	}
	.item-cart{
		display: flex;
		align-items: center;
		margin-right: 17rpx;
		font-size: 28rpx;
		.img{
			width: 34rpx;
			height: 34rpx;
		}
	}
</style>
