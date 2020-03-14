<template>
  <div class="all-update">
      <el-form ref="form" label-width="100px" size="small">
        <el-form-item label="模板名称：">
          <el-input v-model="formr" style="width: 335px"></el-input>
        </el-form-item>
        <el-form-item label="计价方式：">
          <el-radio-group v-model="form">
            <el-radio label="按重量"></el-radio>
            <el-radio label="按件数"></el-radio>
          </el-radio-group>
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

    export default class ExpressTemplate extends Vue {
        formr=''
        form=''
    }
</script>

<style scoped lang="less">
  .all-update {
    width: 1591px;
    box-sizing: border-box;
    background-color: #ffffff;
  }

</style>
