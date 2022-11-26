<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="随机抽检">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding ArchiveForm" hide-required-asterisk>
      <el-form-item label="事业部部门" label-width="84px">
        <el-tree-select v-model="data.ruleForm.DeptId" :data="data.sourceData" check-strictly class="w-full" node-key="Id" :default-expanded-keys="[26]" @node-click="nodeClick" />
      </el-form-item>
      <el-form-item label="抽检人数" label-width="84px" prop="CheckNum">
        <el-input v-model="data.ruleForm.CheckNum" placeholder="请填写抽检人数" />
      </el-form-item>
      <div class="bf-search-formItem mt-10">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import { parseTime } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetStaffFileArchiving, PostSaveStaffFileArchiving } from '/@/api/hr/Induction'
import { FaceCheckWorkRandomSave } from '/@/api/hr/AttendanceManage'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        FaceCheckWorkRandomSave(data.ruleForm).then((res) => {
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
    CheckNum: [{ required: true, message: '抽检人数不能为空', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 事业部部门选中事件
  const nodeClick = (val: any) => {
    data.ruleForm.Cls = val.Cls
    data.ruleForm.DeptId = val.Id
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    parseTimeEvent,
    nodeClick
  }
}

// 弹窗事件
const window = (data: any) => {
  return {}
}
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetStaffFileArchiving(data.Id).then((res) => {
      data.ruleForm = res.data
      if (!data.ruleForm.InductionFile) data.ruleForm.InductionFile = []
    })
  }
  //  获取组织架构树
  store.getDeptTree().then((res: any) => {
    data.sourceData = res
  })
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 面试Id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      ruleForm: {
        Cls: null,
        DeptId: null,
        CheckNum: 1 //抽检人数
      },
      value: '', //测试
      // 查看详情Id
      Id: props.Id,
      // 事业部部门
      sourceData: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-96',
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
      ...window(data),
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.images {
  width: 96px;
  height: 97px;
}
.ArchiveForm {
  :deep(.el-checkbox) {
    margin-right: 29px;
  }
}
</style>
