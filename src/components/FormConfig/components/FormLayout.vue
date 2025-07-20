<template>
  <div class="form-layout">
    <el-form v-model="config">
      <el-form-item label="表单ID">
        <el-input v-model="config.id"></el-input>
      </el-form-item>
      <el-form-item label="标签位置">
        <el-radio-group v-model="config.layout.labelPosition">
          <el-radio label="left" value="left">左对齐</el-radio>
          <el-radio label="right" value="right">右对齐</el-radio>
          <el-radio label="top" value="top">顶部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表单尺寸">
        <el-radio-group v-model="config.layout.size">
          <el-radio label="large" value="large">大</el-radio>
          <el-radio label="default" value="default">默认</el-radio>
          <el-radio label="small" value="small">小</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input-number v-model="config.layout.labelWidth"></el-input-number>
      </el-form-item>

      <el-form-item label="是否显示表单重置按钮">
        <el-switch v-model="config.btn.resetBtn"></el-switch>
      </el-form-item>
      <el-form-item label="表单重置按钮文本">
        <el-input v-model="config.btn.resetBtnText"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormConfig } from '@/components/DynamicForm/type'
import { computed } from 'vue'

const props = defineProps({
  formConfig: {
    type: Object as () => FormConfig,
    required: true,
  },
})
const emit = defineEmits(['update:formConfig'])
const config = computed({
  get() {
    const { id, layout, title, submit, btn } = props.formConfig

    /* 确保layout、title、submit都有默认值 */
    const newConfig = {
      id,
      layout: layout || {},
      title: title || {},
      submit: submit || {},
      btn: btn || {},
    }
    return newConfig
  },
  set(value: FormConfig) {
    emit('update:formConfig', value)
  },
})
</script>

<style lang="scss" scoped>
.form-layout {
  box-sizing: border-box;
  font-size: 14px;
  padding-left: 10px;
  position: relative;
}
</style>
