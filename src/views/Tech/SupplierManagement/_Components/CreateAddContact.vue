<template>
  <el-drawer :with-header="true" :size="574">
    <template v-slot:header><span class="iconfont icon-lianxiren inline-block">创建联系人</span> </template>
    <div>
      <el-form ref="ruleFormRef" :model="data.ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" :inline="true">
        <el-form-item prop="Name">
          <el-input v-model="data.ruleForm.Name" autocomplete="off" placeholder="输入姓名" style="width: 220px">
            <template #prepend>姓名</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="techMainBusinessCategory">
          <div class="w-16 h-8 bg-gray-100 inline-block text-center text-gray-400">
            <span>类别</span>
          </div>
          <el-select v-model="data.ruleForm.techMainBusinessCategory" placeholder="请选择" style="width: 180px">
            <el-option v-for="item in data.techMainBusinessCategory" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
          </el-select>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="data.ruleForm.mobile" autocomplete="off" placeholder="输入手机号" style="width: 220px">
            <template #prepend>手机</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="data.ruleForm.phone" autocomplete="off" placeholder="输入电话" style="width: 246px">
            <template #prepend>电话</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="weixin">
          <el-input v-model="data.ruleForm.weixin" autocomplete="off" placeholder="输入微信" style="width: 220px">
            <template #prepend>微信</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="qq">
          <el-input v-model="data.ruleForm.qq" autocomplete="off" placeholder="输入QQ" style="width: 246px">
            <template #prepend>QQ</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="remarks">
          <el-input v-model="data.ruleForm.remarks" autocomplete="off" placeholder="输入备注" style="width: 500px">
            <template #prepend>备注</template>
          </el-input>
        </el-form-item>
      </el-form>

      <div>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="w-56"><i class="iconfont icon-baocun mr-2"></i> 保存</el-button>
        <el-button @click="resetForm(ruleFormRef)" class="w-60 float-right mr-9"><i class="iconfont icon-zhongzhi mr-2"></i> 重置</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, SetupContext, onMounted } from 'vue'
import { ElMessage, FormRules, FormInstance, ElDrawer } from 'element-plus'
const store = useCommonStore() //记得加这一句
import { useCommonStore } from '/@/store/modules/Common'

// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!', data.ruleForm)
        // data.closeWindow('submit')
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
        message: '请填写姓名',
        trigger: 'blur'
      }
    ],
    mobile: [
      {
        required: true,
        message: '请填写手机号',
        trigger: 'blur'
      }
    ],
    phone: [
      {
        required: true,
        message: '请填写电话',
        trigger: 'blur'
      }
    ],
    weixin: [
      {
        required: true,
        message: '请填写微信',
        trigger: 'blur'
      }
    ],
    select: [
      {
        required: true,
        message: '请选择类别',
        trigger: 'change'
      }
    ],
    qq: [
      {
        required: true,
        message: '请填写QQ',
        trigger: 'blur'
      }
    ],
    remarks: [
      {
        required: true,
        message: '请填写备注',
        trigger: 'blur'
      }
    ],
    techMainBusinessCategory: [
      {
        required: true,
        message: '请选择类别',
        trigger: 'blur'
      }
    ]
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

//获取字典数据
const getDictionaryData = (data: any) => {
  //   类别
  store.getDict('tech_contacts_type').then((res: any) => {
    data.techMainBusinessCategory = res
  })
}

export default defineComponent({
  emits: ['closeWindow'],
  setup(prop, context: SetupContext) {
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    const data = reactive({
      ruleForm: {
        mobile: '',
        phone: '',
        weixin: '',
        select: '',
        qq: '',
        remarks: '',
        techMainBusinessCategory: []
      }
    })
    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
    })
    return {
      data,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped></style>
