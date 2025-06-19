<!-- 
  @description: n列布局
-->

<template>
  <el-col :span="24">
    <div class="field-row">
      <slot name="default"></slot>
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
}
</style>
