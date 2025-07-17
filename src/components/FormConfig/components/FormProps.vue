<template>
  <div class="form-props">
    <el-form v-model="currentActiveField" v-if="currentActiveField" labelPosition="top">
      <el-form-item label="字段ID">
        <el-input v-model="currentActiveField.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="字段名称" v-if="currentActiveField.label">
        <el-input v-model="currentActiveField.label"></el-input>
      </el-form-item>

      <el-form-item label="组件宽度">
        <el-radio-group v-model="currentActiveField.colSpan">
          <el-radio-button label="1/4" :value="6"></el-radio-button>
          <el-radio-button label="1/3" :value="8"></el-radio-button>
          <el-radio-button label="1/2" :value="12"></el-radio-button>
          <el-radio-button label="2/3" :value="16"></el-radio-button>
          <el-radio-button label="3/4" :value="20"></el-radio-button>
          <el-radio-button label="整行" :value="24"></el-radio-button>
        </el-radio-group>
      </el-form-item>

      <div class="config-area" v-if="currentActiveField.props">
        <div class="area-title">属性配置</div>
        <el-form-item label="是否禁用">
          <el-switch v-model="currentActiveField.props.disabled"></el-switch>
        </el-form-item>
        <el-form-item v-if="currentActiveField.props.options" label="选项数据">
          <el-table :data="currentActiveField.props.options">
            <el-table-column label="label">
              <template #default="scope">
                <el-input v-model="scope.row.label"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="value">
              <template #default="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template #default="scope">
                <el-button
                  type="danger"
                  size="small"
                  @click="currentActiveField.props.options.splice(scope.$index, 1)"
                  >×</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-button
            @click="currentActiveField.props.options.push({ label: '', value: '' })"
            class="add-option-btn"
            >添加选项</el-button
          >
        </el-form-item>

        <el-form-item label="允许的最小值" v-if="currentActiveField.props.hasOwnProperty('min')">
          <el-input-number v-model="currentActiveField.props.min" size="small"></el-input-number>
        </el-form-item>
        <el-form-item label="允许的最大值" v-if="currentActiveField.props.hasOwnProperty('max')">
          <el-input-number v-model="currentActiveField.props.max" size="small"></el-input-number>
        </el-form-item>
        <el-form-item label="步长" v-if="currentActiveField.props.hasOwnProperty('step')">
          <el-input-number v-model="currentActiveField.props.step" size="small"></el-input-number>
        </el-form-item>

        <div v-if="currentActiveField.type === 'upload'">
          <el-form-item label="上传文件字段名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="上传文件类型">
            <el-select>
              <el-option label="图片" value="image"></el-option>
              <el-option label="文件" value="file"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传的地址">
            <el-input></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="config-area">
        <div class="area-title">事件配置</div>
        <div>
          <el-button class="add-rule-btn">设置事件</el-button>
        </div>
      </div>

      <div class="config-area">
        <div class="area-title">验证配置</div>
        <div>
          <p>是否必填</p>
          <el-switch v-model="currentActiveField.required"></el-switch>
          <p>验证规则</p>
          <el-button class="add-rule-btn">添加规则</el-button>
        </div>
      </div>
    </el-form>
    <div class="tip" v-else>
      <p>请先选择一个组件</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FieldsType } from '@/components/DynamicForm/type'
import { disposePinia } from 'pinia'
import { inject } from 'vue'
import type { Ref } from 'vue'

const emits = defineEmits(['updateSchema'])
const currentActiveField = inject('currentActiveField') as Ref<FieldsType | null>
</script>

<style lang="scss" scoped>
.form-props {
  box-sizing: border-box;
  font-size: 14px;
  padding-left: 10px;
  position: relative;
}

.tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-size: 14px;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.area-title {
  display: flex;
  align-items: center;
  margin: 26px 0 16px;
  font-size: 14px;
  padding-left: 10px;
  position: relative;
  &::before {
    content: ' ';
    width: 2px;
    height: 20px;
    position: absolute;
    left: 0;
    display: block;
    background-color: #2e73ff;
  }
}
.add-option-btn {
  width: calc(90% - 10px);
  margin-top: 10px;
}

.add-rule-btn {
  width: calc(90% - 10px);
}
</style>
