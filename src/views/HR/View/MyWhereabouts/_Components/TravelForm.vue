<template>
  <div class="TravelForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="出差申请">
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <el-row :gutter="0" align="middle">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="申请人员" prop="InviteName">
                {{ data.ruleForm.CreateName }}
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="所属部门" prop="InviteName">
                {{ data.ruleForm.DeptName }}
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="职务" prop="InviteName">
                {{ data.ruleForm.postname }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0" align="middle">
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <el-form-item label="开始时间" prop="startTimes">
                <el-date-picker v-model="data.ruleForm.startTimes" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD HH:mm:ss" @change="timeChange" :disabled="data.isUpdate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="总共" prop="Days">
                <el-input readonly v-model="data.ruleForm.Days" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="travelForm_section">
            <div class="ts_header flex justify-between">
              <div class="">
                <div class="tsh_title">出差/公差须知：</div>
                <div class="">
                  <p>1、公差、出差要求一律开启出差定位考核，否则无法计算考勤；</p>
                  <p>2、出差、公差应提前申请，早出发、早准备，异性出差过夜应提前沟通；</p>
                  <p>3、出差、公差重视质量回报，重视出差、公差意义；</p>
                  <p>4、节俭出行，经费不足可从团建或业绩中申报。</p>
                </div>
              </div>
              <img src="/src/assets/img/hr/myWhereabouts/form-tongzhi.png" class="tsh_bg" />
            </div>
          </div>
          <div class="t_main">
            <div class="travelForm_section mt-2.5">
              <div class="flex items-center">
                <div class="mr-4 tsm_top" :class="data.selectIndex == index ? 'selectTab' : ''" v-for="(item, index) in data.tabList" :key="index" @click="selectTabEvent(index)">
                  {{ item.name }}
                  <el-button type="primary" icon="el-icon-plus" size="small" circle plain v-if="!data.isUpdate" @click="addTravel(data.editableTabsValue, index + 1)"> </el-button>
                </div>
                <div class="tsmb_subTitle">注：（出差、公差，申请时只能二选一）</div>
              </div>
            </div>
            <div class="tsm_bottom" v-if="data.isUpdate ? data.Type == 'Evection' : data.selectIndex == 0">
              <div class="travelForm_section">
                <el-tabs v-model="data.editableTabsValue" closable @tab-remove="removeTab($event, 1)">
                  <el-tab-pane v-for="(item, index) in data.ruleForm.Project" :key="item.name" :label="item.title" :name="item.name">
                    <div class="travelForm_section_elFormItem">
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="客户名称" :prop="`Project.${index}.Name`" :rules="rules.Name">
                            <el-input v-model="item.Name" :disabled="data.isUpdate"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="出差地点" :prop="`Project.${index}.Address`" :rules="rules.Address">
                            <el-input v-model="item.Address" :disabled="data.isUpdate"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="拜访人员" :prop="`Project.${index}.VisitName`" :rules="rules.VisitName">
                            <el-input v-model="item.VisitName" :disabled="data.isUpdate"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="拜访目的" :prop="`Project.${index}.Purpose`" :rules="rules.Purpose">
                            <!-- <el-input v-model="item.Purpose" :disabled="data.isUpdate"></el-input> -->
                            <el-select v-model="item.Purpose" class="screen-width" placeholder="请选择" :disabled="data.isUpdate">
                              <el-option :label="item.DicValue" :value="item.DicValue" v-for="item in data.objective" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="联系电话" :prop="`Project.${index}.Phone`" :rules="rules.Phone">
                            <el-input v-model="item.Phone" :oninput="item.Phone=item.Phone.replace(/[^\d.]/g,'')" :disabled="data.isUpdate"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="事前沟通" :prop="`Project.${index}.Communicate`" :rules="rules.Communicate">
                            <!-- <el-input v-model="item.Communicate" :disabled="data.isUpdate"></el-input> -->
                            <el-select v-model="item.Communicate" class="screen-width" placeholder="请选择" :disabled="data.isUpdate">
                              <el-option :label="item.DicValue" :value="item.DicValue" v-for="item in data.statusList" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div class="trshr" />
                      <el-row class="travel_tool">
                        <el-col :span="24">
                          <el-form-item label="出差工具" :prop="`Project.${index}.Vehicle`" :rules="rules.Vehicle">
                            <el-radio-group v-model="item.Vehicle" :disabled="data.isUpdate">
                              <el-radio :label="item.DicKey" v-for="(item, index) in data.toolList" :key="index">{{ item.DicValue }}</el-radio>
                            </el-radio-group>
                            <!-- <el-radio-group v-model="item.Vehicle" :disabled="data.isUpdate">
                              <el-radio label="公车">公车</el-radio>
                              <el-radio label="私车">私车</el-radio>
                              <el-radio label="火车">火车</el-radio>
                              <el-radio label="飞机">飞机</el-radio>
                              <el-radio label="租车">租车</el-radio>
                              <el-radio label="其它交通工具">其它交通工具</el-radio>
                            </el-radio-group> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div class="trshr" />
                      <el-row class="tsmb_money">
                        <el-col :span="20">
                          <el-form-item label="费用估算"><span class="tsmb_subTitle">请认真预估出差费用，以免因费用过高不予批准</span></el-form-item>
                        </el-col>
                        <el-col :span="4" class="tsmb_company">单位：元</el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="交通费用" :prop="`Project.${index}.TrafficMoney`" :rules="rules.TrafficMoney">
                            <el-input v-model="item.TrafficMoney" :disabled="data.isUpdate" @input="TrafficMoneyEvent($event, item)"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="餐宿费用" :prop="`Project.${index}.DiningRoomMoney`" :rules="rules.DiningRoomMoney">
                            <el-input v-model="item.DiningRoomMoney" :disabled="data.isUpdate" @input="DiningRoomMoneyEvent($event, item)"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="其它费用" :prop="`Project.${index}.OtherMoney`" :rules="rules.OtherMoney">
                            <el-input v-model="item.OtherMoney" :disabled="data.isUpdate" @input="OtherMoneyEvent($event, item)"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="合计费用" :prop="`Project.${index}.AllMoney`" :rules="rules.AllMoney">
                            <el-input v-model="item.AllMoney" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class="trshrTwo" style="top: 158px" />
              <div class="trshrTwo" style="top: 212px" />
            </div>
            <div class="tsm_bottom" v-if="data.isUpdate ? data.Type == 'BusinessTrip' : data.selectIndex == 1">
              <div class="travelForm_section">
                <el-tabs v-model="data.toleranceTabsValue" closable @tab-remove="removeTab($event, 2)">
                  <el-tab-pane v-for="(item, index) in data.ruleForm.toleranceList" :key="item.name" :label="item.title" :name="item.name">
                    <el-row class="tsmb_money">
                      <el-col :span="24">
                        <el-form-item label="公差事由" :prop="`toleranceList.${index}.Remark`" :show-message="false" inline-message :rules="rules.Remark">
                          <el-radio-group v-model="item.Remark" :disabled="data.isUpdate">
                            <el-radio :label="item.DicKey" v-for="(item, index) in data.remarkList" :key="index">{{ item.DicValue }}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="trshr" />
                    <el-row class="travel_tool">
                      <el-form-item label="公差说明" :prop="`toleranceList.${index}.Explain`" :show-message="false" :rules="rules.Explain">
                        <el-col :span="24">
                          <el-input v-model="item.Explain" :disabled="data.isUpdate" placeholder="请输入内容"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-row>
                    <div class="trshr" />
                    <el-row class="travel_tool">
                      <el-col :span="24">
                        <el-form-item label="出差工具" :prop="`toleranceList.${index}.Vehicle`" :rules="rules.Vehicle">
                          <el-radio-group v-model="item.Vehicle" :disabled="data.isUpdate">
                            <el-radio :label="item.DicKey" v-for="(item, index) in data.toolList" :key="index">{{ item.DicValue }}</el-radio>
                          </el-radio-group>
                          <!-- <el-radio-group v-model="item.Vehicle" :disabled="data.isUpdate">
                            <el-radio label="公车">公车</el-radio>
                            <el-radio label="私车">私车</el-radio>
                            <el-radio label="火车">火车</el-radio>
                            <el-radio label="飞机">飞机</el-radio>
                            <el-radio label="租车">租车</el-radio>
                            <el-radio label="其它交通工具">其它交通工具</el-radio>
                          </el-radio-group> -->
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="trshr" />
                    <el-row class="tsmb_money">
                      <el-col :span="20">
                        <el-form-item label="费用估算"><span class="tsmb_subTitle">请认真预估出差费用，以免因费用过高不予批准</span></el-form-item>
                      </el-col>
                      <el-col :span="4" class="tsmb_company">单位：元</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="交通费用" :prop="`toleranceList.${index}.TrafficMoney`" :rules="rules.TrafficMoney">
                          <el-input v-model="item.TrafficMoney" :disabled="data.isUpdate" @input="TrafficMoneyEvent($event, item)"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="餐宿费用" :prop="`toleranceList.${index}.DiningRoomMoney`" :rules="rules.DiningRoomMoney">
                          <el-input v-model="item.DiningRoomMoney" :disabled="data.isUpdate" @input="DiningRoomMoneyEvent($event, item)"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="其它费用" :prop="`toleranceList.${index}.OtherMoney`" :rules="rules.OtherMoney">
                          <el-input v-model="item.OtherMoney" :disabled="data.isUpdate" @input="OtherMoneyEvent($event, item)"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="合计费用" :prop="`toleranceList.${index}.AllMoney`" :rules="rules.AllMoney">
                          <el-input v-model="item.AllMoney" disabled></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class="trshrTwo" style="top: 106px" />
              <div class="trshrTwo" style="top: 160px" />
              <div class="trshrTwo" style="top: 214px" />
            </div>
          </div>
          <div class="bf-search-formItem mt-4" v-if="!data.isUpdate">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
          <template v-if="data.viewType != 1 && data.viewType != 2">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 转正审批 -->
            <template v-if="data.viewType == 4">
              <el-form-item label="" class="flex-grow" :prop="data.state == 0 ? 'remarkA' : ''" label-width="0">
                <el-input v-model="data.ruleForm.remarkA" placeholder="请输入审批意见" type="textarea" :rows="3" />
              </el-form-item>
              <div class="bf-search-formItem">
                <div class="text-center w-full mt-4">
                  <el-button type="danger" @click="ApprovalForm(ruleFormRef, 0)">驳 回</el-button>
                  <el-button type="primary" @click="ApprovalForm(ruleFormRef, 1)">审 批</el-button>
                </div>
              </div>
            </template>
          </template>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { formatDistanceTime } from '/@/utils/tools'
import { GetAttendanceRecordsBusinessTripInfo, GetAttendanceRecordsEvectionInfo, PostAddEditAttendanceRecordsBusinessTripSave, PostAddEditAttendanceRecordsEvectionSave, PostApprovalRecordsEvection, PostVacationGetDays } from '/@/api/hr/MyWhereabouts'
import { PostApprovalPostTransfer } from '/@/api/wf/hr/Approval'
import { isMobileTel } from '/@/utils/validate'
const store = useCommonStore() //记得加这一句
const layoutStore = useLayoutStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    if (data.Type == 'Evection') {
      data.tabList = [{ name: '出差申请' }]
      await GetAttendanceRecordsEvectionInfo(data.Id).then((res) => {
        if (res.code == 1) {
          data.ruleForm = res.data
          data.ruleForm.startTimes = [res.data.BeginTime, res.data.EndTime]
          data.ruleForm.Project = JSON.parse(res.data.Project)

          console.log(data.ruleForm.Project)
          data.ruleForm.postname = res.data.PostName
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      data.tabList = [{ name: '公差申请' }]
      await GetAttendanceRecordsBusinessTripInfo(data.Id).then((res: any) => {
        if (res.code == 1) {
          data.ruleForm = res.data
          data.ruleForm.startTimes = [res.data.BeginTime, res.data.EndTime]
          data.ruleForm.toleranceList = JSON.parse(res.data.Project)
          data.ruleForm.postname = res.data.PostName
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  }
  // 获取性别数据
  store.getDict('hr_Leave_state').then((res: any) => {
    data.LeaveData = res
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        if (data.selectIndex == 0) {
          arr.Project = JSON.stringify(arr.Project)
          arr.Type = 'Evection'
          PostAddEditAttendanceRecordsEvectionSave(arr).then((res) => {
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
          arr.Project = JSON.stringify(arr.toleranceList)
          arr.Type = 'BusinessTrip'
          PostAddEditAttendanceRecordsBusinessTripSave(arr).then((res) => {
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
  // 审批
  const ApprovalForm = async (formEl: FormInstance | undefined, num: number) => {
    data.state = num
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = {
          checkId: data.Approval.checkId,
          state: num,
          remark: data.ruleForm.remarkA,
          dataid: data.Id,
          FlowId: data.FlowId,
          Step: data.Step
        }
        PostApprovalRecordsEvection(arr).then((res: any) => {
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
    startTimes: [{ required: true, message: '请选择出差时间', trigger: 'change' }],
    Days: [{ required: true, message: '请输入时长', trigger: 'blur' }],
    Name: [{ required: true, message: '请输入客戶名称', trigger: 'blur' }],
    Address: [{ required: true, message: '请输入出差地点', trigger: 'blur' }],
    VisitName: [{ required: true, message: '请输入拜访人员', trigger: 'blur' }],
    Purpose: [{ required: true, message: '请输入拜访目的', trigger: 'change' }],
    Phone: [
      { required: true, message: '请输入联系电话', trigger: 'blur' },
      {
        validator: isMobileTel,
        message: '请输入正确的电话',
        trigger: 'blur'
      }
    ],
    Communicate: [{ required: true, message: '请输入事前沟通', trigger: 'change' }],
    Vehicle: [{ required: true, message: '请选择交通工具', trigger: 'change' }],
    Remark: [{ required: true, message: '请选择公差事由', trigger: 'change' }],
    Explain: [{ required: true, message: '请输入公差说明', trigger: 'blur' }],
    TrafficMoney: [
      { required: true, message: '请输入交通费用', trigger: 'blur' },
      { message: '必须为数字', type: 'number' }
    ],
    OtherMoney: [
      { required: true, message: '请输入其他费用', trigger: 'blur' },
      { message: '必须为数字', type: 'number' }
    ],
    DiningRoomMoney: [
      { required: true, message: '请输入参宿费用', trigger: 'blur' },
      { message: '必须为数字', type: 'number' }
    ],
    AllMoney: [
      { required: true, message: '请输入合计费用', trigger: 'blur' },
      { message: '必须为数字', type: 'number' }
    ],
    remarkA: [
      {
        required: true,
        message: '请填写审批意见',
        trigger: 'blur'
      }
    ]
  })
  //   监听出差时间
  const timeChange = (val: any) => {
    if (val[0] && val[1]) {
      if (new Date(val[1]) <= new Date(val[0])) {
        ElMessage.error('结束时间不能小于开始时间')
        return
      }
      data.ruleForm.BeginTime = val[0]
      data.ruleForm.EndTime = val[1]
      PostVacationGetDaysEvent(val[0], val[1], data)
      // let endTime: any = new Date(val[1])
      // let startTime: any = new Date(val[0])
      // var TempDate = endTime - startTime
      // data.ruleForm.Days = formatDistanceTime(TempDate)
    }
  }
  // 计算请假时间
  const PostVacationGetDaysEvent = (beginTime: string, endTime: string, data: any) => {
    var arr = {
      beginTime: beginTime,
      endTime: endTime,
      UserId: 0
    }
    PostVacationGetDays(arr)
      .then((res) => {
        if (res.code == 1) {
          data.ruleForm.Days = res.data.SumTime
        } else {
          ElMessage.error(res.message)
        }
      })
      .catch((e) => {
        ElMessage.error(e.message)
      })
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听岗位返回数据
  const transferData = (val: any) => {
    data.ruleForm.PostName = val.Details.label
    data.ruleForm.PostIds = val.Details.Id + ''
    data.ruleForm.DeptIds = JSON.stringify(val.DeptIds)
  }
  // 监听上传返回的数据
  const uploadFileData = (val: any) => {
    data.PathList = val
  }
  // 监听tab
  const selectTabEvent = (index: number) => {
    data.selectIndex = index
  }
  // 添加出差項目
  const addTravel = (index: number, num: any) => {
    if (num == 1) {
      let newTabName = ++data.tabIndex + ''
      var arr = {
        title: '出差项目',
        name: newTabName,
        Name: '', //客户名称
        Address: '', //出差地点
        VisitName: '', //拜访人员
        Purpose: '', //拜访目的
        Phone: '', //联系电话
        Communicate: '', //事前沟通
        Vehicle: '', //出差工具
        TrafficMoney: null, //交通费用
        OtherMoney: null, //其他费用
        DiningRoomMoney: null, //参宿费用
        AllMoney: null //合计费用
      }
      data.ruleForm.Project.push(arr)
      data.editableTabsValue = newTabName
    } else {
      let newTabName = ++data.toleranceIndex + ''
      let arr = {
        Remark: '', //公差事由
        Explain: '', //公差说明
        Vehicle: '', //出差工具
        TrafficMoney: null, //交通费用
        OtherMoney: null, //其他费用
        DiningRoomMoney: null, //参宿费用
        AllMoney: null, //合计费用
        title: '公差项目',
        name: newTabName
      }
      data.ruleForm.toleranceList.push(arr)
      data.toleranceTabsValue = newTabName
    }
  }
  // 刪除出差項目
  const removeTab = (targetName: string, num: number) => {
    if (data.isUpdate) return
    if (num == 1) {
      let tabs = data.ruleForm.Project
      let activeName = data.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab: any, index: number) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      // this.travelIndex--;
      data.editableTabsValue = activeName
      data.ruleForm.Project = tabs.filter((tab: any) => tab.name !== targetName)
    } else {
      let tabs = data.ruleForm.toleranceList
      let activeName = data.toleranceTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab: any, index: number) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
            data.toleranceIndex--
          }
        })
      }
      data.toleranceTabsValue = activeName
      data.ruleForm.toleranceList = tabs.filter((tab: any) => tab.name !== targetName)
    }
  }
  // 交通费用监听
  const TrafficMoneyEvent = (val: any, item: any) => {
    item.TrafficMoney = Number(item.TrafficMoney)
    item.AllMoney = item.TrafficMoney + item.DiningRoomMoney + item.OtherMoney
  }
  // 餐宿费用
  const DiningRoomMoneyEvent = (val: any, item: any) => {
    item.DiningRoomMoney = Number(item.DiningRoomMoney)
    item.AllMoney = item.TrafficMoney + item.DiningRoomMoney + item.OtherMoney
  }
  // 其他费用监听
  const OtherMoneyEvent = (val: any, item: any) => {
    item.OtherMoney = Number(item.OtherMoney)
    item.AllMoney = item.TrafficMoney + item.DiningRoomMoney + item.OtherMoney
  }
  return {
    addTravel,
    removeTab,
    selectTabEvent,
    TrafficMoneyEvent,
    DiningRoomMoneyEvent,
    OtherMoneyEvent,
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    uploadFileData,
    transferData,
    timeChange,
    ApprovalForm
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
      default: {
        info: null,
        checkId: null,
        Id: null,
        Type: null,
        // 显示类型 1 添加 2修改 3查看 4审批
        viewType: 1,
        Step: null,
        FlowId: null
      }
    },
    // 公差Id
    Id: {
      type: Number,
      default: null
    },
    // 出差类型
    Type: {
      type: String,
      default: ''
    },
    // 是否可以修改
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      objective: [],
      statusList: [],
      toolList: [],
      remarkList: [], //公差事由列表
      state: 0, //审批状态
      viewType: props.info.viewType,
      Approval: {
        checkId: props.info.checkId,
        remark: ''
      },
      ruleForm: {
        remarkA: '',
        InviteName: '',
        startTimes: [],
        Days: null,
        Project: [
          //出差数据
          {
            Name: '', //客户名称
            Address: '', //出差地点
            VisitName: '', //拜访人员
            Purpose: '', //拜访目的
            Phone: '', //联系电话
            Communicate: '', //事前沟通
            Vehicle: '', //出差工具
            TrafficMoney: null, //交通费用
            OtherMoney: null, //其他费用
            DiningRoomMoney: null, //参宿费用
            AllMoney: null, //合计费用
            title: '出差项目',
            name: '1'
          }
        ],
        toleranceList: [
          //公差数据
          {
            Remark: '', //公差事由
            Explain: '', //公差说明
            Vehicle: '', //出差工具
            TrafficMoney: null, //交通工具
            OtherMoney: null, //其他费用
            DiningRoomMoney: null, //参宿费用
            AllMoney: null, //合计费用
            title: '公差项目',
            name: '1'
          }
        ],
        CreateBy: 0,
        CreateName: '',
        PostId: 0,
        postname: '',
        DeptName: '',
        DeptId: 0
      },
      LeaveData: [],
      selectIndex: 0, //tab下标
      editableTabsValue: '1', //选中数据
      isUpdate: false, //是否可以修改
      tabIndex: 1, //出差下标
      toleranceIndex: 1, //公差下标
      toleranceTabsValue: '1', //公差选中数据
      addTravelIndex: 2,
      travelIndex: 2,
      Id: props.info.Id,
      Type: 'Evection',
      tabList: [
        {
          name: '出差申请'
        },
        {
          name: '公差申请'
        }
      ]
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
    onMounted(() => {
      console.log(data.viewType)
      if (props.info.viewType == 3 || props.info.viewType == 4) {
        data.isUpdate = true
      }
      if (props.info.info) {
        if (props.info.info.Code == 'RecordsEvection') {
          data.Type = 'Evection'
        } else {
          data.Type = 'BusinessTrip'
        }
      }
      store.getDict('hr_travel_objective').then((res: any) => {
        data.objective = res
      })
      store.getDict('hr_enb_status').then((res: any) => {
        data.statusList = res
      })
      store.getDict('hr_travel_tool').then((res: any) => {
        data.toolList = res
      })
      store.getDict('hr_travel_remark').then((res: any) => {
        data.remarkList = res
      })

      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
      data.ruleForm.CreateBy = layoutStore.getUserInfo.Id
      data.ruleForm.CreateName = layoutStore.getUserInfo.RealName
      data.ruleForm.PostId = layoutStore.getUserInfo.PostIds
      data.ruleForm.postname = layoutStore.getUserInfo.postname
      data.ruleForm.DeptName = layoutStore.getUserInfo.department
      data.ruleForm.DeptId = layoutStore.getUserInfo.DeptId
    })

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow) }
  }
})
</script>

<style lang="postcss" scoped>
.travelForm_section {
  position: relative;
  padding: 10px 14px;
  background: #f8f8ff;
  /* :deep(.travelForm_section_elFormItem) {
    .el-form-item {
      margin-bottom: 15px !important;
    }
  } */
  .ts_header {
    .tsh_title {
      font-size: 12px;
      font-weight: bold;
      color: #e02020;
    }
    p {
      margin: 4px 0;
      font-size: 12px;
      font-weight: bold;
      color: #333333;
    }
    .tsh_bg {
      width: 68px;
      height: 68px;
    }
  }
}
.t_main {
  .tsm_top {
    font-size: 14px;
    color: #333333;
    cursor: pointer;
  }
  .selectTab {
    font-weight: bold;
    color: #516bdb;
  }
  .tsmb_subTitle {
    font-size: 12px;
    color: #e02020;
  }
  .tsm_bottom {
    position: relative;
    overflow: hidden;
    border: 1px solid #eeeeee;
    border-top: none;
    padding: 10px 14px;
    :deep (.el-form-item--medium .el-form-item__content) {
      margin-right: 8px;
    }
    .tsmb_add {
    }
    .tsmb_title {
      float: left;
    }
    .trshr {
      background-color: #fff;
      height: 7px;
      width: 105%;
      margin-left: -14px;
    }
    .trshrTwo {
      background-color: #fff;
      height: 10px;
      width: 100%;
      position: absolute;
      margin-left: -14px;
    }
    .travel_tool {
      padding-top: 6px;
      :deep (.el-form-item) {
        margin-bottom: 6px !important;
      }
    }
    .tsmb_company {
      line-height: 36px;
      text-align: right;
      font-size: 14px;
      color: #333333;
    }
    :deep(.tsmb_money) {
      .el-form-item {
        margin-bottom: 0px;
      }
      .el-radio {
        margin-right: 16px;
      }
    }
  }
}
:deep(.TravelForm) {
  .el-button.is-circle {
    border-radius: 50%;
    padding: 2px;
    width: 18px !important;
    height: 18px !important;
  }
}
</style>
