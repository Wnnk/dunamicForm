<template>
  <el-tabs>
    <el-tab-pane label="组件"><DefaultMain /></el-tab-pane>
    <el-tab-pane label="大纲"><OutlineMain /></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import DefaultMain from './DefaultMain.vue'
import OutlineMain from './OutlineMain.vue'
</script>

<style lang="scss" scoped></style>
