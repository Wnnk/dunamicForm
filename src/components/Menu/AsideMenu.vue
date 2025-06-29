<template>
  <div class="menu">
    <el-container>
      <el-header>
        <MenuTabs />
      </el-header>
      <el-aside></el-aside>
      <el-main></el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import MenuTabs from './components/MenuTabs.vue'
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  min-height: 100vh;
  max-width: 306px;
}
</style>
