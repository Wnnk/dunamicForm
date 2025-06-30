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
import { v4 as uuidv4, validate } from 'uuid'

const formConfig = ref<FormConfig>({
  id: '1',
  title: {
    label: 'Basic Form Title',
    fontSize: '24px',
    color: 'blue',
    align: 'center',
    subLabel: 'This is a sub-label',
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
        rules: [{ required: true, message: 'Please select your gender' }],
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
        rules: [
          {
            validator: (rule: any, value: number) => value > 18,
            message: 'Please enter a valid age',
          },
          { required: true, message: 'Please enter your age' },
        ],
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
    rules: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: '请输入正确的邮箱格式',
        trigger: 'blur',
      },
    ],
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
    label: '单选框',
    prop: 'radio',
    props: {
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
        { label: 'Option C', value: 'c' },
      ],
    },
    colSpan: 12,
    labelPosition: 'left',
    labelWidth: 120,
  },
  {
    id: uuidv4(),
    type: 'checkbox',
    label: '多选框',
    prop: 'happly',
    props: {
      checkAll: true,
      options: [
        { label: '多选 A', value: 'a' },
        { label: '多选 B', value: 'b' },
        { label: '多选 C', value: 'c' },
        { label: '多选 D', value: 'd', disabled: true },
      ],
    },
    colSpan: 20,
  },
  {
    id: uuidv4(),
    type: 'switch',
    label: '开关',
    prop: 'switch',
    props: {
      activeText: '开',
      inactiveText: '关',
    },
    colSpan: 4,
  },
  {
    id: uuidv4(),
    type: 'colorPick',
    label: '颜色选择器',
    prop: 'colorPick',
    props: {
      showAlpha: true,
      predefine: ['#ff4500', '#ff8c00'],
      size: 'large',
    },
    colSpan: 4,
  },
  {
    id: uuidv4(),
    type: 'dateTimePicker',
    label: '日期时间选择器',
    prop: 'dateTimePicker',
    props: {
      type: 'datetimerange',
      placeholder: '请选择日期时间',
      format: 'YYYY/MM/DD HH:mm:ss',
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date',
      dateFormat: 'YYYY/MM/DD ddd',
      timeFormat: 'A hh:mm:ss',
    },
    colSpan: 10,
  },
  {
    id: uuidv4(),
    type: 'datePicker',
    label: '日期选择器',
    prop: 'datePicker',
    props: {},
    colSpan: 10,
  },
  {
    id: uuidv4(),
    type: 'upload',
    label: '文件上传',
    prop: 'upload',
    props: {
      action: 'http://127.0.0.1:4523/m1/6597638-6303329-default/upload',
      multiple: true,
      limit: 3,
      accept: 'text/plain',
      name: 'file',
    },
  },
  {
    id: uuidv4(),
    type: 'divider',
    label: '',
    prop: '',
    props: {
      direction: 'horizontal',
      contentPosition: 'left',
      label: '分割线',
    },
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
            formData[field.id] = ''
            break
          case 'select':
            formData[field.id] = ''
            break
          case 'checkbox':
            formData[field.id] = []
            break
          case 'radio':
            formData[field.id] = ''
            break
          case 'switch':
            formData[field.id] = false
            break
          case 'colorPick':
            formData[field.id] = ''
            break
          case 'dateTimePicker':
            formData[field.id] = ''
            break
          case 'datePicker':
            formData[field.id] = ''
            break
          case 'upload':
            formData[field.id] = []
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
