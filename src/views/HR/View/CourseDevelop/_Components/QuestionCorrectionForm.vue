<template>
  <div class="QuestionCorrectionForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="试题纠错">
      <template #topBtn>
        <el-button type="warning" size="small" @click="submitForm()">标记解决</el-button>
      </template>
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="m-hr bf-bg-blue-color"></div>
              <div class="leading-none ml-2 font-semibold">基础信息</div>
            </div>
            <el-button type="primary" class="ml-2" @click="handleAddOption()">添加选项</el-button>
          </div>
          <main>
            <el-form-item label="题干" prop="Title" label-width="50px" class="mt-2">
              <el-input v-model="data.ruleForm.Title"></el-input>
            </el-form-item>
            <el-form-item label-width="50px" label="选项">
              <div class="options w-full">
                <div class="flex w-full mb-1" v-for="(item, index) in data.ruleForm.OptionArray" :key="index">
                  <div style="width: 10%">
                    <el-input class="w-full" v-model="item.label"></el-input>
                  </div>
                  <div style="width: 85%" class="ml-1">
                    <el-input class="w-full" v-model="item.value"></el-input>
                  </div>
                  <div style="width: 5%; text-align: center" class="ml-1">
                    <div style="font-size: 14px; color: #db4921" @click="handleDeleteOption(item)">删除</div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item required label="标准答案" prop="Correct">
              <el-radio-group v-model="data.ruleForm.Correct">
                <el-radio v-for="(item, index) in data.ruleForm.OptionArray" :key="index" :label="item.label"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label-width="50px" label="解析">
              <el-input type="textarea" :rows="3" v-model="data.ruleForm.Analyze" class="w-full"></el-input>
            </el-form-item>
            <el-form-item label-width="50px" label="难度" prop="Difficult">
              <el-rate v-model="data.ruleForm.Difficult" :max="3" style="width: 100%; height: 30px; line-height: 2"></el-rate>
            </el-form-item>
          </main>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { GetTestLibraryById, PostEditTestLibrary, PostEditWorkCourseMaterialSave } from '/@/api/hr/CourseDevelop'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetTestLibraryById(data.Id).then((res: any) => {
      if (res.code == 1) {
        res.data.Options = JSON.parse(res.data.Options)
        data.ruleForm = res.data
        data.ruleForm.OptionArray = res.data.Options
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
  const submitForm = () => {
    var arr = JSON.parse(JSON.stringify(data.ruleForm))
    arr.Options = JSON.stringify(arr.OptionArray)
    PostEditTestLibrary(arr).then((res) => {
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
  //校验
  const rules = reactive<FormRules>({})
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    submitForm,
    resetForm,
    ruleFormRef,
    rules
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
    }
  },
  setup(props, context: SetupContext) {
    const tableData: any = []
    let data = reactive({
      ruleForm: {
        questionType: '',
        value: '',
        OptionArray: [] as any[]
      },
      Id: props.Id,
      questionTypeList: [] //试题类型
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700'
    })
    // 添加
    const handleAddOption = (val: any) => {
      data.ruleForm.OptionArray.push({
        title: '',
        value: ''
      })
    }
    // 删除
    const handleDeleteOption = (val: any) => {
      data.ruleForm.OptionArray.splice(data.ruleForm.OptionArray.indexOf(val), 1)
    }
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
      handleDeleteOption,
      handleAddOption
    }
  }
})
</script>

<style lang="postcss" scoped>
.QuestionCorrectionForm {
  .m-hr {
    width: 3px;
    height: 16px;
  }
  .w-i-10 {
    width: 200px;
  }
  :deep(.el-divider--horizontal) {
    margin: 10px 0;
    border-top: 3px solid #81a4c2;
  }
  :deep(.el-radio) {
    margin-right: 15px;
  }
}
</style>
