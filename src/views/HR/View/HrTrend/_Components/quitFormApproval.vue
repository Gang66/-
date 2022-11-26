<template>
  <div class="quitFormApproval bf-no-error">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="审批">
      <template #topBtn>
        <div v-if="data.ruleForm.step == 4" class=" text-xs  cursor-pointer " @click="uploadExE">
          下载解除终止劳动合同证明书</div>
      </template>
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex" v-if="data.ruleForm.step==2">
            <div>
              <el-form-item label="工作交接" prop="HandWork">
                <el-select v-model="data.ruleForm.HandWork" placeholder="请选择工作交接" @change="HandoverIdChange">
                  <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <div v-if="data.ruleForm.HandWork==1">
              <el-form-item label="交接人" prop="HandoverId" label-width="80px">
                <el-select v-model.number="data.ruleForm.HandoverId" filterable placeholder="请选择交接人员">
                  <el-option v-for="item in data.userList" :key="item.UserId" :label="item.RealName" :value="item.UserId" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div v-if="(data.ruleForm.FlowId == 12 && data.ruleForm.step == 5) || (data.ruleForm.FlowId == 13 && data.ruleForm.step == 4)">
            <div class="flex items-center">
              <el-form-item label="确认社保是否减员" prop="Social" label-width="130px">
                <el-radio-group v-model="data.ruleForm.Social">
                  <el-radio :label="item.DicKey" v-for="(item, index) in data.quitReduceOptions" :key="index">{{ item.DicValue }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="data.ruleForm.Social == 1" class="bf-font-blue-color text-xs  cursor-pointer" style="marginBottom: 11px" @click="data.UploadWindow.view = true">
                上传解除终止劳动合同证明书</div>
            </div>
            <el-form-item label="办公用品交接是否已交接" prop="OfficeSupplies" label-width="170px">
              <el-radio-group v-model="data.ruleForm.OfficeSupplies">
                <el-radio :label="item.DicKey" v-for="(item, index) in data.Suggestion" :key="index">{{ item.DicValue }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-else-if="(data.ruleForm.FlowId == 12 && data.ruleForm.step == 6) || (data.ruleForm.FlowId == 13 && data.ruleForm.step == 5)">
            <el-form-item label="借款情况" prop="loan">
              <el-radio-group v-model="data.ruleForm.loan">
                <el-radio :label="item.DicKey" v-for="(item, index) in data.quitLoanOptions" :key="index">{{ item.DicValue }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="报账情况" prop="Reimbursement">
              <el-radio-group v-model="data.ruleForm.Reimbursement">
                <el-radio :label="item.DicKey" v-for="(item, index) in data.quitQuickOptions" :key="index">{{ item.DicValue }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="flex">
              <el-form-item label="样品情况" prop="Sample">
                <el-radio-group v-model="data.ruleForm.Sample">
                  <el-radio :label="item.DicKey" v-for="(item, index) in data.quitSampleOptions" :key="index">{{ item.DicValue }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="text-sm bf-text-color-regular h-8 leading-8 flex items-center money" style="marginbottom: 10px" v-if="data.ruleForm.Sample == 2">
                <div>尚欠款</div>
                <el-form-item label="" prop="Arrears" label-width="0">
                  <el-input v-model="data.ruleForm.Arrears" placeholder="" style="width: 50px" />
                </el-form-item>
                <div>元</div>
              </div>
            </div>
          </div>
          <template v-if="(data.ruleForm.FlowId == 12 && data.ruleForm.step == 5) || (data.ruleForm.FlowId == 12 && data.ruleForm.step == 4)">
            <el-form-item label="" :prop="data.state == 0 ? 'remark' : ''" label-width="0">
              <el-input v-model="data.ruleForm.remark" :autosize="{ minRows: 8, maxRows: 99 }" type="textarea" placeholder="请输入办公用品的验收情况，例如：归还情况、损坏情况。" />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="" :prop="data.state == 0 ? 'remark' : ''" label-width="0">
              <el-input v-model="data.ruleForm.remark" :autosize="{ minRows: 8, maxRows: 99 }" type="textarea" placeholder="请输入审批意见" />
            </el-form-item>
          </template>
          <div class="mt-4">
            <div class="text-center w-full">
              <el-button type="danger" @click="submitForm(ruleFormRef, 0)">驳 回</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef, 1)">提 交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </OpenWindow>
    <!-- 上传图片 -->
    <Upload :uploadFileData="data.ImgUrl" @uploadFileData="uploadFileDataEvent" v-if="data.UploadWindow.view" @closeWindow="data.UploadWindow.view = false" title="上传证明材料">
    </Upload>
  </div>
</template>

<script lang="ts">
import Upload from '/@/components/Upload/Index.vue'
import RegularForm from './RegularForm.vue'
import quitForm from './quitForm.vue'
import TransferPostForm from './TransferPostForm.vue'
import ChangeSalaryForm from './ChangeSalaryForm.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { GetAllUserList } from '/@/api/layout'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any, context: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, num: number) => {
    data.state = num
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        if ((data.ruleForm.Social && data.ruleForm.Social == 1 && !data.ruleForm.RelieveFile) || (data.ruleForm.Social && data.ruleForm.Social == 1 && data.ruleForm.RelieveFile.length < 0)) {
          ElMessage.error('上传解除终止劳动合同证明书不能为空')
          return
        }
        data.ruleForm.state = num
        context.emit('submitForm', data.ruleForm)
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    loan: [
      {
        required: true,
        message: '请选择借款情况',
        trigger: 'change'
      }
    ],
    Reimbursement: [
      {
        required: true,
        message: '请选择报账情况',
        trigger: 'change'
      }
    ],
    Sample: [
      {
        required: true,
        message: '请选择样品情况',
        trigger: 'change'
      }
    ],
    Arrears: [
      {
        required: true,
        message: '请填写',
        trigger: 'blur'
      }
    ],
    Social: [
      {
        required: true,
        message: '请选择社保是否减员',
        trigger: 'change'
      }
    ],
    OfficeSupplies: [
      {
        required: true,
        message: '请选择办公用品是否已交接',
        trigger: 'change'
      }
    ],
    remark: [
      {
        required: true,
        message: '请填写审批意见',
        trigger: 'blur'
      }
    ]
  })
  //下载劳动合同证明书
  const uploadExE = () => {
    ElMessageBox.confirm('确定下载解除终止劳动合同证明书？', '下载', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        window.open(remoteUrl('/HR/2022/20220813/4b64bd194405e3e73bb8e96b1c73454.docx'))
      })
      .catch(() => {})
  }
  // 监听工作交接
  const HandoverIdChange = (val: any) => {
    if (val == 2) {
      data.ruleForm.HandoverId = 0
    }
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ruleForm.RelieveFile = val
    data.ImgUrl = val
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    uploadFileDataEvent,
    HandoverIdChange,
    uploadExE
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    RegularForm,
    quitForm,
    TransferPostForm,
    ChangeSalaryForm,
    Upload
  },
  emits: ['closeWindow', 'submitForm'],
  props: {
    // 步骤
    Step: {
      type: Number,
      default: null
    },
    // 判断销售线 12是销售线 13 非销售
    FlowId: {
      type: Number,
      default: null
    },
    //详情
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: props.details,
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      },
      state: 0, //审批状态
      ImgUrl: [], //上传展示数据
      Suggestion: {}, //办公用品交接是否已交接
      quitSampleOptions: {}, //样品情况
      quitQuickOptions: {}, //报账情况
      quitLoanOptions: {}, //借款情况
      quitWorkOptions: {}, //工作交接
      quitReduceOptions: {}, //确认社保是否减员
      userList: [] //用户列表
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: ''
    })
    onMounted(() => {
      data.ruleForm.step = props.Step
      data.ruleForm.FlowId = props.FlowId
      // 离职交接工作
      store.getDict('hr_enb_status').then((res: any) => {
        data.quitWorkOptions = res
      })
      // 确认社保是否减员
      store.getDict('hr_quit_Downsizing').then((res: any) => {
        data.quitReduceOptions = res
      })
      // 样品情况
      store.getDict('hr_quit_sample').then((res: any) => {
        data.quitSampleOptions = res
      })
      // 报账情况
      store.getDict('hr_quit_quick').then((res: any) => {
        data.quitQuickOptions = res
      })
      // 借款情况
      store.getDict('hr_quit_loan').then((res: any) => {
        data.quitLoanOptions = res
      })
      //  办公用品交接是否已交接
      store.getDict('hr_enb_status').then((res: any) => {
        data.Suggestion = res
      })
      // 获取所有人员
      GetAllUserList().then((res: any) => {
        data.userList = res.data
      })
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow, context)
    }
  }
})
</script>

<style lang="postcss" scoped>
.quitFormApproval {
  :deep(.el-radio) {
    margin-right: 20px;
  }
  .money {
    :deep(.el-input__wrapper) {
      border-radius: inherit;
      box-shadow: none;
      border-bottom: 1px solid var(--el-input-border-color, var(--el-border-color));
      width: 36px;
    }
  }
}
</style>
