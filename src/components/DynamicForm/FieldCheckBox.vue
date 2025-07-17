<template>
  <el-checkbox
    v-if="field.props?.checkAll"
    :indeterminate="indeterminate"
    v-model="checkAll"
    @change="handleCheckAllChange"
    v-bind="field.props || {}"
  >
    全选
  </el-checkbox>
  <el-form-item v-bind="itemStyle" :prop="field.id">
    <el-checkbox-group v-model="localData[field.id]" v-bind="field.props || {}">
      <el-checkbox
        v-for="option in field.props?.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
        v-on="field.events || {}"
      ></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script setup lang="ts">
import type { FieldsType } from './type'
import { computed, inject, ref, watch } from 'vue'

defineOptions({
  name: 'FieldCheckBox',
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
const indeterminate = ref(false)
const checkAll = ref(false)

const allOptionsValues = computed(() => {
  return (
    field.value.props?.options
      ?.filter((option) => !option.disabled)
      ?.map((option) => option.value) || []
  )
})

watch(
  () => [localData.value[field.value.id], allOptionsValues.value],
  () => {
    const checkedCount = localData.value[field.value.id]?.length || 0
    const totalCount = allOptionsValues.value.length
    checkAll.value = checkedCount === totalCount && totalCount > 0
    indeterminate.value = checkedCount > 0 && checkedCount < totalCount
  },
  { deep: true },
)

const handleCheckAllChange = (val: boolean) => {
  localData.value[field.value.id] = val ? [...allOptionsValues.value] : []
  indeterminate.value = false
}
</script>

<style lang="scss" scoped></style>
