<!-- 
  @description: n列布局
-->

<template>
  <el-col :span="24">
    <div class="field-row">
      <slot name="default" class="field-row-content"></slot>
    </div>
  </el-col>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FieldRow',
})
</script>

<style lang="scss" scoped>
.field-row {
  width: 100%;
  padding: 12px;
}
</style>
