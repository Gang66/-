<template>
  <div class="Course-Courseware-Components-CreateCourse">
    <OpenWindow title="创建课程计划" :isShow="true" :boxStyle="data.boxStyle" @closeWindow="Cancel(NewCourse)">
      <div class="p-4">
        <el-form hide-required-asterisk="true" :model="formdata" label-width="90px" :rules="rules" ref="NewCourse">
          <el-row>
            <el-col :span="23">
              <el-form-item label="课件名称 :" prop="CourseName">
                <el-input v-model="formdata.CourseName" placeholder="请输入课件名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="mt-1">
            <el-col :span="23">
              <el-form-item label="面向岗位 :" prop="PostIds">
                <el-select multiple v-model="formdata.PostIds" placeholder="请选择">
                  <el-option v-for="(item, index) in data.PostIds" :key="index" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="mt-1">
            <el-col :span="23">
              <el-form-item label="类型 :" prop="Type">
                <el-select v-model="formdata.Type" placeholder="请选择">
                  <el-option v-for="(item, index) in data.Type" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="mt-1">
            <el-col :span="23">
              <el-form-item label="分配人 :">
                <el-select v-model="formdata.UserId" filterable placeholder="请选择">
                  <el-option v-for="(item, index) in data.UserId" :key="index" :label="item.RealName" :value="item.UserId" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="mt-1">
            <el-col :span="23">
              <el-form-item label="完成时间 :" prop="FinishDate">
                <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="formdata.FinishDate" type="date" placeholder="请选择完成时间" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mt-1 flex justify-center">
            <el-button size="large" @click="Cancel(NewCourse)">取消</el-button>
            <el-button size="large" type="primary" @click="onSubmit(NewCourse)">提交</el-button>
          </div>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { GetAllUserList } from '/@/api/layout/index'
import { PostAddPlan, GetPlanDetails } from '/@/api/hr/Course'
import { ElMessage } from 'element-plus'

const store = useCommonStore()
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeAddWindow', 'successClick'],
  props: {
    TypeData: {
      type: Array,
      default: []
    },
    AddData: {
      type: Object,
      default: {
        Id: null as any
      }
    }
  },
  setup(prop, context) {
    // 所有变量
    const data = reactive({
      boxStyle: {
        boxWidth: 'w-400',
        boxHeight: ''
      },
      // 面向岗位的下拉数据
      PostIds: null as any,
      // 类型下拉
      Type: prop.TypeData,
      // 分配人下拉
      UserId: [],
      // 获取岗位数据
      postList: null as any
    })
    // 表单数据
    const formdatademo = {
      CourseName: '', //课件名称
      PostIds: [], //面向岗位
      Type: '', //类型
      UserId: '', //分配人
      FinishDate: '' //完成时间
    }
    const formdata = ref()
    formdata.value = JSON.parse(JSON.stringify(formdatademo))

    // 获取所有岗位
    store.getDict('CoursewareCodeType').then((res: any) => {
      // console.log(res)

      data.PostIds = res
    })

    // 获取所有公司人员
    const findAllUserList = async () => {
      const res = await GetAllUserList()
      data.UserId = res.data
    }
    findAllUserList()

    const NewCourse = ref()
    // 表单校验规则
    const rules = reactive({
      CourseName: [{ required: true, message: '请输入课件名称', trigger: 'blur' }],
      PostIds: [{ required: true, message: '请选择面向岗位', trigger: 'change' }],
      Type: [{ required: true, message: '请选择类型', trigger: 'change' }],
      FinishDate: [{ required: true, message: '请输入完成时间', trigger: 'change' }]
    })
    // 编辑详情
    const backfill = async () => {
      if (prop.AddData.Id && prop.AddData.Id != 0) {
        const res = await GetPlanDetails(prop.AddData.Id, null)
        formdata.value = res.data
        // console.log(res.data.PostIds.split(','))
        formdata.value.PostIds = res.data.PostIds.split(',').map((i: any) => parseInt(i, 0))
      }
    }
    backfill()
    // 提交
    const onSubmit = async (formEl: any) => {
      if (!formEl) return
      await formEl.validate(async (valid: any, fields: any) => {
        if (valid) {
          if (prop.AddData.Id === 0) {
            formdata.value.PostIds = formdata.value.PostIds.join()
            ElMessage({
              message: '增加成功',
              type: 'success'
            })
          } else if (prop.AddData.Id && prop.AddData.Id != 0) {
            formdata.value.PostIds = formdata.value.PostIds.join()
            ElMessage({
              message: '修改成功',
              type: 'success'
            })
          }
          await PostAddPlan(formdata.value)
          context.emit('successClick')
          Cancel(formEl)
        } else {
          ElMessage.error('请填写必填信息')
          // console.log('error submit!', fields)
        }
      })
    }
    // 点击取消
    const Cancel = (val: any) => {
      val.resetFields()
      formdata.value = JSON.parse(JSON.stringify(formdatademo))
      context.emit('closeAddWindow')
    }

    return {
      NewCourse,
      rules,
      onSubmit,
      data,
      Cancel,
      formdata
    }
  }
})
</script>
<style lang="postcss" scoped>
.Course-Courseware-Components-CreateCourse {
  :deep(.el-select) {
    width: 100%;
  }
  :deep(.el-input--prefix) {
    width: 100%;
  }
}
</style>
