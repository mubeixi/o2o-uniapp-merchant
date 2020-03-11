<template>
  <div class="wrap">
    <el-form ref="form" :model="form" label-width="100px" class="el-form" size="medium" >
      <el-form-item label="排序：">
          <el-input class="width-435"></el-input>
      </el-form-item>
      <el-form-item label="类别名称：">
        <el-input class="width-435"></el-input>
      </el-form-item>

      <el-form-item label="上级目录：">
          <span class="cursor-color">选择目录</span> / <span class="cursor-color">修改目录</span>
      </el-form-item>

      <div class="div-cate">
        服装 → 羽绒服、电器 → 电视、美妆 → 口红、服装 → 羽绒服、美妆 → 口红、
        服装 → 羽绒服、电器 → 电视、美妆 → 口红、服装 → 羽绒服、美妆 → 口红、
        服装 → 羽绒服、电器 → 电视、美妆 → 口红、服装 → 羽绒服、美妆 → 口红、
        服装 → 羽绒服、电器 → 电视、美妆 → 口红、服装 → 羽绒服、美妆 → 口红、
      </div>

      <el-form-item label="类别图片：">

      </el-form-item>

      <div class="cate-div">
        <span class="select-cate">特殊资质:</span>
        <span class="select-cate-right">添加</span>

      </div>

      <div class="table-fun">
        <div class="th">
          <div class="td width-220">字段类型</div>
          <div class="td width-220">字段名称</div>
          <div class="td width-220">初始内容</div>
          <div class="td width-148">是否必填</div>
          <div class="td width-148 border-right-none">操作</div>
        </div>
        <div class="tr">
          <div class="td width-220">
            <el-select v-model="value" size="mini" placeholder="请选择" class="width-120">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="td width-220">
            <el-input  size="mini"   class="width-120"></el-input>
          </div>
          <div class="td width-220">
            <el-input  size="mini"   class="width-120" placeholder="多个值以|分隔"></el-input>
          </div>
          <div class="td width-148 cursor">
            <!--            <img src="../../assets/img/checked.png" >-->
            <div class="border-unchecked"></div>
          </div>
          <div class="td width-148 border-right-none cursor">
            <img src="../../assets/img/delIcon.png" >
          </div>
        </div>
      </div>

      <div style="margin-top: 60px;">
        <el-button type="primary" style="margin-right: 20px">
          确定
        </el-button>
        <el-button  type="info">
          取消
        </el-button>
      </div>
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

export default class AddIndustryCate extends Vue {
        value=''
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

  .wrap /deep/ .th{
    background-color: #F2F7FF;
    color: #303133;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 48px;
    line-height: 48px;
    font-weight:bold;
  }
  .table-fun{
    margin-top: 20px;
    width: 956px;
    box-sizing: border-box;
    border: 1px solid #EEEEEE;
    .th{
      text-align: center;
      box-sizing: border-box;
      border-bottom: 1px solid #EEEEEE;
    }
    .tr{
      text-align: center;
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #EEEEEE;
      &:last-child{border-bottom: 0px}
    }
    .td{
      box-sizing: border-box;
      border-right: 1px solid #EEEEEE;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
    }
  }
  .border-right-none{border-right: 0px}
  .width-220{width: 220px}
  .width-148{width: 148px}
  .width-120{width: 120px;}
  .width-435{width: 435px}
  .border-unchecked{width: 22px;height: 22px;box-sizing: border-box;border: 1px solid #C0C4CC}
  .cursor{cursor: pointer}
  .cursor-color{cursor: pointer;color: #409EFF;font-size: 14px}
  .div-cate{width: 518px;padding: 20px;background-color: #F8F8F8;box-sizing: border-box;color: #666666;font-size: 14px;margin-left: 20px;line-height: 30px;}


</style>
