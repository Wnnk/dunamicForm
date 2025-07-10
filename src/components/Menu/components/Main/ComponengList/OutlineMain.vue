<template>
  <div class="outline-main">
    <div class="tree-container">
      <OutlineTreeNode v-for="field in props.schema.fields" :key="field.id" :field="field" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Schema } from '@/components/DynamicForm/type'
import OutlineTreeNode from './OutlineTreeNode.vue'

const props = defineProps({
  schema: {
    type: Object as () => Schema,
    required: true,
  },
})
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
