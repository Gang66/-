<template>
  <!-- 阀门型号解析 -->
  <div class='tech-product-formula-model-analysis'>
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" @keyup.native.enter="submitForm(ruleFormRef)" label-width="50px" hide-required-asterisk>
      <el-row :gutter='5'>
        <el-col :lg='14'>
          <el-form-item label="型号" prop="modelStr">
            <el-input v-model="data.ruleForm.modelStr" />
          </el-form-item>
        </el-col>
        <el-col :lg='10'>
          <el-button type="primary" @click="submitForm(ruleFormRef)">解析</el-button>
          <el-button @click="resetForm(ruleFormRef)">重设</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { getGBValveModelAnalysis } from '/@/api/tech/ProductFormula'
import { defineComponent, reactive, ref, h } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        getGBValveModelAnalysis(data.ruleForm.modelStr)
          .then((res) => {
            if (res.code == 1) {
              console.log(res.data)

              var _htmlArr: Array<any> = []

              var modelStr = h('p', null, [h('span', null, '解析型号'), h('span', { style: 'color: red;padding: 0 5px;' }, res.data.Model), h('i', { style: 'color: teal' }, res.data.IsAnalysis ? '解析成功' : '解析失败')])
              _htmlArr.push(modelStr)
              _htmlArr.push(h('p', { style: 'border-bottom: 1px dashed #ccc;' }))

              let modelNum = (res.data.ProductModelAnalysisList || []).length
              ;(res.data.ProductModelAnalysisList || []).forEach((item: any) => {
                ;(item.ProductModelAnalysisList || []).forEach((row: any) => {
                  _htmlArr.push(h('p', null, [h('span', null, row.DigitTitle), h('span', { style: 'color: red;padding: 0 5px;' }, row.Code), h('i', { style: 'color: teal' }, row.Mean)]))
                })

                if (modelNum > 1) _htmlArr.push(h('p', { style: 'border-bottom: 1px dashed #ccc;' }))
              })

              //其他参数 如规格
              if ((res.data.OtherList || []).length > 0) {
                let _otherStr = ''
                ;(res.data.OtherList || []).forEach((item: any) => {
                  _otherStr += item + ' '
                })
                _htmlArr.push(h('p', null, [h('span', null, '其他参数'), h('span', { style: 'color: red;padding: 0 5px;' }, ''), h('i', { style: 'color: teal' }, _otherStr)]))
              }

              ElMessageBox({
                title: '解析结果',
                message: h('div', null, _htmlArr),
                showCancelButton: false,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    done()
                  } else {
                    done()
                  }
                }
              })
            } else {
              ElMessage.error(res.message)
            }
          })
          .catch((e) => {
            console.log(`错误：${e}`)
          })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    modelStr: [{ required: true, message: '请输入型号', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 回车键提交
  const enterSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitForm(ruleFormRef)
    }
  }
  return { rules, submitForm, resetForm, ruleFormRef, enterSubmit }
}

export default defineComponent({
  setup() {
    let data: any = reactive({
      ruleForm: {
        modelStr: ''
      }
    })

    return {
      data,
      ...formEvent(data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech-product-formula-model-analysis {
}
</style>