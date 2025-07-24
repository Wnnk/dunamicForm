<template>
  <div class="default-form">
    <el-container>
      <el-aside>
        <AsideMenu
          :addFields="addFields"
          :schema="schema"
          :deleteField="deleteField"
          :setActiveField="setActiveField"
        />
      </el-aside>
      <el-container>
        <el-header><TopTool v-model:schema="schema" /></el-header>
        <el-main>
          <DynamicForm
            v-model:modelValue="formData"
            v-model:schema="schema"
            @submit="handleSubmit"
            ref="dynamicFormRef"
            class="dynamic-form"
          />
        </el-main>
      </el-container>

      <el-aside><FormConfig :schema="schema" /></el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { h, ref, watch, computed, provide } from 'vue'
import type { FieldsType, Schema, ComponentType } from '@/components/DynamicForm/type'
import DynamicForm from '@/components/DynamicForm/DynamicForm.vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import AsideMenu from '@/components/Menu/AsideMenu.vue'
import FormConfig from '@/components/FormConfig/FormConfig.vue'
import TopTool from '@/components/TopTool/TopTool.vue'

const dynamicFormRef = ref()

const currentActiveField = computed(() => {
  if (dynamicFormRef.value) {
    return dynamicFormRef.value.getActiveField()
  } else {
    return null
  }
})

provide('currentActiveField', currentActiveField)

const schema = ref<Schema>({
  formConfig: {
    id: uuidv4(),
    title: {
      label: 'Basic Form Title',
      fontSize: '24px',
      color: 'blue',
      align: 'center',
      subLabel: 'This is a sub-label',
    },
    layout: {},
    btn: {
      resetBtn: true,
      resetBtnText: 'Reset',
    },
  },
  fields: [
    {
      id: uuidv4(),
      type: 'row',
      label: '',
      children: [
        {
          id: uuidv4(),
          type: 'col',
          label: '',
          colSpan: 12,
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
              colSpan: 24,
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
              colSpan: 24,
              labelPosition: 'right',
              labelWidth: 100,
            },
          ],
        },
        {
          id: uuidv4(),
          type: 'col',
          label: '',
          colSpan: 12,
          children: [
            {
              id: uuidv4(),
              type: 'input',
              label: 'Age',
              events: {
                change: (value: string | number) => {
                  console.log(value)
                },
              },
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
              colSpan: 24,
              labelPosition: 'right',
              labelWidth: 100,
            },
          ],
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
      type: 'inputNumber',
      label: '数字输入框',
      prop: 'inputNumber',
      events: {
        change: (currentValue: number | undefined, oldvalue: number | undefined) => {
          console.log('设定的change事件', currentValue, oldvalue)
        },
      },
      props: {
        min: 0,
        max: 100,
        step: 2,
        precision: 0,
      },
      colSpan: 12,
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
    {
      id: uuidv4(),
      type: () => h('div', { style: 'color: red' }, '~~~自定义组件~~~'),
      label: '自定义组件',
    },
  ],
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

const updateFormData = (
  fields: FieldsType[],
  currentFormData: Record<string, any>,
): Record<string, any> => {
  // Start with a clean copy of current form data
  const newFormData = { ...currentFormData }
  // Collect all current valid field IDs
  const validFieldIds = new Set<string>()
  const collectFieldIds = (fieldList: FieldsType[]) => {
    fieldList.forEach((field) => {
      if (field.children) {
        collectFieldIds(field.children)
      } else if (field.id) {
        validFieldIds.add(field.id)
      }
    })
  }
  collectFieldIds(fields)

  // Clean up deleted fields' data
  Object.keys(newFormData).forEach((key) => {
    if (!validFieldIds.has(key)) {
      delete newFormData[key]
    }
  })

  // Initialize new fields while preserving existing values
  const processFields = (fieldList: FieldsType[]) => {
    fieldList.forEach((field) => {
      if (field.children) {
        processFields(field.children)
      } else if (field.id) {
        // Only set default value if the field doesn't exist in formData
        if (!(field.id in newFormData)) {
          newFormData[field.id] = getDefaultValue(field.type)
        }
        // If the field exists, its value is preserved
      }
    })
  }
  processFields(fields)
  return newFormData
}
// 默认值生成器
function getDefaultValue(type: ComponentType): any {
  if (typeof type === 'function') {
    return null
  }
  const defaults: Record<string, any> = {
    input: '',
    select: '',
    checkbox: [],
    radio: '',
    switch: false,
    colorPick: '',
    dateTimePicker: '',
    datePicker: '',
    upload: [],
    inputNumber: 0,
  }
  return defaults[type] ?? null
}

const formData = ref(updateFormData(schema.value.fields, {}))

watch(
  () => schema.value.fields,
  (newFields) => {
    formData.value = updateFormData(newFields, formData.value)
  },
  { deep: true },
)

const addFields = (field: FieldsType) => {
  const activeField = dynamicFormRef.value.getActiveField()
  if (activeField && activeField.type === 'row') {
    const findActiveField = (arr: FieldsType[] = schema.value.fields) => {
      arr.forEach((item) => {
        if (item.id === activeField.id) {
          if (item.children) {
            item.children.push(field)
          } else {
            item.children = [field]
          }
        }
        if (item.children) {
          findActiveField(item.children)
        }
      })
    }
    findActiveField()
  } else {
    schema.value.fields.push(field)
  }
}

const deleteField = (id: string) => {
  const findField = (arr: FieldsType[] = schema.value.fields) => {
    arr.forEach((item, index) => {
      if (item.id === id) {
        arr.splice(index, 1)
      } else if (item.children) {
        findField(item.children)
      }
    })
  }
  findField()
}

const setActiveField = (id: string) => {
  dynamicFormRef.value.setActiveField(id)
}
</script>

<style lang="scss" scoped>
.default-form {
  max-width: 100vw;
  display: flex;
  align-items: center;
}
// .dynamic-form {
//   flex: 1;
//   overflow-y: overlay;
// }
</style>
