<template>
    <div class="wrap">
        <div class="login">
            <img src="../../assets/PC/login.png" class="login-image" />
            <div class="form">
                <div class="form-title">用户登录</div>
                <div class="form-item">
                    <input type="text" placeholder="请输入账号" class="input">
                </div>
                <div class="form-item">
                    <input type="text" placeholder="请输入密码" class="input">
                </div>
                <div class="submit cur-pointer">登录</div>
                <div class="forget cur-pointer">忘记密码</div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import {
        Vue,
        Component,
        Watch,
        Prop
    } from 'vue-property-decorator';
    import {doLoginMixin} from "../../common/mixin";
    export default class Login  extends Vue{

    }
</script>


<style scoped lang="less">
    html,body {
        width: 100%;
        height: 100%;
    }
    page {
        width: 100%;
        height: 100%;
    }
    .wrap {
        height: 100%;
        width: 100%;
        min-width: 1080px;
    }
    .cur-pointer {
        cursor: pointer;
    }
    .login {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .login-image {
        width: 100%;
        height: 100%;
    }
    .form {
        position: absolute;
        top: 200px;
        left: 54.7%;
        width: 100%;
        padding-top: 100px;
    }
    .form-title {
        position: absolute;
        top: 0;
        left: 10.2%;
        color: #303133;
        font-size: 32px;
    }
    .form-item {
        width: 27%;
        height: 66px;
        line-height: 66px;
        border: 1px solid #DCDCDC;
        border-radius: 2px;
        margin-bottom: 30px;
    }
    .form-item .input {
        width: 100%;
        height: 100%;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .submit {
        margin-top: 80px;
        width: 27%;
        height: 66px;
        line-height: 66px;
        text-align: center;
        background: #409EFF;
        color: #fff;
        font-size: 20px;
    }
    .forget {
        margin-top: 30px;
        color: #909399;
    }
</style>
