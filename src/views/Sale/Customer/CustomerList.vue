<template>
  <div class='w-full'>
    <div class='myClientsPublic_top'>
      <el-button @click='addCustomerview'>添加客户</el-button>
    </div>

    <div class='myClientsPublicTable w-full'>
      <el-table :data='data.tableData'
        :header-cell-style='{ background: &apos;#4E8AFC&apos;, color: &apos;#F5F8FF&apos;,height:&apos;50px&apos;, textAlign: &apos;center&apos;,fontWeight:&apos;600&apos; }'
        :cell-style='{ textAlign: &apos;center&apos;,color: &apos;#333&apos;,height:&apos;45px&apos;,padding:&apos;0px&apos; }'>
        <el-table-column type='selection' width='30' />
        <el-table-column type="index" width="50" />
        <el-table-column prop='CreateOn' label='创建时间' />
        <el-table-column label='客户名称'>
          <template #default='scope'>
            <div style='display:flex;justify-content: center;position: relative;'>
              <div style='position: absolute;left: 20px;'>
                <div v-if='scope.row.IsHistoryCustomer==&apos;1&apos;'
                  style='height:20px;width:20px;border-radius:20px;background:#DB4921;color:#fff;text-align:center;line-height: 20px;'>
                  历
                </div>
                <div v-else-if='scope.row.IsShareCustomer&&scope.row.IsHistoryCustomer!==&apos;1&apos;&&scope.row.IsCreateByShare==1'
                  style='height:20px;width:20px;border-radius:20px;background:#00BD8A;color:#fff;text-align:center;line-height: 20px;'>
                  受
                </div>
                <div v-else-if='scope.row.IsShareCustomer&&scope.row.IsHistoryCustomer!==&apos;1&apos;'
                  style='cursor: pointer;height:20px;width:20px;border-radius:20px;background:#00BD8A;color:#fff;text-align:center;line-height: 20px;'
                  @click='showShareCustomerDialog(scope.row.Id)'>
                  支
                </div>
              </div>
              <div style='cursor: pointer;color:#409EFF;margin-left:10px' @click='goToCustomerHome(scope.row.Id)'>{{ scope.row.Name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label='业务员' prop='CustomerUserRealName' />
        <el-table-column label='等级' prop=''>
          <template #default='scope'>
            {{ scope.row.Ranking?scope.row.Ranking+'强':'' }}
          </template>
        </el-table-column>
        <el-table-column prop='Trade' label='行业'>
          <template #default='scope'>
            <span>{{scope.row.Trade}}</span>
            <!-- <span>{{ tradeFilters(scope.row.Trade) }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop='Address' label='区域' />
        <!--  <el-table-column prop='SituationName' label='联系人信息' width='110px'>
                    <template #default='scope'>
                        <div v-if='scope.row.SituationInfoList.length<=0'>无</div>
                        <ul v-else class='clearfix situation-info-list' @click='handleOpenDialogViewSituation(scope.row)'>
                            <li v-for='(item,i) in getSituationInfoList(scope.row.SituationInfoList)' :key='i'><span>{{ item.list.length }}</span>{{ item.name }}</li>
                        </ul>
                        
                    </template>
                  
                </el-table-column> -->

        <!--   <el-table-column label='诉讼情况' prop='Mobile' width='120px'>
                    <template #default='scope'>
                        <span v-if='scope.row.QiXinComCreditList.length<=0'>无</span>
                        <el-button v-else type='text' size='small' style='padding:0px' @click='handleOpenDialogComCreditQiXinBao(scope.row)'>{{ getQiXinComCreditNum(scope.row.QiXinComCreditList) }}个项目</el-button>
                    </template>
                </el-table-column> -->
        <el-table-column fixed='right' label='操作' :width='&apos;115px&apos;' style='text-align:left'>
          <template #default='scope'>
            <div style='display:flex'>
              <div>
                <div v-if='scope.row.CustomerProgressId==5'>
                  <el-button v-if='scope.row.State==1' size='small' style='color:red;padding:0px' @click='handleUseClick(scope.row)'>未核准</el-button>
                  <span v-else>审批中</span>

                </div>
                <el-button v-else-if='scope.row.Checked===1' size='small' style='padding:0px' @click='handleClick(scope.row)'>已核准</el-button>
                <el-button v-else size='small' style='color:red;padding:0px' @click='handleClick(scope.row)'>未核准</el-button>
              </div>

            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end">
        <div>
          <el-pagination small v-model:page-size="form.size" :background="true" layout="prev, pager, next, jumper" :total="form.totals" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />

        </div>

      </div>
    </div>

    <AddCustomer v-if='data.AddCustomerData.view' :ViewType="data.viewType" :customerId='data.DataId' title='客户信息录入' @closeWindow='closePostWindow' />
    <!--         <ViewSituationDialog
            :dialog-title='&apos;联系人信息&apos;'
            :dialog-data='formData'
            :dialog-visible='isVisibleViewSituation'
            @handleCancel='handleCancelDialogViewSituation()'
        />

        <ComCreditQiXinBaoDialog
            :dialog-title='formData.name+&apos;【诉讼信息】&apos;'
            :dialog-data='formData'
            :dialog-visible='isVisibleComCreditQiXinBao'
            @handleCancel='handleCancelDialogComCreditQiXinBao()'
            @handleClose='handleCloseDialogComCreditQiXinBao()'
        /> -->
  </div>
</template>

<script lang="ts">
import AddCustomer from './AddCustomer.vue'
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  SetupContext
} from 'vue'
import { GetCheckedCustomerList } from '/@/api/Sale/Customer'

const GetList = async (form: any, data: any) => {
  await GetCheckedCustomerList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      console.log('----------------------', data)
      form.totals = res.data.count
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  let _this = getCurrentInstance()
  GetList(form, data)
  const isDelBut = () => {
    return true
  }
  const handleSizeChange = (v: number) => (form.size = v) && GetList(form, data)
  const handleCurrentChange = (v: number) =>
    (form.page = v) && GetList(form, data)
  // 搜索
  const search = () => {
    form.page = 1
    GetList(form, data)
  }
  const addCustomerview = () => {
    data.viewType = 1
    data.DataId = 0
    data.AddCustomerData.view = true
  }
  const childFn = (val: boolean) => {
    data.AddCustomerData.view = val
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange,
    tableRender,
    isDelBut,
    childFn,
    addCustomerview
  }
}
export default defineComponent({
  components: {
    AddCustomer
  },
  props: {},
  setup(props, context: SetupContext) {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      totals: 0
    })

    const queryParam = reactive({
      size: 10,
      CustomerName: ''
    })
    const data = reactive({
      viewType: 1,
      DataId: 0,
      AddCustomerData: {
        view: false,
        currentCustomerId: 0,
        isEdit: false,
        otherRegion: {},
        InfoDisabled: false,
        screenCustomer: null,
        isReadOnly: false
      },
      tableData: []
    })
    const handleClick = (val: any) => {
      data.DataId = val.Id
      data.viewType = 2
      data.AddCustomerData.view = true
    }

    const closePostWindow = () => {
      GetList(form, data)
      data.AddCustomerData.view = false
    }

    const tradeFilters = (str: any) => {
      if ((str || '').substring(0, 2) == '其他') {
        let n = str.length
        return str.substring(2, n > 6 ? 6 : n)
      } else return (str || '').substring(0, 4)
    }

    return {
      handleClick,
      data,
      form,
      queryParam,
      tradeFilters,
      ...tableRender(form, data),
      closePostWindow
    }
  }
})
</script>

<style type="postcss">
.receive-dept-dialog {
  .el-dialog__body {
    background: #fff !important;
  }
}
.myClients-header-remind {
  float: left;
  border-radius: 18px;
  height: 28px;
  line-height: 28px;
  background-color: #ffead9;
  font-size: 14px;
  color: #f33434;
  padding: 0 20px 0 10px;
  margin-left: 20px;
}
.myCustomerPublic .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: transparent;
}

.myClientsPublic_block {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.myCustomerPublic .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #fff;
}

.myCustomerPublic .el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 10px 0;
}

.myCustomerPublic .el-dialog__footer {
  padding: 10px 20px 20px;
  text-align: center;
  box-sizing: border-box;
}

.myCustomerPublic .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  border: none;
}

.myCustomerPublic .el-collapse-item__header {
  background: rgba(247, 248, 253, 1);
  border-radius: 2px 2px 0px 2px;
  color: rgba(85, 94, 115, 1);
  border: none;
  font-size: 14px;
  padding-left: 10px;
}

.myCustomerPublic .el-dialog__header {
  border-radius: 10px 10px 0 0px;
}

.myCustomerPublic .el-dialog {
  border-radius: 10px;
  margin-bottom: 15vh;
}

.myCustomerPublic .el-dialog__body {
  padding: 15px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  background: #eeeff1;
}

.myCustomerPublic .el-collapse {
  border: none;
}

.myCustomerPublic .el-collapse-item__content {
  padding-bottom: 0px;
}

.myCustomerPublic .block {
  padding: 10px 0 10px 0;
  justify-content: space-between;
  display: flex;
}

.myClientsPublic_collaboration {
  width: 100%;
  margin: 0 auto;
}

.myClientsPublic_collaboration_bottom_data {
  display: flex;
  float: left;
  width: 50%;
}

.myClientsPublic_collaboration_header {
  white-space: normal;
  margin-bottom: 10px;
}

.myClientsPublic_collaboration_bottom_data .el-input--medium .el-input__inner {
  background: rgba(234, 237, 240, 1);
}

.myClientsPublic_collaboration .el-form-item {
  margin-bottom: 0px;
}

.myCustomerPublic .el-progress--line .el-progress__text {
  font-size: 11px !important;
}
</style>
<style  type="postcss">
.myClientsPublic_top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background: #f7f9ff;

  border-radius: 4px;
  border: 1px solid #ececec;
  padding: 15px 10px;

  .el-collapse-item__header {
    display: block;
  }

  .tabSwitch {
    font-size: 14px;
    cursor: pointer;
    height: 36px;
    border-radius: 4px;
    padding: 7px 19px;
    line-height: 20px;
    background: #ffffff;
    border: 1px solid #ececed;
  }
}

.myCustomerPublic {
  background-color: #fff;
  padding: 0px;
  border-radius: 5px;
  .el-button--medium {
    border-radius: 2px;
  }
  .el-button--small,
  .el-button--small.is-round {
    padding: 0px 15px;
  }
  .el-button {
    border-radius: 2px;
  }
  .el-table .cell {
    white-space: nowrap;
  }
  .el-table-column--selection {
    .cell {
      padding: 0 !important;
    }
  }

  .el-dialog__footer {
    text-align: center;
  }

  .el-collapse-item__header {
    background: rgba(240, 243, 248, 1);
  }

  .dailyattendanceActive {
    background: #409eff !important;
    color: #fff !important;
  }
}
.myClientsPublicTable {
  .el-progress-bar {
    padding-right: 0px;
    width: 48%;
    margin-right: 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  padding-bottom: 10px;
  .situation-info-list {
    cursor: pointer;
    li {
      float: left;
      width: 30px;
      padding-top: 10px;
      position: relative;
      span {
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 10px;
        display: block;
        border-radius: 50%;
        background-color: #db4921;
        color: #fff;
      }
      &:nth-child(1) {
        color: #ff960f;
        span {
          background-color: #ff960f;
        }
      }
      &:nth-child(2) {
        color: #3396fb;
        span {
          background-color: #3396fb;
        }
      }
      &:nth-child(3) {
        color: #00bd8a;
        span {
          background-color: #00bd8a;
        }
      }
    }
  }
}

.myCustomerPublicTwo {
  background: #f0f3f8;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;

  .el-dialog__footer {
    text-align: center;
  }

  .myClientsPublic_block {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #f0f3f8;
  }

  .el-collapse-item__content {
    padding-bottom: 0px;
  }

  .el-collapse-item__header {
    padding-left: 10px;
  }

  .tabSwitch {
    font-size: 14px;
    cursor: pointer;
    padding: 7px 19px;
    line-height: 20px;
    background: #ffffff;
    border: 1px solid #ececed;
  }

  .dailyattendanceActive {
    background: #409eff !important;
    color: #fff !important;
    border-radius: 2px 0px 0px 2px;
  }

  .myCustomerPublic .el-collapse-item__header {
    background: rgba(247, 248, 253, 1);
    border-radius: 2px 2px 0px 2px;
    color: rgba(85, 94, 115, 1);
    border: none;
    font-size: 14px;
    padding-left: 10px;
  }

  .el-button + .el-button {
    margin-left: 0;
  }
}

.myClientsPublic_collaboration_bottom_data_name {
  background-color: #eee;
  line-height: 36px;
  padding: 0 27px;
  margin-bottom: 10px;
}

.myClientsPublic_collaboration {
  .el-input__inner {
    border-radius: 0px;
  }

  .permission {
    overflow: hidden;

    .el-button--medium {
      padding: 10px 20px;
      font-size: 14px;
      border-radius: 4px;
      height: 36px;
    }
  }

  .myCustomerPublic-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .el-button--medium {
      font-size: 14px;
      border-radius: 0px;
    }

    .el-textarea__inner {
      border-radius: 0px;
    }

    .el-input__inner {
      border-radius: 0px;
    }

    .name {
      background-color: #eee;
      line-height: 36px;
      padding: 0 20px;
    }
  }
}
</style>
