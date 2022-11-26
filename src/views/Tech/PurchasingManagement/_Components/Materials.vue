<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 tech_contractManagement_billMaterials">
      <p class="text-xl text-center">北方阀门集团物料采购单</p>
      <p class="float-left text-sm">SDLH2110280001</p>
      <p class="text-sm float-right mb-3">2021-07-03</p>
      <div class="material_baseInfo">
        <table border="1" style="border-collapse: collapse; width: 100%; text-align: center">
          <colgroup>
            <col width="10%" />
            <col width="14%" />
            <col width="8%" />
            <col width="8%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <tr>
            <th>需求方</th>
            <td colspan="3" style="text-align: left; padding-left: 10px">山东凯丽特种纸股份有限公司</td>
            <th>合同金额</th>
            <td>23100</td>
            <th>实际金额</th>
            <td>19002</td>
            <th>最低销售价</th>
            <td>19002</td>
          </tr>
          <tr>
            <th>供货方</th>
            <td colspan="3" style="text-align: left; padding-left: 10px">北京高中压阀门科技集团有限公司</td>
            <th>提成费</th>
            <td>380</td>
            <th>居间费</th>
            <td>4098</td>
            <th>加价费</th>
            <td>0</td>
          </tr>
          <tr>
            <th>合作状态</th>
            <td><span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap">合作客户-尚有余款</span></td>
            <th>供货周期</th>
            <td>9</td>
            <th>税费</th>
            <td>3003.00</td>
            <th>运费</th>
            <td>947.10</td>
            <th>紧急程度</th>
            <td>紧急</td>
          </tr>
          <tr>
            <th>事业部</th>
            <td>润扬事业部</td>
            <th>业务员</th>
            <td>王新娥</td>
            <th>标牌证件</th>
            <td>签约单位</td>
            <th>开票信息</th>
            <td>发货后</td>
            <th>物流方式</th>
            <td class="arriveSelect">送货到厂</td>
          </tr>
          <tr>
            <th>物款信息</th>
            <td colspan="9" style="white-space: pre-wrap; text-align: left; padding-left: 10px">付款信息：发货款100%；&nbsp;收货信息： 唐经理,13561806563,山东威海荣成市河阳东路198号凯丽特种纸,批次1</td>
          </tr>
        </table>
        <table border="1" style="border-collapse: collapse; width: 100%; text-align: center; margin-top: 20px">
          <colgroup>
            <col width="5%" />
            <col width="12%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
            <col width="7%" />
            <col width="8%" />
            <col width="18%" />
          </colgroup>
          <thead>
            <tr>
              <th>序号</th>
              <th>产品名称</th>
              <th>型号</th>
              <th>规格</th>
              <th>单位</th>
              <th>数量</th>
              <th>单价</th>
              <th>金额</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>测试产品名称</td>
              <td>测试型号</td>
              <td>测试规格</td>
              <td>测试单位</td>
              <td>10</td>
              <td>100</td>
              <td>1000</td>
              <td style="white-space: pre-wrap">暂无</td>
            </tr>
            <tr>
              <td colspan="2">总计金额</td>
              <td colspan="4">大写：壹仟元整</td>
              <td>小写</td>
              <td colspan="2">￥1000</td>
            </tr>
            <tr>
              <td colspan="2">备注</td>
              <td colspan="7"><div style="text-align: left">暂无备注</div></td>
            </tr>
            <tr>
              <td colspan="2">合同特殊条款</td>
              <td colspan="7">
                <div style="text-align: left">暂无特殊条款</div>
                <!---->
                <!---->
              </td>
            </tr>
            <!---->
            <!---->
            <tr>
              <td colspan="2" style="border: 0px">编制：</td>
              <td colspan="2" style="border: 0px">物采经理：</td>
              <td colspan="2" style="border: 0px">运营总监：</td>
              <td colspan="2" style="border: 0px">总经理：</td>
              <td colspan="2" style="border: 0px">财务复核：</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4 clearfix">
        <div class="float-right">
          <el-button @click="closeWindow('close')">取消</el-button>
          <el-button type="primary">打印</el-button>
        </div>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({})
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })
    const getData = () => {}
    return {
      boxStyle,
      closeWindow,
      data
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_contractManagement_billMaterials {
  .material_baseInfo th {
    font-size: 14px;
  }
  .material_baseInfo tr,
  .material_baseInfo td {
    font-size: 14px;
    padding: 6px 6px;
    border: 1px solid #333;
  }
  :deep(.el-input__inner) {
    color: #409eff !important;
  }
}
</style>
