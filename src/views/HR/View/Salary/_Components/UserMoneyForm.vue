<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 09:23:13
 * @LastEditTime: 2022-11-08 09:23:33
 * @LastEditors: ZHJ
 * @Description: 收入列表
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\UserMoneyForm.vue
 * 版权声明
-->
<template>
  <div class="UserMoneyForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="工资设定">
      <div class="bf-window-padding">
        <div class="flex">
          <el-avatar :size="62" src="/src/assets/img/hr/Interview/touxiang.png" />
          <div class="ml-3">
            <div class="flex items-center">
              <div class="mr-2">孙伊丽</div>
              <img src="/src/assets/img/hr/Interview/nv.png" v-if="data.userInfo.Sex == 2" class="mr-4" style="width: 16px; height: 16px" />
              <img src="/src/assets/img/hr/Interview/nan.png" v-else-if="data.userInfo.Sex == 1" class="mr-4" style="width: 16px; height: 16px" />
              <img src="/src/assets/img/hr/Interview/shouji.png" alt="" style="width: 14px; height: 14px" />
              <div class="ml-0.5 mr-4" style="fontsize: 13px">15953624611</div>
            </div>
            <div class="flex items-center mt-2">
              <div class="dept_bg">潍坊事业部-业务一部</div>
              <div class="dept_bgTwo">后勤类</div>
              <div class="dept_bgTwo">南来北往软件开发有限公司</div>
            </div>
            <div class="flex mt-2">
              <div class="flex ">
                <div class="text-sm bf-text-color-secondary">开户银行：</div>
                <div class="text-sm">某某银行股份有限公司枣庄分行</div>
              </div>
              <div class="flex  ml-14">
                <div class="text-sm bf-text-color-secondary">银行卡号：</div>
                <div class="text-sm">111111111111111111</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-4">
          <div class="w-6/12  mr-4">
            <div class="bg_F7 font-semibold">考勤</div>
            <div class="pd_12 flex justify-between">
              <div>
                <div class="text-xs">满勤天数</div>
                <div class="text-center mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">出勤率</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">实际出勤(天)</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">出勤时间</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
            </div>
          </div>
          <div class="w-6/12">
            <div class="bg_F7  flex justify-between">
              <div class="font-semibold">实发明细</div>
              <div class="text-xs line-37">174元</div>
            </div>
            <div class="pd_12 flex justify-between">
              <div>
                <div class="text-xs">基本工资</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">承包量</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">社保费</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">违约金</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
            </div>
          </div>

        </div>
        <div class="flex">
          <div class="w-6/12 mr-4">
            <div class="bg_F7  flex justify-between">
              <div class="font-semibold">基本工资</div>
              <div class="text-xs line-37">2300*9.48%*80%=174元</div>
            </div>
            <div class="pd_12 flex justify-between">
              <div>
                <div class="text-xs">基本工资</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">工龄</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">社保费</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">加班费</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">学习费</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">总结费</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
            </div>
          </div>
          <div class="w-6/12">
            <div class="bg_F7 font-semibold">承包量</div>
            <div class="pd_12 flex justify-between">
              <div>
                <div class="text-xs">报价量</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">金额量</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">合同量</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">总结费</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
              <div>
                <div class="text-xs">渠道量</div>
                <div class="text-center  mt-1 text-xs">24</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex w-6/12 mr-4">
            <div class="w-6/12 mr-4">
              <div class="bg_F7  flex justify-between">
                <div class="font-semibold">承包值</div>
              </div>
              <div class="pd_12 flex justify-between ">
                <div>
                  <div class="text-xs">提成</div>
                  <div class="text-center  mt-1 text-xs">24</div>
                </div>
                <div>
                  <div class="text-xs">加价</div>
                  <div class="text-center  mt-1 text-xs">24</div>
                </div>
                <div>
                  <div class="text-xs">新人学习</div>
                  <div class="text-center  mt-1 text-xs">24</div>
                </div>
              </div>
            </div>
            <div class="w-6/12 ">
              <div class="bg_F7 flex justify-between">
                <div class="font-semibold">扣除</div>
              </div>
              <div class="pd_12 flex justify-between ">
                <div>
                  <div class="text-xs">社保费</div>
                  <div class="text-center  mt-1 text-xs">24</div>
                </div>
                <div>
                  <div class="text-xs">违约费</div>
                  <div class="text-center  mt-1 text-xs">24</div>
                </div>
                <div>
                  <div class="text-xs">缺勤费</div>
                  <div class="text-center  mt-1 text-xs">24</div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-6/12">
            <div class="bg_F7 font-semibold">备注</div>
            <div class="pd_12 flex justify-between">
              <div>
                <div class="text-red-600 text-xs">（基本工资+承包量）*出勤率+承包值-扣费=实发收入；
                  承包量规则：达成业绩量按100%，30%-100%按80%，
                  30%以下按30%；离职按0%（业绩高于30%按在职）。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkCourseFinishedEntity(data.Id).then((res: any) => {
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
        PostEditWorkCourseFinishedSave(arr).then((res) => {
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
  const rules = reactive<FormRules>({})
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
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
    remoteUrlEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {},
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {},
      userInfo: { Sex: 1 },
      sourceData: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-800',
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
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.UserMoneyForm {
  color: #333;
  .dept_bg {
    margin-right: 6px;
    border: 1px solid #468bfd;
    border-radius: 3px;
    font-size: 12px;
    color: #468bfd;
    padding: 2px 6px;
  }
  .dept_bgTwo {
    margin-right: 6px;
    border: 1px solid #f27b33;
    border-radius: 3px;
    font-size: 12px;
    color: #f27b33;
    padding: 2px 6px;
  }
  .bg_F7 {
    background: #f5f6f7;
    font-size: 14px;
    padding: 8px 12px 8px 12px;
  }
  .pd_12 {
    font-size: 14px;
    padding: 8px 12px 8px 12px;
  }
  .line-37 {
    line-height: 21px;
  }
}
</style>
