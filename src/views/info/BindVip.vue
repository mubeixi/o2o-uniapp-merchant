<template>
  <div class="all-update">
    <el-form ref="form" label-width="140px">
      <el-form-item label="手机：">
        <el-input v-model="formq" style="width: 315px"></el-input>
        <span class="info-include">如果您没有该商城会员,请先关注公众号“好分销”,进入商城个人中心,查看您的手机</span>
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

export default class BindVip extends Vue {

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
    height:13px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:34px;
    margin-left: 19px;
  }
</style>
