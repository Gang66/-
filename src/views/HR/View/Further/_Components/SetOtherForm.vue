<!--
 * @Author: ZHJ
 * @Date: 2022-08-08 09:26:39
 * @LastEditTime: 2022-08-08 10:05:19
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Further\_Components\SetOtherForm.vue
 * 版权声明
-->
<template>
  <div class="MaterialForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="其他设置">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk :label-position="labelPosition">
          <div class="labelPositionRight">
            <el-form-item label="关停类型" prop="Name">
              <div>邀约量</div>
            </el-form-item>
          </div>
          <div class="flex items-center justify-between">
            <el-form-item label="关停学习次数上限">
              <el-input v-model="data.ruleForm.name" placeholder="课程学习次数" />
            </el-form-item>
            <el-form-item label="课件对应积分">
              <el-select v-model="data.ruleForm.name" placeholder="课件对应积分">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
import {
  GetWorkCourseMaterialEntity,
  PostEditWorkCourseMaterialSave
} from '/@/api/hr/CourseDevelop'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkCourseMaterialEntity(data.Id).then((res: any) => {
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
  // 获取培训需求
  store.getDict('TrainingNeeds').then((res: any) => {
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
    ruleFormRef
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
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      viewType: props.info.viewType,
      ruleForm: {},
      Id: props.info.Id
    })
    const options = [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      },
      {
        value: 'Option3',
        label: 'Option3'
      },
      {
        value: 'Option4',
        label: 'Option4'
      },
      {
        value: 'Option5',
        label: 'Option5'
      }
    ]
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
      labelPosition,
      options
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
