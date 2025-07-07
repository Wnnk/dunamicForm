<template>
  <div class="aisde-tooltip">
    <div class="aisde-tooltip-item">
      <el-tooltip effect="dark" content="组件列表" placement="right">
        <el-icon :size="24" @click="ChangeActiveName('ComponentList')"><Grid /></el-icon>
      </el-tooltip>
    </div>
    <div class="aisde-tooltip-item">
      <el-tooltip effect="dark" content="国际化管理" placement="right">
        <el-icon :size="24" @click="ChangeActiveName('LanguageConfig')"><Menu /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// const activeName = inject('activeName') as Ref<string>
const ChangeActiveName = inject('ChangeActiveName') as (name: string) => void
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
