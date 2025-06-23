<template>
  <el-form-item v-bind="{ ...field }">
    <el-input v-model="localData[field.prop]"></el-input>
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineOptions, computed, inject } from 'vue'
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
</script>

<style lang="scss" scoped></style>
