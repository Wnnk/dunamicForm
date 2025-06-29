<template>
  <el-tabs>
    <el-tab-pane label="组件"><DefaultMain /></el-tab-pane>
    <el-tab-pane label="大纲"><OutlineMain /></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DefaultMain from '../Main/DefaultMain.vue'
import OutlineMain from '../Main/OutlineMain.vue'
</script>

<style lang="scss" scoped></style>
