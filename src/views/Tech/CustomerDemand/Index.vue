<!--技术处理-->
<template>
  <!-- 总-->
  <div class="tech_customedemand_index">
    <!-- 工资合计 分配  预警 -->
    <TotalWages></TotalWages>
    <el-row :gutter="20">
      <el-col :span="getSetting.showLayoutRight ? 24 : 18">
        <div class="grid-content ep-bg-purple">
          <div>
            <!-- 表格等 -->
            <div class="w-full my-5">
              <el-tabs type="border-card" stretch>
                <el-tab-pane label="名称">
                  <div class="clearfix pt-2 pl-4 pr-4">
                    <div class="inline-block">
                      <div class="inline-block mr-1">
                        <el-input v-model="form.title" placeholder="请输入产品名称/型号" />
                      </div>
                      <div class="inline-block pt-1 ml-2">
                        <el-button type="primary"><i class="iconfont icon-search"></i>查询</el-button>
                      </div>
                    </div>
                    <div class="float-right mt-1">
                      <el-button type="info" @click="orderToEntrySave"> <i class="iconfont icon-mxjl mr-1"></i>返回录入 </el-button>
                      <el-button type="primary" @click="TransferAccounting"><i class="iconfont icon-dingdan21"></i>转入核算</el-button>
                      <!-- <el-button type="danger"><i class="iconfont icon-baocun mr-1"></i>暂存</el-button> -->
                      <el-button type="warning" @click="openWindowTechnicistTreatmForm()"> <i class="iconfont icon-dingdan4 mr-1"></i>技术处理 </el-button>

                      <el-button type="success"><i class="iconfont icon-goutong mr-1"></i>沟通记录</el-button>
                    </div>
                  </div>
                  <el-divider content-position="right"></el-divider>
                  <div class="w-full">
                    <div class="inline-block float-left leading-6">按名称：</div>
                    <div class="inline-block w-880">
                      <el-checkbox-group v-model="checkboxGroup1" size="small" @change="change">
                        <el-checkbox label="蝶阀" border />
                        <el-checkbox label="闸阀" border />
                        <el-checkbox label="截止阀" border />
                        <el-checkbox label="消声止回阀" border />
                      </el-checkbox-group>
                    </div>
                  </div>
                  <el-divider content-position="right"></el-divider>
                  <div class="w-full">
                    <div class="inline-block float-left leading-10">已选：</div>
                    <div class="inline-block mt-2 w-880">
                      <el-tag v-for="(tag, index) in tags" :key="tag.name" class="mx-1" closable :type="tag.type" @close="handClose(index, tag)">
                        {{ tag.name }}
                      </el-tag>
                    </div>
                    <div class="float-right text-xs text-blue-400 leading-10">
                      <span>清除筛选</span>
                    </div>
                  </div>
                  <el-divider content-position="right"></el-divider>
                  <div class="table-product-list">
                    <el-table ref="multipleTableRef" :data="data.tableDataList" style="width: 100%; margin-bottom: 20px" row-key="Id" border :default-expand-all="false" @selection-change="getSelectionRowsVal" @row-dblclick="rowDblClickTechnicistTreatmForm">
                      <el-table-column type="selection" width="40" align="center" />
                      <el-table-column label="序号" width="80" align="center">
                        <template #default="scope"> {{ scope.row.ProductTypeName === '产品' ? '' : scope.row.ProductTypeName }}{{ scope.row.SortNum }}</template>
                      </el-table-column>
                      <el-table-column label="产品参数" min-width="300">
                        <template #default="scope">
                          <div v-if="scope.row.ProductTypeName === '产品'">
                            <div class="w-full relative;">
                              <div class="mt-1 pb-2">
                                <div class="inline-block text-sm">
                                  <span>{{ scope.row.SystemName }} {{ scope.row.SystemModel }} {{ scope.row.SystemSpecification }}</span>
                                </div>
                                <div class="inline-block rounded-b-3xl w-5 h-5 border border-yellow-500 text-xs text-center ml-2">替</div>
                                <div class="inline-block text-xs ml-2">{{ scope.row.Fungible == 2 ? '有' : '无' }}</div>
                                <div class="inline-block rounded-b-3xl w-5 h-5 border border-blue-500 text-xs text-center ml-2">技</div>
                                <div class="inline-block text-xs ml-2">{{ scope.row.TechHard == 2 ? '较难' : '一般' }}</div>
                                <div class="w-5 h-5 text-white inline-block text-center float-right rounded-full" :class="getIsRegular(scope.row.RoutineType) ? 'bg-green-500' : 'bg-red-500'">
                                  <span class="text-xs">常</span>
                                </div>
                              </div>
                              <div class="tech_customerDemand_progress absolute bottom-0 left-0">
                                <el-progress :stroke-width="5" :percentage="60" type="line" :show-text="false" />
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <div class="w-full relative">
                              <div class="mt-1 pb-2">
                                <div class="inline-block text-sm">
                                  <span>{{ scope.row.SystemName }} {{ scope.row.SystemModel }} {{ scope.row.SystemSpecification }}</span>
                                </div>
                                <div class="inline-block rounded-b-3xl w-5 h-5 border border-yellow-500 text-xs text-center ml-2">替</div>
                                <div class="inline-block text-xs ml-2">{{ scope.row.Fungible == 2 ? '有' : '无' }}</div>
                                <div class="inline-block rounded-b-3xl w-5 h-5 border border-blue-500 text-xs text-center ml-2">技</div>
                                <div class="inline-block text-xs ml-2">{{ scope.row.TechHard == 2 ? '较难' : '一般' }}</div>
                                <div class="w-5 h-5 text-white inline-block text-center float-right rounded-full" :class="getIsRegular(scope.row.RoutineType) ? 'bg-green-500' : 'bg-red-500'">
                                  <span class="text-xs">常</span>
                                </div>
                              </div>
                              <div class="tech_customerDemand_progress absolute bottom-0 -left-3">
                                <el-progress :stroke-width="5" :percentage="60" type="line" :show-text="false" />
                              </div>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="单位" width="60" align="center">
                        <template #default="scope"> {{ scope.row.UnitInfo }}</template>
                      </el-table-column>
                      <el-table-column label="数量" width="60" align="center">
                        <template #default="scope"> {{ scope.row.Quantity }}</template>
                      </el-table-column>
                      <el-table-column label="备注" width="180" align="center">
                        <template #default="scope"> {{ scope.row.Remark }}</template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="型号">
                  <IndexModel />
                </el-tab-pane>
                <el-tab-pane label="规格">
                  <IndexSpecifications />
                </el-tab-pane>
                <el-tab-pane label="材质">
                  <IndexMaterial />
                </el-tab-pane>
                <el-tab-pane label="状态">
                  <IndexState />
                </el-tab-pane>
                <el-tab-pane label="常规性">
                  <IndexRoutine />
                </el-tab-pane>
                <el-tab-pane label="质量等级">
                  <IndexGrade />
                </el-tab-pane>
                <el-tab-pane label="代替难度">
                  <IndexSubstituteDifficulty />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-show="!getSetting.showLayoutRight">
        <!-- 右侧 -->
        <CustomeDemandRight ref="ruleCustomeDemandRightRef" />
      </el-col>
    </el-row>
    <!-- #region  同步参数-->

    <!-- #endregion -->

    <!-- 技术处理 -->
    <TechnicistTreatmForm v-if="technicistTreatmFormOpenData.visible" :FormData="technicistTreatmFormOpenData.formData" @closeWindow="closeWindowTechnicistTreatmForm($event)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, provide, ref } from 'vue'
import { useRouter, Router } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import TechnicistTreatmForm from './_Components/Form.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { useTechStore } from '/@/store/modules/techStore'
import { GetProductTechnicalProcessingList } from '/@/api/tech/ProductBasics'
import { GetSetEnquiryOrderEntrySave, GetAccounterToTechnicist } from '/@/api/tech/EnquiryData'
import TotalWages from '../Inquiry/_Components/TotalWages.vue'
import CustomeDemandRight from './_Components/CustomeDemand_right.vue'
import filterDatetime from '../Inquiry/_Components/filterDatetime.vue'
import IndexModel from './_Components/indexModel.vue'
import IndexSpecifications from './_Components/indexSpecifications.vue'
import IndexMaterial from './_Components/indexMaterial.vue'
import IndexState from './_Components/indexState.vue'
import IndexRoutine from './_Components/indexRoutine.vue'
import IndexGrade from './_Components/indexGrade.vue'
import IndexSubstituteDifficulty from './_Components/indexSubstituteDifficulty.vue'
import { useLayoutStore } from '/@/store/modules/layout'

const store = useCommonStore() //记得加这一句

//订单转入订单录入
const orderToEntry = (id: number, router: Router) => {
  ElMessageBox.confirm('确定要返回订单录入吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await GetSetEnquiryOrderEntrySave(id)
        .then(res => {
          if (res.code == 1) {
            ElMessage.success(res.message)

            // 跳转到订单录入

            router.push({
              name: 'TechOrderInputIndex'
            })
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch(e => {
          console.log(`GetSetEnquiryOrderEntrySave${e}`)
        })
    })
    .catch(() => {
      ElMessage.info('已取消')
    })
}

//加载数据
const loadData = (data: any) => {
  GetProductTechnicalProcessingList(data.CurrEnquiryId)
    .then(res => {
      if (res.code == 1) {
        data.tableDataList = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch(e => {
      console.log(`GetProductTechnicalProcessingList${e}`)
    })
}

// 技术处理弹窗
const technicistTreatmFormOpen = (data: any) => {
  let technicistTreatmFormOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowTechnicistTreatmForm = () => {
    if (data.data.selectTable.length == 0) {
      ElMessage.error('请选择一条数据！')
      return false
    }
    if (data.data.selectTable.length == 0 || data.data.selectTable.length > 1) {
      ElMessage.error('不可操作多条！')
      return false
    }

    // 选中行
    let row = data.data.selectTable[0]

    technicistTreatmFormOpenData.formData = {
      CurrEnquiryId: data.data.CurrEnquiryId,
      Id: row.Id
    }

    if (technicistTreatmFormOpenData.CurrEnquiryId != row.EnquiryId) {
      ElMessage.error('产品于当前订单不匹配！')
      return false
    }

    technicistTreatmFormOpenData.visible = true
  }

  //行被双击进行单行产品操作
  const rowDblClickTechnicistTreatmForm = (row: any) => {
    // data.data.selectTable = [row]
    if (row.TypeInfo == 1 && row.ParentID == 0) {
      //先取消所有
      data.multipleTableRef.value!.clearSelection()

      //再执行选中当前行
      data.multipleTableRef.value!.toggleRowSelection(row, undefined)

      //打开弹窗
      openWindowTechnicistTreatmForm()
    } else {
      ElMessage.error('请在主产品所在行双击！')
    }
  }

  //关闭弹窗
  const closeWindowTechnicistTreatmForm = (type: string) => {
    technicistTreatmFormOpenData.visible = false
    if (type == 'submit') data.getData(data.data)
  }

  return {
    technicistTreatmFormOpenData,
    openWindowTechnicistTreatmForm,
    closeWindowTechnicistTreatmForm,
    rowDblClickTechnicistTreatmForm
  }
}

export default defineComponent({
  name: 'TechCustomerDemand',
  components: {
    TechnicistTreatmForm,
    TotalWages,
    CustomeDemandRight,
    filterDatetime,
    IndexModel,
    IndexSpecifications,
    IndexMaterial,
    IndexState,
    IndexRoutine,
    IndexGrade,
    IndexSubstituteDifficulty
  },
  setup() {
    const router = useRouter()
    const storeTech = useTechStore() //记得加这一句
    const { getSetting } = useLayoutStore()

    const multipleTableRef = ref<InstanceType<typeof ElTable>>()
    const ruleCustomeDemandRightRef = ref()

    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const tags = ref([
      { name: 'Tag 1', type: 'info' },
      { name: 'Tag 2', type: 'info' },
      { name: 'Tag 3', type: 'info' },
      { name: 'Tag 4', type: 'info' },
      { name: 'Tag 5', type: 'info' },
      { name: 'Tag 7', type: 'info' },
      { name: 'Tag 8', type: 'info' },
      { name: 'Tag 9', type: 'info' },
      { name: 'Tag 10', type: 'info' },
      { name: 'Tag 11', type: 'info' },
      { name: 'Tag 12', type: 'info' }
    ])

    const data = reactive({
      number: 0,
      // 名称
      nameData: [{ name: '全部' }, { name: '蝶阀' }, { name: '闸阀' }, { name: '截止阀' }, { name: '止回阀' }],
      show: 1, // 1 显示寻求支援
      selectTime: '',
      // 弹窗数据
      indexWindow: {
        show: false
      },
      BomId: 0,
      // 列表数据
      tableDataList: [],
      Suggestion: {},
      selectTable: [],
      CurrEnquiryId: 0
    })
    const change = (value: any) => {
      console.log(value)
    }
    const checkboxGroup1 = ref([])
    // 关闭任意一个tags
    const handClose = (index: any, tag: any) => {
      console.log(index)
      tags.value.splice(tags.value.indexOf(tag), 1)
    }
    // 名称切换
    const huanName = (index: any) => {
      // console.log(index)
      data.number = index
      console.log(data.number)
    }
    provide('values', data.show)

    const getSelectionRowsVal = (val: any) => {
      data.selectTable = val
    }

    // 获取是否为常规性
    const getIsRegular = (val: string) => {
      return (val || '').indexOf('非') == -1
    }
    // 转入订单录入
    const orderToEntrySave = () => {
      orderToEntry(data.CurrEnquiryId, router)
    }
    // 转入核算
    const TransferAccounting = async (id: number) => {
      ElMessageBox.confirm('确定参数无误，要转入核算吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await GetAccounterToTechnicist(data.CurrEnquiryId)
            .then(res => {
              console.log(res)
              if (res.code == 1) {
                ElMessage.success(res.message)

                // 拉取新的核算处理单据
                storeTech.setTechCurrEnquiryId(0)
                data.CurrEnquiryId = 0
                //右侧列表数据重新加载
                ruleCustomeDemandRightRef.value!.getOrderList()
              } else {
                ElMessage.error(res.message)
              }
            })
            .catch(e => {
              console.log(`GetAccounterToTechnicist${e}`)
            })
        })
        .catch(() => {
          ElMessage.info('已取消转入')
        })
    }
    //订阅状态
    storeTech.$subscribe((mutation, state) => {
      if (state.TechCurrEnquiryId != data.CurrEnquiryId) {
        data.CurrEnquiryId = state.TechCurrEnquiryId
        loadData(data)
      }
    })

    onMounted(() => {
      data.CurrEnquiryId = storeTech.getTechCurrEnquiryId
      console.log(data.CurrEnquiryId)
      if (data.CurrEnquiryId > 0) {
        // 加载数据
        loadData(data)
      }

      // 根据Id获取详情
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
    })
    return {
      change,
      getSelectionRowsVal,
      form,
      data,
      multipleTableRef,
      ...technicistTreatmFormOpen({ data, getData: loadData, multipleTableRef }),
      huanName,
      tags,
      handClose,
      checkboxGroup1,
      getSetting,
      getIsRegular,
      orderToEntrySave,
      TransferAccounting,
      ruleCustomeDemandRightRef
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_customedemand_index {
  .active {
    color: #ffffff;
    background: #409eff;
  }
  :deep(.table-product-list) {
    .el-table {
      .el-table__row {
        &.el-table__row--level-1 {
          .el-table-column--selection {
            .el-checkbox {
              display: none;
            }
          }
          .el-table__indent,
          .el-table__placeholder {
            display: none;
          }
        }
      }
    }
  }
  :deep(.el-checkbox) {
    margin-right: 12px;
  }
  .tech_customerDemand_progress {
    min-width: 623px;
  }
}
</style>
