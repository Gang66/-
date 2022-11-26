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

      <div class="bf-window-padding">
        <div id="printMe">
          <div>
            <div class="pb-1" style="    border-bottom: 2px solid #333;">
              <div class="flex pb-4 justify-center" style="    border-bottom: 3px solid #333;">
                <div class="mt-1">
                  <img src="/src/assets/img/sale/order/logo-beifang.png" alt="" />
                </div>
                <div class="pl-2">
                  <h1 class="text-3xl font-bold">{{data.OrderCompany.Rename+'报价单'}}</h1>
                  <!-- <div class="text-sm">
                    <p>地 址：{{ data.OrderCompany.Address }}&nbsp;&nbsp;&nbsp;&nbsp;邮 编：{{ data.OrderCompany.PostalCode }}</p>
                    <p>电 话：{{ data.OrderCompany.Telephone }}&nbsp;&nbsp;&nbsp;&nbsp;传 真：{{ data.OrderCompany.Fax }}</p>
                    <p>E-mail:{{ data.OrderCompany.Email}}&nbsp;&nbsp;&nbsp;&nbsp;网址：{{ data.OrderCompany.website }}</p>
                  </div> -->

                </div>
                <!--  <div class="pl-4" style="text-align: center;">
                  <div class="text-3xl p-4" style="    border-bottom: 2px solid #333;">报价单</div>
                  <div class="text-xl">QUOTATION SHEET</div>
                </div> -->
              </div>
            </div>
            <div>
              <div class="flex pt-6">
                <div class="text-3xl bg-gray-100 p-2">
                  壹
                </div>
                <div class="pl-2">
                  <div class="text-2xl font-bold">联系方式</div>
                  <div class="text-sm w-40">Contact Information</div>
                </div>
                <div class="w-full" style="border-bottom: 3px solid #C5C2C2;">

                </div>
              </div>

              <div class="flex justify-between text-base px-12 py-4">
                <div class="w-1/2 pr-2 ">
                  <div style="    border-bottom: 1px solid #333;"><span class="font-bold">客户名称：</span>{{ printdata.data.CustomerName  }}</div>
                  <div style="    border-bottom: 1px solid #333;"> <span class="font-bold">联系人：</span>{{ printdata.data.CustomerConName }}</div>
                  <div style="    border-bottom: 1px solid #333;"><span class="font-bold">电话：</span>{{  printdata.data.CC_Mobile}}</div>
                  <div style="    border-bottom: 1px solid #333;"><span class="font-bold">手机：</span>{{  printdata.data.CC_Telephone}}</div>
                </div>
                <div class="w-1/2">
                  <div style="    border-bottom: 1px solid #333;"><span class="font-bold">供货名称：</span>{{ data.OrderCompany.Rename }}</div>
                  <div style="    border-bottom: 1px solid #333;"> <span class="font-bold">联系人：</span>{{ printdata.data.SalerName }}</div>
                  <div style="    border-bottom: 1px solid #333;"><span class="font-bold">电话：</span>{{ printdata.data.S_Mobile}}</div>
                  <div style="    border-bottom: 1px solid #333;"><span class="font-bold">手机：</span>{{ printdata.data.S_Telephone}}</div>
                </div>
              </div>

              <div class="flex pt-2">
                <div class="text-3xl bg-gray-100 p-2">
                  贰
                </div>
                <div class="pl-2">
                  <div class="text-2xl font-bold">报价清单</div>
                  <div class="text-sm  w-28">Quotation list</div>
                </div>
                <div class="w-full" style="border-bottom: 3px solid #C5C2C2;">

                </div>
              </div>
            </div>

            <div class="bf-table-style pt-2 text-base">
              <div class="font-bold">
                感谢惠顾、现将贵公司所需阀门产品报价如下
              </div>
              <table cellspacing="0" class="w-full ">
                <thead>
                  <tr>
                    <th align="center" style="width:25px">
                      序号
                    </th>
                    <th v-for="(item,i) in printdata.columns.filter(f=>f.base==1)" :style="'width:'+item.width+'px'" align="center">
                      {{item.rename}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in printdata.list">
                    <td align="center"> {{i+1}}</td>
                    <td v-for="(col,i) in printdata.columns.filter(f=>f.base==1)" align="center">
                      {{getvalue(item,col)}}
                    </td>
                  </tr>
                  <tr>
                    <td align="center">合计</td>
                    <td align="center" colspan="4">大写：{{sumnumber()}}</td>
                    <td align="center" :colspan="printdata.columns.filter(f=>f.base==1).length - 3">￥{{printdata.data.Amount}}</td>
                  </tr>
                </tbody>
              </table>

            </div>
            <div class="text-base">
              <div class="flex pt-2 pb-2">
                <div class="text-3xl bg-gray-100 p-2">
                  叁
                </div>
                <div class="pl-2">
                  <div class="text-2xl font-bold">备注说明</div>
                  <div class="text-sm w-28">Remarks Explain</div>
                </div>
                <div class="w-full" style="border-bottom: 3px solid #C5C2C2;">

                </div>
              </div>
              <div v-if="data.markHTML" @click="showmarkHTML">
                <span v-html="data.markHTML"></span>
              </div>
              <div @click="showmarkHTML" v-else>

                <p>● 以上设备均提供一年免费质保</p>
                <p>● 含增值税、含运费（到厂）</p>
                <p>● 报价有效期：自报价之日起10个工作日</p>
              </div>
            </div>

          </div>
          <div class="flex justify-end">
            <div>
              <div>{{data.OrderCompany.Rename}}</div>
              <div class="text-center">{{(printdata.data.CreateOn||'').substring(0,11)}}</div>
            </div>

          </div>

        </div>
        <div class="text-center mt-10">

          <el-button @click="closeWindow('close')">取消</el-button>
          <el-button type="primary" v-print="print">打印</el-button>
        </div>
      </div>
      <el-dialog v-model="data.Editshow" title="编辑备注（不存档）" :before-close="closekHTML" :append-to-body="true">
        <Editor v-model="data.markHTML" api-key='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc' :init="{language: 'zh_CN'}"></Editor>
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
const showmarkHTML = () => {
  if (!data.markHTML) {
    data.markHTML = `<p>● 以上设备均提供一年免费质保</p>
                <p>● 含增值税、含运费（到厂）</p>
                <p>● 报价有效期：自报价之日起10个工作日</p>`
  }

  data.Editshow = true
}
const closekHTML = () => {
  data.Editshow = false
}

let print = reactive({
  id: 'printMe',
  popTitle: '报价单',
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
}
</style>
