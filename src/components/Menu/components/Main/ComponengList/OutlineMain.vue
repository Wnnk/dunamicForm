<template>
  <div class="outline-main">
    <div class="tree-container">
      <OutlineTreeNode v-for="field in schema.fields" :key="field.id" :field="field" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OutlineTreeNode from './OutlineTreeNode.vue'
import { inject } from 'vue'
import type { Schema } from '@/components/DynamicForm/type'

const schema = inject('schema') as Schema
</script>

<style lang="scss" scoped>
.outline-main {
  max-height: 100vh;
  overflow-y: auto;
}
.tree-container {
  color: #262626;
}
</style>
