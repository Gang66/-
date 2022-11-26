<template>
  <div class="WorkSummaryForm bf-fillet">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="工作总结">
      <template #title>
        <div class="h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100">
          <div class="flex items-center">
            <div class="mr-4">填写工作总结</div>
            <div class="bf-text-color-regular text-sm">请认真阅读，再填写今日总结</div>
          </div>
          <div class="cursor-pointer rounded-full bg-gray-200 bg-opacity-50 p-0.5" style="line-height: 0">
            <el-icon @click="closeWindow('close')">
              <el-icon-close />
            </el-icon>
          </div>
        </div>
      </template>
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <header>
            <div class="flex justify-between">
              <div>
                <div class="bf-font-blue-color font-semibold">今日学习的意义</div>
                <div class="flex mt-2">
                  <div class="ml-4">
                    <div class="flex items-center">
                      <div class="flex justify-between">
                        <div class="flex items-center">
                          <div class="circular_bg" />
                          <div class="ml-2 bf-text-color-regular">学习态度</div>
                        </div>
                      </div>
                      <div class="ml-4 text-sm bf-text-color-regular">学习态度是首要动力源，充分认知行业、职业、事业，从而滋生学习动机。</div>
                    </div>
                    <div class="flex items-center mt-2">
                      <div class="flex justify-between">
                        <div class="flex items-center">
                          <div class="circular_bg" />
                          <div class="ml-2 bf-text-color-regular">学习能力</div>
                        </div>
                      </div>
                      <div class="ml-4 text-sm bf-text-color-regular">学习能力是核心竞争力，学得好学得快说明能力再造功能强，反之要加强。</div>
                    </div>
                    <div class="flex items-center mt-2">
                      <div class="flex justify-between">
                        <div class="flex items-center">
                          <div class="circular_bg" />
                          <div class="ml-2 bf-text-color-regular">职业素养</div>
                        </div>
                      </div>
                      <div class="ml-4 text-sm bf-text-color-regular">职业素养是对任务的担当和能量的输出，坚持做一件事，坚持传播正能量。</div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <div class="mt-4 font-semibold">今日总结</div>
                  </div>
                </div>
              </div>
              <el-image style="width: 150px; height: 166px" :src="data.newWorkSummary" fit="cover" />
            </div>
          </header>
          <main class="main">
            <div class="bf-search-formItem">
              <div class="main_tr">
                <el-form-item prop="Content" label-width="0">
                  <el-input type="textarea" placeholder="通过学习今日有哪些感受：不少于50个字" v-model="data.ruleForm.Content" :autosize="{ minRows: 10, maxRows: 99 }" :disabled="data.isDisabled">
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="text-sm mt-4 bf-text-color-regular">
              <div style="text-indent: 1em" class="leading-5">从知识到技能再到才干，才是最完整和有价值的学习历程。</div>
              <div style="text-indent: 1em" class="leading-5">现在的你正处于什么阶段呢，不妨给自己提出新的要求，提升学习能力，增强个人的竞争力。</div>
            </div>
          </main>
          <!-- 审阅记录 -->
          <main class="main mt-4" v-if="data.isRecord">
            <div class="mt-3 bf-search-formItem">
              <div class="flex items-center justify-between">
                <div class="main_th flex justify-between items-center">
                  <div class="main_th_title font-semibold">领导评语</div>
                </div>
                <el-form-item prop="ManageTrainWork" label-width="0">
                  <el-radio-group v-model="data.ruleForm.ManageTrainWork" disabled>
                    <el-radio :label="3">好</el-radio>
                    <el-radio :label="2">中</el-radio>
                    <el-radio :label="1">差</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="main_tr px-2 py-2 text-sm">
                <template v-for="(item, index) in data.ruleForm.ManageWorkContantList" :key="index">
                  <div class="flex items-start justify-between mb-4">
                    <div class="break-all" style="width: 50%">{{ item.ManageContent }}</div>
                    <div class="flex items-center bf-text-color-regular">
                      <div>
                        <span>姓名:</span>
                        <span>{{ item.ManageName ? item.ManageName : '无' }}</span>
                      </div>
                      <div class="ml-2">
                        <span>岗位:</span>
                        <span>{{ item.ManagePostName ? item.ManagePostName : '无' }}</span>
                      </div>
                      <div class="ml-2">
                        <span>时间:</span>
                        <span>{{ item.ManageTime ? item.ManageTime : '无' }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </main>
          <!-- 审阅 -->
          <main class="main mt-4" v-if="data.isShowAppRoval">
            <!--  bf-search-formItem -->
            <div class="flex justify-between">
              <div class="font-semibold">领导评语</div>
              <el-form-item prop="ManageTrainWork" label-width="0" v-if="data.isApproval == false">
                <el-radio-group v-model="data.ruleForm.ManageTrainWork">
                  <el-radio :label="3">好</el-radio>
                  <el-radio :label="2">中</el-radio>
                  <el-radio :label="1">差</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="mt-2 bf-search-formItem">
              <div class="main_tr">
                <el-form-item prop="ManageContent" label-width="0">
                  <el-input type="textarea" placeholder="请输入评语" v-model="data.ruleForm.ManageContent" :autosize="{ minRows: 3, maxRows: 99 }"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="bf-search-formItem mt-4">
              <div class="text-center w-full">
                <el-button @click="closeWindow('close')">取 消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">审 阅</el-button>
              </div>
            </div>
          </main>
          <div class="bf-search-formItem mt-4" v-if="details.viewType == 1">
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
import newWorkSummary from '/@/assets/img/hr/summary/newWorkSummary.png'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetWorkSummaryInfo, PostInsertEditWorkSummarySave } from '/@/api/hr/WorkSummary'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const userStore = useLayoutStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.details.Id) {
    GetWorkSummaryInfo(data.details.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
        if (data.ruleForm.ManageTrainWork == 0) {
          data.ruleForm.ManageTrainWork = undefined
        }
        // 判断是否已经审批好中差
        if (data.ruleForm.ManageTrainWork) {
          data.isApproval = true
          data.ruleForm.ManageContent = ''
        }
        // 判断显示审批记录
        if (data.details.viewType == 3 && data.ruleForm.ManageWorkContantList.length > 0) {
          data.isRecord = true
        }
        // data.details.isApproval 来自审批列表
        if (data.details.isApproval) {
          var isFind = false
          //查询当前登录人是否已经审批来展示审批按钮
          data.ruleForm.ManageWorkContantList.forEach((element: any) => {
            if (userStore.getUserInfo.Id == element.ManagId) {
              data.isShowAppRoval = false
              isFind = true
            }
          })
          if (isFind == false) {
            data.isShowAppRoval = true
          }
        }
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
        arr.Name = userStore.getUserInfo.RealName
        arr.DeptId = userStore.getUserInfo.DeptId
        arr = Object.assign(data.details, arr)
        PostInsertEditWorkSummarySave(arr).then((res) => {
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
    Content: [
      {
        required: true,
        message: '请填写今日总结',
        trigger: 'blur'
      },
      { min: 50, message: '今日总结，学习感受不能低于50字', trigger: 'blur' }
    ],
    ManageTrainWork: [
      {
        required: true,
        message: '请选择领导评分',
        trigger: 'change'
      }
    ],
    ManageContent: [
      {
        required: true,
        message: '请填写领导评语',
        trigger: 'blur'
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
    details: { type: Object, default: {} }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      newWorkSummary: newWorkSummary,
      isDisabled: false,
      isShow: false,
      details: props.details,
      isRecord: false, //显示审批记录
      isApproval: false, // 判断是否已经审批好中差
      ruleForm: {
        value: null, //测试
        Content: '',
        ManageTrainWork: 0
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-850',
      boxHeight: ''
    })
    onMounted(() => {
      if (props.details.viewType == 3 || props.details.viewType == 4) {
        data.isDisabled = true
      }
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
.WorkSummaryForm {
  .circular_bg {
    border-radius: 100%;
    background: #468bfd;
    width: 6px;
    height: 6px;
  }
  .summaryForm_image {
    width: 24px;
    height: 10px;
  }
  .main {
    .el-radio {
      margin-right: 12px;
    }
    .main_tr {
      .main_tr_title {
        padding: 15px 15px 0;
        font-size: 14px;
        color: #333333;
      }
      :deep(.el-textarea__inner) {
        border: none;
        box-shadow: none;
        background: #f5f6f7;
        border-radius: 4px;
      }
    }
  }
  :deep(.el-form-item__error) {
    display: block;
  }
  :deep(.bf-window-padding) {
    padding: 1rem 1.7rem;
  }
}
</style>
