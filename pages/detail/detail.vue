<template>
    <div>
        <div>
            <swiper class="swiper" indicator-dots="true" autoplay="autoplay" interval="3000" indicator-color="rgba(0,0,0,.2)" indicator-active-color="rgba(255,0,0,.8)">
                <swiper-item>
                    <image src="/static/canDel/hg.png" class="image"></image>
                </swiper-item>
            </swiper>
        </div>
        <div class="padding10-c marginY10 box-sizing">
            <div class="flex flex-between flex-vertical-center">
                <div class="price">
                    <text class="font12">￥</text><text class="font18 marginR5">189.00</text>
                    <text class="font12 graytext">￥219.00</text>
                </div>
                <div class="collectNum padding5-10 box-sizing">
                    <image src="/static/detail/favorite-a.png" class="xing"></image>
                    <text class="font12">1568人收藏</text>
                </div>
            </div>
        </div>
        <div class="padding10-c font16 ">瀚海海尚店小龙坎老火锅正宗经典重庆老火锅麻辣菌汤多种口味聚会2-3人餐</div>
    </div>
</template>

<script>
    import {pageMixin} from "../../common/mixin";
    export default {
        mixins:[pageMixin],
        components: {},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
    .swiper {
        width: 750rpx;
        height: 750rpx;
        .image {
            width: 100%;
            height: 100%;
        }
    }
    .price {
        color: $wzw-color-price-selling;

    }
    .collectNum {
        text-align: center;
        background: #FFEAEA;
        color: $wzw-color-price-selling;
        border-radius: 12px;
    }
    .xing {
        width: 12px;
        height: 12px;
    }
</style>
