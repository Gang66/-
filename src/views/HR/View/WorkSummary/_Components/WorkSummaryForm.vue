<!--
 * @Author: ZHJ
 * @Date: 2022-06-24 10:07:12
 * @LastEditTime: 2022-11-23 10:11:55
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\WorkSummary\_Components\WorkSummaryForm.vue
 * 版权声明
-->
<template>
  <div class="WorkSummaryForm bf-no-error">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="工作总结">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <header>
            <div class="flex justify-between">
              <div class="flex items-center cursor-pointer" @click="isShowEvent()">
                <img src="/src/assets/img/hr/summary/summary_icon.png" class="summaryForm_image" />
                <div class="ml-2 font-semibold">
                  今日数据
                  <span class="text-xs bf-text-color-regular">数据说话，言之凿凿</span>
                </div>
              </div>
              <div class="text-sm font-semibold cursor-pointer bf-font-blue-color" @click="isShowEvent()">
                <el-icon v-if="!data.isShow" color="#999">
                  <el-icon-ArrowRightBold />
                </el-icon>
                <el-icon v-else color="#999">
                  <el-icon-ArrowDownBold />
                </el-icon>
              </div>
            </div>
            <div v-show="data.isShow">
              <div class="flex justify-between mt-5">
                <div class="">
                  <div class="flex items-center mb-1">
                    <div class="text-sm w-100">上午时间</div>
                    <div class="w-240 px-1 text-sm">工作记录及事项</div>
                  </div>
                  <div class="" v-for="(item, index) in data.workList" :key="index">
                    <template v-if="item.IsMF == '1'">
                      <div class="items-center flex mb-1">
                        <div class="summaryForm_header_bottom_label" :style="{ height: item.startTimeLabelHeight + 'px' }">
                          {{ item.DateHour }}
                        </div>
                        <div class="summaryForm_header_bottom_value">
                          <div v-for="(val, i) in item.WorkList" :key="i">{{ val.Data.StartTime.substring(11, 16) }}~{{ val.Data.EndTime.substring(11, 16) }}： {{ val.Title }}</div>
                          <div class="" @click="AddWorkContentEvent(item, 1)" v-if="!data.isDisabled">
                            <img src="/src/assets/img/hr/summary/summary_add.png" class="summaryForm_header_bottom_add" />
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="">
                  <div class="flex items-center mb-1">
                    <div class="text-sm w-100">下午时间</div>
                    <div class="w-240 px-1 text-sm">工作记录及事项</div>
                  </div>
                  <div class="" v-for="(item, index) in data.workList" :key="index">
                    <template v-if="item.IsMF != '1'">
                      <div class="items-center flex mb-1">
                        <div class="summaryForm_header_bottom_label" :style="{ height: item.startTimeLabelHeight + 'px' }">
                          {{ item.DateHour }}
                        </div>
                        <div class="summaryForm_header_bottom_value">
                          <div v-for="(val, i) in item.WorkList" :key="i">{{ val.Data.StartTime.substring(11, 16) }}~{{ val.Data.EndTime.substring(11, 16) }}： {{ val.Title }}</div>
                          <div class="" @click="AddWorkContentEvent(item, 2)" v-if="!data.isDisabled">
                            <img src="/src/assets/img/hr/summary/summary_add.png" class="summaryForm_header_bottom_add" />
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main class="main mt-4">
            <div class="flex justify-between">
              <div class="flex items-center">
                <img src="/src/assets/img/hr/summary/summary_icon.png" class="summaryForm_image" />
                <div class="ml-2 font-semibold">
                  今日总结
                  <span class="text-xs bf-text-color-regular">日事日毕，日清日高</span>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex items-center">
                  <div class="text-sm">工作饱和:</div>
                  <div class="main_bg" :style="{ background: stateChange(data.ruleForm.Saturability).color }">{{ stateChange(data.ruleForm.Saturability).title }}</div>
                </div>
                <div class="flex items-center ml-2">
                  <div class="text-sm">工作效率:</div>
                  <div class="main_bg" :style="{ background: stateChange(data.ruleForm.WorkRation).color }">{{ stateChange(data.ruleForm.WorkRation).title }}</div>
                </div>
                <div class="flex items-center ml-2">
                  <div class="text-sm">工作质量:</div>
                  <div class="main_bg" :style="{ background: stateChange(data.ruleForm.WorkQuality).color }">{{ stateChange(data.ruleForm.WorkQuality).title }}</div>
                </div>
              </div>
            </div>
            <div class="mt-3 border bf-search-formItem">
              <div class="main_th flex justify-between items-center">
                <div class="main_th_title">时间利用及内容阐述</div>
              </div>
              <div class="main_tr">
                <div class="main_tr_title">
                  {{ data.ContentInfo }}
                </div>
                <div class="">
                  <el-form-item prop="Content" label-width="0">
                    <el-input type="textarea" placeholder="请按序号排列进行时间利用内容出参数，重复率不超过20%" :disabled="data.isDisabled" v-model="data.ruleForm.Content" :autosize="{ minRows: 2, maxRows: 99 }"></el-input>
                  </el-form-item>
                  <div class="bf-search-formItem flex justify-end" v-if="data.details.viewType == 1">
                    <el-form-item prop="WorkRation" label-width="0">
                      <span class="main_th_title">工作效率：</span>
                      <el-radio-group v-model="data.ruleForm.WorkRation" :disabled="data.isDisabled">
                        <el-radio :label="3">好</el-radio>
                        <el-radio :label="2">中</el-radio>
                        <el-radio :label="1">差</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div class="bf-search-formItem flex justify-end" v-else-if="data.details.viewType == 4">
                    <el-form-item prop="ManageWorkRation" label-width="0">
                      <span class="main_th_title">工作效率：</span>
                      <el-radio-group v-model="data.ruleForm.ManageWorkRation" :disabled="data.isApproval">
                        <el-radio :label="3">好</el-radio>
                        <el-radio :label="2">中</el-radio>
                        <el-radio :label="1">差</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="main_bottom border bf-search-formItem">
              <div class="main_th flex justify-between items-center">
                <div class="main_th_title">
                  成果转换
                  <span class="main_th_subTitle">请点击右侧按钮添加成果转换</span>
                </div>
                <div class="cursor-pointer ml-8" @click="data.addResultWindow.view = true" v-if="!data.isDisabled">
                  <img src="/src/assets/img/hr/summary/summary_add.png" class="main_th_img" />
                </div>
              </div>
              <div class="main_tr">
                <!-- <div class="">
                  <el-form-item prop="timeUtilization" label-width="0">
                    <el-input type="textarea" placeholder="请按序号排列进行时间利用内容出参数，重复率不超过20%" v-model="data.value" :autosize="{ minRows: 2, maxRows: 99 }"></el-input>
                  </el-form-item>
                </div> -->
                <div class="border">
                  <div class="px-2 py-2 text-sm">
                    <div class="" v-for="(item, index) in data.resultList" :key="index">
                      {{ item.workContent }}
                      <span v-if="item.review == 3" :style="{ color: stateChange(item.review).color }">(好)</span>
                      <span v-else-if="item.review == 2" :style="{ color: stateChange(item.review).color }">(中)</span>
                      <span v-else :style="{ color: stateChange(item.review).color }">(差)</span>
                    </div>
                  </div>
                  <div class="bf-search-formItem flex justify-end mt-2" v-if="data.details.viewType == 1">
                    <el-form-item prop="WorkQuality" label-width="0">
                      <span class="main_th_title">工作质量：</span>
                      <el-radio-group v-model="data.ruleForm.WorkQuality" :disabled="data.isDisabled">
                        <el-radio :label="3">好</el-radio>
                        <el-radio :label="2">中</el-radio>
                        <el-radio :label="1">差</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div class="bf-search-formItem flex justify-end mt-2" v-else-if="data.details.viewType == 4">
                    <el-form-item prop="ManageWorkQuality" label-width="0">
                      <span class="main_th_title">工作质量：</span>
                      <el-radio-group v-model="data.ruleForm.ManageWorkQuality" :disabled="data.isApproval">
                        <el-radio :label="3">好</el-radio>
                        <el-radio :label="2">中</el-radio>
                        <el-radio :label="1">差</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <main class="main mt-4">
            <div class="flex justify-between">
              <div class="flex items-center">
                <img src="/src/assets/img/hr/summary/summary_icon.png" class="summaryForm_image" />
                <div class="ml-2 font-semibold">
                  今日精进
                  <span class="text-xs bf-text-color-regular">理由千万，贵在自省</span>
                </div>
              </div>
            </div>
            <div class="mt-3 border bf-search-formItem">
              <div class="main_th flex justify-between items-center">
                <div class="main_th_title">改进措施</div>
              </div>
              <div class="main_tr">
                <div class="">
                  <el-form-item prop="Improve" label-width="0">
                    <el-input type="textarea" placeholder="请按序号排列进行时间利用内容出参数，重复率不超过20%" :disabled="data.isDisabled" v-model="data.ruleForm.Improve" :autosize="{ minRows: 2, maxRows: 99 }"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="main_bottom border bf-search-formItem">
              <div class="main_th flex justify-between items-center">
                <div class="main_th_title">明日计划</div>
              </div>
              <div class="main_tr">
                <div class="">
                  <el-form-item prop="Plan" label-width="0">
                    <el-input type="textarea" placeholder="请按序号排列进行时间利用内容出参数，重复率不超过20%" :disabled="data.isDisabled" v-model="data.ruleForm.Plan" :autosize="{ minRows: 2, maxRows: 99 }"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
          </main>
          <!-- 审阅记录 -->
          <main class="main mt-4" v-if="data.isRecord">
            <div class="mt-3 border bf-search-formItem">
              <div class="main_th flex justify-between items-center">
                <div class="main_th_title">领导评语</div>
              </div>
              <div class="main_tr px-2 py-2 text-sm">
                <template v-for="(item, index) in data.ruleForm.ManageWorkContantList" :key="index">
                  <div class="flex items-start justify-between mb-4">
                    <div class="break-all" style="width: 50%">{{ item.ManageContent }}</div>
                    <div class="flex items-center bf-text-color-regular">
                      <div>
                        <span>姓名:</span>
                        <span>{{ item.ManageName ? item.ManageName : '无' }}</span>
                      </div>
                      <div class="ml-2">
                        <span>岗位:</span>
                        <span>{{ item.ManagePostName ? item.ManagePostName : '无' }}</span>
                      </div>
                      <div class="ml-2">
                        <span>时间:</span>
                        <span>{{ item.ManageTime ? item.ManageTime : '无' }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </main>
          <!-- 审阅 -->
          <main class="main mt-4" v-if="data.isShowAppRoval">
            <div class="mt-3 border bf-search-formItem">
              <div class="main_th flex justify-between items-center">
                <div class="main_th_title">领导评语</div>
              </div>
              <div class="main_tr">
                <div class="">
                  <el-form-item prop="ManageContent" label-width="0">
                    <el-input type="textarea" placeholder="请输入评语" v-model="data.ruleForm.ManageContent" :autosize="{ minRows: 3, maxRows: 99 }"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="bf-search-formItem mt-4">
              <div class="text-center w-full">
                <el-button @click="closeWindow('close')">取 消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">审 阅</el-button>
              </div>
            </div>
          </main>
          <div class="bf-search-formItem mt-4" v-if="data.details.viewType == 1">
            <div class="text-center w-full">
              <el-button @click="closeWindow(' close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </OpenWindow>
    <addWorkContent v-if="data.addWorkContentWindow.view" @closeWindow="contentCloseWindow" :details="data.addWorkContentWindow.details"> </addWorkContent>
    <addResult v-if="data.addResultWindow.view" @closeWindow="data.addResultWindow.view = false" @handleSubmit="setAddResult"></addResult>
  </div>
</template>

<script lang="ts">
import addWorkContent from './addWorkContent.vue'
import addResult from './addResult.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, getCurrentInstance, onMounted, onUpdated, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetWorkContent, GetWorkSummaryInfo, PostInsertEditWorkSummarySave } from '/@/api/hr/WorkSummary'
import { parse } from 'path'
import { nextTick } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
let userStore = useLayoutStore()
const store = useCommonStore() //记得加这一句
/**
 * @description: 今日数据2022年8月3日16:45:42高度监听动态修改
 * @return {*}
 * @use:
 */
const changeHeight = (data: any) => {
  var arr: any = document.getElementsByClassName('summaryForm_header_bottom_value')
  for (let i = 0; i < arr.length; i++) {
    data.workList[i].startTimeLabelHeight = arr[i].offsetHeight
  }
}

/**
 * @description: 获取工作总结今日数据
 * @param {*} data
 * @return {*}
 * @use:
 * @num data.num>=6为好 小于6大于等于4为中反之0
 */
const GetWorkContentEvent = async (data: any) => {
  var arr = {
    DateType: data.details.WorkType
  }
  await GetWorkContent(arr).then((res: any) => {
    if (res.code == 1) {
      data.workList = res.data
      nextTick(() => {
        data.num = 0
        res.data.forEach((element: any) => {
          if (element.WorkList.length > 0) {
            data.num++
          }
        })
        if (data.num >= 6) {
          data.ruleForm.Saturability = 3
          if (data.num == 8) {
            data.ContentInfo = '1、8个时间段考核中8个全部有工作内容，工作饱和度为好；'
          } else {
            data.ContentInfo = '1、8个时间段考核中' + data.num + '个没工作内容，工作饱和度为好；'
          }
        } else if (data.num < 6 && data.num >= 4) {
          data.ruleForm.Saturability = 2
          data.ContentInfo = '1、8个时间段考核中' + data.num + '个没工作内容，工作饱和度为中；'
        } else {
          data.ruleForm.Saturability = 1
          data.ContentInfo = '1、8个时间段考核中' + data.num + '个没工作内容，工作饱和度为差；'
        }
        changeHeight(data)
      })
    } else {
      ElMessage.error(res.message)
    }
  })
}
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.details.Id) {
    GetWorkSummaryInfo(data.details.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
        data.workList = JSON.parse(res.data.DataJson)
        data.resultList = JSON.parse(res.data.Outcome)
        if (data.ruleForm.ManageWorkRation == 0 || data.ruleForm.ManageWorkQuality == 0) {
          data.ruleForm.ManageWorkRation = undefined
          data.ruleForm.ManageWorkQuality = undefined
        }
        // 判断是否已经审批工作效率和工作质量
        if (data.ruleForm.ManageWorkRation || data.ruleForm.ManageWorkQuality) {
          data.isApproval = true
          data.ruleForm.ManageContent = ''
        }
        // 判断显示审批记录
        if (data.details.viewType == 3 && data.ruleForm.ManageWorkContantList.length > 0) {
          data.isRecord = true
        }
        // data.details.isApproval 来自审批列表
        if (data.details.isApproval) {
          var isFind = false
          //查询当前登录人是否已经审批来展示审批按钮
          data.ruleForm.ManageWorkContantList.forEach((element: any) => {
            if (userStore.getUserInfo.Id == element.ManagId) {
              data.isShowAppRoval = false
              isFind = true
            }
          })
          if (isFind == false) {
            data.isShowAppRoval = true
          }
        }
      } else {
        ElMessage.error(res.message)
      }
    })
  } else {
    GetWorkContentEvent(data)
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
        if (data.resultList.length <= 0) {
          ElMessage.error('成果转换不能为空')
          return
        }
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.Outcome = JSON.stringify(data.resultList)
        arr.DataJson = JSON.stringify(data.workList)
        arr = Object.assign(data.details, arr)
        PostInsertEditWorkSummarySave(arr).then((res) => {
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
  const rules = reactive<FormRules>({
    Content: [
      {
        required: true,
        message: '请填写时间利用及内容阐述',
        trigger: 'blur'
      }
    ],
    Improve: [
      {
        required: true,
        message: '请填写改进措施',
        trigger: 'blur'
      }
    ],
    Plan: [
      {
        required: true,
        message: '请填写明日计划',
        trigger: 'blur'
      }
    ],
    ManageContent: [
      {
        required: true,
        message: '请填写审批意见',
        trigger: 'blur'
      }
    ],
    WorkRation: [
      {
        required: true,
        message: '请选择工作效率',
        trigger: 'change'
      }
    ],
    ManageWorkRation: [
      {
        required: true,
        message: '请选择工作效率',
        trigger: 'change'
      }
    ],
    WorkQuality: [
      {
        required: true,
        message: '请选择工作质量',
        trigger: 'change'
      }
    ],
    ManageWorkQuality: [
      {
        required: true,
        message: '请选择工作质量',
        trigger: 'change'
      }
    ]
  })
  // 监听数据展开
  const isShowEvent = (val: any) => {
    data.isShow = !data.isShow
    nextTick(() => {
      if (data.isShow) {
        changeHeight(data)
      }
    })
  }
  /**
   * @description: 状态转换
   * @param {*} val 状态 3好 2中 1差
   * @return {*}
   * @use:
   */
  const stateChange = (val: any) => {
    var arr = { title: '', color: '' }
    if (val == 3) {
      arr.title = '好'
      arr.color = '#409eff'
    } else if (val == 2) {
      arr.title = '中'
      arr.color = '#ff9148'
    } else {
      arr.title = '差'
      arr.color = '#ff4a48'
    }
    return arr
  }
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
    remoteUrlEvent,
    isShowEvent,
    stateChange
  }
}
const window = (data: any): any => {
  /**
   * @description:
   * @param {*} val 成果转换关闭弹窗
   * @return {*}
   * @use:
   */
  const contentCloseWindow = (val: any) => {
    GetWorkContentEvent(data)
    data.addWorkContentWindow.view = false
  }
  // 添加成果转换
  const setAddResult = (val: any) => {
    data.resultList.push(val)
    data.addResultWindow.view = false
  }
  // 打开工作内容
  const AddWorkContentEvent = (val: any, type: any) => {
    data.addWorkContentWindow.details = val
    data.addWorkContentWindow.details.type = type
    data.addWorkContentWindow.view = true
  }
  return { AddWorkContentEvent, setAddResult, contentCloseWindow }
}
export default defineComponent({
  components: {
    OpenWindow,
    addWorkContent,
    addResult
  },
  emits: ['closeWindow'],
  props: {
    details: {
      type: Object,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      timeTitle: '今日', //今日
      isRecord: false, //显示审批记录
      isDisabled: false, //禁止
      isApproval: false, // 判断是否已经审批工作效率和工作质量
      isShowAppRoval: false, //判断是否显示审批按钮
      workList: [], //今日数据列表
      resultList: [], //成果转换
      num: 0, //今日工作数据 和饱和度挂钩
      isShow: false,
      ruleForm: {
        Content: '', //工作总结阐述
        DataJson: '', //当前的工作数据Json格式
        Outcome: '', //工作成果转换
        Plan: '', //明日计划
        Saturability: 1, //自评工作饱和度
        WorkRation: 1, //自评工作效率
        WorkQuality: 1, //自评工作质量
        Improve: ''
      },
      details: props.details,
      //  添加工作内容
      addWorkContentWindow: {
        view: false,
        details: {}
      },
      //  添加工作成果
      addResultWindow: {
        view: false,
        details: {}
      },
      // table数据
      headerData: [
        {
          morning: '08:00~09:00',
          night: '13:00~14:00',
          startTimeLabelHeight: 0,
          endTimeLabelHeight: 0
        },
        {
          morning: '09:00~10:00',
          night: '14:00~15:00',
          startTimeLabelHeight: 0,
          endTimeLabelHeight: 0
        },
        {
          morning: '10:00~11:00',
          night: '15:00~16:00',
          startTimeLabelHeight: 0,
          endTimeLabelHeight: 0
        },
        {
          morning: '11:00~12:00',
          night: '16:00~17:00',
          startTimeLabelHeight: 0,
          endTimeLabelHeight: 0
        }
      ]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-840',
      boxHeight: ''
    })
    onMounted(() => {
      if (props.details.viewType == 3 || props.details.viewType == 4) {
        data.isDisabled = true
      }
      switch (props.details.WorkType) {
        case 1:
          data.timeTitle = '今日'
          break
        case 2:
          data.timeTitle = '本周'
          break
        case 3:
          data.timeTitle = '本月'
          break
      }
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      ...window(data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.WorkSummaryForm {
  .summaryForm_image {
    width: 24px;
    height: 10px;
  }
  .w-100 {
    width: 100px;
  }
  .w-240 {
    width: 240px;
  }
  .summaryForm_header_bottom_label {
    width: 100px;
    min-height: 36px;
    padding: 0 8px;
    background: #f4f4f4;
    border-radius: 6px 0px 0px 6px;
    font-size: 14px;
    font-weight: 500;
    color: #444444;
    text-align: center;
    line-height: 36px;
    align-items: center;
    display: flex;
  }
  .summaryForm_header_bottom_value {
    position: relative;
    width: 270px;
    min-height: 36px;
    border: 1px solid #eeeeee;
    border-left: none;
    line-height: 1.6;
    padding: 6px 8px;
    font-size: 14px;
    font-weight: 500;
    color: #444444;
    border-radius: 0 6px 6px 0;
    overflow: hidden;
  }
  .summaryForm_header_bottom_add {
    position: absolute;
    top: 0;
    right: 10px;
    margin-top: 10px;
    width: 16px;
    height: 16px;
  }
  .main {
    .main_bg {
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      line-height: 24px;
      width: 24px;
      height: 24px;
      margin-left: 2px;
      border-radius: 6px;
    }
    .main_th {
      padding: 0 15px;
      height: 42px;
      background: #f4f4f4;
      .main_th_title {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
      }
      .main_th_img {
        width: 16px;
        height: 16px;
      }
      .main_th_subTitle {
        margin-left: 35px;
        font-size: 14px;
        color: #666666;
        font-weight: 500;
      }
      :deep (.el-radio) {
        margin-right: 15px;
      }
    }
    .main_th_content {
      padding: 15px;
      > div {
        line-height: 1.6;
      }
    }
    .main_tr {
      .main_tr_title {
        padding: 15px 15px 0;
        font-size: 14px;
        color: #333333;
      }
      :deep(.el-textarea__inner) {
        border: none;
        box-shadow: none;
      }
    }
  }
  :deep(.el-radio) {
    margin-right: 12px;
  }
  :deep(.el-textarea.is-disabled .el-textarea__inner) {
    background-color: white;
    color: var(--el-text-color-primary);
  }
}
</style>
