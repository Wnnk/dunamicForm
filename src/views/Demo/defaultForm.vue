<template>
  <div>
    <h1>Default Form</h1>
    <DynamicForm
      :formConfig="formConfig"
      v-model:modelValue="formData"
      :fields="fields"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormConfig, FieldsType } from '@/components/DynamicForm/type'
import DynamicForm from '@/components/DynamicForm/DynamicForm.vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const formConfig = ref<FormConfig>({
  id: '1',
  title: {
    label: 'Basic Form',
    fontSize: '24px',
    color: 'blue',
    align: 'center',
  },
  layout: {
    btn: {
      resetBtn: true,
      resetBtnText: 'Reset',
    },
  },
})
const handleSubmit = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:4523/m1/6597638-6303329-default/submit',
      data: {
        name: 'hh',
      },
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const fields = ref<FieldsType[]>([
  {
    id: uuidv4(),
    type: 'row',
    label: '',
    prop: '',
    children: [
      {
        id: uuidv4(),
        type: 'input',
        label: 'Name',
        prop: 'name',
        props: {
          type: 'text',
          placeholder: 'Please enter your name',
          disabled: true,
          prefixIcon: 'User',
          size: 'small',
        },
        colSpan: 12,
        labelPosition: 'left',
        labelWidth: 150,
      },
      {
        id: uuidv4(),
        type: 'select',
        label: 'Gender',
        prop: 'gender',
        props: {
          filterable: true,
          multiple: true,
          size: 'large',
          placeholder: 'Please select your gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female', disabled: true },
            { label: 'Other', value: 'other' },
          ],
        },
        colSpan: 12,
        labelPosition: 'right',
        labelWidth: 100,
      },
      {
        id: uuidv4(),
        type: 'input',
        label: 'Age',
        props: {
          type: 'number',
          suffixIcon: 'Calendar',
        },
        prop: 'age',
        colSpan: 12,
        labelPosition: 'right',
        labelWidth: 100,
      },
    ],
  },
  {
    id: uuidv4(),
    type: 'input',
    label: 'Email',
    props: {
      type: 'password',
      showPassword: true,
    },
    prop: 'email',
    colSpan: 12,
    labelPosition: 'top',
    labelWidth: 100,
  },
  {
    id: uuidv4(),
    type: 'radio',
    label: 'AAA',
    prop: 'radio',
    props: {
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
        { label: 'Option C', value: 'c' },
      ],
    },
    colSpan: 24,
    labelPosition: 'left',
    labelWidth: 120,
  },
])

/* 根据field ID获取字段值 */
// 递归生成表单数据
// 生成初始 formData 的函数
function generateFormData(fields: FieldsType[]): Record<string, any> {
  const formData: Record<string, any> = {}

  // 递归处理字段配置
  const processFields = (fieldList: FieldsType[]) => {
    fieldList.forEach((field) => {
      if (field.children) {
        // 如果是容器型字段（如 row），处理其子字段
        processFields(field.children)
      } else if (field.prop) {
        // 如果是数据字段，初始化值
        // 这里可以根据 field.type 设置不同的初始值
        switch (field.type) {
          case 'input':
          case 'select':
            formData[field.id] = ''
            break
          default:
            formData[field.id] = null
        }
      }
    })
  }

  processFields(fields)
  return formData
}
const formData = ref(generateFormData(fields.value))
</script>

<style lang="scss" scoped></style>
