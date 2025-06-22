<template>
  <div class="dynamic-form">
    <el-form :model="localData" v-bind="formStyle">
      <div class="title" v-if="formConfig.title" :style="titleStyle">
        {{ formConfig.title.label }}
      </div>
      <form-item-recursive></form-item-recursive>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">{{
          formConfig.layout?.btn?.submitBtnText || '提交'
        }}</el-button>
        <el-button type="default" v-if="formConfig.layout?.btn?.resetBtn" @click="resetForm">{{
          formConfig.layout.btn.resetBtnText || '重置'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import FormItemRecursive from './FormItemRecursive.vue'
import { schemaProps } from './type'
import { computed, ref, watch, provide } from 'vue'
import _ from 'lodash'
const props = defineProps(schemaProps)
const emit = defineEmits(['submit', 'update:modelValue'])
const formConfig = computed(() => {
  return props.formConfig
})
const fields = computed(() => {
  return props.fields
})
provide('formConfig', formConfig)
provide('fields', fields)

const titleStyle = computed(() => {
  if (!formConfig.value.title) return {}
  return {
    textAlign: formConfig.value.title.align,
    color: formConfig.value.title.color,
    fontSize: formConfig.value.title.fontSize,
    fontWeight: formConfig.value.title.fontWeight,
  }
})

const localData = ref(_.cloneDeep(props.modelValue))

watch(
  () => props.modelValue,
  (val) => {
    localData.value = { ...val }
  },
  { deep: true },
)

const formStyle = computed(() => {
  if (!formConfig.value.layout) return {}
  const style = {
    ...formConfig.value.layout,
  }
  delete style.btn
  return style
})

const handleSubmit = () => {
  emit('submit', localData.value)
}

const resetForm = () => {
  localData.value = _.cloneDeep(props.modelValue)
}

const getFormValue = () => {
  return localData.value
}

defineExpose({
  getFormValue,
  resetForm,
})
</script>

<style lang="scss" scoped></style>
