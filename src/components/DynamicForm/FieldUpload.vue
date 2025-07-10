<template>
  <el-form-item v-bind="itemStyle" :prop="field.id">
    <el-upload
      class="filed-upload"
      v-if="field.props?.accept === 'image/*'"
      v-on="field.events || {}"
    >
      <el-icon class="upload-icon"><Plus /></el-icon>
    </el-upload>
    <el-upload v-else v-on="field.events || {}">
      <el-button type="primary">上传</el-button>
    </el-upload>
  </el-form-item>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
import { computed, inject } from 'vue'

defineOptions({
  name: 'FieldUpload',
})
const props = defineProps({
  field: {
    type: Object as () => FieldsType,
    required: true,
  },
})
const field = computed(() => props.field)

const itemStyle = computed(() => {
  const style = {
    ...props.field,
  }
  delete style.props
  return style
})
const localData = inject('localData') as Record<string, any>
</script>

<style lang="scss" scoped>
.filed-upload {
  min-width: 178px;
  min-height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.filed-upload:hover {
  border-color: #409eff;
}
.upload-icon {
  font-size: 28px;
  min-width: 178px;
  min-height: 178px;
  text-align: center;
  color: #8c939d;
}
</style>
