<template>
  <div class="bf-hr-dialog Innovate">
    <OpenWindow :box-style="boxStyle" :is-show="true" class="openWindow" @closeWindow="closeWindow('close')">
      <template #title>
        <div class="relative z-50">
          <div class="fixed -mt-10 tabs">
            <div v-for="(item, index) in data.ruleForm.job" :key="index" class="cursor-pointer float-left h-10 leading-10 text-lg px-6 text-white" :class="[data.selectIndex == index ? ' selectBg bf-text-color-primary  ' : '', data.selectIndex == 0 ? 'rounded-tl-2xl' : 'rounded-none', data.selectIndex == 3 ? 'rounded-tr-2xl ' : 'rounded-none']" @click="selectEvent(index)">
              {{ item.DicValue }}
            </div>
          </div>
        </div>
      </template>
      <div class="cursor-pointer rounded-full p-1 absolute right-0 -top-12 text-white" style="line-height: 0" @click="closeWindow('close')">
        <img src="/src/assets/img/hr/innovate/form-delete.png" alt="" class="form-delete-img" />
      </div>
      <div class="bg form-radius">
        <div class="relative">
          <div class="form-top absolute" />
          <div class="absolute form-absolute">
            <img class="form-user" src="/src/assets/img/hr/innovate/form-user.png" alt="" />
          </div>
        </div>
        <div class="form-pt relative z-50">
          <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="0px" class="bf-window-padding" hide-required-asterisk>
            <div v-for="(item, index) in data.ruleForm.Suggestion[data.ruleForm.TypeId]" class="relative z-50">
              <div class="text-sm bf-text-color-primary mb-2 font-bold" :class="index == 0 ? 'max-w-sm' : ''">{{ item.title }}</div>
              <el-form-item label="" :prop="'Suggestion[' + data.ruleForm.TypeId + '][' + index + '].Remark'" :rules="rules.Remark">
                <el-input v-if="data.ruleForm.TypeId == 0" v-model="item.Remark" type="textarea" placeholder="请输入创新举措" :disabled="isEdit" :autosize="{ minRows: 3, maxRows: 4 }" />
                <el-input v-else v-model="item.Remark" type="textarea" placeholder="请输入创新举措" :autosize="{ minRows: 6, maxRows: 10 }" :disabled="isEdit" />
              </el-form-item>
            </div>
            <template v-if="data.isState==2">
              <div class="text-sm bf-text-color-primary mb-2 font-bold">处理结果</div>
              <div class="text-sm fotter-bg">
                <template v-for="(val,index) in data.ruleForm.HandleList" :key="index">
                  <div class="flex justify-between text-sm">
                    <div>处理人：{{val.ReceiveName}}</div>
                    <div class="z-50 text-sm">{{val.CreateOn}}</div>
                  </div>
                  <div class="flex justify-between mt-2">
                    <div style="width:360px">处理结果：{{val.Remarks}}</div>
                    <div class="z-50 text-sm">由“{{val.CreateName}}” 转给 “{{val.ReceiveName}}”处理</div>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div v-if="data.ruleForm.job && data.ruleForm.job.length > 0" class="flex items-center">
                <el-checkbox v-model="data.ruleForm.Anonymous" :disabled="isEdit" class="bf-text-color-primary" label="匿名" size="" />
                <div class="text-xs bf-text-color-secondary ml-4">勾选后，表示用户可匿名参与此次问卷调查</div>
              </div>
              <template v-if="data.isHandle">
                <el-form-item>
                  <el-radio-group v-model="data.ruleForm.radio" class="z-50" @change="radioEvent">
                    <el-radio label="1" size="large">转给建议人</el-radio>
                    <el-radio label="2" size="large">指定他人处理</el-radio>
                  </el-radio-group>
                </el-form-item>
                <template v-if="data.ruleForm.radio==2">
                  <el-form-item label="指定人选" label-width="80">
                    <el-select v-model="data.ruleForm.HandoverId" filterable placeholder="请选择指定人选" class=" z-50 screen-width">
                      <el-option v-for="item in data.userList" :key="item.UserId" :label="item.RealName" :value="item.UserId" />
                    </el-select>
                  </el-form-item>
                </template>
                <div class="flex items-start" v-if="data.ruleForm.radio==1">
                  <el-form-item label="处理状态" label-width="80">
                    <el-select v-model="data.ruleForm.State" placeholder="请选择处理状态" class="z-50 screen-width">
                      <el-option v-for="item in data.InnovateState" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="处理备注" label-width="80" class="ml-4">
                    <el-input v-model="data.ruleForm.Remarks" placeholder="请填写处理备注" class="z-50 " autosize type="textarea" />
                  </el-form-item>
                </div>
              </template>
            </template>
          </el-form>
          <template v-if="data.isState!=2">
            <div>
              <template v-if="data.isHandle">
                <div class="text-center relative z-50">
                  <el-button class="w-20" @click="closeWindow('close')">取 消</el-button>
                  <el-button class="w-20" type="primary" @click="submitForm(ruleFormRef,1)">提 交</el-button>
                </div>
              </template>
              <div class="text-center relative z-50" v-else-if="isEdit==false">
                <el-button class="w-20" @click="closeWindow('close')">取 消</el-button>
                <el-button class="w-20" type="primary" @click="submitForm(ruleFormRef,2)">提 交</el-button>
              </div>
            </div>
          </template>
          <div class="form-bottom absolute bottom-0 right-0 z-0" />
        </div>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { addInnovate, getInnovateDetails, PostDealInnovateSave } from '/@/api/hr/Innovate'
import { InnovateData } from '/@/type/views/hr/Innovate'
import { useCommonStore } from '/@/store/modules/Common'
import { GetAllUserList } from '/@/api/layout'
const store = useCommonStore() // 记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, type: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var forwardedBy = null
        if (type == 1) {
          let arr = JSON.parse(JSON.stringify(data.ruleForm))
          arr.Suggestion = JSON.stringify(arr.Suggestion)
          arr.InId = arr.Id
          arr.Id = 0
          if (data.ruleForm.State == 2) {
            forwardedBy = 0
          } else {
            forwardedBy = arr.CreateBy
          }
          if (data.ruleForm.radio == 2) {
            forwardedBy = data.ruleForm.HandoverId
          }
          if (data.ruleForm.HandleList && data.ruleForm.HandleList.length > 0) {
            arr.Id = data.ruleForm.HandleList[data.ruleForm.HandleList.length - 1].Id
            arr.ReceiveId = data.ruleForm.HandleList[data.ruleForm.HandleList.length - 1].ReceiveId
          } else {
            arr.ReceiveId = forwardedBy
          }
          PostDealInnovateSave({ info: arr, ReceiveId: forwardedBy }).then((res) => {
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
          let arr = JSON.parse(JSON.stringify(data.ruleForm))
          arr.Suggestion = JSON.stringify(arr.Suggestion)
          addInnovate(arr).then((res) => {
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
  // 校验
  const rules = reactive<FormRules>({
    TypeId: [{ required: true, message: '请选择创新类型', trigger: 'changge' }],
    Remark: [{ required: true, message: '请填写创新举措', trigger: 'blur' }]
  })
  //监听选择
  const radioEvent = (val: any) => {
    if (val == '2') {
      data.ruleForm.State = '1'
    }
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return { rules, submitForm, resetForm, ruleFormRef, radioEvent }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    Id: {
      type: Number,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isHandle: {
      type: Boolean,
      default: false
    },
    selectIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    let data: any = reactive({
      userList: [],
      isState: 0,
      InnovateState: {},
      ruleForm: {
        TypeId: '0', // 创新类型Id
        Suggestion: [], // 建议
        Anonymous: false,
        radio: '1',
        job: []
      },
      isHandle: props.isHandle,
      Id: props.Id,
      isEdit: props.Id ? true : false,
      selectIndex: 0
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-740',
      boxHeight: ''
    })
    const selectEvent = (index: number) => {
      if (props.isEdit) {
        return
      }
      data.selectIndex = index
      data.ruleForm.TypeId = index.toString()
      context.emit('handleClick', index)
    }
    onMounted(() => {
      data.selectIndex = props.selectIndex
      data.ruleForm.TypeId = props.selectIndex.toString()
      // 获取字典
      const getDict = () => {
        store.getDict('hr_Innovate_status').then((res: any) => {
          if (!props.Id) {
            res.forEach((element: any) => {
              data.ruleForm.Suggestion.push(eval(`(${element.Remark})`))
            })
          }
          data.ruleForm.job = res
        })
      }
      // 处理状态
      store.getDict('hr_Innovate_state').then((res: any) => {
        data.InnovateState = res
      })
      // 获取所有人员
      GetAllUserList().then((res: any) => {
        data.userList = res.data
        console.log(data.userList)
      })
      // 根据Id获取详情
      if (props.Id) {
        getInnovateDetails(props.Id).then((res) => {
          if (res.code == 1) {
            res.data.Suggestion = eval(`(${res.data.Suggestion})`)
            data.isState = res.data.State
            data.ruleForm = res.data
            data.ruleForm.State += ''
            data.selectIndex = res.data.TypeId
            getDict()
            if (data.isHandle) {
              data.ruleForm.radio = '1'
            }
          } else {
            ElMessage.error(res.message)
          }
        })
      } else {
        getDict()
      }
    })
    return {
      closeWindow,
      boxStyle,
      selectEvent,
      data,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.Innovate {
  :deep(.overflow-y-auto) {
    overflow: inherit !important;
    border-radius: 2rem;
    .overflow-x-hidden {
      border-radius: 34px !important;
    }
  }
  .selectBg {
    background: #fff;
  }
  .bg {
    background: #e1edff;
    position: relative;
  }
  .form-radius {
    border-radius: 20px;
  }
  .form-top {
    background-image: url(/src/assets/img/hr/innovate/form-top.png);
    background-size: 100% 100%;
    width: 430px;
    height: 153px;
  }
  .form-bottom {
    background-image: url(/src/assets/img/hr/innovate/form-bottom.png);
    background-size: 100% 100%;
    width: 740px;
    height: 269px;
    z-index: -1;
  }
  .form-user {
    width: 275px;
    height: 186px;
  }
  .form-absolute {
    top: -92px;
    right: 28px;
  }
  .form-pt {
    padding: 0 70px 30px;
    padding-top: 55px;
  }
  .tabs {
    background: #9ebbf8;
    border-radius: 16px 16px 0 0;
    border-bottom: 0.5px dashed #fff;
  }
  .form-delete-img {
    width: 36px;
    height: 36px;
  }
  .bf-window-padding {
    min-height: 246px;
    margin-bottom: 26px;
  }
  .screen-width {
    width: 160px !important;
  }
  .fotter-bg {
    z-index: 99;
    padding: 5px 11px;
    background-color: var(--el-disabled-bg-color);
    border-color: var(--el-disabled-border-color);
    color: var(--el-disabled-text-color);
    cursor: not-allowed;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    transition: var(--el-transition-box-shadow);
  }
}
</style>
