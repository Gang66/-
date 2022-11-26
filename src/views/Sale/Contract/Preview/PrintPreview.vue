<template>
  <div>
    <!-- 打印预览 -->
    <el-dialog v-model="printShow" :width="1000" top="5vh">
      <div class="previewLayout">
        <div class="flex flex-row-reverse">
          <el-button type="primary" plain v-print="print">打印</el-button>
        </div>
        <div id="page-content">
          <div style="font-family: Arial,SimSun,STSong,serif!important;" class="content-wai">
            <div  style="margin: 0 80px;">
              <div class="mb-0">合同登记编号：{{ prop.FormData.BillNo || '系统保存生成' }}</div>
              <div style="font-weight: bolder !important; font-size: 22px; text-align: center;">设备订货合同书</div>
              <p>购货方（甲方）：{{ prop.FormData.CustomerName || '' }}</p>
              <p>供货方（乙方）：{{ prop.FormData.CompanyName || '' }}</p>
              <p>签订地点：{{ prop.FormData.SigningAddress || '' }}</p>
              <p>签订日期：<b>{{ prop.FormData.AgreeDate || '' }}</b></p>
              <p>据《中华人民共和国民法典》，合同双方就下列设备购销事宜，经协商一致，签订本合同。</p>
              <template v-if="prop.formattype==0||prop.formattype==2">
                <h2 class="font-bold mb-1">
                  一、
                  <span v-for="(item,index) in prop.ColumnData1" :key="index">
                    <template v-if="prop.ColumnData1.length != index + 1">
                      {{ item.rename == '' ? item.colname : item.rename }}<span v-if="index <= prop.ColumnData1.length-4">、</span><span v-else-if="index == prop.ColumnData1.length-3">及</span>
                    </template>
                  </span>
                </h2>
                <table class="table">
                  <tr>
                    <th>序号</th>
                    <th v-for="(item,index) in prop.ColumnData1" :key="index">{{item.rename == '' ? item.colname : item.rename}}</th>
                  </tr>
                  <tr v-for="(item,index) in prop.detail1" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-for="(itm,idx) in prop.ColumnData1" :key="idx">{{item[itm.name]}}</td>
                  </tr>
                  <tr>
                    <td>合同金额</td>
                    <td :colspan="prop.ColumnData1.length - 2">大写：{{toChies(prop.FormData.Amount)}}</td>
                    <td colspan="2">￥{{prop.FormData.Amount}}</td>
                  </tr>
                </table>
              </template>
              
              <div v-html="prop.ContractTerms"></div>
              <table class="table-other">
                <tr>
                  <td>甲方</td>
                  <td>乙方</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==0)>-1">
                  <td>单位名称：{{ prop.FormData.J_CompanyName || '' }}</td>
                  <td>单位名称：{{ prop.FormData.Y_CompanyName || '' }}</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==1)>-1">
                  <td>单位地址：{{ prop.FormData.J_CompanyAddress || '' }}</td>
                  <td>单位地址：{{ prop.FormData.Y_CompanyAddress || '' }}</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==2)>-1">
                  <td>法定代表人：{{ prop.FormData.J_LegalPerson || '' }}</td>
                  <td>法定代表人：{{ prop.FormData.Y_LegalPerson || '' }}</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==3)>-1">
                  <td>委托代表人：{{ prop.FormData.J_Entrust || '' }}</td>
                  <td>委托代表人：{{ prop.FormData.Y_Entrust || '' }}</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==4)>-1">
                  <td>开户银行：{{ prop.FormData.J_Bank || '' }}</td>
                  <td>开户银行：{{ prop.FormData.Y_Bank || '' }}</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==5)>-1">
                  <td>银行账号：{{ prop.FormData.J_BankAccount || '' }}</td>
                  <td>银行账号：{{ prop.FormData.Y_BankAccount || '' }}</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==6)>-1">
                  <td>电话：{{ prop.FormData.J_Telephone || '' }}</td>
                  <td>电话：{{ prop.FormData.Y_Telephone || '' }}</td>
                </tr>
                <tr v-if="prop.InfoField.findIndex(f=>f==7)>-1">
                  <td>税号：{{ prop.FormData.J_Duty || '' }}</td>
                  <td>税号：{{ prop.FormData.Y_Duty || '' }}</td>
                </tr>
              </table>

              <template v-if="prop.formattype==1 || prop.formattype==2">
                <div class="divider"></div>
                <h2 class="font-bold mb-5">合同附件</h2>
                <h2 class="font-bold mb-5">甲方：{{ prop.FormData.CustomerName || '' }}</h2>
                <h2 class="font-bold mb-6">乙方：{{ prop.FormData.CompanyName || '' }}</h2>
                <table class="table">
                  <tr>
                    <th>序号</th>
                    <th v-for="(item,index) in prop.ColumnData2" :key="index">{{item.rename == '' ? item.colname : item.rename}}</th>
                  </tr>
                  <tr v-for="(item,index) in prop.detail2" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-for="(itm,idx) in prop.ColumnData2" :key="idx">{{item[itm.name]}}</td>
                  </tr>
                  <tr>
                    <td>合同金额</td>
                    <td :colspan="prop.ColumnData2.length - 2">大写：{{toChies(prop.FormData.Amount)}}</td>
                    <td colspan="2">￥{{prop.FormData.Amount}}</td>
                  </tr>
                </table>
              </template>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { toChies } from '/@/utils/tools'
const prop = defineProps({
  ContractTerms: { // 合同
    type: String,
    default: ''
  },
  FormData: { // 数据信息
    type: Object,
    default: () => {}
  },
  ColumnData1: {  // 表单一头部
    type: Array,
    default: () => []
  },
  detail1: {  // 表单一数据
    type: Array,
    default: () => []
  },
  ColumnData2: {  // 表单二头部
    type: Array,
    default: () => []
  },
  detail2: {  // 表单二数据
    type: Array,
    default: () => []
  },
  InfoField: {  // 供需方关系
    type: Array,
    default: () => []
  },
  formattype: {  // 供需方关系
    type: Number,
    default: ''
  },
})
setTimeout(() => {
  console.log(prop.detail1, 11)
console.log(prop.ColumnData1, 22)
}, 1000);

const printShow = ref(false)

const openPrint = () => {
  printShow.value = true
}
// 打印
let print = reactive({
  id: 'page-content',
  popTitle: '中国·北方阀门',
  openCallback() {
    console.log('点击v-print绑定的按钮了！')
  },
  closeCallback() {
    console.log('关闭了打印工具！')
  }
})

defineExpose({
  openPrint
})
</script>


<style scoped lang="postcss">

.content-wai{
  width: 900px;
  margin: 0 auto;
  padding: 20px 0;
  font-size: 20px;
  color: #000;
  p {
    margin: 20px 0;
    font-family: Arial,SimSun,STSong,serif;
  }
  .table
  {
    width: 100%;
    border-collapse:collapse;
  }
  .table td,
  .table th
  {
    border:1px solid black;
    text-align: center;
    padding: 4px;
  }

  .table-other{
    width: 100%;
  }
  .table-other td
  {
    border:none;
    text-align: left;
    padding: 6px 4px;
  }
  .divider{
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    background-color: #dcdfe6;
    position: relative;
  }
  .table th,h2{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
  }
}
</style>