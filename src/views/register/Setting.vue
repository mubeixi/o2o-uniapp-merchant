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
                <div class="btn text-center" @click="dialogFormVisible = true ">去提交</div>
            </div>
            <el-dialog title="入驻类型" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="入驻类型" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择类型">
                        <el-option label="个人入驻" value="person"></el-option>
                        <el-option label="商家入驻" value="company"></el-option>
                    </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="goApprove">确 定</el-button>
                </div>
            </el-dialog>
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
    import {
        Vue,
        Component,
        Watch,
        Prop
    } from 'vue-property-decorator';

    export default Vue.extend({
        data(){
            return {
                dialogFormVisible: false,
                form: {
                    type: ''
                }
            }
        },
        methods: {
            goApprove: function(){
                if(this.form.type == 'person') {
                    this.$router.push('PersonApprove')
                }else if(this.form.type == 'company') {
                    this.$router.push('CompanyApprove')
                }
            }
        }
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
            cursor: pointer;
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
