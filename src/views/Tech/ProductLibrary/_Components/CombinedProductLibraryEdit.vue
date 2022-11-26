<template>
  <OpenWindow
    :boxStyle="boxStyle"
    :isShow="true"
    @closeWindow="closeWindow('close')"
  >
    <div class="pl-9 pt-4">
      <el-form
        ref="ruleFormRef"
        :model="data.ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm flex flex-wrap"
        :inline="true"
      >
        <el-form-item >
          <el-input
            v-model="data.ruleForm.category"
            autocomplete="off"
            placeholder="闸阀"
            style="width: 350px"
            disabled
          >
            <template #prepend>产品类别</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="Name">
          <el-input
            v-model="data.ruleForm.Name"
            autocomplete="off"
            placeholder="产品名称"
            style="width: 350px"
          >
            <template #prepend>产品名称</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="model">
          <el-input
            v-model="data.ruleForm.model"
            autocomplete="off"
            placeholder="产品型号"
            style="width: 350px"
          >
            <template #prepend>产品型号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pressure">
          <el-input
            v-model="data.ruleForm.pressure"
            autocomplete="off"
            placeholder="产品压力"
            style="width: 350px"
          >
            <template #prepend>产品压力</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="material">
          <el-input
            v-model="data.ruleForm.material"
            autocomplete="off"
            placeholder="产品材质"
            style="width: 350px"
          >
            <template #prepend>产品材质</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="drive">
          <el-input
            v-model="data.ruleForm.drive"
            autocomplete="off"
            placeholder="驱动方式"
            style="width: 350px"
          >
            <template #prepend>驱动方式</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="connect">
          <el-input
            v-model="data.ruleForm.connect"
            autocomplete="off"
            placeholder="连接形式"
            style="width: 350px"
          >
            <template #prepend>连接形式</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="structure">
          <el-input
            v-model="data.ruleForm.structure"
            autocomplete="off"
            placeholder="结构形式"
            style="width: 350px"
          >
            <template #prepend>结构形式</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="seal">
          <el-input
            v-model="data.ruleForm.seal"
            autocomplete="off"
            placeholder="密封面材质"
            style="width: 350px">
            <template #prepend>密封面材质</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="float-right mr-10 mb-4">
        <div class=" mr-3 inline-block">
            <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        </div>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >确定</el-button
        >
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, SetupContext, reactive, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import type { TabsPaneContext, FormInstance, FormRules } from 'element-plus'

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
    Name: [
      {
        required: true,
        message: '请填写产品名称',
        trigger: 'blur'
      }
    ],
    model: [
      {
        required: true,
        message: '请填写产品型号',
        trigger: 'blur'
      }
    ],
     pressure: [
      {
        required: true,
        message: '请填写产品压力',
        trigger: 'blur'
      }
    ],
     material: [
      {
        required: true,
        message: '请填写产品材质',
        trigger: 'blur'
      }
    ],
     drive: [
      {
        required: true,
        message: '请填写驱动方式',
        trigger: 'blur'
      }
    ],
     connect: [
      {
        required: true,
        message: '请填写连接方式',
        trigger: 'blur'
      }
    ],
     structure: [
      {
        required: true,
        message: '请填写结构形式',
        trigger: 'blur'
      }
    ],
    seal: [
      {
        required: true,
        message: '请填写密封面材质',
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
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {},
  setup(props, context: SetupContext) {
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-800',
      boxHeight: ''
    })

    const data = reactive({
      ruleForm: {
        Name:'',
        model:'',
        pressure:'',
        material:'',
        drive:'',
        connect:'',
        structure:'',
        seal:''
      }
    })
    return {
      closeWindow,
      boxStyle,
      data,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
