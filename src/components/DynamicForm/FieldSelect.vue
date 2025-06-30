<!-- 
  @description: 下拉框组件
-->

<template>
  <el-form-item v-bind="itemStyle" :prop="field.id">
    <el-select v-model="localData[field.id]" v-bind="field.props">
      <el-option
        v-for="item in field.props?.options"
        :disabled="item.disabled"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
import { defineProps, defineOptions, computed, inject } from 'vue'
defineOptions({
  name: 'FieldSelect',
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
  return style
})
</script>

<style lang="scss" scoped></style>
