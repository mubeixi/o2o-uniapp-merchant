<template>
	<div>
		<swiper class="swiper"  autoplay="autoplay" interval="3000"  >
<!--			indicator-dots="true" indicator-color="#fff" indicator-active-color="#999" 选中颜色 暂时注释-->
			<swiper-item>
				<image src="/static/canDel/top.png" class="imgFull"></image>
			</swiper-item>
		</swiper>
		<!--	轮播图下面全部 padding10px	-->
		<!-- 商家名称 评分	-->
		<div class="padding10-c">
			<div class="padding15-r">
				<div class="business-title x-font-18 font18">世家牛扒城</div>
			</div>
            <div class="rate x-font-14 font14 flex flex-vertical-center line15">
                <uni-rate value="4.2" max="5" active-color="#E41515" size='14' disabled="false"  margin="2"></uni-rate>
				<text class="rate-value rate-value-left">4.5评分</text>
				<text class="rate-value">人均￥98</text>
            </div>
		</div>
		<!--	商家地址	-->
		<div class="business-address x-mx-auto line20">
			<div class="business-time flex flex-vertical-center flex-between ">
				<div class="business-time-font">
					营业中 10:00-24:00
				</div>
				<div class="flex flex-vertical-center">
					<image class="storeIcon" src="/static/business/storeIcon.png"></image>
					<div class="lines"></div>
					<image class="callIcon" src="/static/business/callIcon.png"></image>
				</div>
			</div>
			<div class="address-font">
				河南省郑州市金水区文化路与任寨北街交叉口向西50米路北世家牛扒城
				<image src="static/icon/rightIconSmall.png" class="rightIconSmall"></image>
			</div>
		</div>
		<!--	领取优惠券	-->
		<div class="coupon x-mx-auto line20">
			<div class="flex-vertical-center flex flex-between couponDetail">
				<div>
					<text>优惠券</text>
					<text>满100减20</text>
				</div>
				<div class="coupon-button font12">
					立即领取
				</div>
			</div>
		</div>

	</div>
</template>

<script>
    import {pageMixin} from "../../common/mixin";
    import uniRate from "../../components/uni-rate/uni-rate.vue"
	export default {
        mixins:[pageMixin],
        components: {uniRate},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.swiper{
		width: 750rpx;
		height: 400rpx;
	}
	.business-title{
		color: #333333;
		font-weight: bold;
		height: 17px;
		line-height: 17px;
	}
    .rate{
        height: 14px;
        width: 100%;
        color: #666666;
    }
    .rate-value{
        height: 13px;
		line-height: 13px;
    }
	.rate-value-left{
		margin-left: 6px;
		margin-right: 13px;
	}
	.business-address{
		width: 710rpx;
		padding: 15px 15px 15px 13px;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 5px;
		.business-time{
			height: 15px;
			margin-bottom: 14px;
			.business-time-font{font-size: 13px;height: 13px;color: #333333;line-height: 13px}
			.storeIcon{width: 18px;height: 15px}
			.callIcon{width: 13px;height: 15px}
			.lines{width: 1px;height: 14px;background-color: #DADADA;margin-left: 12px;margin-right: 12px}
		}
	}
	.rightIconSmall{width: 8px;height: 12px;margin-left: 10px}
	.address-font{font-size: 13px;color: #333333;line-height: 20px;}
	.coupon{width: 710rpx;padding: 10px 15px 10px 12px;background-color: #ffffff;border-radius: 5px;box-sizing: border-box;}
	.couponDetail{height: 22px;}
	.coupon-button{color: #FFFFFF;width: 60px;text-align: center;height: 22px;line-height: 22px;border-radius: 3px}

</style>
