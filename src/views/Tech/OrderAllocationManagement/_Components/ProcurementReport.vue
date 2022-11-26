<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="">
      <!-- 已确认图标 -->
      <img src="../../../../assets/img/tech/ContractApproval/approved.png" class="absolute w-24 h-20 right-32 top-10" alt="" />
      <div class="tech_TechnicalReport_midd">
        <div class="w-700 m-auto text-center pb-10">
          <div class="pt-4">
            <p class="text-2xl font-medium">采购报告</p>
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
              </div>
              <div class="text-sm">
                <div class="mt-2 mb-2" v-if="data.problems == false">
                  <el-button size="small">对供应商的要求</el-button>
                </div>
                <p><span>电话咨询/理由充分：</span>客户对以往供应商 都是当地经销商，服务，送货快</p>
              </div>
              <div class="text-sm">
                <div class="mt-2 mb-2" v-if="data.problems == false">
                  <el-button size="small">产品质量等级、技术</el-button>
                </div>
                <p><span>电话咨询/理由充分：</span>按照型号报价，满足使用工况</p>
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
            <!-- #region 客观调查 -->
            <div class="flex mt-6">
              <div class="flex-auto">
                <i class="iconfont icon-biaoqian mr-2 text-blue-500"></i>
                <span class="text-sm">客观调查</span>
              </div>
            </div>
            <div class="text-sm">
              <p class="text-sm font-semibold">付款方式或价格 （重要影响因素）</p>
              <p>电话咨询/理由充分：需要影响他们企业付款方式</p>
              <p class="text-sm font-semibold">供应周期和售后服务</p>
              <p>电话咨询/理由充分：使用当地供应商，主要是供货期快</p>
            </div>
            <!-- #endregion -->

            <!-- #region 调查结果 -->
            <div class="flex mt-4">
              <div class="flex-auto">
                <i class="iconfont icon-biaoqian mr-2 text-blue-500"></i>
                <span class="text-sm">调查结果</span>
                <div class="w-20 h-6 bg-blue-50 inline-block align-middle ml-4 border-l-4 border-blue-400 text-center">
                  <span class="text-blue-400 text-sm">实践论证</span>
                </div>
              </div>
            </div>
            <div class="h-11 bg-blue-100 rounded-md mt-4 mb-4 leading-10 align-middle">
              <i class="iconfont icon-dingdan3 text-blue-500 ml-4 mr-2" style="font-size: 20px; vertical-align: inherit"></i>
              <span class="text-blue-500 text-sm">个人主观意见：该企业主要是付款方式，价格是其次</span>
            </div>
            <p class="text-xs mb-2">下次沟通时间：2021-10-20 16:27:50 <span class="text-red-500">已超过最后沟通时间</span></p>
            <p class="text-xs">审批意见(于树强)：</p>
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
      problems: false
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

    return {
      boxStyle,
      closeWindow,
      data,
      ...rejectOpen({ data })
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
