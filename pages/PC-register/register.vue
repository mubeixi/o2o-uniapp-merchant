<template>
    <div class="wrap">
        <div class="top">
            <div class="top-img">
                <image src="/static/PC/bg.png" class="image"></image>
            </div>
            <div class="form">
                <form action="">
                    <div class="form-title">商家注册</div>
                    <div class="form-item">
                        <span class="label">手机号</span>
                        <input type="text" placeholder="请输入手机号" placeholder-style="color:#C0C4CC;">
                    </div>
                    <div class="form-item">
                        <span class="label">验证码</span>
                        <input type="text" placeholder="请输入验证码" placeholder-style="color:#C0C4CC;">
                        <button class="code cur-pointer">获取验证码</button>
                    </div>
                    <div class="form-item">
                        <span class="label">密码</span>
                        <input type="text" placeholder="请输入登录密码" placeholder-style="color:#C0C4CC;">
                    </div>
                    <div class="submit marginT50 cur-pointer">注册</div>
                </form>
            </div>
        </div>
        <div class="middle">
            <div class="m-title">轻松5步，入驻我们</div>
            <div >
                <image src="/static/PC/list.png" class="m-image"></image>
            </div>
            <div class="m-step">
                <div class="m-foot">
                    <div class="m-f-title">注册账号</div>
                    <div class="m-f-content">填写手机号</div>
                </div>
                <div class="m-foot">
                    <div class="m-f-title">注册账号</div>
                    <div class="m-f-content">填写手机号</div>
                </div>
                <div class="m-foot">
                    <div class="m-f-title">注册账号</div>
                    <div class="m-f-content">填写手机号</div>
                </div>
                <div class="m-foot">
                    <div class="m-f-title">注册账号</div>
                    <div class="m-f-content">填写手机号</div>
                </div>
                <div class="m-foot">
                    <div class="m-f-title">注册账号</div>
                    <div class="m-f-content">填写手机号</div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="foot-title">为什么要加入我们</div>
            <div class="join-reason">河南网中网计算机科技有限公司(移动互联网知名开发商及外包综合服务商）办公位置位于郑州市金水区文化路硅谷广场A座，交通位置好，出行便利，成 立于2012年，是一家以微信公众平台的应用和开发的科技型技术公司，公司旗下拥有两大核心产品“微易宝”和“好分销”微易宝是腾讯战略合作伙伴，为企业提供移动互联网整套解决方案。好分销是全国知名的微信分销平台，致力于为企业打通移动端营销渠道，也是2015度企业最青睐的互联网产品，产品上线一年时间，使用用户以已超过5000家，业务遍布全国各地。</div>
        </div>
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

<style scoped lang="scss">
    .wrap {
        min-width: 1080px;
    }
    .cur-pointer {
        cursor: pointer;
    }
    .top {
        position: relative;
        .top-img {
            .image {
                width: 100%;
                height: 650px;
            }
        }
        .form {
            position: absolute;
            top: 75px;
            left: 50%;
            transform: translateX(-50%);
            width: 430px;
            height: 490px;
            background: #fff;
            padding: 35px;
            box-sizing: border-box;
        }
        .form-title {
            font-weight: 700;
            font-size: 32px;
            text-align: center;
        }
        .form-item {
            display: flex;
            height: 80px;
            align-items: center;
            border-bottom: 1px solid #DFDFDF;
            font-size: 16px;
            .label {
                width: 80px;
            }
            .code {
                width: 110px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                background: #409EFF;
                font-size: 16px;
                border-radius: 5px;
            }
        }
        .submit {
            background: #409EFF;
            font-size: 20px;
            color: #fff;
            text-align: center;
            height: 55px;
            line-height: 55px;
            border-radius: 2px;
        }
        .marginT50 {
            margin-top: 50px;
        }
    }
    .middle {
        text-align: center;
    }
    .m-title {
        color: #303133;
        font-size: 30px;
        margin: 70px auto 50px;
    }
    .m-image {
        width: 1080px;
        height: 160px;
    }
    .m-step {
        width: 1080px;
        display: flex;
        margin: 20px auto 70px;
        justify-content: space-between;
    }
    .m-foot {
        width: 135px;
    }
    .m-f-title {
        color: #303133;
        font-size: 24px;
    }
    .m-f-content {
        color: #909399;
        font-size: 16px;
        margin-top: 14px;
    }
    .foot {
        padding: 40px 0 140px;
        background: #F8F8F8;
    }
    .foot-title {
        color: #303133;
        font-size: 36px;
        margin-bottom: 40px;
        text-align: center;
    }
    .join-reason {
        width: 1092px;
        margin: 0 auto;
        color: #606266;
        line-height: 30px;
    }
</style>