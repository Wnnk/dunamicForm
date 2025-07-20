<template>
  <el-dialog v-model="visible"> 222</el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
})
const emit = defineEmits(['update:visible'])
const visible = computed({
  get() {
    return props.visible
  },
  set(value: boolean) {
    emit('update:visible', value)
  },
})
</script>

<style lang="scss" scoped></style>
