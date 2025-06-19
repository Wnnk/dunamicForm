<!-- 
  @description: 用于表单拖拽，删除
-->

<template>
  <div class="drag-tool">
    <div class="drag-left"></div>
    <div class="drag-right"></div>
    <slot name="default"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.drag-tool {
}
</style>
