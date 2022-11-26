<template>
  <div class="UserProfile">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
      <template #title>
        <div class="rounded-full text-right bf-window-padding" style="padding-bottom: 0">
          <el-icon class="cursor-pointer" @click="closeWindow('close')">
            <el-icon-close />
          </el-icon>
        </div>
      </template>

      <div class="p-4 material_baseInfo">
        <div id="printMe">
          <div class="bf-table-style pt-2 text-xl">
            <p class="text-xl text-center">北方阀门集团物料采购单</p>
            <p class="float-left text-sm">SDLH2110280001</p>
            <p class="text-sm float-right mb-3">2021-07-03</p>
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
            <table data-v-1fdcd6cc="" border="1" style="border-collapse: collapse; width: 100%; text-align: center; margin-top: 20px">
              <colgroup data-v-1fdcd6cc="">
                <col data-v-1fdcd6cc="" width="5%" />
                <col data-v-1fdcd6cc="" width="12%" />
                <col data-v-1fdcd6cc="" width="10%" />
                <col data-v-1fdcd6cc="" width="10%" />
                <col data-v-1fdcd6cc="" width="5%" />
                <col data-v-1fdcd6cc="" width="5%" />
                <col data-v-1fdcd6cc="" width="7%" />
                <col data-v-1fdcd6cc="" width="8%" />
                <col data-v-1fdcd6cc="" width="18%" />
              </colgroup>
              <thead data-v-1fdcd6cc="">
                <tr data-v-1fdcd6cc="">
                  <th data-v-1fdcd6cc="">序号</th>
                  <th data-v-1fdcd6cc="">产品名称</th>
                  <th data-v-1fdcd6cc="">型号</th>
                  <th data-v-1fdcd6cc="">规格</th>
                  <th data-v-1fdcd6cc="">单位</th>
                  <th data-v-1fdcd6cc="">数量</th>
                  <th data-v-1fdcd6cc="">单价</th>
                  <th data-v-1fdcd6cc="">金额</th>
                  <th data-v-1fdcd6cc="">备注</th>
                </tr>
              </thead>
              <tbody data-v-1fdcd6cc="">
                <tr data-v-1fdcd6cc="">
                  <td data-v-1fdcd6cc="">1</td>
                  <td data-v-1fdcd6cc="">测试产品名称</td>
                  <td data-v-1fdcd6cc="">测试型号</td>
                  <td data-v-1fdcd6cc="">测试规格</td>
                  <td data-v-1fdcd6cc="">测试单位</td>
                  <td data-v-1fdcd6cc="">10</td>
                  <td data-v-1fdcd6cc="">100</td>
                  <td data-v-1fdcd6cc="">1000</td>
                  <td data-v-1fdcd6cc="" style="white-space: pre-wrap">暂无</td>
                </tr>
                <tr data-v-1fdcd6cc="">
                  <td data-v-1fdcd6cc="" colspan="2">总计金额</td>
                  <td data-v-1fdcd6cc="" colspan="4">大写：{{ sumnumber() }}</td>
                  <td data-v-1fdcd6cc="">小写</td>
                  <td data-v-1fdcd6cc="" colspan="2">￥1000</td>
                </tr>
                <tr data-v-1fdcd6cc="">
                  <td data-v-1fdcd6cc="" colspan="2">备注</td>
                  <td data-v-1fdcd6cc="" colspan="7"><div data-v-1fdcd6cc="" style="text-align: left">暂无备注</div></td>
                </tr>
                <tr data-v-1fdcd6cc="">
                  <td data-v-1fdcd6cc="" colspan="2">合同特殊条款</td>
                  <td data-v-1fdcd6cc="" colspan="7">
                    <div data-v-1fdcd6cc="" style="text-align: left">暂无特殊条款</div>
                  </td>
                </tr>
                <tr data-v-1fdcd6cc="">
                  <td data-v-1fdcd6cc="" colspan="2" style="border: 0px">编制：</td>
                  <td data-v-1fdcd6cc="" colspan="2" style="border: 0px">物采经理：</td>
                  <td data-v-1fdcd6cc="" colspan="2" style="border: 0px">运营总监：</td>
                  <td data-v-1fdcd6cc="" colspan="2" style="border: 0px">总经理：</td>
                  <td data-v-1fdcd6cc="" colspan="2" style="border: 0px">财务复核：</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center mt-10">
          <el-button @click="closeWindow('close')">取消</el-button>
          <el-button type="primary" v-print="print">打印</el-button>
        </div>
      </div>
      <el-dialog v-model="data.Editshow" title="编辑备注（不存档）" :before-close="closekHTML" :append-to-body="true">
        <Editor v-model="data.markHTML" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" :init="{ language: 'zh_CN' }"></Editor>
      </el-dialog>
    </OpenWindow>
  </div>
</template>

<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { GetOrderCompanyInfo } from '/@/api/Sale/Customer'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { remoteUrl, toChies } from '/@/utils/tools'
import { onMounted, reactive, ref } from 'vue'
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
// 页面样式
const boxStyle = reactive({
  boxWidth: 'w-880',
  boxHeight: 'h-1200',
  boxPaddingTop: 'pt-0'
})

const summoney = ref(0)

const data = reactive({
  markHTML: '',
  Editshow: false,
  OrderCompany: {}
})

let print = reactive({
  id: 'printMe',
  popTitle: '物料单',
  openCallback() {
    console.log('点击v-print绑定的按钮了！')
  },
  closeCallback() {
    console.log('关闭了打印工具！')
  }
})

const sumnumber = () => {
  return toChies(props.printdata.data.Amount)
}

//获取
const GetOrderCompanyInfoEvent = () => {
  GetOrderCompanyInfo({ Id: props.printdata.data.CompanyId }).then((res) => {
    if (res.code == 1) {
      data.OrderCompany = res.data
    }
  })
}

const getvalue = (row: any, col: any) => {
  return row[col.name]
}

const props = defineProps({
  printdata: {
    type: Object,
    default: {}
  }
})
onMounted(() => {
  GetOrderCompanyInfoEvent()
})
</script>

<style lang="postcss" scoped>
.UserProfile {
  :deep(.bf-windows-content) {
    transform: scale(0.76);
  }
  :deep(.overflow-y-auto) {
    overflow-y: hidden !important;
  }
  :deep(table td) {
    padding: 0px 2px !important;
  }
  .material_baseInfo th {
    font-size: 14px;
  }
  .material_baseInfo tr,
  .material_baseInfo td {
    font-size: 14px;
    padding: 6px 6px;
    border: 1px solid #333;
  }
}
</style>
