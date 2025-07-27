<template>
  <div :class="['outline-tree-node', $attrs.class]" @click="setActiveField(field.id)">
    <div class="tree-label">
      <span v-if="field.type === 'row'">row</span>
      <span v-else-if="field.type === 'col'">col</span>
      <span v-else-if="field.type === 'divider'">分割线</span>
      <span v-else>{{ field.label }}</span>
    </div>
    <div class="tree-more">
      <i class="iconfont icon-eye"></i>
      <i class="iconfont icon-delete" @click.stop="deleteField(field.id)"></i>
    </div>
  </div>
  <div v-if="field.children && field.children.length > 0" :class="['tree-children', $attrs.class]">
    <outline-tree-node
      v-for="childField in field.children"
      :key="childField.id"
      :field="childField"
    />
  </div>
</template>

<script setup lang="ts">
import type { FieldsType } from '@/components/DynamicForm/type'
import { defineProps, inject } from 'vue'
const props = defineProps({
  field: {
    type: Object as () => FieldsType,
    required: true,
  },
})

const deleteField = inject('deleteField') as (id: string) => void
const setActiveField = inject('setActiveField') as (id: string) => void
</script>

<style lang="scss" scoped>
@use './iconfont.css';
.outline-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 26px;
  line-height: 26px;
  padding-right: 5px;
  margin: 5px 0;
  &:hover {
    color: #2e73ff;
    background-color: rgba(46, 115, 255, 0.05);
  }
}
.node-active {
  color: #2e73ff;
}

.tree-label {
  display: flex;
  align-items: center;
}
.tree-more {
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.tree-children {
  padding: 0 0 0 10px;
}
</style>
