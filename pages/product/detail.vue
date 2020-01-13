<template>
    <div style="padding-bottom: 98rpx">
        <div>
            <swiper
                class="swiper"
                indicator-dots="true"
                autoplay="autoplay"
                interval="3000"
                indicator-color="rgba(0,0,0,.2)"
                indicator-active-color="rgba(255,0,0,.8)"
            >
                <swiper-item>
                    <image src="/static/canDel/hg.png" class="image"></image>
                </swiper-item>
            </swiper>
        </div>
        <div class="padding10-c marginY10 box-sizing bg-white">
            <div class="flex flex-between flex-vertical-center">
                <div class="price">
                    <text class="font12">￥</text><text class="font18 marginR5">189.00</text>
                    <text class="font12 graytext">￥219.00</text>
                </div>
                <div class="collectNum padding5-10 box-sizing">
                    <image src="/static/business/star.png" class="xing"></image>
                    <text class="font12">1568人收藏</text>
                </div>
            </div>
        </div>
        <div class="bg-white padding10-c font16 fontweight700 ">瀚海海尚店小龙坎老火锅正宗经典重庆老火锅麻辣菌汤多种口味聚会2-3人餐</div>
        <div class="bg-white padding15-10 flex flex-vertical-center ">
            <div class="tag flex flex-vertical-center font12">
                <image src="/static/business/select.png" class="select">
                <text>随时退款</text>
            </div>
            <div class="tag flex flex-vertical-center font12">
                <image src="/static/business/select.png" class="select">
                <text>节假日通用</text>
            </div>
            <div class="tag flex flex-vertical-center font12">
                <image src="/static/business/select.png" class="select">
                <text>免预约</text>
            </div>
        </div>
        <div class="line"></div>
        <div class="bg-white padding15-10 flex flex-vertical-center flex-between">
            <div>
                <image class="buddy-img" src="/static/canDel/hg.png"></image>
                <image class="buddy-img buddy-img-margin" src="/static/canDel/hg.png"></image>
                <image class="buddy-img buddy-img-margin" src="/static/canDel/hg.png"></image>
                <image class="buddy-img buddy-img-margin" src="/static/canDel/hg.png"></image>
                <image class="buddy-img buddy-img-margin" src="/static/canDel/hg.png"></image>
            </div>
            <div class="buddy font12">邀请好友一起抢</div>
        </div>
        <div class="line-div"></div>

        <div class="business-info padding10-r">
                <div class="business-title flex flex-vertical-center">
                        <div class="title-div"></div>
                        <div class="business-title-h2">商家信息</div>
                </div>

                <div class="business-info-title font12">
                    小龙坎（瀚海海尚店）
                </div>
                <div class="business-info-address">
                    <div class="business-address-time flex-vertical-center flex">
                        营业时间：<text>10:10-11：00</text>
                    </div>
                    <div class="business-address-time flex-vertical-center flex">
                        商家电话：<text>0371-6566111</text> <image src="/static/business/callIcon.png" class="callIcon"></image>
                    </div>
                    <div class="business-address-time flex-vertical-center flex">
                        商家地址：<text>郑州市金水区哈哈哈哈</text> <image src="/static/icon/addressIcon.png" class="addressIcon"></image>
                    </div>
                </div>
        </div>
        <div class="line-div"></div>

        <div class="business-info padding10-r">
        <div class="business-title flex flex-vertical-center">
            <div class="title-div"></div>
            <div class="business-title-h2">购买须知</div>
        </div>
        <div class="business-info-address xuzhi">
            <div> 有效期2019.6.14 至 2020.1.12 23:59</div>
            <div>不可用日期周五至周日，法定节假日不可用</div>
            <div>使用时间营业时间内可用</div>
            <div> 使用规则无需预约，消费高峰期可能需要等位</div>
        </div>
    </div>
        <div class="line-div"></div>

        <div class="business-info padding10-r">
            <div class="business-title flex flex-vertical-center">
                <div class="title-div"></div>
                <div class="business-title-h2">商家详情</div>
            </div>

        </div>

        <bottom></bottom>
    </div>
</template>

<script>
    import {pageMixin} from "../../common/mixin";
    import  bottom from '../../components/bottom/bottom'
    export default {
        mixins:[pageMixin],
        components: {bottom},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
    .title-div{
        width: 4px;
        height: 16px;
        background-color: $wzw-bg-primary;
        border-radius: 2px;
    }
    .line-div{
        width: 100%;
        height: 10px;
    }
    .bg-white{
        background-color: #ffffff;
    }
    .marginY15 {
        margin: 15px 0;
    }
    .padding15-10 {
        padding: 15px 10px;
    }
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
        border-radius: 15px;
    }
    .xing {
        width: 12px;
        height: 12px;
        margin-right: 5px;
    }
    .tag {
        margin-right: 20px;
        .select {
            width: 14px;
            height: 14px;
            margin-right: 5px;
        }
    }
    .line {
        height: 1px;
        width: 710rpx;
        margin: 0 auto;
        background: #E8E8E8;
    }
    .buddy{
        width:100px;
        height:26px;
        text-align: center;
        background-color: $wzw-bg-primary;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:26px;
        border-radius:13px;
    }
    .buddy-img{
        width: 23px;
        height: 23px;
        border-radius: 50%;
        overflow: hidden;
    }
    .buddy-img-margin{
        // margin-left: -2px;
        margin-right: -2px;
    }
    .business-info{
        width: 750rpx;
        padding-left: 10px;
        padding-bottom: 15px;
        background-color: #ffffff;
    }
    .business-title{
        height: 16px;
        margin-bottom: 15px;
    }
    .business-title-h2{
        height: 15px;
        line-height: 15px;
        color: #333333;
        font-weight: bold;
        font-size: 15px;
        margin-left: 9px;
    }
    .business-info-title{
        margin-bottom: 12px;
        height: 14px;
        line-height: 14px;
        color: #333333;
    }
    .business-info-address{
        color: #777777;
        font-size: 13px;
    }
    .callIcon{
        width: 11px;
        height: 14px;
        margin-left: 8px;
    }
    .addressIcon{
        width: 13px;
        height: 16px;
        margin-left: 8px;
    }
    .business-address-time{
        line-height: 21px;
    }

    .xuzhi{
        color: #777777;
        line-height: 23px;
        font-size: 13px;
    }
    .padding15-10{
        padding: 15px 10px;
    }

</style>
