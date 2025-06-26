<template>
  <el-form-item v-bind="itemStyle">
    <el-date-picker v-model="localData[field.id]" v-bind="field.props"> </el-date-picker>
  </el-form-item>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
import { computed, inject } from 'vue'
defineOptions({
  name: 'FieldDateTimePicker',
})
const props = defineProps({
  field: {
    type: Object as () => FieldsType,
    required: true,
  },
})
const field = computed(() => props.field)

const itemStyle = computed(() => {
  const style = {
    ...props.field,
  }
  delete style.props
  return style
})
const localData = inject('localData') as Record<string, any>
</script>

<style lang="scss" scoped></style>
