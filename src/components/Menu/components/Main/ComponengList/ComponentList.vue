<template>
  <el-tabs>
    <el-tab-pane label="组件"><DefaultMain :addFields="props.addFields" /></el-tab-pane>
    <el-tab-pane label="大纲"><OutlineMain :schema="props.schema" /></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import DefaultMain from './DefaultMain.vue'
import OutlineMain from './OutlineMain.vue'
import type { Schema } from '@/components/DynamicForm/type'

const props = defineProps({
  addFields: {
    type: Function,
    required: true,
  },
  schema: {
    type: Object as () => Schema,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
