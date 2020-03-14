<template>
    <div class="wrap">
        <el-form ref="form" :model="form" label-width="120px" class="el-form">
            <div class="cate-div">
              <span class="select-cate">选择分类:</span>
              <span class="select-cate-right">选择类目</span>
            </div>
            <el-table
                :data="tableData"
                border
                style="width: 70%;margin-bottom: 15px">
                <el-table-column
                    prop="cate"
                    label="分类"
                    align="center"
                  >
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="保证金"
                    align="center"
                    width="219">
                </el-table-column>
            </el-table>
            <el-form-item label="选择年限：">
                  <el-radio-group v-model="resource">
                    <el-radio label="1年"></el-radio>
                    <el-radio label="2年"></el-radio>
                    <el-radio label="3年"></el-radio>
                    <el-radio label="4年"></el-radio>
                  </el-radio-group>
            </el-form-item>

            <el-form-item label="选择支付方式：" class="el-left">
                  <div class="pay-method">
                    <img src="../../assets/img/zfb.png">
                    <div class="pay-method-span">支付宝</div>
                  </div>

                  <div class="pay-method" style="margin-left: 30px">
                    <img src="../../assets/img/wx.png">
                    <div class="pay-method-span">微信</div>
                  </div>
            </el-form-item>

            <el-form-item label="小计：" >
                  <span class="span-left">保证金
                      <span class="span-color span-margin">¥1000</span>、年费
                      <span  class="span-color span-margin">¥1000</span>
                  </span>
            </el-form-item>

            <el-form-item label="总计：" >
                  <span class="span-left span-color">¥1000</span>
            </el-form-item>


            <el-button type="primary" size="small" style="margin-left: 40px;">立即支付</el-button>

        </el-form>
    </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Watch,
  Prop,
} from 'vue-property-decorator';

export default class Pay extends Vue {
        form={}

        resource=''

        tableData=[
          {
            cate: '女式羽绒服、潮鞋、美妆、箱包、连衣裙、针织衫、女式羽绒服、潮鞋、美妆、箱包、连衣裙、针织衫女式羽绒服、潮鞋、美妆、箱包、连衣裙、针织衫',
            money: '￥1000',
          },
        ]
}
</script>

<style scoped lang="less">
    .wrap {
        width: 100%;
        min-height: 100vh;
        box-sizing: border-box;
        background: #F8F8F8;
        padding: 85px 0 0 210px;
    }
  .el-form{
    background-color: #ffffff;
    width: 100%;
    padding-top: 20px;
    padding-left: 50px;
    box-sizing: border-box;
    padding-bottom: 90px;
  }
  .cate-div{
    font-size: 14px;
    margin-top: 17px;
    margin-bottom: 17px;
    height: 12px;
    line-height: 12px;
  }
  .select-cate{
    color: #606266;
    margin-right: 16px;
  }
  .select-cate-right{
    color: #409EFF;
    cursor: pointer;
  }

  .wrap /deep/ th{
    background-color: #f5f5f5;
    color: #606266;
    font-size: 14px;
  }
  .el-left{
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .el-left /deep/ .el-form-item__content{margin-left: 0px !important; display: flex;align-items: center;}
  .span-left{font-size: 14px;color: #606266;}
  .span-color{color: #F56C6C}
  .span-margin{margin-left: 4px}
  .pay-method{
    width: 142px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #E5E5E5;//#F56C6C
    box-sizing: border-box;
    cursor: pointer;
  }
  .pay-method-span{
    font-size: 16px;
    color: #666666;
    margin-left: 10px;
  }

</style>
