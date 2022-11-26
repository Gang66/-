<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-3 pt-2">
      <el-tabs v-model="data.activeName" class="demo-tabs">
        <el-tab-pane label="裁判文书" name="first">

          <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
            @current-change="handleCurrentChange">
            <div class="bf-table-content text-xs">
              <el-table :data="FormData.lawsuitList" stripe @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" width="54" align="center" />
                <el-table-column prop="CreateOn" label="提交日期" width="120" align="center">
                  <template #default="scope">
                    <span>{{(scope.row.date||'').substring(0,10)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CompName" label="类型" align="center" width="100">
                  <template #default="scope"> <span>{{scope.row.type}}</span></template>
                </el-table-column>
                <el-table-column prop="DepartName" label="标题" align="center" width="120">
                  <template #default="scope">
                    <div class="truncate"> <span>{{scope.row.title}}</span></div>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="案号" align="center" width="200">
                  <template #default="scope">
                    <span>{{scope.row.case_no}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="案由" align="center">
                  <template #default="scope">
                    <span>{{scope.row.case_cause}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="身份" align="center">
                  <template #default="scope">
                    <span>{{scope.row.role}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="法院" align="center">
                  <template #default="scope">
                    <span>{{(scope.row.court||'').substring(0,7)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="公示信息" align="center" width="80">
                  <template #default="scope">
                    <span>{{scope.row.disabled==1?'历史':'当前'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="请求标的" align="center" width="100">
                  <template #default="scope">
                    <span>{{scope.row.sub_amount}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </table-search>
        </el-tab-pane>

        <el-tab-pane label="被执行人" name="second">
          <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
            @current-change="handleCurrentChange">
            <div class="bf-table-content text-xs">
              <el-table :data="FormData.executedpersonList" stripe @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" width="54" align="center" />
                <el-table-column prop="CreateOn" label="立案日期" width="120" align="center">
                  <template #default="scope">
                    <span>{{(scope.row.case_date||'').substring(0,10)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CompName" label="执行状态" align="center">
                  <template #default="scope"> <span>{{scope.row.status==1?'已结案':'执行中'}}</span></template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="执行依据文号" align="center" width="200">
                  <template #default="scope">
                    <span>{{scope.row.case_number}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="执行法院" align="center">
                  <template #default="scope">
                    <span>{{scope.row.court}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="公示信息" align="center">
                  <template #default="scope">
                    <span>{{scope.row.disabled==1?'历史':'当前'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="执行金额" align="center">
                  <template #default="scope">
                    <span>{{scope.row.amount}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </table-search>
        </el-tab-pane>

        <el-tab-pane label="失信被执行" name="third">
          <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
            @current-change="handleCurrentChange">
            <div class="bf-table-content text-xs">
              <el-table :data="FormData.executionList" stripe @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" width="54" align="center" />
                <el-table-column prop="CreateOn" label="立案日期" width="120" align="center">
                  <template #default="scope">
                    <span>{{(scope.row.date||'').substring(0,10)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="案号" align="center" width="200">
                  <template #default="scope">
                    <span>{{scope.row.case_number}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="执行法院" align="center">
                  <template #default="scope">
                    <span>{{(scope.row.court||'').substring(0,7)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CompName" label="旅行情况" align="center">
                  <template #default="scope"> <span>{{scope.row.execution_status}}</span></template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="失信情形" align="center">
                  <template #default="scope">
                    <span>{{scope.row.execution_desc}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="公示信息" align="center">
                  <template #default="scope">
                    <span>{{scope.row.disabled==1?'历史':'当前'}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </table-search>
        </el-tab-pane>

        <el-tab-pane label="诉讼信息" name="fourth">
          <div v-if="FormData.lawsuitInfoList.length>0">
            <div v-for="(val,index) in FormData.lawsuitInfoList.filter(x=>x.LawSuitCount&&x.LawSuitCount!=0)" :key="index">
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.documentList = res.data.records
      form.totals = res.data.totals
    }
  })
}

// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.Suggestion.length > 0) {
      data.Suggestion.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue
        }
      })
    }
    return title
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails[0].Id)
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    TableSearch
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0
    })
    const data = reactive({
      activeName: 'first',
      documentList: [{ val: 1 }],
      ExecuteeList: [{ val: 1 }],
      EnforcedList: [{ val: 1 }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })

    return {
      boxStyle,
      closeWindow,
      data,
      form,
      ...tableRender(form, data)
    }
  }
})
</script>
<style lang="postcss" scoped></style>
