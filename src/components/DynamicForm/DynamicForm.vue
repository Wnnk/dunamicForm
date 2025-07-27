<template>
  <div class="dynamic-form" @click.stop="activeFieldId = null">
    <el-form :model="localData" v-bind="formStyle" ref="dynamicFormRef">
      <div class="title" v-if="formConfig.title" :style="titleStyle">
        {{ formConfig.title.label }}
        <div v-if="formConfig.title.subLabel">{{ formConfig.title.subLabel }}</div>
      </div>
      <form-item :fields="fields"></form-item>
      <el-form-item class="submit-btn">
        <el-button type="primary" @click="handleSubmit">{{
          formConfig.btn?.submitBtnText || '提交'
        }}</el-button>
        <el-button type="default" v-if="formConfig.btn?.resetBtn" @click="resetForm">{{
          formConfig.btn.resetBtnText || '重置'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import FormItem from './FormItem.vue'
import { schemaProps } from './type'
import { computed, ref, watch, provide } from 'vue'
import type { FieldsType } from './type'
import _ from 'lodash'
const props = defineProps(schemaProps)
const emit = defineEmits(['submit', 'update:modelValue'])
const formConfig = computed(() => {
  return props.schema.formConfig
})
const fields = computed(() => {
  return props.schema.fields
})

const activeFieldId = ref<string | null>(fields.value[0].id)

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
  () => props.schema.fields,
  (newSchema, oldSchema) => {
    console.log('fields change', newSchema, oldSchema)
    const newFields = Object.keys(newSchema).filter((key: string) => {
      return !oldSchema || key in oldSchema
    })
    // 在 localData 中添加新增字段
    if (newFields.length > 0) {
      newFields.forEach((field) => {
        if (!(field in localData.value)) {
          localData.value[field] = undefined // 或根据 schema 设置默认值
        }
      })
    }
  },
  { deep: true, immediate: true },
)

const dynamicFormRef = ref()

const formStyle = computed(() => {
  if (!formConfig.value.layout) return {}
  const style = {
    ...formConfig.value.layout,
  }
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

const removeField = (id: string, arr: FieldsType[] = fields.value) => {
  arr.forEach((item: FieldsType, index: number) => {
    if (item.id === id) {
      arr.splice(index, 1)
      return true
    }
    if (item.children && item.children.length > 0) {
      if (removeField(id, item.children)) {
        return true
      }
    }
  })
  return false
}

const getActiveField = () => {
  if (!activeFieldId.value) return null
  const findField = (id: string, arr: FieldsType[] = fields.value) => {
    let activeField: FieldsType | null = null
    arr.forEach((item: FieldsType) => {
      if (item.id === id) {
        activeField = item
        return activeField
      }
      if (item.children && item.children.length > 0) {
        const activeChild = findField(id, item.children)
        if (activeChild) {
          activeField = activeChild
          return activeField
        }
      }
    })
    return activeField
  }
  return findField(activeFieldId.value)
}

const setActiveField = (id: string) => {
  activeFieldId.value = id
}

const validate = (...args: any) => {
  return dynamicFormRef.value?.validate(...args)
}

provide('formConfig', formConfig)
provide('fields', fields)
provide('localData', localData)
provide('removeField', removeField)
provide('activeFieldId', activeFieldId)

defineExpose({
  getFormValue,
  resetForm,
  removeField,
  activeFieldId,
  validate,
  getActiveField,
  setActiveField,
})
</script>

<style lang="scss" scoped>
.dynamic-form {
  flex: 1;
  padding: 20px;
  border: 1px solid #dcdfe6;
  max-height: 100vh;
  box-sizing: border-box;
  overflow: overlay;
}
.submit-btn {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
