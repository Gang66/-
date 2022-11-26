<template>
  <div class="MaterialForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="预览试题">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-select v-model="data.ruleForm.testType" class="screen-width w-36" placeholder="请选择" :disabled="data.isdisabled">
              <el-option :label="item.DicValue" :value="item.DicKey" v-for="item in data.questionTypeList" />
            </el-select>
            <el-input v-model="data.ruleForm.testLabel" placeholder="请输入关键词" class="ml-2 w-i-10" />
            <el-button type="warning" class="ml-2" @click="search">查询</el-button>
          </div>
          <div class="text-sm bf-text-color-primary">(共{{ data.testList.length }}题)</div>
        </div>
        <main>
          <div class="mt-3" v-for="(item, index) in data.testList" :key="index">
            <div class="flex items-center py-1 px-2 bg-blue-100">
              <div>{{ index + 1 }}、</div>
              <div v-for="val in data.questionTypeList">
                <div class="bf-font-blue-color" v-if="val.DicKey == item.QuestionType">[+{{ val.DicValue }}]</div>
              </div>
              <div class="ml-2">{{ item.Title }}</div>
            </div>
            <div class="text-sm px-8 bf-text-color-regular leading-6 mt-2">
              <div v-for="row in getOptionsList(item.Options)">{{ row.label }}、{{ row.value }}</div>
            </div>
            <el-divider />
            <div class="flex items-center">
              <div v-for="val in data.questionTypeList">
                <!-- <div class="bf-font-blue-color">[+{{val.DicValue}}]</div> -->
                <div class="text-white text-sm rounded-sm w-12 h-6 leading-6 text-center bg-yellow-500" v-if="val.DicKey == item.Difficult">{{ val.DicValue }}</div>
              </div>
              <div class="ml-1 text-sm">
                答案：<span class="bf-font-blue-color">{{ formatCorrect(item) }}</span>
              </div>
              <div class="text-sm bf-text-color-regular ml-8" v-if="item.Analyze" style="max-width: 520px">解析：{{ item.Analyze }}</div>
            </div>
          </div>
        </main>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { GetWorkCourseMaterialEntity, PostEditWorkCourseMaterialSave } from '/@/api/hr/CourseDevelop'
import { useCommonStore } from '/@/store/modules/Common'
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
  // 获取试题难度
  store.getDict('hr_TextQuestions_difficulty').then((res: any) => {
    data.TextQuestionsTypeList = res
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
  const search = () => {
    var testList = data.searchList
    if (data.ruleForm.testType) {
      testList = testList.filter((x: any) => x.QuestionType == data.ruleForm.testType)
    }
    if (data.ruleForm.testLabel) {
      testList = testList.filter((x: any) => x.Title.indexOf(data.ruleForm.testLabel) != -1)
    }
    data.testList = testList
  }
  //获取选项
  const getOptionsList = (options: any) => {
    return JSON.parse(options || '[]')
  }
  //答案
  const formatCorrect = (row: any) => {
    var str = ''
    if (row) {
      if (row.QuestionType == 2) {
        //多选
        var arr = JSON.parse(row.CorrectArray || '[]')
        for (var i = 0; i < arr.length; i++) {
          if (i == 0) str = arr[i]
          else str += '、' + arr[i]
        }
      } else {
        str = row.Correct
      }
    }
    return str
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    submitForm,
    resetForm,
    ruleFormRef,
    getOptionsList,
    formatCorrect,
    search
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
    // 试题数据
    testList: {
      type: Array,
      default: []
    }
  },
  setup(props, context: SetupContext) {
    const tableData: any = []
    let data = reactive({
      ruleForm: {
        questionType: ''
      },
      Id: props.Id,
      questionTypeList: [], //试题类型
      TextQuestionsTypeList: [], //试题难度
      testList: props.testList,
      searchList: props.testList
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: 'h-2/3'
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      tableData
    }
  }
})
</script>

<style lang="postcss" scoped>
.MaterialForm {
  .w-i-10 {
    width: 200px;
  }
  :deep(.el-divider--horizontal) {
    margin: 10px 0;
    border-top: 3px solid #81a4c2;
  }
}
</style>
