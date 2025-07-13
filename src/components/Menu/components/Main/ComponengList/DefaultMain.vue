<template>
  <div class="default-main">
    <div class="component-list">
      <h4 class="group-title">基础组件</h4>
      <div class="list">
        <div
          class="list-item"
          v-for="item in list"
          :key="item.name"
          @click="handleAddField(item.field)"
        >
          <div class="item-icon">
            <i :class="['iconfont', `${item.icon}`]"></i>
          </div>
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="component-list">
      <h4 class="group-title">布局组件</h4>
      <div class="list">
        <div
          class="list-item"
          v-for="item in layout"
          :key="item.name"
          @click="handleAddField(item.field)"
        >
          <div class="item-icon">
            <i :class="['iconfont', `${item.icon}`]"></i>
          </div>
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { FieldsType } from '@/components/DynamicForm/type'
import { v4 as uuidv4 } from 'uuid'

// const props = defineProps({
//   addFields: {
//     type: Function,
//     required: true,
//   },
// })
const addFields = inject('addFields') as (field: FieldsType) => void

const handleAddField = (item: Omit<FieldsType, 'id'>) => {
  const id = uuidv4()
  const newField = {
    ...item,
    id,
  }
  addFields(newField)
}
type List = {
  icon: string
  name: string
  field: Omit<FieldsType, 'id'>
}
const list = ref<List[]>([
  {
    name: '输入框',
    icon: 'icon-input',
    field: {
      type: 'input',
      label: '输入框',
      props: {
        placeholder: '请输入内容',
        type: 'text',
      },
    },
  },
  {
    name: '数字输入框',
    icon: 'icon-inputNumber',
    field: {
      type: 'inputNumber',
      label: '数字输入框',
      props: {
        placeholder: '请输入数字',
      },
    },
  },
  {
    name: '单选框',
    icon: 'icon-radio',
    field: {
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
    },
  },
  {
    name: '多选框',
    icon: 'icon-checkbox',
    field: {
      type: 'checkbox',
      label: '多选框',
      props: {
        options: [
          { label: '多选 A', value: 'a' },
          { label: '多选 B', value: 'b' },
          { label: '多选 C', value: 'c' },
        ],
      },
    },
  },
  {
    name: '下拉框',
    icon: 'icon-select',
    field: {
      type: 'select',
      label: '下拉框',
      props: {
        options: [
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
          { label: '选项 C', value: 'c' },
        ],
      },
    },
  },
  {
    name: '开关',
    icon: 'icon-switch',
    field: {
      type: 'switch',
      label: '开关',
      props: {
        activeText: '开',
        inactiveText: '关',
      },
    },
  },
  {
    name: '时间选择器',
    icon: 'icon-dateTimePicker',
    field: {
      type: 'dateTimePicker',
      label: '时间选择器',
      props: {
        type: 'datetimerange',
        placeholder: '请选择日期时间',
        format: 'YYYY/MM/DD HH:mm:ss',
        startPlaceholder: 'Start date',
        endPlaceholder: 'End date',
        dateFormat: 'YYYY/MM/DD ddd',
        timeFormat: 'A hh:mm:ss',
      },
    },
  },
  {
    name: '日期选择器',
    icon: 'icon-datePicker',
    field: {
      type: 'datePicker',
      label: '日期选择器',
      props: {},
    },
  },
  {
    name: '颜色选择器',
    icon: 'icon-colorPick',
    field: {
      type: 'colorPick',
      label: '颜色选择器',
      props: {
        placeholder: '请选择颜色',
      },
    },
  },
  {
    name: '上传',
    icon: 'icon-upload',
    field: {
      type: 'upload',
      label: '文件上传',
      props: {
        action: '',
        multiple: true,
        limit: 3,
        accept: 'text/plain',
        name: 'file',
      },
    },
  },
  {
    name: '分割线',
    icon: 'icon-divider',
    field: {
      type: 'divider',
      label: '',
      prop: '',
      props: {
        direction: 'horizontal',
        contentPosition: 'left',
        label: '分割线',
      },
    },
  },
])

const layout = ref<List[]>([
  {
    name: '行',
    icon: 'icon-row',
    field: {
      type: 'row',
      label: '',
      children: [],
    },
  },
])
</script>

<style lang="scss" scoped>
@use './iconfont.css';

.component-list {
  border: 1px solid #d9d9d9;
  padding: 0;
  margin: 12px;
  user-select: none;
}
.group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  margin: 0;
}
.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
}
.list-item {
  display: inline-block;
  background: #ffffff;
  color: #262626;
  line-height: 1;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  padding-bottom: 10px;
  &:hover {
    background: #2e73ff;
    color: #ffffff;
  }
}
.item-icon {
  padding: 10px 5px 12px;
}
.item-name {
  font-size: 12px;
  display: block;
}
</style>
