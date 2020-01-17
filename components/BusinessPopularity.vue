<template>
    <div class="business-popularity">
        <div class="first-div flex">
            <div class="first-div-img">
                <image src="/static/canDel/top.png" class="imgFull"></image>
            </div>
           <div class="first-div-div">
               <div >
                   <div class="first-div-top flex flex-between flex-vertical-center">
                       <div class="font15">
                           蒙牛旗舰店
                       </div>
                       <div class="font14">
                           进入商家
                           <text class="wzwicon iconright" style="margin-left: 8rpx"></text>
                       </div>
                   </div>
               </div>
               <div class="first-div-bottom">
                   全场满300包邮，1300封顶
               </div>
           </div>
        </div>

        <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
            <div  class="scroll-view-item_H" v-for="item of 10">
                <div class="scroll-img">
                    <image src="/static/canDel/top.png" class="imgFull"></image>
                </div>
                <div class="scroll-text font12">
                    蒙牛纯甄风味酸牛奶蒙牛纯甄风味酸牛奶
                </div>
                <div class="flex flex-vertical-center">
                        <div class="font12 priceq">
                            ￥89.99
                        </div>
                        <div class="pricew">
                            ￥119.00
                        </div>
                </div>

            </div>

        </scroll-view>

    </div>
</template>

<script>

    export default {
        props: {
            list: {
                type: Array,
                default: []
            }
        },
        data() {
            return {

            }
        },
        methods:{

        }

    }
</script>

<style lang="scss" scoped>
    .business-popularity{
        padding: 20rpx 20rpx 40rpx 20rpx;
        width: 710rpx;
        margin: 0 auto;
        border-radius:20rpx;
        box-sizing: border-box;
        background-color: #ffffff;

    }
    .first-div{
        height: 86rpx;
        margin-bottom: 24rpx;
    }
    .first-div-img{
        width: 86rpx;
        height: 86rpx;
        border-radius: 50%;
        overflow: hidden;
    }
    .first-div-div{
        flex: 1;
        margin-left: 12rpx;
        margin-right: 6rpx;
    }
    .first-div-top{
        height: 50rpx;
        .font15{
            color: #000000;
            height: 30rpx;
            line-height: 30rpx;
        }
        .font14{
            color: #666666;
        }
    }
    .first-div-bottom{
        height: 34rpx;
        line-height: 32rpx;
        width: max-content;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        border: 1px solid #FF9C9C;
        text-align: center;
        font-size: 9px;
        color: #FF9C9C;
    }


    .scroll-view_H{
        width: 670rpx;
        white-space: nowrap;
    }
    .scroll-view-item_H{
        display: inline-block;
        width: 215rpx;
        margin-right: 18rpx;
        .scroll-img{
            width: 215rpx;
            height: 215rpx;
        }
        .scroll-text{
            width: 214rpx;
            height: 24rpx;
            line-height: 24rpx;
            margin-top: 14rpx;
            margin-bottom: 18rpx;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .priceq{
            color: #E41515;
            margin-right: 10rpx;
        }
        .pricew{
            font-size: 11px;
            text-decoration:line-through;
            color: #939393;
        }
    }
    /deep/ ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }


</style>
