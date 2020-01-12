<template>
    <div class="wrap">
        <div class="title">在线签署商家入驻协议</div>
        <el-input type="textarea" v-model="inputVal" placeholder="请输入内容" class="input"></el-input>
        <el-checkbox v-model="checked" class="check">我已阅读、同意并接受《admin的微商城网络交易平台服务协议》</el-checkbox>
        <div class="btns">
            <el-button type="primary" class="mr10">签署</el-button><el-button type="info">取消</el-button>
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

    export default Vue.extend({
        data(){
            return {
                inputVal: ''
            }
        }
    })
</script>

<style scoped lang="less">
    html,body {
        height: 100%;
        width: 100%;
        background: #fff;
    }
    .mr10 {
        margin-right: 10px;
    }
    .wrap {
        padding: 38px 0 0 58px;
    }
    .title {
        color: #333333;
        font-size: 16px;
        margin-bottom: 27px;
    }
    .input {
        width: 1200px;
        height: 500px;
        margin-bottom: 20px;
    }
    /deep/ .el-textarea__inner {
        height: 100%;
    }
    .check {
        margin-bottom: 50px;
    }
</style>
