<!--
  @description: 用于表单拖拽，删除
-->

<template>
  <div class="drag-tool">
    <!-- <div class="drag-mask"></div> -->
    <!-- <div class="drag-left">
      <div class="drag-btn">
        <i class="drag-icon icon-move">
          <el-icon><Rank /></el-icon>
        </i>
      </div>
    </div> -->
    <div class="drag-right">
      <div class="drag-btn drag-danger" @click="removeField(props.field.id)">
        <i class="drag-icon icon-delete"
          ><el-icon><Delete /></el-icon
        ></i>
      </div>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { FieldsType } from './type'
import type { PropType } from 'vue'
const props = defineProps({
  field: {
    type: Object as PropType<FieldsType>,
    required: true,
  },
})
const removeField = inject('removeField') as (id: string) => void
</script>

<style lang="scss" scoped>
.drag-tool {
  position: relative;
  display: block;
  min-width: 20px;
  box-sizing: border-box;
  padding: 2px;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  transition: outline-color 0.3s ease;
  outline: 1px dashed #ccc;
  z-index: 0;
}

// .drag-mask {
//   z-index: 19;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }

// .drag-left {
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 20;
// }
.drag-right {
  position: absolute;
  right: 2px;
  top: calc(100% - 20px);
  z-index: 20;
}
.drag-btn {
  height: 18px;
  width: 18px;
  color: #fff;
  background-color: #2e73ff;
  text-align: center;
  line-height: 20px;
  padding-bottom: 1px;
  float: left;
  cursor: pointer;
  justify-content: center;
  i {
    font-size: 14px;
  }
}

.drag-danger {
  background-color: #ff2e2e;
}
</style>
