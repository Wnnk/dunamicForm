<template>
  <el-form-item v-bind="itemStyle" :prop="field.id">
    <el-input
      v-model.number="localData[field.id]"
      v-bind="field.props"
      v-on="field.events || {}"
      v-if="field.props?.type === 'number'"
    ></el-input>
    <el-input v-else v-model="localData[field.id]" v-bind="field.props"></el-input>
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineOptions, computed, inject, watch } from 'vue'
import type { FieldsType } from './type'
defineOptions({
  name: 'FieldInput',
})

const localData = inject('localData') as any

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
  delete style.prop
  return style
})
</script>

<style lang="scss" scoped></style>
