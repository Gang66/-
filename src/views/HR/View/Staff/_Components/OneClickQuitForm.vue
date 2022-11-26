<template>
  <div class="OneClickQuitForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="员工离职表">
      <template #title>
        <div class="relative">
          <el-image style="width: 229px; height: 228px" class="-top-24 left-1/3" src="/src/assets/img/hr/Staff/oneClickResign.png" fit="" />
        </div>
      </template>
      <div class="absolute -top-24 right-3 cursor-pointer" @click="closeWindow('close')">
        <el-icon :size="30">
          <el-icon-CircleCloseFilled />
        </el-icon>
      </div>
      <div class="px-16 py-10 bf-remove-input-disabled-bg mt-28">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="quittitle">少侠，请三思啊！</div>
          <div class="bf-error-color mt-2">1.入职不足7天的员工</div>
          <div class="bf-error-color mt-3">2.拒不办理离职手续的员工</div>
          <div class="bf-error-color mt-3">3.无法及时到现场办理手续的员工（需事后补手续）</div>
          <div class="mt-4">
            <div class="flex">
              <el-form-item label="离职人员" prop="Name">
                <div>郭子仪</div>
              </el-form-item>
              <el-form-item label="离职时间" prop="Name" class="ml-10">
                <el-date-picker v-model="data.ruleForm.value" type="date" placeholder="选择离职事件" />
              </el-form-item>
            </div>
            <div class="">
              <el-form-item label="" prop="Name" label-width="0">
                <el-input v-model="data.ruleForm.value" :rows="2" type="textarea" placeholder="请输入申请离职原因" />
              </el-form-item>
            </div>
          </div>
          <div class="bf-search-formItem mt-4">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkCourseFinishedEntity(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.CodeType = JSON.stringify(arr.CodeType)
        PostEditWorkCourseFinishedSave(arr).then((res) => {
          if (res.code == 1) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    Name: [
      {
        required: true,
        message: '请填写课件名称',
        trigger: 'blur'
      }
    ],
    TrainingNeeds: [
      {
        required: true,
        message: '请选择培训需求',
        trigger: 'change'
      }
    ]
  })
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    remoteUrlEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        value: null //测试
      },
      quitOptions: {}, //离职类别
      quitWorkOptions: {}, //离职交接工作
      Id: props.Id,
      //   选择课件弹窗
      selectCoursewareWindow: {
        view: false
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: '',
      boxPaddingTop: 'pt-40'
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.OneClickQuitForm {
  .quittitle {
    font-size: 36px;
    font-family: Microsoft YaHei;
    font-weight: 700;
    color: #1965ff;
  }
  .openWindow {
    overflow-y: inherit !important;
  }
  :deep(.el-scrollbar__wrap) {
    overflow: inherit;
  }
  :deep(.el-scrollbar) {
    overflow: inherit;
  }
  :deep(.overflow-hidden) {
    overflow: inherit;
  }
  :deep(.overflow-y-auto) {
    overflow: inherit !important;
    border-radius: 10px;
  }
  :deep(.el-image) {
    position: absolute;
  }
  :deep(.el-form-item__label) {
    font-size: 15px;
  }
}
</style>
