<template>
  <div class="outline-main">
    <div :class="['tree-container']">
      <OutlineTreeNode
        v-for="field in schema.fields"
        :key="field.id"
        :field="field"
        :class="[{ 'node-active': isActive(field.id) }]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import OutlineTreeNode from './OutlineTreeNode.vue'
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { Schema, FieldsType } from '@/components/DynamicForm/type'

const schema = inject('schema') as Schema
const currentActiveField = inject('currentActiveField') as Ref<FieldsType | null>

const isActive = (id: string) => {
  return currentActiveField.value?.id === id
}
</script>

<style lang="scss" scoped>
.outline-main {
  max-height: 100vh;
  overflow-y: auto;
}
.tree-container {
  color: #262626;
}
.node-active {
  color: red;
}
</style>
