<template>
  <div class="QuestionBankError">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="导入异常试题">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="重复试题" name="first">
            <main>
              <div class="mt-1" v-for="(item, index) in data.testErrorData" :key="index">
                <div class="flex items-center py-1 px-2 bg-blue-100">
                  <div>{{ index + 1 }}、</div>
                  <div v-for="val in data.questionTypeList">
                    <div class="bf-font-blue-color" v-if="val.DicKey == item.QuestionType">[+{{ val.DicValue }}]</div>
                  </div>
                  <div class="ml-2">{{ item.Title }}</div>
                </div>
              </div>
            </main>
          </el-tab-pane>
        </el-tabs>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, Ref, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import theme, { salerDialog } from '/@/config/theme'
import { GetWorkCourseMaterialEntity, PostEditWorkCourseMaterialSave } from '/@/api/hr/CourseDevelop'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { ISaleDialog, ITheme } from '/@/type/config/theme'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkCourseMaterialEntity(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 获取试题类型
  store.getDict('hr_question_type').then((res: any) => {
    data.questionTypeList = res
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.CodeType = JSON.stringify(arr.CodeType)
        PostEditWorkCourseMaterialSave(arr).then((res) => {
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
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    submitForm,
    resetForm,
    ruleFormRef
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 试题Id
    Id: {
      type: Number,
      default: null
    },
    // 异常列表数据
    testErrorData: {
      type: Array,
      default: []
    }
  },
  setup(props, context: SetupContext) {
    const { getSetting } = useLayoutStore()
    const activeName = 'first'
    const tableData: any = []
    let data = reactive({
      ruleForm: {
        questionType: ''
      },
      testErrorData: props.testErrorData, //异常数据列表
      Id: props.Id,
      questionTypeList: [] //试题类型
    })
    // 重新获取主题色
    const f = () => {
      let themeArray = theme()
      return getSetting.theme >= themeArray.length ? themeArray[0] : themeArray[getSetting.theme]
    }
    let themeStyle: Ref<ITheme> = ref(f())
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: 'h-2/3'
    })
    const handleClick = () => {}
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      tableData,
      activeName,
      handleClick,
      themeStyle
    }
  }
})
</script>

<style lang="postcss" scoped>
.QuestionBankError {
  :deep(.el-scrollbar__wrap) {
    overflow: auto;
    height: 100%;
    background: #f6f0e0;
  }
  :deep(.el-scrollbar) {
    background-color: v-bind(themeStyle.sidebarBg);
    padding: 10px;
  }
  :deep(.border-b) {
    border-bottom-width: 0;
  }
  :deep(.bg-white) {
    border-radius: 8px;
  }
}
</style>
