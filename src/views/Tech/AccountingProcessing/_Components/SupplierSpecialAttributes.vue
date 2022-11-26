<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <!-- #region -->
    <div class="tech_AccountingProcessing_SupplierSpecialAttributes">
      <div class="h-20 bg-slate-300">
        <img src="../../../../assets/img/tech/gongyingshang.png" alt="" />
      </div>
      <div>
        <el-form ref="ruleFormRef" :model="data.ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm flex flex-wrap" :inline="true">
          <el-form-item prop="weight">
            <div class="ml-12 pt-6">
              <span class="ml-3 w-35 text-gray-600 inline-flex items-center mr-6">重量(KG)</span>
              <el-input style="width: 300px" v-model="data.ruleForm.weight" placeholder="请输入" />
            </div>
          </el-form-item>
          <el-form-item prop="option">
            <div class="ml-12 pt-1">
              <span class="ml-3 w-35 text-gray-600 inline-flex items-center mr-4">下拉选项</span>
              <el-select style="width: 300px" v-model="data.ruleForm.option" class="m-2" placeholder="请选择">
                <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <div class="w-96 h-10 m-auto border-dashed border-gray-300 border text-center leading-10 cursor-pointer rounded-md mb-3" @click="openWindowAddAttribute()">
          <span class="text-sm"> <i class="iconfont icon-chuangjian mr-1"></i> 其他属性</span>
        </div>
      </div>

      <div class="float-right pt-2 mr-6 pb-6">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </div>
    </div>
    <!-- #endregion -->
    <!-- 添加属性 -->
    <AddAttribute title="添加属性" v-if="addAttributeOpenData.visible" :FormData="addAttributeOpenData.formData" @closeWindow="closeWindowAddAttribute($event)" />
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import type { TabsPaneContext, FormInstance, FormRules } from 'element-plus'
import AddAttribute from './AddAttribute.vue'

// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    weight: [
      {
        required: true,
        message: '请填写质量',
        trigger: 'blur'
      }
    ],
    option: [
      {
        required: true,
        message: '请选择',
        trigger: 'blur'
      }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    closeWindow()
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

export default defineComponent({
  components: {
    OpenWindow,
    AddAttribute
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })
    const data = reactive({
      ruleForm: {
        weight: '',
        option: ''
      },
      input: '',
      value: '',
      options: [
        { value: '1', label: '输入框' },
        { value: '2', label: '单选框' }
      ]
    })

    const addAttributeOpen = (data: any) => {
      let addAttributeOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowAddAttribute = (val: any) => {
        addAttributeOpenData.formData = {}
        addAttributeOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowAddAttribute = (type: string) => {
        addAttributeOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        addAttributeOpenData,
        openWindowAddAttribute,
        closeWindowAddAttribute
      }
    }

    return {
      closeWindow,
      boxStyle,
      data,
      ...formEvent(data, closeWindow),
      ...addAttributeOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_AccountingProcessing_SupplierSpecialAttributes {
  :deep(.el-form-item__error) {
    margin-left: 60px;
  }
}
</style>
