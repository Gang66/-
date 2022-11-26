<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pl-1">
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="5em" class="bf-window-padding" hide-required-asterisk label-position="top" :inline="true">
        <el-form-item label="入库日期" prop="WarehousingDate">
          <el-date-picker v-model="data.ruleForm.WarehousingDate" type="date" placeholder="请选择日期" :size="size" style="width: 360px" />
        </el-form-item>
        <el-form-item label="入库类型" prop="WarehousingType">
          <el-cascader v-model="data.ruleForm.WarehousingType" :options="data.WarehousingTypeOptions" :props="data.props" @change="handleChange" style="width: 360px" placeholder="仓库地址" />
        </el-form-item>
        <el-form-item label="入库仓库" prop="WarehousingWarehouse">
          <el-cascader v-model="data.ruleForm.WarehousingWarehouse" :options="data.WarehousingWarehouseOptions" :props="data.props" @change="handleChange" style="width: 360px" placeholder="仓库地址" />
        </el-form-item>
        <div class="clearfix pt-2 pb-2">
          <div class="float-left text-sm text-gray-600 pb-6">入库明细</div>
          <div class="absolute right-10">
            <div class="inline-block">
              <el-button type="primary" class="mr-4"> <i class="iconfont icon-chuangjian mr-2"></i> 添加</el-button>
            </div>
            <div class="inline-block">
              <el-button type="danger" plain><i class="iconfont icon-shanchu mr-2"></i>删除</el-button>
            </div>
          </div>
          <div class="bf-table-content w-1140">
            <el-table :data="data.tableData" stripe ref="multipleTableRef">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="产品名称" align="center" min-width="150">
                <template #default="scope">
                  <span class="text-gray-400 text-sm">暂无内容</span>
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="产品编号" align="center" min-width="150">
                <template #default="scope">
                  <span class="text-gray-400 text-sm">暂无内容</span>
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="型号" align="center" min-width="150">
                <template #default="scope">
                  <el-input v-model="data.assemble.modelInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="规格" align="center" min-width="120">
                <template #default="scope">
                  <el-input v-model="data.assemble.specificationsInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="体积(cm³)" align="center" min-width="120">
                <template #default="scope">
                  <el-input v-model="data.assemble.volumeInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="重量(g)" align="center" min-width="120">
                <template #default="scope">
                  <el-input v-model="data.assemble.weightInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="单位" align="center" min-width="120">
                <template #default="scope">
                  <el-input v-model="data.assemble.CompanyInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="入库数量" align="center" min-width="120">
                <template #default="scope">
                  <el-input v-model="data.assemble.quantityInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="入库单价(元)" align="center" min-width="120">
                <template #default="scope">
                  <el-input v-model="data.assemble.priceInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="入库金额(元)" align="center" min-width="150">
                <template #default="scope">
                  <el-input v-model="data.assemble.moneyInput" placeholder="0" disabled />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="库位编号" align="center" min-width="120">
                <template #default="scope">
                  <el-input v-model="data.assemble.numberInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="备注" align="center" min-width="150">
                <template #default="scope">
                  <el-input v-model="data.assemble.remarksInput" placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="操作" align="center" fixed="right">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer"> <i class="iconfont icon-shanchu"></i> 删除</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-form-item label="入库总量">
          <el-input v-model="data.ruleForm.TotalWarehousing" placeholder="0" style="width: 550px" disabled />
        </el-form-item>
        <el-form-item label="入库总额（元）">
          <el-input v-model="data.ruleForm.Totalzonge" placeholder="0" style="width: 550px" disabled />
        </el-form-item>
        <el-form-item label="备注" prop="RemarksInput" style="width: 1200px">
          <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <div class="text-sm pl-8 clearfix">
      <div class="float-right p-4 pr-10">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      ruleForm: {
        WarehousingDate: '',
        WarehousingWarehouse: '',
        WarehousingType: '',
        RemarksInput: '',
        TotalWarehousing: '',
        Totalzonge: ''
      },
      WarehousingWarehouseOptions: [
        {
          value: '1',
          label: '总部1号仓库'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        }
      ],
      WarehousingTypeOptions: [
        {
          value: '1',
          label: '采购入库'
        },
        {
          value: '2',
          label: '销售退货'
        },
        {
          value: '3',
          label: '生产入库'
        },
        {
          value: '4',
          label: '其他入库'
        }
      ],
      props: {
        expandTrigger: 'hover'
      },
      tableData: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }],
      assemble: {
        modelInput: '',
        specificationsInput: '',
        volumeInput: '',
        weightInput: '',
        CompanyInput: '',
        quantityInput: '',
        priceInput: '',
        moneyInput: '',
        numberInput: '',
        remarksInput: ''
      }
    })
    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('success')
        } else {
          ElMessage.error('存在必填项未选')
        }
      })
    }
    // 校验
    const rules = reactive<FormRules>({
      WarehousingDate: [{ required: true, message: '请选择', trigger: 'blur' }],
      WarehousingWarehouse: [{ required: true, message: '请选择', trigger: 'blur' }],
      WarehousingType: [{ required: true, message: '请输入', trigger: 'blur' }],
      RemarksInput: [{ required: true, message: '请输入', trigger: 'blur' }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })
    // 选取的地址
    const handleChange = (val: any) => {
      console.log(val)
    }
    onMounted(() => {
      console.log(props.FormData.selectDetails)
      if (props.FormData.selectDetails == undefined) {
        console.log('不走接口')
      } else {
        console.log('走接口')
      }
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ruleFormRef,
      rules,
      submitForm,
      handleChange
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-form--inline .el-form-item) {
  margin-right: 28px;
}
</style>
