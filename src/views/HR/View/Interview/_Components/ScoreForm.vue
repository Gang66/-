<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="data.Type == 0 ? `HR评测表` : '面试官评测表'">
    <div class="bf-window-padding">
      <!-- 面试者信息 -->
      <header>
        <div class="flex items-center">
          <div class="hr"></div>
          <div class="title">面试者信息</div>
        </div>
        <div class="h_bg flex items-center">
          <div class="hb-left">
            <el-row :gutter="10">
              <el-col :md="24" :lg="6">
                <div class="flex items-center text-sm">
                  <div class="bf-text-color-regular">姓名：</div>
                  <div class="bf-text-color-primary font-semibold">
                    {{ data.userInfo.ApplyName }}
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="9">
                <div class="flex items-center text-sm">
                  <div class="bf-text-color-regular">应聘岗位：</div>
                  <div class="bf-text-color-primary font-semibold">
                    {{ data.userInfo.PostName }}
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="9">
                <div class="flex items-center text-sm">
                  <div class="bf-text-color-regular">事业部：</div>
                  <div class="bf-text-color-primary font-semibold">
                    {{ data.userInfo.ParentDeptName }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="flex items-center">
              <div class="flex items-center text-sm leading-7">
                <div class="bf-text-color-regular">部门：</div>
                <div class="bf-text-color-primary font-semibold">{{ data.userInfo.DeptName }}</div>
              </div>
              <div class="flex items-center text-sm ml-4">
                <div class="bf-text-color-regular">日期：</div>
                <div class="bf-text-color-primary font-semibold">
                  {{ data.userInfo.ApplyDate }}
                </div>
              </div>
            </div>
          </div>
          <div class="hb_center"></div>
          <!-- class="qrcode" -->
          <div class="m-auto">
            <qrcode :url="data.url" v-if="data.url" :QRMargin="1" :QRWidth="60" :QRHeight="60"></qrcode>
            <div class="text-sm bf-font-blue-color cursor-pointer" @click="copy">复制打分链接</div>
          </div>
        </div>
      </header>
      <!--  评分内容-->
      <div class="mt-4">
        <div class="flex items-center">
          <div class="flex items-center">
            <div class="hr"></div>
            <div class="title">{{ data.Type == 0 ? 'HR评分' : '面试官评分' }}</div>
          </div>
          <div @click="openHrRegister(userInfo)" class="flex items-center ml-2">
            <span class="text-sm bf-warning-color font-semibold cursor-pointer" @click="data.openRegisterFormWindow.show = true">应聘登记表</span>
            <el-icon color="var(--el-color-warning)">
              <el-icon-document />
            </el-icon>
          </div>
          <div class="text-sm ml-1 cursor-pointer bf-font-blue-color" @click="openOneKey" v-if="data.Type == 1">一键录用</div>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" inline-message :rules="rules" label-width="90.22px" hide-required-asterisk>
          <el-row :gutter="10" class="Scores" v-if="ruleForm.MarkOptions.length > 0">
            <el-col :md="24" :lg="data.Type == 0 ? (index == 0 || index == 1 ? 12 : 24) : index == 5 ? 24 : 12" v-for="(item, index) in ruleForm.MarkOptions" :key="index">
              <el-form-item :label="index + 1 + '、' + item.QuestionJson.Name" :prop="`MarkOptions.${index}.Score`" :rules="rules.Score" label-width="auto">
                <el-radio-group v-model="item.Score">
                  <el-radio :label="v.Score" v-for="(v, i) in item.QuestionJson.Options" :key="i">{{ v.Name }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="data.Type == 0">
            <div class="bf-search-formItem">
              <el-form-item :label="ruleForm.MarkOptions.length + 1 + `、建议薪酬`"> </el-form-item>
            </div>
            <el-row :gutter="10" class="mt-1">
              <el-col :md="24" :lg="9">
                <el-form-item label="薪酬类型" prop="PayType">
                  <el-select v-model="ruleForm.PayType" placeholder="请选择">
                    <el-option v-for="item in data.payType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="15">
                <el-form-item label="薪酬备注" prop="" label-width="70px">
                  <el-input v-model="ruleForm.PayRemark" placeholder="非正常薪酬请填写" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="24" :lg="9">
                <el-form-item label="正式薪酬" prop="FormalPay">
                  <el-input v-model="ruleForm.FormalPay" placeholder="请填写" @input="(v) => (ruleForm.FormalPay = v.replace(/[^\d]/g, ''))"><template #append>元</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="试用薪酬" prop="TryPay" label-width="70px">
                  <el-input v-model="ruleForm.TryPay" placeholder="请填写" @input="(v) => (ruleForm.TryPay = v.replace(/[^\d]/g, ''))"><template #append>元</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="7">
                <el-form-item label="试用期限" prop="TryTime" label-width="70px">
                  <el-select v-model="ruleForm.TryTime" placeholder="请选择">
                    <el-option v-for="item in data.trialTime" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :md="24" :lg="24">
              <el-form-item :label="ruleForm.MarkOptions.length + (data.Type == 0 ? 2 : 1) + `、综合评语`" prop="Comment">
                <el-input v-model="ruleForm.Comment" placeholder="请填写" type="textarea" :autosize="{ minRows: 2, maxRows: 99 }" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bf-search-formItem" v-if="data.isHeavy == false || !data.isEdit">
            <el-form-item class="justify-center" label-width="0">
              <div class="text-center w-full">
                <el-button @click="closeWindow('close')">取 消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </OpenWindow>
  <!-- 面试登记表表单 -->
  <registerForm v-if="data.openRegisterFormWindow.show" @closeWindow="registerFormCloseWindow" :Id="ruleForm.InterViewId"></registerForm>
</template>

<script lang="ts">
import qrcode from '/@/components/qrcode/index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import registerForm from './registerForm.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetApplicationRegInfo, GetMarkCate, PostAddInterViewerMarkSave, PostAddInterViewHrMarkPointSave, PostAddSecInterViewerMarkSave, PostOneKeyEmployment } from '/@/api/hr/Interview'
import useClipboard from 'vue-clipboard3'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any, ruleForm: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(ruleForm))
        arr.MarkOptions.forEach((val: any) => {
          val.QuestionJson = JSON.stringify(val.QuestionJson)
        })
        // arr.MarkOptions = JSON.stringify(arr.MarkOptions);
        if (data.Type == 0) {
          // HR打分
          PostAddInterViewHrMarkPointSave(arr).then((res) => {
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
        } else if (data.Type == 1) {
          // 初试面试官打分
          PostAddInterViewerMarkSave(arr).then((res) => {
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
        } else {
          PostAddSecInterViewerMarkSave(arr).then((res) => {
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
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    Score: [{ required: true, message: '请选择评分', trigger: 'change' }],
    TryTime: [{ required: true, message: '请选择试用期限', trigger: 'change' }],
    PayType: [{ required: true, message: '请选择薪酬类型', trigger: 'change' }],
    FormalPay: [{ required: true, message: '请填写正式薪酬', trigger: 'blur' }],
    TryPay: [{ required: true, message: '请填写试用薪酬', trigger: 'blur' }],
    Comment: [{ required: true, message: '请填写综合评语', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return { rules, submitForm, resetForm, ruleFormRef }
}
const GetContractManagementInfoEvent = async (data: any, ruleForm: any) => {
  if (ruleForm.InterViewId) {
    // 根据面试Id获取登记表详情
    GetApplicationRegInfo(ruleForm.InterViewId).then((res) => {
      if (res.code == 1) {
        data.userInfo = res.data
      }
    })
  }
  // 获取评分数据
  GetMarkCate(data.Type).then((res: any) => {
    res.data.forEach((element: any) => {
      element.QuestionJson = JSON.parse(element.QuestionJson)
    })
    ruleForm.MarkOptions = res.data
  })
  // 获取试用期数据
  store.getDict('hr_trial_time').then((res: any) => {
    data.trialTime = res
  })
  // 获取薪酬类型
  store.getDict('hr_pay_type').then((res: any) => {
    data.payType = res
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    qrcode,
    registerForm
  },
  emits: ['closeWindow'],
  props: {
    //父类传递过来的打分类型  0:hr 1:初试官 2:复试官
    Type: {
      type: Number,
      default: 0
    },
    // 用户id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    const { toClipboard } = useClipboard()
    let ruleForm = reactive({
      InterViewId: props.Id, // 查看详情id
      MarkOptions: [], //打分数据
      PayType: '', //薪酬类型
      PayRemark: '', // 薪酬备注
      FormalPay: '', // 正式薪酬
      TryPay: '', //试用薪酬
      TryTime: '', //试用期限
      Comment: '' //综合评语
    })
    let data: any = reactive({
      // 面试登记表弹窗数据
      openRegisterFormWindow: {
        show: false,
        Id: ''
      },
      // 用户信息
      userInfo: {},
      // 薪酬类型
      payType: [],
      //试用期
      trialTime: [],
      //  0:hr 1:初试官 2:复试官
      Type: props.Type,
      url: `${import.meta.env.VITE_HR_H5}#/pages/sysUser/mark/audit?Id=` + props.Id + '&Type=' + props.Type
    })
    // 有效期限只能选择当前时间之后
    const disabledDate = (time: Date) => {
      return time.getTime() < Date.now() - 8.64e7
    }
    // 复制路径
    const copy = async () => {
      try {
        await toClipboard(data.url)
        ElMessage({
          message: '复制成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
      }
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 关闭应聘登记表
    const registerFormCloseWindow = () => {
      data.openRegisterFormWindow.show = false
    }
    // 一键录用
    const openOneKey = () => {
      ElMessageBox.prompt('是否对' + data.userInfo.ApplyName + '启用一键录用？一旦启用无条件通过面试', '一键录用', {
        inputPlaceholder: '请输入录入原因',
        inputPattern: /^.+$/,
        inputErrorMessage: '录入原因不能为空',
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputType: 'textarea'
      })
        .then(({ value }) => {
          console.log(value)
          var arr = {
            InterViewid: props.Id,
            Comment: value
          }
          PostOneKeyEmployment(arr).then((res) => {
            if (res.code == 1) {
              closeWindow('submit')
              ElMessage({
                type: 'success',
                message: res.message
              })
            } else {
              ElMessage.error(res.message)
            }
          })
        })
        .catch(() => {})
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-650',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data, ruleForm)
    })

    return {
      boxStyle,
      data,
      ruleForm,
      openOneKey,
      closeWindow,
      registerFormCloseWindow,
      ...formEvent(data, closeWindow, ruleForm),
      disabledDate,
      copy
    }
  }
})
</script>

<style lang="postcss" scoped>
.hr {
  width: 4px;
  height: 16px;
  background: #516bdb;
}

.title {
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  line-height: 1;
}

header {
  .h_bg {
    .hb-left {
      width: 80%;
      padding: 14px 0px 14px 90px;
    }

    .qrcode {
      width: 50px !important;
      height: 50px !important;
    }

    margin-top: 8px;
    height: 83px;
    background: url('/src/assets/img/hr/Interview/ScoreForm-header-bgTwo.png') no-repeat;
    background-size: 100% 100%;

    .hb_center {
      width: 4px;
      height: 83px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.53) 0%, #ffffff 50%, rgba(255, 255, 255, 0.52) 100%);
    }
  }
}

:deep(.el-radio) {
  margin-right: 10px;
}

.Scores {
  :deep(.el-form-item) {
    margin-bottom: 6px;
  }
}
</style>
