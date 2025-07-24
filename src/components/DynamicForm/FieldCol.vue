<template>
  <el-col :span="24">
    <div class="field-col">
      <slot name="default"></slot>
    </div>
  </el-col>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
const props = defineProps({
  field: {
    type: Object as () => FieldsType,
    required: true,
  },
})
console.log('col', props.field)
</script>

<style lang="scss" scoped>
.field-col {
  width: 100%;
  padding: 12px;
}
</style>
