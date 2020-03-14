<template>
  <div class="all-update">
        <div class="first-el">
              <div class="img-el">
                <img src="@/assets/img/img-lazy.png" class="img-pull">
              </div>
              <div class="font-el">
                素材用途：下载后自行印刷成物料，供用户扫码买单
              </div>
              <div class="font-el">
                物料尺寸：110mm x 145mm
              </div>
              <div class="font-el">
                推荐位置：可张贴在桌子、服务台等处，方便用户扫码
              </div>

              <div class="down-el">
                下载素材
              </div>

              <div class="info-el">
                若无法正常下载，请通过右键单击图片 - 图片另存为保存图片
              </div>
        </div>

        <div class="radio-el">
          <el-form ref="form" label-width="180px" size="small">
            <el-form-item label="线下扫码优惠活动设置：">
              <el-radio-group v-model="form">
                <el-radio label="无活动"></el-radio>
                <el-radio label="满减"></el-radio>
                <el-radio label="折扣"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
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

    export default class CollectionCode extends Vue {
        form=''
    }
</script>

<style scoped lang="less">
  .all-update {
    width: 1591px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .img-pull{
    height: 100%;width: 100%
  }
  .first-el{
    width:1109px;
    height:580px;
    background:rgba(248,248,248,1);
    border-radius:10px;
    margin-top: 30px;
    margin-left: 202px;
  }
  .img-el{
    width: 250px;
    height: 317px;
    margin: 0 auto;
    margin-bottom: 23px;
  }
  .font-el{
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:28px;
    margin-left: 386px;
  }
  .down-el{
    width:88px;
    height:35px;
    line-height: 35px;
    background:rgba(66,140,247,1);
    margin-left: 510px;
    margin-top: 30px;
    margin-bottom: 17px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
  }
  .info-el{
    height:13px;
    font-size:14px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:2px;
    margin-left: 365px;
  }
  .radio-el{
    margin-top: 52px;
    margin-left: 554px;
  }
  /deep/ .el-form{
    padding: 0px;
  }
</style>
