<template>
  <div class="aisde-tooltip">
    <div class="aisde-tooltip-item">
      <el-tooltip effect="dark" content="组件" placement="right">
        <el-icon :size="24"><Grid /></el-icon>
      </el-tooltip>
    </div>
    <div class="aisde-tooltip-item">
      <el-tooltip effect="dark" content="组件" placement="right">
        <el-icon :size="24"><Menu /></el-icon>
      </el-tooltip>
    </div>
    <div class="aisde-tooltip-item">
      <el-tooltip effect="dark" content="组件" placement="right">
        <el-icon :size="24"><Reading /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style lang="scss" scoped>
.aisde-tooltip {
  width: 66px;
  height: 100%;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}
.aisde-tooltip-item {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  box-sizing: border-box;
}
</style>
