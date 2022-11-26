<template>
  <div class="Course-CoursewareMaking-Components-DistributionForm">
    <OpenWindow class="AssetManagement-AssetRecords-Components-addPurchaseForm" title="计划分配" :isShow="true" :boxStyle="data.boxStyle" @closeWindow="Cancel(PlanForm)">
      <div class="formStyle p-8 pl-2">
        <el-form ref="PlanForm" :model="FormData" :rules="rules" label-width="90px" status-icon>
          <el-row>
            <el-col :span="24">
              <el-form-item label="面向人员 :" prop="UserId">
                <el-select v-model="FormData.UserId" filterable placeholder="请选择">
                  <el-option v-for="(item, index) in data.PeopleOriented" :key="index" :label="item.RealName" :value="item.UserId" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="">
            <el-col :span="24">
              <el-form-item label="完成时间 :" prop="FinishDate">
                <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="FormData.FinishDate" type="date" placeholder="请选择完成时间" />
              </el-form-item>
            </el-col>
          </el-row>

          <div class="flex justify-center mt-4">
            <el-button size="large" @click="Cancel(PlanForm)">取消</el-button>
            <el-button size="large" type="primary" @click="submitForm(PlanForm)">提交</el-button>
          </div>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { GetAllUserList } from '/@/api/layout/index'
import { GetDistributionPlanCourse } from '/@/api/hr/Course'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    PlanData: {
      type: Object,
      default: {
        Id: null as any
      }
    }
  },
  emits: ['closePlanWindow', 'successClick'],
  setup(prop, context) {
    // 所有变量
    const data = reactive({
      boxStyle: {
        boxWidth: 'w-400',
        boxHeight: ''
      },
      PeopleOriented: []
    })

    // 表单信息
    const FormDataDemo = {
      UserId: '',
      FinishDate: ''
    }
    const FormData = ref()
    FormData.value = JSON.parse(JSON.stringify(FormDataDemo))
    // 表单校验
    const rules = reactive({
      UserId: [{ required: true, message: '请选择面向人员', trigger: 'change' }],
      FinishDate: [{ required: true, message: '请输入完成时间', trigger: 'change' }]
    })

    // 获取所有公司人员
    const findAllUserList = async () => {
      const res = await GetAllUserList()
      // console.log(res)
      data.PeopleOriented = res.data
    }
    findAllUserList()

    const PlanForm = ref()
    // 提交
    const submitForm = async (formEl: any) => {
      if (!formEl) return
      await formEl.validate(async (valid: any, fields: any) => {
        if (valid) {
          await GetDistributionPlanCourse({ Id: prop.PlanData.Id, ...FormData.value })
          ElMessage({
            message: '分配成功',
            type: 'success'
          })
          Cancel(formEl)
          context.emit('successClick')
        } else {
          ElMessage.error('请填写必填信息')
          // console.log('error submit!', fields)
        }
      })
    }
    //   取消
    const Cancel = (val: any) => {
      val.resetFields()
      FormData.value = JSON.parse(JSON.stringify(FormDataDemo))
      context.emit('closePlanWindow')
    }
    return {
      PlanForm,
      submitForm,
      rules,
      data,
      Cancel,
      FormData
    }
  }
})
</script>
<style lang="postcss" scoped>
.Course-CoursewareMaking-Components-DistributionForm {
  :deep(.formStyle) {
    .el-select {
      width: 100%;
    }
    .el-input--prefix {
      width: 100%;
    }
  }
}
</style>
