<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="">
      <div class="tech_TechnicalReport_midd">
        <div class="w-700 m-auto text-center pb-14">
          <div class="pt-14">
            <p class="text-2xl font-medium">东辰控股集团有限公司石化分公司</p>
            <p class="text-sm mt-4">报价金额：5460</p>
          </div>
          <div class="w-600 h-10 bg-orange-50 m-auto mt-4 rounded-3xl">
            <p class="text-sm text-orange-400 pt-2">★技术专员★</p>
          </div>
          <div class="w-600 m-auto mt-4 clearfix">
            <div class="block clearfix">
              <div class="w-8 h-8 leading-8 bg-blue-500 rounded-full float-left inline-block">
                <span class="text-sm text-white">问</span>
              </div>
              <div class="max-w-md text-xs text-left float-left ml-4 inline-block bg-blue-50 border leading-5 border-blue-200 p-2 pl-4 pr-4 rounded-b-md rounded-tr-md">一、询价单从产品名称、型号、规格、材质、特殊属性、加载的完整性准确性的分析，与客户技术对接、产品选型等方面可有需要补充意见？</div>
            </div>
            <div class="block clearfix">
              <div class="mt-4">
                <div class="w-8 h-8 leading-8 bg-green-500 rounded-full float-right inline-block ml-3">
                  <span class="text-sm text-white">答</span>
                </div>
                <div class="max-w-md text-xs float-right text-left inline-block bg-green-50 border leading-5 border-green-200 p-2 pl-4 pr-4 rounded-b-md rounded-tl-md">一、询价单从产品名称、型号、规格、材质、特殊属性、加载的完整性准确性的分析，与客户技术对接、产品选型等方面可有需要补充意见？按图处理 、 非常规阀门</div>
              </div>
            </div>
          </div>
          <div class="w-600 h-10 bg-orange-50 m-auto mt-4 rounded-3xl">
            <p class="text-sm text-orange-400 pt-2">★核算专员★</p>
          </div>
          <div class="w-600 m-auto mt-4 clearfix">
            <div class="block clearfix">
              <div class="w-8 h-8 leading-8 bg-blue-500 rounded-full float-left inline-block">
                <span class="text-sm text-white">问</span>
              </div>
              <div class="max-w-md text-xs text-left float-left ml-4 inline-block bg-blue-50 border leading-5 border-blue-200 p-2 pl-4 pr-4 rounded-b-md rounded-tr-md">一、询价单从产品名称、型号、规格、材质、特殊属性、加载的完整性准确性的分析，与客户技术对接、产品选型等方面可有需要补充意见？</div>
            </div>
            <div class="block clearfix">
              <div class="mt-4">
                <div class="w-8 h-8 leading-8 bg-green-500 rounded-full float-right inline-block ml-3">
                  <span class="text-sm text-white">答</span>
                </div>
                <div class="max-w-md text-xs float-right text-left inline-block bg-green-50 border leading-5 border-green-200 p-2 pl-4 pr-4 rounded-b-md rounded-tl-md">一、询价单从产品名称、型号、规格、材质、特殊属性、加载的完整性准确性的分析，与客户技术对接、产品选型等方面可有需要补充意见？按图处理 、 非常规阀门</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tech_TechnicalReport_midd"></div>
      <div class="tech_TechnicalReport_bg"></div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/InspectionReport.vue'

export default defineComponent({
  components: {
    OpenWindow
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      input: '',
      value: ''
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

    return {
      boxStyle,
      closeWindow,
      data
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
}
</style>
