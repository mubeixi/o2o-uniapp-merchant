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
					<text class="font13 coupon-font">优惠券</text>
					<text class="font13 coupon-value">满100减20</text>
				</div>
				<div class="coupon-button font12">
					立即领取
				</div>
			</div>
		</div>
		<!--	团购	-->
		<div class="x-mx-auto line20 group-buy">
			<div class="group-title">团购</div>
			<div class="group-list flex ">
				<div class="group-left">
					<image src="/static/canDel/top.png" class="imgFull"></image>
				</div>
				<div class="group-right font14">
					<div class="group-right-title font14 line10">豪华双人套餐，提供免费WiFi豪华双人套餐，提供免费WiFi</div>
					<div class="group-sale font13">30天售562</div>
					<div class="group-price flex flex-vertical-center">
						<text class="price-q"><text class="price-w">￥</text>243.00</text>
						<text class="price-e">￥243.00</text>
					</div>
				</div>
			</div>
			<div class="group-more">
				查看更多>>
			</div>
		</div>
		<!--	评价	-->
		<div class="x-mx-auto line20 group-buy">
			<div class="group-title">评价</div>
			<div class="comment-list">
				<div class="comment flex flex-vertical-center flex-between">
					<div class="comment flex flex-vertical-center" >
						<image src="/static/canDel/top.png" class="comment-img"></image>
						<text class="comment-font">言冰云</text>
					</div>
					<div class="comment-time">
						2020-01-04
					</div>
				</div>
				<div class="comment-content font12">
					挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错，南瓜汤也很赞，饮品一般吧！满意，还会去
				</div>
				<div class="comment-img-lists">
					<image src="/static/canDel/top.png" class="comment-img-list"></image>
					<image src="/static/canDel/top.png" class="comment-img-list"></image>
					<image src="/static/canDel/top.png" class="comment-img-list"></image>
					<image src="/static/canDel/top.png" class="comment-img-list"></image>
					<image src="/static/canDel/top.png" class="comment-img-list"></image>
				</div>
			</div>
			<div class="group-more comment-more">
				查看更多>>
			</div>
		</div>

		<!--	附近吃喝玩乐	-->
		<div class="x-mx-auto line20 group-buy">
			<div class="group-title">附近吃喝玩乐</div>
			<div class="group-list flex ">
				<div class="group-left">
					<image src="/static/canDel/top.png" class="imgFull"></image>
				</div>
				<div class="group-right font14">
					<div class="nearby-list flex flex-between flex-vertical-center font14">
						<div class="nearby-title">
							马路边边串串香
						</div>
						<div>
							1.5km
						</div>
					</div>
					<div class="rate x-font-14 font14 flex flex-vertical-center  nearby-rate">
						<uni-rate value="4" max="5" active-color="#E41515" size='14' disabled="false"  margin="2"></uni-rate>
						<text class="rate-value rate-value-left font12">4.0评分</text>
					</div>
					<div class="nearby-cate">
						<div class="nearby-cate-value">
							火锅
						</div>
					</div>
					<div class="nearby-value">
						89元双人餐
					</div>
				</div>
			</div>
			<div class="group-more">
				查看更多>>
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
	.coupon-button{color: #FFFFFF;width: 60px;text-align: center;height: 22px;line-height: 22px;border-radius: 3px;background-color: #E41515}
	.coupon-font{margin-right: 9px;color: #333333;height: 13px;line-height: 13px;}
	.coupon-value{height: 13px;line-height: 13px;color: #E41515}
	.group-buy{width: 710rpx;border-radius: 5px;box-sizing: border-box;padding-left: 14px;padding-right: 14px;background-color: #ffffff;}
	.group-title{font-size: 15px;color: #333333;font-weight: bold;padding-top: 14px;padding-bottom: 13px;height: 14px;line-height: 14px;}
	.group-list{width: 100%;padding-bottom: 15px;}
	.group-left{width: 150rpx;height: 150rpx;margin-right: 13px}
	.group-right{flex: 1;}
	.group-right-title{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 484rpx;
		padding-top: 6px;
		height: 15px;
		line-height: 15px;
		color: #333333;font-weight: bold;}
	.group-sale{
		line-height: 13px;
		height: 13px;
		color: #999999;
		margin-bottom: 12px;
	}
	.group-price{
		height: 13px;
	}
	.price-q{color: #E41515;font-size: 16px;font-weight: bold;}
	.price-w{font-size: 14px;font-weight: 500;}
	.price-e{text-decoration:line-through;color: #AEAEAE;font-size: 13px;margin-left: 10px;}
	.group-more{
		margin-top: 7px;
		width: 100%;
		text-align: center;
		font-size: 13px;
		color: #999999;
		padding-bottom: 15px;
	}
	.comment{
		height: 35px;
	}
	.comment-img{
		width: 35px;
		height: 35px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 12px;
	}
	.comment-font{
		font-size: 15px;
		color: #333333;
	}
	.comment-time{
		font-size: 13px;
		color: #777777;
	}
	.comment-content{
		width: 100%;
		box-sizing: border-box;
		padding-right: 19px;
		color: #333333;
		line-height: 18px;
		margin-top: 9px;
		margin-bottom: 15px;
	}

	.comment-img-list{
		width: 70px;
		height: 70px;
		margin-right: 10px;
	}
	.comment-list{
		padding-bottom: 15px;
		border-bottom: 1px solid #E8E8E8;
	}
	.comment-more{
		margin-top: 15px;
	}
	.nearby-list{
		height: 14px;
		width: 484rpx;
	}
	.nearby-title{
		flex: 1;
		height: 14px;
		line-height: 14px;
		margin-right: 10px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.nearby-rate{margin-top: 7px;margin-bottom: 0px !important;}
	.nearby-cate{
		height: 18px;
		margin-top: 8px;
		margin-bottom: 8px;
	}
	.nearby-value{
		color: #666666;
		font-size: 10px;
		height: 10px;
		line-height: 10px;
	}
	.nearby-cate-value{
		background-color: #FFF2F2;
		border-radius: 3px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		padding-left: 6px;
		padding-right: 5px;
		font-size: 10px;
		color: #E41515;
		width: fit-content;
		margin-right: 5px;
	}

</style>
