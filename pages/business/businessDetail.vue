<template>
	<div>
		<swiper class="swiper" indicator-dots="true" autoplay="autoplay" interval="3000"  >
<!--			indicator-color="#fff" indicator-active-color="#999" 选中颜色 暂时注释-->
			<swiper-item>
				<image src="/static/canDel/top.png" class="imgFull"></image>
			</swiper-item>
		</swiper>
		<!--	轮播图下面全部 padding10px	-->
		<div class="padding10-c">
			<div class="padding15-r">
				<div class="businessTitle x-font-18">世家牛扒城</div>
			</div>
            <div class="rate x-font-14 flex flex-vertical-center">
                <uni-rate value="4.2" max="5" active-color="#E41515" size='14' disabled="false"  margin="2"></uni-rate>
				<text class="rateValue">4.5评分</text>
				<text class="rateValue">人均￥98</text>
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
	.businessTitle{
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
    .rateValue{
        height: 13px;
    }


</style>
