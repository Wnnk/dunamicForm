<template>
  <div class="default-form">
    <AsideMenu />
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
import AsideMenu from '@/components/Menu/AsideMenu.vue'

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
const formData = ref({
  name: 'hh',
})
const fields: FieldsType[] = ref([
  {
    id: uuidv4(),
    type: 'input',
    label: 'Name',
    component: 'field-input',
    defaultValue: '',
    colSpan: 12,
    labelPosition: 'right',
    labelWidth: 100,
  },
])
</script>

<style lang="scss" scoped>
.default-form {
  display: flex;
  flex: 1;
  align-items: center;
}
</style>
