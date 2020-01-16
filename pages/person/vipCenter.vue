 <template>
	<div>
		<div class="vip-center-top">
			<image src="/static/person/vipTopBg.png" class="imgFull"></image>

			<swiper class="vip-center" :indicator-dots="false" :autoplay="false"  :duration="1000" :current="inds" @change="change">
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

	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
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



</style>
