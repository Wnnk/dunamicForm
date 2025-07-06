<template>
  <div class="menu">
    <el-container>
      <el-aside :style="{ width: '66px' }">
        <AisdeTooltip />
      </el-aside>
      <el-aside :style="{ width: '240px' }">
        <ComponentList v-if="activeName === 'ComponentList'" />
        <LanguageConfig v-if="activeName === 'LanguageConfig'" />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import ComponentList from './components/Main/ComponengList/ComponentList.vue'
import LanguageConfig from './components/Main/LanguageConfig/LanguageConfig.vue'
import AisdeTooltip from './components/Aside/AisdeTooltip.vue'

const activeName = ref('ComponentList')
const ChangeActiveName = (name: string) => {
  activeName.value = name
}

provide('ChangeActiveName', ChangeActiveName)
provide('activeName', activeName)
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  min-height: 100vh;
}
</style>
