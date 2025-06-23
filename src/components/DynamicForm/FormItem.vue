<!--
  @description: 处理递归渲染表单项和components动态渲染
-->

<template>
  <el-row :gutter="20">
    <el-col class="form-item" v-for="field in fields" :key="field.id" :span="field.colSpan || 24">
      <dragTool>
        <component :is="getComponent(field.type)" :field="field">
          <div v-if="field.children && field.children.length > 0">
            <FormItem :fields="field.children"></FormItem>
          </div>
        </component>
      </dragTool>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import dragTool from '@/components/DynamicForm/dragTool.vue'
import type { PropType } from 'vue'
import { defineAsyncComponent, computed } from 'vue'
import type { FieldsType } from './type'
const props = defineProps({
  fields: {
    type: Array as PropType<FieldsType[]>,
    required: true,
  },
})
const fields = computed(() => props.fields)

type ComponentType = 'input' | 'select' | 'row'
const componentMap = {
  input: defineAsyncComponent(() => import('./FieldInput.vue')),
  select: defineAsyncComponent(() => import('./FieldSelect.vue')),
  row: defineAsyncComponent(() => import('./FieldRow.vue')),
}

const getComponent = (type: ComponentType) => {
  return componentMap[type]
}
</script>

<style lang="scss" scoped>
.form-item {
  width: 100%;
}
</style>
