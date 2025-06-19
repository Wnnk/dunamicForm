<!-- 
  @description: 处理递归渲染表单项和components动态渲染
-->

<template>
  <div></div>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
import type { PropType } from 'vue'

const props = defineProps({
  field: {
    type: Object as PropType<FieldsType>,
  },
})

const componentMap = {
  'field-input': () => import('./FieldInput.vue'),
  'field-select': () => import('./FieldSelect.vue'),
}
</script>

<style lang="scss" scoped></style>
