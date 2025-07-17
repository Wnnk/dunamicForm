<template>
  <div class="form-layout">
    <el-form>
      <el-form-item label="表单名称"> <el-input></el-input> </el-form-item>
      <el-form-item label="标签位置">
        <el-radio-group>
          <el-radio label="left">左对齐</el-radio>
          <el-radio label="right">右对齐</el-radio>
          <el-radio label="top">顶部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input-number></el-input-number>
      </el-form-item>
      <el-form-item label="表单下边距">
        <el-input-number></el-input-number>
      </el-form-item>
      <el-form-item label="是否显示表单重置按钮">
        <el-switch></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormConfig } from '@/components/DynamicForm/type'

const props = defineProps({
  formConfig: {
    type: Object as () => FormConfig,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.form-layout {
  box-sizing: border-box;
  font-size: 14px;
  padding-left: 10px;
  position: relative;
}
</style>
