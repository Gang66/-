<template>
  <OpenWindow class="AssetManagement-AssetInventory-Components-addPurchaseForm" title="学习详情" :isShow="true" :boxStyle="Allvar.boxStyle" @closeWindow="Cancel(ruleFormRef)">
    <div class="p-4">
      <!-- 表单内容 -->
      <!-- <hr /> -->
      <div class="flex items-center m-4">
        <div class="w-1 h-4 bg-blue-400 mr-1"></div>
        <div class="font-bold" v-if="addData.data.Type === '1' || addData.data.Type === '2' || addData.data.Type === '3'">新人信息</div>
        <div class="font-bold" v-else-if="addData.data.Type === '4' || addData.data.Type === '5'">深造信息</div>
      </div>
      <!-- form表单 -->
      <div class="bf-window-padding formStyle">
        <el-form ref="ruleFormRef" :model="ruleForm" class="demo-ruleForm" label-width="50" status-icon>
          <el-row class="mb-2">
            <el-col :span="8">
              <el-form-item label="姓名:">
                <el-input disabled v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门:">
                <el-input disabled v-model="ruleForm.department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位:">
                <el-input disabled v-model="ruleForm.post"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="mb-2">
            <el-col :span="8">
              <el-form-item label="原因:">
                <el-input disabled v-model="ruleForm.reason"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="addData.data.Type === '4' || addData.data.Type === '5'">
              <el-form-item label="关数:">
                <el-input disabled v-model="ruleForm.Shutdown"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- table表格 -->
      <div class="m-4">
        <div class="flex items-center mb-2">
          <div class="w-1 h-4 bg-blue-400 mr-1"></div>
          <div class="font-bold">学习详情</div>
        </div>
        <el-table :data="tableData">
          <el-table-column type="index" label="序号" width="65" />
          <el-table-column prop="item." label="课程" min-width="120" />
          <el-table-column prop="address" label="等级" min-width="100" />
          <el-table-column prop="address" label="类型" min-width="100" />
          <el-table-column prop="address" label="是否学习" min-width="120" />
          <el-table-column prop="address" label="学习情况" min-width="120" />
          <el-table-column prop="address" label="成绩" min-width="100" />
        </el-table>
      </div>
    </div>
  </OpenWindow>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    addData: {
      type: Object,
      default: {
        onlyadd: null,
        Type: String
      }
    },
    Type: String
  },

  setup(prop, ctx) {
    // 定义所有变量
    const Allvar = reactive({
      boxStyle: {
        boxWidth: 'w-800',
        boxHeight: ''
      }
    })

    // 表单的数据
    const ruleFormdemo = {
      name: '', //姓名
      department: '', //部门
      post: '', //岗位
      reason: '', //原因
      Shutdown: '' //关停,
    }
    const ruleForm = ref()
    ruleForm.value = JSON.parse(JSON.stringify(ruleFormdemo))
    const ruleFormRef = ref()

    // table表格内容
    const tableData = reactive([
      {
        name: 'Tom',
        address: '测试'
      }
    ])

    //   点击取消/驳回
    const Cancel = (val: any) => {
      // 点击详情后的驳回
      if (prop.addData.onlyadd === 3) {
      }
      val.resetFields()
      ruleForm.value = JSON.parse(JSON.stringify(ruleFormdemo))
      ctx.emit('closeAddDialog')
    }

    return {
      tableData,
      ruleFormRef,
      Cancel,
      Allvar,
      ruleForm
    }
  }
})
</script>
<style lang="postcss" scoped>
.AssetManagement-AssetInventory-Components-addPurchaseForm {
  :deep(.formStyle) {
    .el-select--default {
      width: 100% !important;
    }
    .el-form-item__error {
      display: block !important;
    }
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>
