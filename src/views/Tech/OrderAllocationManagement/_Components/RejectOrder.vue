<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="tech_orderAllocationManagement__components_rejectOrder">
      <!-- #region  top -->
      <div>
        <el-form ref="ruleFormRef" :model="data.ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm flex flex-wrap" :inline="true">
          <el-form-item>
            <div class="ml-12 pt-6">
              <span class="ml-3 w-35 text-gray-600 inline-flex items-center mr-6">发送人</span>
              <el-input style="width: 300px" disabled v-model="data.ruleForm.Name" />
            </div>
          </el-form-item>
          <el-form-item prop="AddreUserIds">
            <div class="ml-8 pt-1">
              <span class="ml-5 w-35 text-gray-600 inline-flex items-center mr-4">接收人员</span>
              <el-select v-model="data.ruleForm.AddreUserIds" multiple placeholder="选择选项" style="width: 300px">
                <el-option v-for="item in data.imGroupUserList" :key="item.UserId" :label="item.RealName" :value="item.UserId">
                  <span style="float: left">{{ item.RealName }}</span>
                  <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.RoleName }}</span>
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item prop="NewsInfo">
            <div class="ml-12">
              <span class="float-left w-35 text-gray-600 inline-flex items-center mr-4">拒绝原因</span>
              <div class="pt-1 inline-block ml-2">
                <el-input v-model="data.ruleForm.NewsInfo" maxlength="100" style="width: 300px" placeholder="输入内容" show-word-limit type="textarea" />
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="float-right mr-14 mb-5">
          <el-button @click="closeWindow('close')">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { GetTechImGroupEnquiryToUserList, PostAddTechImNewsSave } from '/@/api/tech/TechIm'
import { useLayoutStore } from '/@/store/modules/layout'

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
      if (valid) {
        var info: any = {}

        // 订单作废
        info.OrderState = -1
        info.ApprovalStatus = 0

        // 接收类型 0全员 1指定人员
        info.ReceiveType = 1
        info.AddreUserIds = data.data.ruleForm.AddreUserIds

        // 发送类型 0文字 1图片 2文件 3语音 4视频
        info.SendType = 0
        info.NewsInfo = data.data.ruleForm.NewsInfo

        // 聊天组Id
        if ((data.data.imGroupUserList || []).length > 0) {
          info.ImGroupId = data.data.imGroupUserList.find((x: any) => {
            return x.ImGroupId
          }).ImGroupId
        }

        // 发送者
        info.UserId = data.userInfo.Id

        // 发送消息
        PostAddTechImNewsSave(info).then((res: any) => {
          if (res.code == 1) {
            ElMessage.success(res.message)
            data.closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    AddreUserIds: [{ required: true, message: '请选择', trigger: 'blur' }],
    NewsInfo: [{ required: true, message: '请填写', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef
  }
}

// 获取数据
const getData = async (data: any) => {
  await GetTechImGroupEnquiryToUserList(data.id).then((res) => {
    if (res.code == 1) {
      data.imGroupUserList = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0 //询价单Id
      }
    }
  },
  setup(props, context: SetupContext) {
    const { getUserInfo } = useLayoutStore()
    const data = reactive({
      id: 0,
      imGroupUserList: [
        {
          UserId: 0,
          RealName: 0,
          RoleName: ''
        }
      ],
      ruleForm: {
        Name: getUserInfo.RealName + '（' + getUserInfo.postname + '）',
        AddreUserIds: [],
        NewsInfo: ''
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })

    onMounted(() => {
      data.id = props.FormData.Id
      //获取数据
      getData(data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ...formEvent({ data, userInfo: getUserInfo, closeWindow })
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_orderAllocationManagement__components_rejectOrder {
  :deep(.el-scrollbar__wrap) {
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  }
  :deep(.el-textarea__inner) {
    line-height: 3.5;
  }
  :deep(.border-b) {
    border-bottom-width: 0;
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  :deep(.el-form-item__error) {
    margin-left: 126px;
  }
}
</style>
