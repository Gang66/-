<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="">
      <!-- 已确认图标 -->
      <img src="../../../../assets/img/tech/ContractApproval/approved.png" class="absolute w-24 h-20 right-32 top-10" alt="" />
      <div class="tech_TechnicalReport_midd">
        <div class="w-700 m-auto text-center pb-10">
          <div class="pt-4">
            <p class="text-2xl font-medium">信用报告（18）</p>
          </div>
          <div class="pl-8 pr-8 pt-3 text-left">
            <span class="text-base">广西钦州志诚化工有限公司</span>
            <el-button type="primary" class="ml-3" plain size="small">40强</el-button>
            <el-button type="primary" plain size="small">民营</el-button>
            <el-button type="primary" plain size="small">化工企业</el-button>
            <div class="text-xs leading-6 mt-2">
              <div class="w-1/4 inline-block">
                <p><span>法人代表：</span>雷惠宪</p>
                <p><span>实际规模：</span>一般</p>
              </div>
              <div class="w-1/4 inline-block">
                <p><span>注册资金：</span>3300万</p>
                <p><span>社保人员：</span>30人以下</p>
              </div>
              <div class="w-1/4 inline-block">
                <p><span> 客户来源：</span>B2B网站</p>
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
                <p><span>公司地址：</span>广西壮族自治区钦州市钦南区广西钦州市钦州港勒沟东大街66号</p>
              </div>
              <div class="flex mt-6">
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
              </div>
            </div>
            <!-- #endregion -->
            <!-- #region 诉讼调查 -->
            <div class="flex mt-6">
              <div class="flex-auto">
                <i class="iconfont icon-biaoqian mr-2 text-blue-500"></i>
                <span class="text-sm">诉讼调查</span>
              </div>
              <div>
                <span class="cursor-pointer text-sm text-blue-500 mr-3">获取信息</span>
                <span class="cursor-pointer text-sm text-blue-500 mr-3" @click="openWindowViewDetails()"> 查看详情</span>
                <span class="text-sm">得分：</span>
                <span class="text-sm">0</span>
                <span class="text-xs">/60</span>
              </div>
            </div>
            <div class="text-sm">
              <p class="text-orange-500 font-medium">该客户共有<span class="text-lg">33</span>项诉讼信息</p>
              <p>劳资争议1项： 被告:1、</p>
              <p>合同纠纷3项： 被告:3、</p>
              <p>金融纠纷1项： 被告:1、</p>
              <p>其他纠纷5项： 原告:1、被告:4、</p>
              <p>执行名单20项： 历史:20、 金额:9934200</p>
              <p>失信名单3项： 历史:3、</p>
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
            <div class="h-11 bg-blue-100 rounded-md mt-4 mb-4 leading-10 align-middle">
              <i class="iconfont icon-dingdan3 text-blue-500 ml-4 mr-2" style="font-size: 20px; vertical-align: inherit"></i>
              <span class="text-blue-500 text-sm">我认为该客户：不能合作，信用较差</span>
              <!-- <el-alert title="我认为该客户：不能合作，信用较差" type="info" show-icon :closable="false" /> -->
            </div>
            <p class="text-xs mb-2">下次沟通时间：2021-10-20 16:27:50 <span class="text-red-500">已超过最后沟通时间</span></p>
            <p class="text-xs">审批意见(肖球)：</p>
            <!-- #endregion -->
            <!-- 驳回 -->
            <div class="text-center mt-8">
              <el-button type="primary" @click="openWindowReject()">驳回</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="tech_TechnicalReport_midd"></div>
      <div class="tech_TechnicalReport_bg"></div>
      <!-- 拒绝原因 -->
      <Reject title="驳回" v-if="rejectOpenData.visible" :FormData="rejectOpenData.formData" @closeWindow="closeWindowReject($event)" />
      <!-- 查看详情 -->
      <ViewDetails title="山东润德生物科技有限公司【诉讼信息】" v-if="viewDetailsData.visible" :FormData="viewDetailsData.formData" @closeWindow="closeWindowViewDetails($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/InspectionReport.vue'
import Reject from './reject.vue'
import ViewDetails from './ViewDetails.vue'

export default defineComponent({
  components: {
    OpenWindow,
    Reject,
    ViewDetails
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      problems: true
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: '',
      boxHeight: ''
    })

    // 驳回
    const rejectOpen = (data: any) => {
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

      return {
        rejectOpenData,
        openWindowReject,
        closeWindowReject
      }
    }
    // 查看详情
    const viewDetailsOpen = (data: any) => {
      let viewDetailsData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowViewDetails = () => {
        viewDetailsData.formData = {}
        viewDetailsData.visible = true
      }

      //关闭弹窗
      const closeWindowViewDetails = (type: string) => {
        viewDetailsData.visible = false
      }

      return {
        viewDetailsData,
        openWindowViewDetails,
        closeWindowViewDetails
      }
    }

    return {
      boxStyle,
      closeWindow,
      data,
      ...rejectOpen({ data }),
      ...viewDetailsOpen({ data })
    }
  }
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
