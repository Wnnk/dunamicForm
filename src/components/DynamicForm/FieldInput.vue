<template>
  <div>
    <el-input v-model="value" placeholder="{{ label }}"></el-input>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineOptions, computed } from 'vue'
defineOptions({
  name: 'FieldInput',
})

const props = defineProps({
  label: {
    type: String,
    default: '',
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
    required: true,
  },
})
const value = computed(() => props.modelValue)
// const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped></style>
