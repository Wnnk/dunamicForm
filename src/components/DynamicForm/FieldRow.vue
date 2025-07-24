<!-- 
  @description: n列布局
-->

<template>
  <el-row>
    <el-col :span="field.colSpan || 24">
      <div class="field-row">
        <slot name="default" class="field-row-content"></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
defineOptions({
  name: 'FieldRow',
})
const props = defineProps({
  field: {
    type: Object as () => FieldsType,
    required: true,
  },
})
console.log(props.field, 'row')
</script>

<style lang="scss" scoped>
.field-row {
  width: 100%;
  padding: 12px;
}
</style>
