<template>
    <div class="wrap">
        <el-form ref="form" :model="form" label-width="80px">
            <div><span>选择分类</span><span>选择类目</span></div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="cate"
                    label="分类"
                    width="788">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="保证金"
                    width="219">
                </el-table-column>
            </el-table>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data(){
            return {
                form: {},
                tableData: [
                    {
                        cate: '女式羽绒服、潮鞋、美妆、箱包、连衣裙、针织衫、女式羽绒服、潮鞋、美妆、箱包、连衣裙、针织衫女式羽绒服、潮鞋、美妆、箱包、连衣裙、针织衫',
                        money: '￥1000'
                    }
                ]
            }
        }
    })
</script>

<style scoped lang="less">
    .wrap {
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding: 38px 0 0 70px;
    }
</style>