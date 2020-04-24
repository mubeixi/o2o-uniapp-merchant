<template>
	<div>
		<div class="content">
			<div class="cartbox" v-if="total_count>0">
				<div class="order_msg"   v-for="(pro,index) in CartList" :key="index">
					<div class="biz_msg">
						<div class="item-cart" >
							<layout-icon  v-if="bizCheck[pro]" type="iconicon-check" size="18" color="#F43131"></layout-icon>
							<layout-icon  v-else type="iconradio" size="18" color="#ccc"></layout-icon>
						</div>
						<img :src="bizList[index].biz_logo" class="biz_logo" />
						<text class="biz_name">{{bizList[index].biz_shop_name}}</text>
					</div>
					<block v-for="(proList,ind) in pro" :key="ind">
						<block>
							<div class="pro" v-for="(item,indx) in proList" :key="indx">
								<div class="item-cart" @click="selectItem(index,ind,indx)">
									<layout-icon v-if="item.checked" type="iconicon-check" size="18" color="#F43131"></layout-icon>
									<layout-icon v-else type="iconradio" size="18" color="#ccc"></layout-icon>
								</div>
								<img class="pro-img" :src="item.ImgPath" />
								<div class="pro-msg">
									<div class="pro-name">{{item.ProductsName}}</div>
									<div class="attr"  v-if="item.Productsattrstrval">
										<span>{{item.Productsattrstrval}}</span>
									</div>
									<div class="pro-price">
										<span class="span">￥</span>{{item.ProductsPriceX}}
										<span class="amount">
									  <span class="plus" :class="item.Qty == 1 ? 'disabled' : ''"  @click="updateCart(ind,indx,-1,index)">-</span>
									  <input class="attr_num" v-model="item.Qty" type="number" />
<!--											 @focus="setActiveAttr(ind,indx,item)" @blur="setAttrNum"-->
									  <span class="plus" @click="updateCart(ind,indx,1,index)">+</span>
									</span>
									</div>
								</div>
							</div>
						</block>
					</block>
				</div>
			</div>
			<div v-else class="none">
				<image class="img" src="/static/box.png" />
				<div><span>购物车空空如也</span><span class="tobuy" @click="gotoBuy">去逛逛</span></div>
			</div>

		</div>


		<div class="checkout" >
			<div class="item-cart " >
				<layout-icon type="iconradio" size="18" color="#ccc" class="m-r-5"></layout-icon>
				<span>全选</span>
			</div>
			<div class="total" >合计：<span>￥<span>{{totalPrice}}</span></span></div>
			<div class="checkbtn" @click="submit">结算 </div>
		</div>

	</div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import  {CartList} from  '@/api/customer'
import  {updateCart} from  '@/api/order'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import Storage from  '@/common/Storage'
import { toast,error } from '@/common/fun'

	export default {
		mixins:[BaseMixin],
		components:{LayoutIcon},
		data() {
			return {
				CartList:[],
				bizList:[],
				total_count:'',
				total_price:'',
				allCheck:false,
				bizCheck:{},//商家的选择
				totalPrice:0,//选中总计
			};
		},
		watch:{
			CartList:{
				handler(newValue, oldValue) {
					console.log(oldValue,newValue,"ss")
				},
				deep: true
			}
		},
		methods:{
			async updateCart(pid,attrId,skuQty,bizId){
				if(this.CartList[bizId][pid][attrId].Qty==1){
					error('数量最少为1件')
					return
				}

				let data={
					cart_key:'CartList',
					prod_id:pid,
					attr_id:attrId,
					qty:skuQty
				}
				let cart=await  updateCart(data,{onlyData: true,tip:'加载中'}).catch(e=>{throw  Error(e.msg||'修改失败')})
				this.total_count= cart.total_count;
				this.total_price= cart.total_price;
				this.CartList = cart.CartList;
				this.bizList = cart.biz_list;
				this.initCheck();
			},
			selectItem(bizId,pid,attr_id){
				this.CartList[bizId][pid][attr_id].checked=true
				//this.$set(this.CartList[bizId][pid][attr_id],'checked',true)
				console.log(bizId,pid,attr_id,"ssss",this.CartList[bizId][pid][attr_id]['checked'])

			},
			//初始化 选中状态
			initCheck(){
				this.allCheck=true
				for(let i in this.CartList) {
					let biz_check=Storage.get(i)
					this.bizCheck[i]=biz_check?biz_check:false
					for(let j in this.CartList[i]) {
						for(let k in this.CartList[i][j]) {
							let attr_id=Storage.get((j+";"+k))
							this.CartList[i][j][k].checked = attr_id?attr_id:false
							if(!this.CartList[i][j][k].checked){
								this.allCheck=false
							}
						}
					}
				}
				this.SumPrice();

			},
			//计算总价格
			SumPrice(){
				let total = 0;
				this.totalPrice = 0;
				for(let i in this.CartList) {
					for(let j in this.CartList[i]) {
						for(let k in this.CartList[i][j][k]){
								let attr_id=Storage.get((j+";"+k))
								let result =attr_id?attr_id:false
								this.CartList[i][j][k].checked = result;
								if(this.CartList[i][j][k].checked) {
									total += this.CartList[i][j][k].ProductsPriceX *  this.CartList[i][j][k].Qty;
								}
						}
					}
				}
				this.totalPrice = Number(total).toFixed(2) ;
			},
			async init(){
				let cart = await CartList({cart_key:'CartList'},{onlyData:true,tip:'加载中'}).catch(e=>{throw Error(e.msg||'获取购物车产品失败')})
				this.total_count= cart.total_count;
				this.total_price= cart.total_price;
				this.CartList = cart.CartList;
				this.bizList = cart.biz_list;
				this.initCheck();
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
