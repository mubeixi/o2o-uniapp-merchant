<template>
    <div class="wrap">
        <el-form ref="form" :model="form" label-width="170px" class="form">
            <div class="title box-sizing">基本信息</div>
            <el-form-item label="主营商品：">
                <el-input v-model="form.name"></el-input>
                <span class="tips">多个主营商品以逗号间隔</span>
            </el-form-item>
            <el-form-item label="联系人：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="公司名称：">
                <el-input v-model="form.name"></el-input>
                <span class="tips">公司名称与营业执照上一致</span>
            </el-form-item>
            <el-form-item label="公司主体：">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司固话：">
                <el-input v-model="form.name"></el-input>
                <span class="tips">格式如：021-12345678</span>
            </el-form-item>
            <el-form-item label="企业所在地：" class="area">
                <el-select v-model="form.region" placeholder="请选择省">
                    <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
                <el-select v-model="form.region" placeholder="请选择市">
                    <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
                <el-select v-model="form.region" placeholder="请选择县/区">
                    <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
                <el-row class="detail-area">
                    <el-input v-model="form.name" placeholder="请输入具体地址"></el-input>
                    <span class="tips specil">与营业执照上一致</span>
                </el-row>
            </el-form-item>
            <div class="title box-sizing">资质信息</div>
            <el-form-item label="真实姓名：">
                <el-input v-model="form.name"></el-input>
                <span class="tips">须与身份证上保持一致</span>
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="form.name"></el-input>
                <span class="tips">须与身份证上保持一致</span>
            </el-form-item>
            <el-form-item label="身份证正面扫描件：">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="身份证背面扫描件：">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrlBack" :src="imageUrlBack" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <div class="title box-sizing">账户信息</div>
            <el-form-item label="提现方式：">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="方式一" value="shanghai"></el-option>
                    <el-option label="方式二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开户城市：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="开户银行：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="开户姓名：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="开户卡号：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary">提交</el-button>
                <el-button type="info">取消</el-button>
            </el-form-item>
        </el-form>
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
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                imageUrl: '',
                imageUrlBack: ''
            }
        }
    })
</script>

<style scoped lang="less">
    .wrap {
        padding: 30px;
        // height: 100vh;
        background: #fff;
        padding-bottom: 70px;
    }
    .title {
        width:1620px;
        height:50px;
        line-height: 50px;
        color: #333333;
        font-size: 16px;
        background:#F8F8F8;
        padding-left: 20px;
        margin-bottom: 30px;
    }
    /deep/ .el-input {
        width: 510px;
        height: 40px;
        line-height: 40px;
    }
    .area {
        /deep/ .el-input {
            width: 160px;
            margin-right: 15px;
        }
        .detail-area {
            /deep/ .el-input {
                width: 510px;
                margin-top: 15px;
            }
        }
    }
    .tips {
        color: #C0C4CC;
        font-size: 14px;
        margin-left: 24px;
    }
    .specil {
        margin-left: 9px;
    }
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 86px;
        height: 86px;
        line-height: 86px;
        text-align: center;
    }
    .avatar {
        width: 86px;
        height: 86px;
        display: block;
    }
    .btns {
        margin-left: -80px;
        margin-top: 60px;
    }
</style>
