<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="档案归档">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding ArchiveForm" hide-required-asterisk>
      <div class="">
        <el-row :gutter="0">
          <el-col :xs="12" :sm="12" :md="12" :lg="7">
            <el-form-item label="首次存档时间" label-width="100px">
              <div class="truncate">
                {{ parseTimeEvent(data.ruleForm.FiretFilesDate) }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="7">
            <el-form-item label="最后更新时间" label-width="100px">
              <div class="truncate">
                {{ parseTimeEvent(data.ruleForm.LastFileDate) }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="10">
            <el-form-item label="归档人">
              <div class="truncate">
                {{ data.ruleForm.PostName }}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="12" :lg="24">
          <el-form-item label="入职文件" class="relative">
            <el-checkbox-group v-model="data.ruleForm.InductionFile">
              <el-checkbox v-for="item in data.InductionFile" :label="item.DicKey">{{ item.DicValue }}</el-checkbox>
            </el-checkbox-group>
            <div class="absolute top-8 left-32">
              <el-checkbox label="勾选全部" v-model="data.checkAll" @change="handleCheckAllChange" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="12" :lg="24">
          <el-form-item label="备注">
            <el-input v-model="data.ruleForm.FielRemark" :rows="2" type="textarea" placeholder="请输入备注说明" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="data.ruleForm.FileHistory">
        <el-col :xs="12" :sm="12" :md="12" :lg="24">
          <el-form-item label="操作记录">
            <div>
              <div v-if="data.isShow" class="bf-font-blue-color cursor-pointer" @click="data.isShow = false">收起</div>
              <div v-else class="bf-font-blue-color cursor-pointer" @click="data.isShow = true">展开</div>
              <div v-if="data.isShow">
                <div v-for="(item, index) in data.ruleForm.FileHistory" :key="index">
                  <div>{{ item.HistoryRecord }}</div>
                </div>
                <!-- <div class="bf-text-color-regular mr-4">2022/03/14 11:35</div> -->
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bf-search-formItem" v-if="data.isHeavy == false || !data.isEdit">
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
import { PostAddInterViewerSave, PostGetInterViewUserTree } from '/@/api/hr/Interview'
import { GetStaffFileArchiving, PostSaveStaffFileArchiving } from '/@/api/hr/Induction'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostSaveStaffFileArchiving(data.ruleForm).then((res) => {
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
    InterViewDate: [{ required: true, message: '请选择面试日期', trigger: 'change' }],
    InterViewTime: [{ required: true, message: '请选择面试时间段', trigger: 'change' }],
    InterViewWay: [{ required: true, message: '请选择面试方式', trigger: 'change' }],
    InterViewerName: [{ required: true, message: '请选择面试官', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听人员返回数据
  const transferData = (val: any) => {
    data.ruleForm.InterViewerName = val.Details.label
    data.ruleForm.InterViewerId = val.Details.Id
    data.ruleForm.DeptIds = JSON.stringify(val.DeptIds)
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    transferData,
    parseTimeEvent
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
  // 获取面试方式
  store.getDict('sys_InductionFile').then((res: any) => {
    data.InductionFile = res
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
    //面试时间
    const timeStageOptions = [
      {
        value: '上午',
        label: '上午',
        children: [
          { value: '8:00~9:00', label: '8:00~9:00' },
          { value: '9:00~10:00', label: '9:00~10:00' },
          { value: '10:00~11:00', label: '10:00~11:00' },
          { value: '11:00~12:00', label: '11:00~12:00' }
        ]
      },
      {
        value: '下午',
        label: '下午',
        children: [
          { value: '13:00~14:00', label: '13:00~14:00' },
          { value: '14:00~15:00', label: '14:00~15:00' },
          { value: '15:00~16:00', label: '15:00~16:00' },
          { value: '16:00~17:00', label: '16:00~17:00' }
        ]
      }
    ]
    const checkedCities = ref()
    const cities = ['劳务协议', '劳动合同', '劳动公司制度学习及合同条款确认表', '员工档案', '毕业证复印件']
    let data: any = reactive({
      InductionFile: [], //入职文件
      checkAll: false, //是否勾选全部
      isShow: false, //是否展示操作记录
      ruleForm: {},
      // 查看详情Id
      Id: props.Id
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    //监听入职文件多选
    const handleCheckAllChange = (val: boolean) => {
      if (val) {
        var arr: any = []
        data.InductionFile.forEach((element: any) => {
          arr.push(element.DicKey)
        })
        data.ruleForm.InductionFile = arr
      } else {
        data.ruleForm.InductionFile = []
      }
      console.log(data.ruleForm.InductionFile)
    }
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      timeStageOptions,
      checkedCities,
      cities,
      ...window(data),
      ...formEvent(data, closeWindow),
      handleCheckAllChange
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
