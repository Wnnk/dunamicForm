<template>
  <el-aside class="form-config" :style="{ maxWidth: '320px' }">
    <section>
      <header class="config-header">
        <div
          :class="['config-tab', { 'tab-active': curenConfig === 'formProps' }]"
          @click="changeConfig('formProps')"
        >
          组件配置
        </div>
        <div
          :class="['config-tab', { 'tab-active': curenConfig === 'formLayout' }]"
          @click="changeConfig('formLayout')"
        >
          表单配置
        </div>
      </header>
      <main class="config-main">
        <FormProps v-if="curenConfig === 'formProps'" />
        <FormLayout :form-config="schema?.formConfig" v-if="curenConfig === 'formLayout'" />
      </main>
    </section>
  </el-aside>
</template>

<script setup lang="ts">
import FormLayout from './components/FormLayout.vue'
import FormProps from './components/FormProps.vue'
import type { Schema, FieldsType } from '@/components/DynamicForm/type'
import { ref, inject } from 'vue'
import type { Ref } from 'vue'

const emits = ['updateSchema']
const props = defineProps({
  schema: {
    type: Object as () => Schema,
    required: true,
  },
})
const curenConfig = ref('formProps')

const changeConfig = (config: string) => {
  curenConfig.value = config
}
</script>

<style lang="scss" scoped>
.form-config {
  min-height: 100vh;
  border-top: 1px solid #ececec;
  box-sizing: border-box;
  overflow: unset;
  position: relative;
  overflow-y: overlay; /* 关键属性 - 滚动条覆盖在内容上 */
  ::-webkit-scrollbar {
    position: fixed;
    right: 0;
    top: 0;
  }
}

.config-header {
  box-sizing: border-box;
  flex-shrink: 0;
  height: auto;
  position: relative;
  border-bottom: 1px solid #ececec;
  padding: 0 10px;
  width: 100%;
}
.config-tab {
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: node;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
}
.tab-active {
  color: #2e73ff;
  border-bottom: 2px solid #2e73ff;
}

.config-main {
  padding: 8px;
}
</style>
