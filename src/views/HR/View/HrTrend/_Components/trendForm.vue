<template>
  <div class="trendForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="人事去向">
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="72px" hide-required-asterisk>
          <section class="bf-search-formItem">
            <div class="leading-none text-sm mb-3">类型选择</div>
            <div class="flex justify-between items-end px-8">
              <div class="pb-3">
                <el-form-item label="申请类型" prop="Name">
                  <el-select v-model="data.ruleForm.ApplicationType" placeholder="请选择申请类型" class="screen-width">
                    <el-option v-for="item in data.trendType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </div>
              <!-- <div class="flex">
                <div class="text-xs mr-2">审批人：</div>
                <div>
                  <el-avatar :size="50" src="1" />
                  <div class="text-xs text-center">王经理</div>
                </div>
              </div> -->
            </div>
          </section>
          <!-- 新增转正申请 -->
          <RegularForm :ApplicationType="data.ruleForm.ApplicationType" v-if="data.ruleForm.ApplicationType == 1" @closeWindow="closeWindow('submit')"></RegularForm>
          <!-- 离职申请表 -->
          <quitForm v-if="data.ruleForm.ApplicationType == 2" @closeWindow="closeWindow('submit')"></quitForm>
          <!-- 调岗申请 -->
          <TransferPostForm v-if="data.ruleForm.ApplicationType == 3" @closeWindow="closeWindow('submit')"></TransferPostForm>
          <!-- 调薪申请 -->
          <ChangeSalaryForm v-if="data.ruleForm.ApplicationType == 4" @closeWindow="closeWindow('submit')"></ChangeSalaryForm>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import RegularForm from './RegularForm.vue'
import quitForm from './quitForm.vue'
import TransferPostForm from './TransferPostForm.vue'
import ChangeSalaryForm from './ChangeSalaryForm.vue'
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
        res.data.CodeType = JSON.parse(res.data.CodeType)
        res.data.FileList.forEach((element: any) => {
          element.name = element.FileName
          element.size = element.FileSize
          element.url = element.SavePath
          element.status = 'success'
        })
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 申请类型
  store.getDict('hr_trend_type').then((res: any) => {
    data.trendType = res
  })
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
  // 根据传递参数 转url
  const retviewurl = (list: any) => {
    var retlist: any = []
    if (list.length > 0) {
      list.forEach((f: any) => {
        var item = remoteUrl(f.Path)
        retlist.push(item)
      })
    }
    return retlist
  }
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
    remoteUrlEvent,
    retviewurl
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    RegularForm,
    quitForm,
    TransferPostForm,
    ChangeSalaryForm
  },
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    },
    // 显示类型 1 添加 2修改 3查看 4审批
    viewType: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      viewType: props.viewType,
      ruleForm: {
        ApplicationType: '1'
      },
      trendType: [], //申请类型
      Id: props.Id
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-900',
      boxHeight: ''
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
.trendForm {
  :deep (.w-900) {
    width: 900px;
    border-radius: 6px;
  }
  :deep (.el-divider--horizontal) {
    margin: 10px 0;
  }
  :deep (.screen-width) {
    width: 160px !important;
  }
  :deep(.el-divider--horizontal) {
    margin: 0px 0;
  }
}
</style>
