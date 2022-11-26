<!--
 * @Author: ZHJ
 * @Date: 2022-08-08 09:26:39
 * @LastEditTime: 2022-08-12 10:01:10
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Further\_Components\AddFurtherForm.vue
 * 版权声明
-->
<template>
  <div class="MaterialForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="创建关停类型">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk :label-position="labelPosition">
          <div class="flex items-center justify-between">
            <el-form-item label="关停类型">
              <el-input v-model="data.ruleForm.ReasonName" placeholder="关停类型" @input="createpy()" />
            </el-form-item>
            <el-form-item label="关停编码" class="w-1/2">
              <el-input v-model="data.ruleForm.ReasonKey" placeholder="关停编码" disabled />
            </el-form-item>
          </div>
          <div class="flex items-center justify-between">
            <!-- <el-form-item label="课程学习次数">
              <el-input v-model="data.ruleForm.LearnCount" placeholder="课程学习次数" />
            </el-form-item> -->
            <el-form-item label="关停所需积分" class="w-full">
              <el-select v-model="data.ruleForm.Point" placeholder="关停所需积分" class="w-full">
                <el-option v-for="item in data.TrainingNeeds" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
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
import { GetAlertReasonTypeInfo, PostInsertEditAlertReasonTypeSave } from '/@/api/hr/Further'
import { GetWorkCourseMaterialEntity, PostEditWorkCourseMaterialSave } from '/@/api/hr/CourseDevelop'
import pinyin from 'js-pinyin'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetAlertReasonTypeInfo(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 获取积分
  store.getDict('hr_aorcework_integral').then((res: any) => {
    data.TrainingNeeds = res
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
        console.log(arr)
        PostInsertEditAlertReasonTypeSave(arr).then((res) => {
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
  // 汉子转拼音
  const createpy = () => {
    pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
    data.ruleForm.ReasonKey = pinyin.getFullChars(data.ruleForm.ReasonName)
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
    Contents: [
      {
        required: true,
        message: '请填写课件说明',
        trigger: 'blur'
      }
    ]
  })
  return {
    rules,
    submitForm,
    ruleFormRef,
    createpy
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 传递参数
    info: {
      type: Object,
      default: {
        checkId: null,
        Id: null,
        viewType: 3
      }
    },
    // Id
    Id: {
      type: Number,
      default: 0
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      viewType: props.info.viewType,
      ruleForm: {},
      Id: props.Id
    })
    const labelPosition = ref('top')
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-450',
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
      ...formEvent(data, closeWindow),
      labelPosition
    }
  }
})
</script>

<style lang="postcss" scoped>
.labelPositionRight {
  .el-form-item {
    display: flex;
    align-items: baseline;
  }
}
</style>
