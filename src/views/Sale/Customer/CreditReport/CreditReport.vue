<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="">
      <!-- 已确认图标 -->
      <img src="../../../../assets/img/tech/ContractApproval/approved.png" class="absolute w-24 h-20 right-32 top-10" alt="" />
      <div class="tech_TechnicalReport_midd">
        <div class="w-700 m-auto text-center pb-10">
          <div class="pt-4">
            <p class="text-2xl font-medium">信用报告（{{data.ruleForm.CreditScore}}）</p>
          </div>
          <div class="pl-8 pr-8 pt-3 text-left">
            <span class="text-base">{{data.ruleForm.Name}}</span>
            <el-button type="primary" class="ml-3" plain size="small">{{data.ruleForm.Ranking}}强</el-button>
            <el-button type="primary" plain size="small">民营</el-button>
            <el-button type="primary" plain size="small">化工企业</el-button>
            <div class="text-xs leading-6 mt-2">
              <div class="w-1/4 inline-block">
                <p><span>法人代表：</span>{{data.ruleForm.CdelegateMan}}</p>
                <p><span>实际规模：</span>一般</p>
              </div>
              <div class="w-1/4 inline-block">
                <p><span>注册资金：</span>{{data.ruleForm.RegisteredAmt}}</p>
                <p><span>社保人员：</span>30人以下</p>
              </div>
              <div class="w-1/4 inline-block">
                <p><span> 公司官网:</span>{{data.ruleForm.CompleteWebsit}}</p>
                <p><span>企业性质：</span>一般</p>
              </div>
              <div class="w-1/4 inline-block">
                <p><span>合作情况：</span>陌生客户</p>
                <p><span>股东结构：</span>多人股份</p>
              </div>
            </div>
            <!-- #region 主观调查 -->
            <div>
              <div class="text-xs">
                <p><span>公司地址：</span>{{data.ruleForm.Address}}</p>
              </div>
              <!-- <div class="flex mt-6">
                <div class="flex-auto">
                  <i class="iconfont icon-biaoqian mr-2 text-blue-500"></i>
                  <span class="text-sm">主观调查</span>
                  <el-checkbox v-model="data.problems" label="隐藏问题" size="large" />
                </div>
                <div>
                  <span class="text-sm">得分：</span>
                  <span class="text-sm">30</span>
                  <span class="text-xs">/40</span>
                </div>
              </div>
              <div class="text-sm">
                <div class="mt-2 mb-2" v-if="data.problems == false">
                  <el-button size="small">工资及时性</el-button>
                  <el-button size="small">劳资争议</el-button>
                  <el-button size="small">人员稳定性</el-button>
                </div>
                <p><span>一般/理由充分：</span> 通过网络搜索，该公司劳资争议多，工资发放时间差，人员更迭多。</p>
              </div>
              <div class="text-sm">
                <div class="mt-2 mb-2" v-if="data.problems == false">
                  <el-button size="small">体系完善性</el-button>
                  <el-button size="small">员工向心力</el-button>
                  <el-button size="small">企业规模</el-button>
                </div>
                <p><span>一般/理由充分：</span> 该企业管理体系差，已成失信人被限高消费，员工向心力与企业规模不匹配。</p>
              </div>
              <div class="text-sm">
                <div class="mt-2 mb-2" v-if="data.problems == false">
                  <el-button size="small">资金实力</el-button>
                  <el-button size="small">企业口碑</el-button>
                </div>
                <p><span>一般/理由充分：</span> 通过网络搜索，该企业合同纠纷多且被限为高消费，同行口碑和供应商较差。</p>
              </div> -->
            </div>
            <!-- #endregion -->
            <!-- #region 诉讼调查 -->
            <div class="flex mt-6">
              <div class="flex-auto">
                <i class="iconfont icon-biaoqian mr-2 text-blue-500"></i>
                <span class="text-sm">诉讼调查</span>
              </div>
              <div>
                <span class="cursor-pointer text-sm text-blue-500 mr-3" @click="getcusinfo()">获取信息</span>
                <span class="cursor-pointer text-sm text-blue-500 mr-3" @click="openWindowViewDetails()"> 查看详情</span>
                <span class="text-sm">得分：</span>
                <span class="text-sm">0</span>
                <span class="text-xs">/60</span>
              </div>
            </div>
            <div style="margin-top:10px">
              <div v-for="(val,index) in lawsuitInfoList.filter(x=>x.LawSuitCount&&x.LawSuitCount!=0)" :key="index">
                <div style="margin-top:10px;color:#333">
                  <div style="height: 20px;font-size: 14px;font-weight: 500;color: #333333;line-height: 20px;">
                    {{val.LawsuitType}}<span style="color:#555">{{val.LawSuitCount}}项：</span>
                    <!-- <div style="color:#666;font-size:12px;font-weight:500;line-height:24px"> -->
                    <span v-if="val.LawsuitType == '失信名单' || val.LawsuitType == '执行名单'">
                      <span v-if="val.YuanGaoCount">当前:{{val.YuanGaoCount}}、</span>
                      <span v-if="val.currentAmount">金额:{{val.currentAmount}}、</span>
                      <span v-if="val.BeiGaoCount">历史:{{val.BeiGaoCount}}、</span>
                      <span v-if="val.CheSuCount">金额:{{val.CheSuCount}}</span>
                    </span>
                    <span v-else>
                      <span v-if="val.YuanGaoCount">原告:{{val.YuanGaoCount}}、</span>
                      <span v-if="val.BeiGaoCount">被告:{{val.BeiGaoCount}}、</span>
                      <span v-if="val.CheSuCount">撤诉:{{val.CheSuCount}}</span>
                    </span>
                    <!-- </div> -->
                  </div>
                  <div style="height: 17px;font-size: 12px;font-weight: 500;color: #666666;line-height: 17px;" v-if="val.Description">{{val.Description}}</div>
                  <!-- <div style="width: 24px;height: 24px;background: #FFEBE6;border-radius: 14px;
                    text-align: center;line-height: 24px;font-size: 12px;color: #DB4921;
                    position: absolute;top: -10px;right: 5px;">{{-val.lowScore}}</div> -->
                </div>
              </div>
            </div>

            <!-- #endregion -->

            <!-- #region 调查结果 -->
            <div class="flex mt-4">
              <div class="flex-auto">
                <i class="iconfont icon-biaoqian mr-2 text-blue-500"></i>
                <span class="text-sm">调查结果</span>
                <div class="w-20 h-6 bg-blue-50 inline-block align-middle ml-4 border-l-4 border-blue-400 text-center">
                  <span class="text-blue-400 text-sm">完全精准</span>
                </div>
              </div>
            </div>
            <!--            <div class="h-11 bg-blue-100 rounded-md mt-4 mb-4 leading-10 align-middle">
              <i class="iconfont icon-dingdan3 text-blue-500 ml-4 mr-2" style="font-size: 20px; vertical-align: inherit"></i>
              <span class="text-blue-500 text-sm">我认为该客户：</span>
            </div>
            <p class="text-xs mb-2">下次沟通时间：2021-10-20 16:27:50 <span class="text-red-500">已超过最后沟通时间</span></p>
            <p class="text-xs">审批意见(肖球)：</p>

            <div class="text-center mt-8">
              <el-button type="primary" @click="openWindowReject()">驳回</el-button>
            </div> -->
          </div>
        </div>
      </div>
      <div class="tech_TechnicalReport_midd"></div>
      <div class="tech_TechnicalReport_bg"></div>
      <!-- 拒绝原因 -->
      <Reject title="驳回" v-if="rejectOpenData.visible" :FormData="rejectOpenData.formData" @closeWindow="closeWindowReject($event)" />
      <!-- 查看详情 -->
      <ViewDetails :title='data.ruleForm.Name' v-if="viewDetailsData.visible" :FormData="viewDetailsData.formData" @closeWindow="closeWindowViewDetails($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts" setup>
import { GetCustomer } from '/@/api/Sale/Customer'
import { PostEditQiXinComCreditSave, GetQiXinBasicInfoAsync, GetQiXinLawsuitListByName, GetQiXinExecutedpersonListByName, GetQiXinExecutionListByName, PostQiXinComCredit } from '/@/api/Sale/QiXinBao'
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/InspectionReport.vue'
import Reject from './reject.vue'
import ViewDetails from './ViewDetails.vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  FormData: {
    type: Object,
    default: {
      Id: 0,
      Name: ''
    }
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})

const data = reactive({
  problems: true,
  ruleForm: <any>{},
  com: {
    LawsuitInfo: '',
    CustomerId: 0,
    Score: 0,
    CreditResults: 0,
    CreditProblem: '',
    CreditScore: 0
  }
})
const emit = defineEmits(['closeWindow'])
// 监听页面关闭
const closeWindow = (type: string) => {
  emit('closeWindow', type)
}
// 页面样式
const boxStyle = reactive({
  boxWidth: '',
  boxHeight: ''
})
const Labordispute = ref<any>({})
const Otherdisputes = ref<any>({})
const Executivelist = ref<any>({})
//计算得分
const getLawsuitScore = () => {
  var score = 0
  console.log('lawsuitInfoList---------------------------------------', lawsuitInfoList.value)
  lawsuitInfoList.value.forEach((lawInfo) => {
    switch (lawInfo.LawsuitType) {
      case '劳资争议':
        var score1 = lawInfo.LawSuitCount * 1 > 5 ? 5 : lawInfo.LawSuitCount * 1
        score += score1
        lawInfo.Score = score1 == 5 ? 0 : 5 - score1
        break
      case '合同纠纷':
        var score2 = lawInfo.BeiGaoCount * 5 + lawInfo.YuanGaoCount * 1 + lawInfo.CheSuCount * 2 > 10 ? 10 : lawInfo.BeiGaoCount * 5 + lawInfo.YuanGaoCount * 1 + lawInfo.CheSuCount * 2
        score += score2
        lawInfo.Score = score2 == 5 ? 0 : 5 - score2

        Labordispute.value = lawInfo
        break
      case '金融纠纷':
        if (lawInfo.LawSuitCount > 0) {
          score += 10
          lawInfo.Score = 0
        }
        break
      case '其他纠纷':
        if (lawInfo.LawSuitCount > 0) {
          score += lawInfo.LawSuitCount * 2
          lawInfo.Score = lawInfo.LawSuitCount * 2
        }
        Otherdisputes.value = lawInfo
        break
      case '执行名单':
        if (lawInfo.LawSuitCount > 0) {
          score += 10 * lawInfo.LawSuitCount > 20 ? 20 : 10 * lawInfo.LawSuitCount
          lawInfo.Score = 20 - (10 * lawInfo.LawSuitCount > 20 ? 20 : 10 * lawInfo.LawSuitCount)
        }
        Executivelist.value = lawInfo
        break
      case '失信名单':
        if (lawInfo.LawSuitCount > 0) {
          score += 30
          lawInfo.Score = 0
        }
        break
    }
  })
  if (score > 70) {
    score = 70
  }
  data.ruleForm.CreditScore = 70 - score

  return 70 - score
}

const setLawsuitInfoList = (newList: any) => {
  lawsuitInfoList.value.length = 0
  newList.forEach((_obj: any) => {
    let item: any = {}
    item = _obj
    item.OtherContent = '数据来源启信宝'

    lawsuitInfoList.value.push(item)
  })
  data.com.LawsuitInfo = JSON.stringify(lawsuitInfoList.value)

  var QiXinBaoScore = getLawsuitScore() //计算得分

  data.com.Score = QiXinBaoScore
  PostEditQiXinComCreditSave(data.com).then((res) => {
    if (res.code == 1) {
    } else {
      ElMessage.error(res.message)
    }
  })

  if (data.com.Score != QiXinBaoScore) {
  }
}
const getQiXinBaoinfo = async (val: any) => {
  //获取启信宝裁判文书列表
  GetQiXinLawsuitListByNameEvent(val)
  //获取启信宝被执行企业列表
  GetQiXinExecutedpersonListByNameEvent(val)
  //获取启信宝失信被执行企业列表
  await GetQiXinExecutionListByNameEvent(val)
}

const lawsuitInfoList = ref<any[]>([])
const lawsuitList = ref<any[]>([])
const executedpersonList = ref<any[]>([])
const executionList = ref<any[]>([])

//获取启信宝裁判文书列表
const GetQiXinLawsuitListByNameEvent = async (val: any) => {
  let resA = await GetQiXinLawsuitListByName({ creditNo: val })
  if (resA.code == 1 || resA.message == '查询无结果') {
    var _lawsuitList = JSON.parse((resA.data || {}).records || '[]') || []
    lawsuitList.value = _lawsuitList
  }
}
//获取启信宝被执行企业列表
const GetQiXinExecutedpersonListByNameEvent = async (val: any) => {
  let resB = await GetQiXinExecutedpersonListByName({ creditNo: val })
  if (resB.code == 1 || resB.message == '查询无结果') {
    var _executedpersonList = JSON.parse((resB.data || {}).records || '[]') || []
    executedpersonList.value = _executedpersonList
  }
}

//获取客户诉讼信息
const PostQiXinComCreditEvent = async (val: any) => {
  let resCC = await PostQiXinComCredit(val)

  if (resCC.code == 1) {
    setLawsuitInfoList(resCC.data) //修改诉讼信息
  } else {
    ElMessage.error(resCC.message)
  }
}

//获取启信宝失信被执行企业列表
const GetQiXinExecutionListByNameEvent = async (val: any) => {
  let resC = await GetQiXinExecutionListByName({ creditNo: val })

  if (resC.code == 1 || resC.message == '查询无结果') {
    var _executionList = JSON.parse((resC.data || {}).records || '[]') || []
    executionList.value = _executionList

    var _info = {
      LawsuitList: lawsuitList.value,
      ExecutedpersonList: executedpersonList.value,
      ExecutionList: executionList.value
    }
    await PostQiXinComCreditEvent(_info)
  } else {
    if (data.com.Score != 70) {
      data.com.Score = 70
      PostEditQiXinComCreditSave(data.com).then((res) => {
        if (res.code == 1) {
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  }
}
const getcusinfo = async () => {
  let res = await GetCustomer({ CustomerId: props.FormData.Id })

  if (res.code == 1) {
    var cus = res.data.Cus
    //启信宝信用调查信息
    data.com = res.data.com
    data.ruleForm = cus

    await getQiXinBaoinfo(data.ruleForm.QiXinBao_creditNo)
  }
}

const GetQiXinbao = async (val: any) => {
  let res = await GetQiXinBasicInfoAsync(val)
  if (res.code == 1) {
    let _obj = JSON.parse(res.data || '')

    // 法人代表
    data.ruleForm.CdelegateMan = _obj.operName
    // 注册资金
    let RegisteredAmt = parseInt((_obj.registCapi || '万').split('万')[0])
    data.ruleForm.RegisteredAmt = RegisteredAmt + ''
    // 成立时间
    data.ruleForm.SetupDate = _obj.startDate
    // 网址
    // that.ruleForm.Url = _obj.startDate;
    // 地址
    data.ruleForm.Address = _obj.address
    // 企业类型
    data.ruleForm.QiXinBao_EconKind = _obj.econKind
    // 经营状态
    data.ruleForm.QiXinBao_Status = _obj.new_status

    data.ruleForm.QiXinBao_creditNo = _obj.creditNo
    getQiXinBaoinfo(data.ruleForm.QiXinBao_creditNo)
    return true
  } else {
    ElMessage.warning('启信宝校准失败，请输入正确的客户名')
    return false
  }
}

// 驳回

let rejectOpenData: any = reactive({
  visible: false,
  formData: {}
})

//打开弹窗
const openWindowReject = () => {
  rejectOpenData.formData = {}
  rejectOpenData.visible = true
}

//关闭弹窗
const closeWindowReject = (type: string) => {
  rejectOpenData.visible = false
}

// 查看详情
let viewDetailsData: any = reactive({
  visible: false,
  formData: {}
})

//打开弹窗
const openWindowViewDetails = () => {
  viewDetailsData.formData = {
    lawsuitInfoList: lawsuitInfoList.value,
    lawsuitList: lawsuitList.value,
    executedpersonList: executedpersonList.value,
    executionList: executionList.value
  }

  viewDetailsData.visible = true
}

//关闭弹窗
const closeWindowViewDetails = (type: string) => {
  viewDetailsData.visible = false
}

onMounted(() => {
  getcusinfo()
})
</script>
<style lang="postcss" scoped>
.tech_TechnicalReport_bg {
  height: 38px;
  background-image: url('/@/assets/img/tech/TechnicalReport/bg2.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: -1px;
}
.tech_TechnicalReport_midd {
  background-image: url('/@/assets/img/tech/TechnicalReport/bg1.png');
  /* background-position: center; */
  background-size: 100%;
  :deep(.el-checkbox.el-checkbox--large) {
    height: 0 !important;
    vertical-align: sub;
    margin-left: 14px;
  }
}
</style>
