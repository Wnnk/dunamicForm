<template>
  <el-dialog v-model="visible">
    <div class="btn-group">
      <el-button type="success" plain class="copy-btn" @click="copyToClipboard()">复制</el-button>
    </div>
    <pre>{{ schemaJson }}</pre>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  schemaJson: {
    type: String,
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

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.schemaJson)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style lang="scss" scoped>
.btn-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
