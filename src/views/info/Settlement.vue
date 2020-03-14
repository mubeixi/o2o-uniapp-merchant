<template>
  <div class="all-update">
    <el-form ref="form" label-width="140px" size="small">
      <el-form-item label="付款方式：">
        <el-select  v-model="mySelect" placeholder="请选择省" style="width: 155px;margin-right: 10px">
          <el-option label="微信支付" value="shanghai"></el-option>
          <el-option label="支付宝支付" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品识别码：">
        <el-input  style="width: 315px"></el-input>
        <span class="info-include">用微信扫描绑定OpenID</span>
        <div class="img-div">
          <img src="@/assets/img/img-lazy.png" style="width: 100%;height: 100%">
        </div>
      </el-form-item>

      <el-form-item label="微信昵称：">
          <div class="info-div">
            <img src="@/assets/img/img-lazy.png"  class="info-img">
            <div>
              肖战
            </div>
          </div>
      </el-form-item>
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

    @Component

export default class Settlement extends Vue {
        mySelect = 222
}
</script>

<style scoped lang="less">
  .all-update {
    width: 1591px;
    box-sizing: border-box;
    padding: 40px 54px;
    background-color: #ffffff;
  }
  .info-include{
    color: #999999;
    height:13px;
    font-size:14px;
    font-weight:400;
    line-height:34px;
    margin-left: 19px;
  }
  .img-div{
    width: 130px;
    height: 130px;
  }
  .info-div{
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color: #666666;
    font-size: 14px;
  }
  .info-img{
    width: 40px;
    height: 40px;
    margin-right: 14px;
  }
</style>
