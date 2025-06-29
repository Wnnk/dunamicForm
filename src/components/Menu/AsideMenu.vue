<template>
  <div class="menu">
    <el-container>
      <el-aside :style="{ width: '66px' }">
        <AisdeTooltip />
      </el-aside>
      <el-aside :style="{ width: '240px' }">
        <MenuTabs />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import MenuTabs from './components/Tabs/MenuTabs.vue'
import AisdeTooltip from './components/Aside/AisdeTooltip.vue'
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  min-height: 100vh;
}
</style>
