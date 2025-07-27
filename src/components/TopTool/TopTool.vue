<template>
  <div class="top-tool">
    <el-button type="primary" plain @click="preview">预览</el-button>
    <el-button type="success" plain @click="exportJSON">导出JSON</el-button>
    <el-button type="danger" plain @click="resetSchema">清空</el-button>
    <Export-dialog v-model:visible="exportVisible" :schema-json="json" />
    <Preview-dialog v-model:visible="previewVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Schema } from '../DynamicForm/type'
import ExportDialog from './ExportDialog.vue'
import PreviewDialog from './PreviewDialog.vue'

const props = defineProps({
  schema: {
    type: Object as () => Schema,
    required: true,
  },
})
const emit = defineEmits(['update:schema'])
const schema = computed({
  get: () => props.schema,
  set: (val: Schema) => {
    emit('update:schema', val)
  },
})

const resetSchema = () => {
  schema.value.fields = []
}

const previewVisible = ref(false)
const preview = () => {
  previewVisible.value = true
}

const exportVisible = ref(false)
const json = ref('')
const exportJSON = () => {
  json.value = JSON.stringify(schema.value, null, 2)
  exportVisible.value = true
  return
}
</script>

<style lang="scss" scoped>
.top-tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
</style>
