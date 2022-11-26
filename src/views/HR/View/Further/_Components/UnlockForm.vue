<!--
 * @Author: ZHJ
 * @Date: 2022-08-13 09:57:17
 * @LastEditTime: 2022-08-15 16:10:01
 * @LastEditors: ZHJ
 * @Description: 关停学习内容
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Further\_Components\UnlockForm.vue
 * 版权声明
-->

<template>
  <div class="UnlockForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="关停学习内容">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <template v-for="(val,index) in data.list" :key="index">
          <main class=" relative rounded border p-3 mb-3" v-for="(v, index) in val.courses">
            <div class="flex items-center">
              <div class=" flex items-center">
                <el-image style="width: 160px; height: 96px; border-radius:4px;" :src="remoteUrlEvent(v.CoverImg)" fit="cover" />
                <div class="ml-4">
                  <div class="mb-3 font-semibold">{{v.Contents}}</div>
                  <div class="FileType" v-if="v.FileType">
                    <span v-if="v.FileType=='PDF'">
                      PDF
                    </span>
                    <span v-if="v.FileType=='VIDEO'">视频</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <el-rate v-model="v.Rate" disabled />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </template>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetWorkCourseMaterialEntity, PostEditWorkCourseMaterialSave } from '/@/api/hr/CourseDevelop'
import { GetPlanInfos } from '/@/api/hr/Further'
import { remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any, form: any) => {
  var arr = {
    planIds: data.info.UserAlertList.length > 0 ? data.info.UserAlertList[0].ForcePlanId : 0,
    UserId: data.info.Id
  }

  GetPlanInfos(arr).then((res: any) => {
    if (res.code == 1) {
      data.list = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
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
  // 网址拼接
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  return {
    submitForm,
    ruleFormRef,
    remoteUrlEvent
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
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {},
      list: [],
      info: props.info
    })
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10000,
      planStatus: '10,20,30',
      force: 1
    })
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
      GetContractManagementInfoEvent(data, form)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      labelPosition,
      form
    }
  }
})
</script>

<style lang="postcss" scoped>
.UnlockForm {
  .el-form-item {
    display: flex;
    align-items: baseline;
  }
  .FileType {
    margin: 10px 0 3px;
    width: 52px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #468bfd;
    border-radius: 4px;
    font-size: 12px;
    color: #468bfd;
    text-align: center;
  }
}
</style>
