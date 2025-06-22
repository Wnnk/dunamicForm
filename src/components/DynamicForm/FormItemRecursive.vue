<!--
  @description: 处理递归渲染表单项和components动态渲染
-->

<template>
  <div class="form-item"></div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const fields = inject('fields')

const componentMap = {
  'field-input': () => import('./FieldInput.vue'),
  'field-select': () => import('./FieldSelect.vue'),
}
</script>

<style lang="scss" scoped>
.form-item {
  width: 100%;
}
</style>
