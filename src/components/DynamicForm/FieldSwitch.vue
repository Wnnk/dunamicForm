<template>
  <el-form-item v-bind="itemStyle" :prop="field.id">
    <el-switch
      v-model="localData[field.id]"
      v-bind="field.props"
      v-on="field.events || {}"
    ></el-switch>
  </el-form-item>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
import { computed, inject } from 'vue'

defineOptions({
  name: 'FieldSwitch',
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
