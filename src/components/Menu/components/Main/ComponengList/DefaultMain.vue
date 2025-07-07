<template>
  <div class="default-main">
    <div class="component-list">
      <h4 class="group-title">基础组件</h4>
      <div class="list">
        <div class="list-item" v-for="item in list" :key="item.name">
          <div class="item-icon">
            <i :class="['iconfont', `${item.icon}`]"></i>
          </div>
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const list = ref([
  {
    name: '输入框',
    icon: 'icon-shurukuang',
  },
  {
    name: '数字输入框',
    icon: 'icon-shurukuang',
  },
  {
    name: '单选框',
    icon: 'icon-danxuan',
  },
  {
    name: '多选框',
    icon: 'icon-duoxuan',
  },
  {
    name: '下拉框',
    icon: 'icon-xialakuang',
  },
  {
    name: '开关',
    icon: 'icon-kaiguan',
  },
  {
    name: '时间选择器',
    icon: 'icon-shijian',
  },
  {
    name: '日期选择器',
    icon: 'icon-riqi',
  },
  {
    name: '颜色选择器',
    icon: 'icon-color',
  },
  {
    name: '上传',
    icon: 'icon-tupian',
  },
  {
    name: '分割线',
    icon: 'icon-fengexian',
  },
])
</script>

<style lang="scss" scoped>
@use './iconfont.css';

.component-list {
  border: 1px solid #d9d9d9;
  padding: 0;
  margin: 12px;
  user-select: none;
}
.group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  margin: 0;
}
.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
}
.list-item {
  display: inline-block;
  background: #ffffff;
  color: #262626;
  line-height: 1;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  padding-bottom: 10px;
}
.item-icon {
  padding: 10px 5px 12px;
}
.item-name {
  font-size: 12px;
  display: block;
}
</style>
