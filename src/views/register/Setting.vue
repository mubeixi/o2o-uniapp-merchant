<template>
    <div class="wrap">
        <div class="item flex flex-vertical-center">
            <div class="num text-center">1</div>
            <div class="box flex flex-between flex-vertical-center box-sizing">
                <div class="content">
                    <div class="c-title">注册供应商</div>
                    <div class="c-mid">快速一键注册</div>
                </div>
                <div class="btn dis text-center">已完成</div>
            </div>
        </div>
        <div class="item flex flex-vertical-center">
            <div class="num text-center">2</div>
            <div class="box flex flex-between flex-vertical-center box-sizing">
                <div class="content">
                    <div class="c-title">签署入驻协议</div>
                    <div class="c-mid">在线签署商家入驻协议</div>
                </div>
                <div class="btn dis text-center">已完成<span class="see">查看资料</span></div>
            </div>
        </div>
        <div class="item flex flex-vertical-center">
            <div class="num text-center">3</div>
            <div class="box flex flex-between flex-vertical-center box-sizing">
                <div class="content">
                    <div class="c-title">提交资质</div>
                    <div class="c-mid">提交企业资料和银行账户信息</div>
                </div>
                <div class="btn text-center">去提交</div>
            </div>
        </div>
        <div class="item flex flex-vertical-center">
            <div class="num text-center">4</div>
            <div class="box flex flex-between flex-vertical-center box-sizing">
                <div class="content">
                    <div class="c-title">付款</div>
                    <div class="c-mid">根据不同的入驻类目及入驻年限打款</div>
                </div>
                <div class="btn text-center">去付款</div>
            </div>
        </div>
        <div class="item flex flex-vertical-center">
            <div class="num text-center">5</div>
            <div class="box flex flex-between flex-vertical-center box-sizing">
                <div class="content">
                    <div class="c-title">入驻成功</div>
                    <div class="c-mid">恭喜您入驻成功！</div>
                </div>
                <div class="btn dis text-center">已完成</div>
            </div>
        </div>
        <div class="dotted"></div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        
    })
</script>

<style scoped lang="less">
    @primary-color:#409EFF;
    .wrap {
        width: 100%;
        height: 100%;
        background: #F8F8F8;
        padding: 64px 69px;
        min-width: 1400px;
    }
    .dotted {
        position: absolute;
        top: 122px;
        left: 84px;
        z-index: 10;
        // width: 1px;
        height: 582px;
        border-left: 1px dotted rgba(165,209,255,1);
    }
    .item {
        margin-bottom: 30px;
        .num {
            position: relative;
            z-index: 99;
            width: 30px;
            height: 30px;
            line-height: 30px;
            color: #fff;
            border-radius: 50%;
            background: @primary-color;
            margin-right: 43px;
        }
        .box {
            width: 1400px;
            min-width: 1200px;
            padding: 0 35px 0 39px;
            height: 115px;
            background: #fff;
        }
        .c-title {
            font-size: 18px;
            color: #303133;
        }
        .c-mid {
            font-size: 14px;
            color: #909399;
            margin-top: 15px;
        }
        .btn {
            position: relative;
            width:70px;
            height:33px;
            line-height: 33px;
            color: #fff;
            border-radius:3px;
            font-size: 14px;
            background: @primary-color;
            .see {
                position: absolute;
                bottom: -30px;
                left: 50%;
                width: 100%;
                transform: translateX(-50%);
                cursor: pointer;
                color: @primary-color;
                font-size: 14px;
            }
        }
        .dis {
            background:rgba(202,202,202,1);
        }
    }
</style>