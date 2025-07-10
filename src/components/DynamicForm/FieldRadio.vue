<!--  -->

<template>
  <el-form-item v-bind="itemStyle" :prop="field.id">
    <el-radio-group v-model="localData[field.id]">
      <el-radio
        v-for="option in field.props?.options"
        :key="option.value"
        :value="option.value"
        v-on="field.events || {}"
      >
        {{ option.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
import { computed, inject } from 'vue'

defineOptions({
  name: 'FieldRadio',
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
