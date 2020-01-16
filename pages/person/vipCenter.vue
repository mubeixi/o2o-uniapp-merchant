 <template>
	<div style="background-color: #ffffff">
		<div class="vip-center-top">
			<image src="/static/person/vipTopBg.png" class="imgFull"></image>

			<swiper class="vip-center" :indicator-dots="false" :autoplay="false"  :duration="1000"  @change="change">
				<!-- v-for="(item,index) of pro.levels" :key="index"  :style="pro.levels.length==1?'margin-left:43rpx;':''"-->
				<swiper-item class="vip-fir"  >
					<image src="/static/person/vip-bg.png" class="imgFull"></image>
					<image src="/static/canDel/top.png" class="vip-info"></image>
					<div class="vip-info-name">尖果儿</div>
					<div class="vip-card">网中网会员（年卡）</div>
					<div class="vip-time">有效期：365天</div>
					<div class="vip-gift">
						赠送10个5元红包，10个10元红包
					</div>
					<div class="vip-price font12 flex ">
						¥<div class="font15 vip-price-margin">98.00</div>
					</div>

					<div class="vip-prices font12 flex ">
						¥<div class="vip-price-margin">119.00</div>
					</div>


				</swiper-item>


			</swiper>
		</div>


        <div class="vip-privilege">
              <div class="vip-privilege-title">
                  VIP会员享特权
              </div>
              <div class="line-div"></div>
              <div class="vip-privilege-div flex ">
					<div class="vip-privilege-item">
						<image src="/static/person/1.png" class="vip-privilege-img"></image>
						<div class="font12 vip-privilege-item-div">
							专享价
						</div>
					</div>
				  <div class="vip-privilege-item">
					  <image src="/static/person/2.png" class="vip-privilege-img"></image>
					  <div class="font12 vip-privilege-item-div">
						  返现
					  </div>
				  </div>
				  <div class="vip-privilege-item">
					  <image src="/static/person/3.png" class="vip-privilege-img"></image>
					  <div class="font12 vip-privilege-item-div">
						  去广告
					  </div>
				  </div>
				  <div class="vip-privilege-item" style="margin-right: 0px">
					  <image src="/static/person/4.png" class="vip-privilege-img"></image>
					  <div class="font12 vip-privilege-item-div">
						  聊弹幕
					  </div>
				  </div>
				  <div class="vip-privilege-item">
					  <image src="/static/person/5.png" class="vip-privilege-img"></image>
					  <div class="font12 vip-privilege-item-div">
						  资源
					  </div>
				  </div>
				  <div class="vip-privilege-item">
					  <image src="/static/person/6.png" class="vip-privilege-img"></image>
					  <div class="font12 vip-privilege-item-div">
						  赚钱
					  </div>
				  </div>
				  <div class="vip-privilege-item">
					  <image src="/static/person/7.png" class="vip-privilege-img"></image>
					  <div class="font12 vip-privilege-item-div">
						  专门客服
					  </div>
				  </div>
				  <div class="vip-privilege-item" style="margin-right: 0px">
					  <image src="/static/person/8.png" class="vip-privilege-img"></image>
					  <div class="font12 vip-privilege-item-div">
						  敬请期待
					  </div>
				  </div>


              </div>
        </div>

		<div class="vip-privilege vip-coupon">
			<div class="vip-privilege-title">
				会员红包
			</div>
			<div class="line-div"></div>
			<div class="vip-coupon-div flex">
				<div class="vip-coupon-item">
					<image src="/static/person/vip-coupon.png" class="vip-coupon-img"></image>
					<div class="vip-coupon-price flex font13 flex-vertical-center">
						¥
						<div class="font18" style="margin-left: 1px">5</div>
						<div class=" vip-coupon-price-div">全场通用</div>
					</div>
					<div class="vip-coupon-use">
						满50可用
					</div>
				</div>


			</div>

		</div>

		<div class="vip-privilege-title">
			会员专属
		</div>
		<div class="line-div"></div>
		<div class="vip-list flex flex-between">
			<div class="vip-list-item">
				<image src="/static/canDel/top.png" class="vip-list-img"></image>
				<div class="vip-list-item-title font12">
					豪华双人牛排套餐果木厚烤特选牛排黑椒牛排豪华双人牛排套餐果木厚烤特选牛排黑椒牛排豪华双人牛排套餐果木厚烤特选牛排黑椒牛排
				</div>
				<div class="vip-list-div-imgs">
					<image src="/static/person/vip-value.png" class="vip-list-imgs"></image>
					<div class="vip-sheng">
						会员省10元
					</div>
				</div>

				<div class="vip-list-price flex font12">
					¥<div class="price-left">155.00</div><div class="price-right">¥ 269.00</div>
				</div>

			</div>

		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			change(e){
				console.log(e.detail.current)
			}
		}
	}
</script>

<style lang="scss" scoped>
.vip-center-top{
	width: 750rpx;
	height: 464rpx;
	position: relative;
}
.vip-center{
	position: absolute;
	top: 24px;
	left: 0px;
	width: 750rpx;
	height: 334rpx;
	.vip-fir{
		display: inline-block;
		position: relative;
		padding-left: 20px;
		width: 632rpx !important;
	}
	.vip-info{
		width: 35px;
		height: 35px;
		position: absolute;
		border-radius: 50%;
		overflow: hidden;
		top: 32rpx;
		left: 72rpx;
	}
	.vip-info-name{
		height: 14px;
		line-height: 14px;
		color: #846336;
		font-size: 14px;
		position: absolute;
		top: 52rpx;
		left: 158rpx;
	}
	.vip-card{
		font-size: 15px;
		height: 15px;
		line-height: 15px;
		color: #846336;
		position: absolute;
		top:130rpx ;
		left: 70rpx;
	}
	.vip-time{
		height: 12px;
		line-height: 12px;
		font-size: 12px;
		color: #B4915C;
		position: absolute;
		top: 176rpx;
		left: 72rpx;
	}
	.vip-gift{
		height:50rpx;
		line-height: 50rpx;
		padding:0px 7px;
		font-size: 11px;
		color: #B4915C;
		box-sizing: border-box;
		background:rgba(245,231,186,1);
		box-shadow:0px 2px 4px 0px rgba(217,167,53,0.33);
		border-radius:3px;
		position: absolute;
		top: 226rpx;
		left: 68rpx;
	}
	.vip-price{
		height: 12px;
		line-height: 12px;
		color: #846336;
		position: absolute;
		top: 136rpx;
		right: 40rpx;
	}
	.vip-prices{
		height: 9px;
		line-height: 9px;
		color: #B4915C;
		position: absolute;
		top: 180rpx;
		right: 40rpx;
		text-decoration:line-through
	}
	.vip-price-margin{
		margin-left: 3px;
	}


}

.vip-privilege{
    margin: 0 auto;
	margin-bottom: 48rpx;
    margin-top: 30px;
    width:710rpx;
    padding: 15px 25px 5px 25px;
    box-sizing: border-box;
    background:#ffffff;
    box-shadow:0px 0px 9px 0px rgba(0, 0, 0, 0.15);
    border-radius:5px;
}
.vip-privilege-title{
    height:34rpx;
    line-height: 34rpx;
    font-size:18px;
    font-weight:bold;
    color:rgba(212,183,123,1);
    background:linear-gradient(0deg,rgba(101,101,101,1) 0%, rgba(203,168,123,1) 0%, rgba(99,63,32,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    text-align: center;
    margin-bottom: 7px;
}
.line-div{
    width:40rpx;
    height:8rpx;
    background:linear-gradient(90deg,rgba(101,101,101,1),rgba(203,168,123,1),rgba(99,63,32,1));
    border-radius:2px;
    margin: 0 auto;
}
.vip-privilege-div{
    padding-top: 20px;
	flex-wrap: wrap;
}
.vip-privilege-item{
	width: 88rpx;
	display: flex;
	flex-flow: column;
	padding-bottom: 14px;
	margin-right: 86rpx;
}
.vip-privilege-img{
	width: 88rpx;
	height: 88rpx;
}
.vip-privilege-item-div{
	margin-top: 15px;
	height: 12px;
	line-height: 12px;
	width: 88rpx;
	text-align: center;
}

.vip-coupon{
	padding-left: 10rpx;
	padding-right: 10rpx;
}
.vip-coupon-div{
	padding-top: 34rpx;
	padding-bottom: 14rpx;
	flex-wrap: wrap;
}
.vip-coupon-item{
	margin-bottom: 30rpx;
	position: relative;
}
.vip-coupon-price{
	color: #78482F;
	position: absolute;
	top: 20rpx;
	left: 52rpx;
	height: 26rpx;
	line-height: 26rpx;
}
.vip-coupon-price-div{
	height: 10px;
	line-height: 10px;
	font-size: 10px;
	margin-left: 2px;
}
.vip-coupon-use{
	height:20px;
	line-height:20px;
	background-color: #DAAF61;
	box-sizing: border-box;
	border-radius: 20px;
	padding-left: 4px;
	padding-right: 4px;
	font-size:8px;
	color: #ffffff;
	position: absolute;
	top: 62rpx;
	left: 60rpx;
}
.vip-coupon-img{
	width: 224rpx;
	height: 170rpx;
}

.vip-list{
	width: 750rpx;
	padding: 40rpx 30rpx 68rpx 30rpx;
	box-sizing: border-box;
	flex-wrap: wrap;
}
.vip-list-item{
	width: 330rpx;
	margin-bottom: 40rpx;
}
.vip-list-img{
	width: 330rpx;
	height: 330rpx;
}
.vip-list-item-title{
	margin-top: 18rpx;
	margin-bottom: 18rpx;
	width: 310rpx;
	height: 52rpx;
	line-height: 26rpx;
	color: #333333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.vip-list-imgs{
	width: 190rpx;
	height: 30rpx;
}
.vip-list-div-imgs{
	width: 190rpx;
	height: 30rpx;
	position: relative;
}
.vip-sheng{
	height: 10px;
	line-height: 10px;
	font-size: 10px;
	color: #1B0D0D;
	position: absolute;
	top: 6rpx;
	left: 66rpx;
}
.vip-list-price{
	margin-top: 18rpx;
	height: 26rpx;
	line-height: 26rpx;
	color: #E41515;
	align-items: baseline;
}
.price-left{
	font-size: 17px;
	margin-left: 2px;
}
.price-right{
	margin-left: 10px;
	text-decoration:line-through;
	color: #afafaf;
}


</style>
