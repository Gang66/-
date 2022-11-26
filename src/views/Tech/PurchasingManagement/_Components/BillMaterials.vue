<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 tech_purchasingManagement_billMaterials">
      <!-- #region 基础信息 -->
      <div v-show="data.BasicShow">
        <MaterialOrderTop ref="MaterialOrderTopRef"/>
      </div>
      <!-- #endregion -->
      <div class="pt-3 clearfix">
        <div class="inline-block">
          <el-input v-model="form.KeyWords" size="default" placeholder="请输入产品名称/型号" style="width: 200px" class="mr-4" />
          <el-button type="primary" @click="getData"> <i class="iconfont icon-huntfor"></i> 查询</el-button>
        </div>
        <div class="inline-block float-right">
          <el-button type="warning" @click="data.BasicShow = !data.BasicShow"> <i class="iconfont icon-gongzuotai mr-2"></i> 基础信息</el-button>
          <el-button type="primary"> <i class="iconfont icon-chanpin mr-2"></i> 合同查询</el-button>
          <el-button type="primary"> <i class="iconfont icon-goutong mr-2"></i> 沟通查询</el-button>
        </div>
      </div>

      <!-- #region  表格 -->
      <div class="w-full my-5">
        <el-tabs type="border-card" class="BillMaterialsTable-tabs" v-model="data.TabName" @tab-change="changetab">
          <div class="absolute right-2 -top-8">
            <template v-if="data.IsGroup">
              <el-button type="warning" size="small" @click="SetGroup(0)"> <i class="iconfont icon-dingdan4 mr-1"></i>加载显示 </el-button>
              <el-button type="success" size="small" @click="openSplitList"><i class="iconfont icon-mxjl mr-1"></i>拆分</el-button>
              <!-- <el-button type="danger" size="small"><i class="iconfont icon-baocun mr-1"></i>暂存</el-button> -->
              <el-button type="primary" size="small"><i class="iconfont icon-bianji1"></i>编辑清单</el-button>
            </template>
            <template v-else>
              <el-button type="warning" size="small" @click="SetGroup(1)"> <i class="iconfont icon-dingdan4 mr-1" ></i>同类显示 </el-button>
              <!-- <el-button type="danger" size="small"><i class="iconfont icon-baocun mr-1"></i>暂存</el-button> -->
              <el-button type="primary" size="small" @click="Grouping()"><i class="iconfont icon-bianji1"></i>分组分项</el-button>
            </template>
          </div>
          <el-tab-pane :label="itm.name" :name="itm.lable" v-for="itm in data.tabList" :key="itm.lable" >
            <div class="w-full">
              <div class="inline-block float-left leading-6 text-sm">按名称：</div>
              <div class="inline-block w-880">
                <el-checkbox-group v-model="form[data.TabName]" size="small">
                  <el-checkbox :label="item" :key="index" border v-for="(item, index) in data.checkbox[data.TabName]" >{{ item }}</el-checkbox>
                </el-checkbox-group>
                <!-- <div v-for="(item, index) in data.checkbox[data.TabName]" key="index">{{ item }}</div> -->
              </div>
            </div>
          </el-tab-pane>
          <div>
            <el-divider content-position="right"></el-divider>
            <div class="w-full">
              <div class="inline-block float-left leading-6 text-sm">已选：</div>
              <div class="inline-block w-880">
                <span v-for="(item,index) in data.tabList" :key="index">
                  <el-tag v-for="(itm, idx) in form[item.lable]" :key="index" class="mx-1" closable @close="handClose(item.lable, idx)">
                    {{ itm }}
                  </el-tag>
                </span>
              </div>
              <div class="float-right text-xs text-blue-400 leading-6 cursor-pointer">
                <span @click="clineList">清除筛选</span>
              </div>
            </div>
            <el-divider content-position="right"></el-divider>
            <div class="table-product-list" v-if="data.IsGroup">
              <el-table :data="data.tableDataList" style="width: 100%; margin-bottom: 20px" row-key="Id" border height="350" @selection-change="handleSelectionChange" :row-class-name="getRowClass">
                <el-table-column type="selection" width="40" align="center" />
                <el-table-column width="40" type="expand">
                  <!-- 展开部分 -->
                  <template #default="props">
                    <div class="table-son">
                      <el-table :data="data.tableDataList" style="width: 100%;" row-key="Id" :show-header="false" border row-class-name="warning-row">
                        <el-table-column width="40"/>
                        <el-table-column width="40"/>
                        <el-table-column label="序号" width="80" align="center">
                          <template #default="scope">阀门{{ scope.$index + 1 }}</template>
                        </el-table-column>
                        <el-table-column label="产品参数" min-width="300">
                          <template #default="scope">
                            <div class="flex items-center justify-between">
                              <div>
                                <span class="font-semibold mr-3">{{ scope.row.SystemName }}</span>
                                <span class="font-semibold mr-3">{{ scope.row.SystemModel }}</span>
                                <span class="font-semibold">{{ scope.row.SystemSpecification }}</span>
                                <p class="text-xs text-blue-500" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;min-width: 220px">
                                  <span class="text-red-500" >【{{ scope.row.QualityLevel == 1 ? '一级' : scope.row.QualityLevel == 2 ? '二级' : scope.row.QualityLevel == 3 ? '三级' : '--'}}】</span> <span class="text-blue-500">【规格：{{ scope.row.SystemSpecification  }}】</span>【压力：{{  scope.row.Pressure }}】【材质：{{ scope.row.Materials }}】
                                </p>
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
                        <el-table-column label="售价" width="100" align="center">
                          <template #default="scope"> {{ scope.row.Amount }}</template>
                        </el-table-column>
                        <el-table-column label="合计" width="100" align="center">
                          <template #default="scope"> {{ Number(scope.row.Quantity) * Number(scope.row.Amount) }}</template>
                        </el-table-column>
                        <el-table-column label="备注" width="180" align="center">
                          <template #default="scope"> {{ scope.row.Remark }}</template>
                        </el-table-column>
                      </el-table>
                    </div>
                    
                  </template>
                  <!-- 展开部分 end -->
                </el-table-column>
                <el-table-column label="序号" width="80" align="center">
                  <template #default="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="产品参数" min-width="300">
                  <template #default="scope">
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="font-semibold mr-3">{{ scope.row.SystemName }}</span>
                        <span class="font-semibold mr-3">{{ scope.row.SystemModel }}</span>
                        <span class="font-semibold">{{ scope.row.SystemSpecification }}</span>
                        <p class="text-xs text-blue-500" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;min-width: 220px">
                          <span class="text-red-500" >【{{ scope.row.QualityLevel == 1 ? '一级' : scope.row.QualityLevel == 2 ? '二级' : scope.row.QualityLevel == 3 ? '三级' : '--'}}】</span> <span class="text-blue-500">【规格，{{ scope.row.SystemSpecification  }}】</span>【压力：{{  scope.row.Pressure }}】【材质：{{ scope.row.Materials }}】
                        </p>
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
                <el-table-column label="售价" width="100" align="center">
                  <template #default="scope"> {{ scope.row.Amount }}</template>
                </el-table-column>
                <el-table-column label="合计" width="100" align="center">
                  <template #default="scope"> {{ Number(scope.row.Quantity) * Number(scope.row.Amount) }}</template>
                </el-table-column>
                <el-table-column label="备注" width="180" align="center">
                  <template #default="scope"> {{ scope.row.Remark }}</template>
                </el-table-column>
              </el-table>
            </div>
            <div class="table-product-list" v-else>
              <el-table :data="data.tableDataList" style="width: 100%; margin-bottom: 20px" row-key="Id" border height="350" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40" align="center" />
                <el-table-column label="序号" width="80" align="center">
                  <template #default="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="产品">
                  <template #default="scope">{{ scope.row.SystemName }}</template>
                </el-table-column>
                <el-table-column label="型号">
                  <template #default="scope">{{ scope.row.SystemModel }}</template>
                </el-table-column>
                <el-table-column label="规格">
                  <template #default="scope">{{ scope.row.SystemSpecification }}</template>
                </el-table-column>
                <el-table-column label="单位" width="60" align="center">
                  <template #default="scope"> {{ scope.row.UnitInfo }}</template>
                </el-table-column>
                <el-table-column label="数量" width="60" align="center">
                  <template #default="scope"> {{ scope.row.Quantity }}</template>
                </el-table-column>
                <el-table-column label="售价" width="100" align="center">
                  <template #default="scope"> {{ scope.row.Amount }}</template>
                </el-table-column>
                <el-table-column label="合计" width="100" align="center">
                  <template #default="scope"> {{ Number(scope.row.Quantity) * Number(scope.row.Amount) }}</template>
                </el-table-column>
                <el-table-column label="备注" width="180" align="center">
                  <template #default="scope"> {{ scope.row.Remark }}</template>
                </el-table-column>
                <el-table-column label="分组" width="80" align="center">
                  <template #default="scope">{{ scope.row.GroupIndex || '-' }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tabs>
      </div>
      <!-- #endregion -->

      <SplitMatch title="拆分数量" v-if="SplitMatchOpenData.visible" :FormData="SplitMatchOpenData.formData" @closeWindow="closeWindowSplitMatch($event)" />
      <ManagementGroup title="管理分组" v-if="ManagementGroupOpenData.visible" :FormData="ManagementGroupOpenData.formData" @closeWindow="closeWindowManagementGroup($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import MaterialOrderTop from './MaterialOrderTop.vue'
import SplitMatch from './SplitMatch.vue'
import ManagementGroup from './ManagementGroup.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PostMaterialList, GetMaterialSearchInfo, PostGetAllMaterialList } from '/@/api/tech/Material'
import Template from '/@/views/Template.vue'


// 同类展示列表数据请求
const renderTableList = async (form: any, data: any) => {
  await PostMaterialList(form).then((res:any) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableDataList = res.data
    }
  })
}
// 加载显示列表数据请求
const renderMaterialTableList = async (form: any, data: any) => {
  await PostGetAllMaterialList(form).then((res:any) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableDataList = res.data
    }
  })
}
// 列表数据请求
const getMaterialList = async (form: any, data: any) => {
  await GetMaterialSearchInfo({billId: form.BillId}).then((res:any) => {
    console.log(res.data)
    if (res.code == 1) {
      data.checkbox.Materials = res.data.Materials || []
      data.checkbox.ProductNames = res.data.ProductNames || []
      data.checkbox.Models = res.data.Models || []
      data.checkbox.Specifications = res.data.Specifications || []
      data.checkbox.RoutineTypes = res.data.RoutineTypes || []
      data.checkbox.QualityLevels = res.data.QualityLevels || []
    }
  })
}

// 拆分组
const SplitMatchOpen = (data: any) => {
  let SplitMatchOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowSplitMatch = (val: any) => {
    SplitMatchOpenData.formData = {
      Quantity: val.Quantity,
      Id: val.Id
    }
    SplitMatchOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowSplitMatch = (type: string) => {
    SplitMatchOpenData.visible = false
    if (type == 'submit') data.getData()
  }

  return {
    SplitMatchOpenData,
    openWindowSplitMatch,
    closeWindowSplitMatch
  }
}
// 组管理
const ManagementGroupOpen = (data: any) => {
  let ManagementGroupOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowManagementGroup = (val: any) => {
    ManagementGroupOpenData.formData = {
      selectDetail: val.selectDetail,
      Id: val.Id
    }
    ManagementGroupOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowManagementGroup = (type: string) => {
    ManagementGroupOpenData.visible = false
    if (type == 'submit') data.getData()
  }

  return {
    ManagementGroupOpenData,
    openWindowManagementGroup,
    closeWindowManagementGroup
  }
}

// 筛选
const tableRender = (form: any, data: any) => {
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetail = val
  }
  return {
    handleSelectionChange
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    MaterialOrderTop,
    SplitMatch,
    ManagementGroup,
    Template
  },
  props: {
    FormData: {
      type: Object,
      default: {
        BillId: 0
      }
    }
  },
  setup(props, context: SetupContext) {
    const MaterialOrderTopRef = ref<any>(null)
    const data = <any>reactive({
      tableDataList: [], //表格数据
      selectDetail: [],
      Bill: [],
      BasicShow: true,
      IsGroup: 1,
      TabName: 'ProductNames',
      ProductNameTag: [],
      tabList: [{name: '名称', lable: 'ProductNames'},{name: '型号', lable: 'Models'},{name: '规格', lable: 'Specifications'},{name: '材质', lable: 'Materials'},{name: '常规性', lable: 'RoutineTypes'},{name: '质量等级', lable: 'QualityLevels'}],
      checkbox: {
        ProductNames: [],
        Models : [],
        Specifications : [],
        Materials: [],
        RoutineTypes: [],
        QualityLevels: []
      },
      
    })
    
    const form = <any>reactive({
      ProductNames: [],
      Models: [],
      Specifications: [],
      Materials: [],
      RoutineTypes: [],
      QualityLevels: [],
      KeyWords: '',
      BillId: 0
    })
    const getData = () => {
      if(data.IsGroup){
        renderMaterialTableList(form, data)
      } else {
        renderTableList(form, data)
      }
    }
    const SplitMatch = SplitMatchOpen({data, getData})
    const ManagementGroup = ManagementGroupOpen({data, getData})
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })

    // 切换显示状态
    const SetGroup = (type: any) => {
      data.selectDetail = []
      data.tableDataList = []
      data.IsGroup = type
      getData()
    }

    // 筛选部分
    const TabFindFun = (data: any) => {
      // 关闭任意一个tags
      const handClose = (val: any, idx: any) => {
        form[val].splice(idx, 1)
      }
      // 全部清除
      const clineList = () => {
        form.ProductNames = []
        form.Models = []
        form.Specifications = []
        form.Materials = []
        form.RoutineTypes = []
        form.QualityLevels = []
        form.KeyWords = ''
      }
      return {
        handClose,
        clineList
      }
    }
    const openSplitList = () => {
      if (data.selectDetail.length <= 0) {
        ElMessage.error('请选择需要拆分的组')
        return false
      }
      if (data.selectDetail.length > 1) {
        ElMessage.error('最多选择一个分组')
        return false
      }
      if (data.selectDetail[0].Quantity < 2) {
        ElMessage.error('该产品个数小于2！')
        return false
      }
      SplitMatch.openWindowSplitMatch({Quantity: data.selectDetail[0].Quantity, Id: data.selectDetail[0].Id})
    }

    const Grouping = () => {
      if (data.selectDetail.length <= 0) {
        ElMessage.error('至少选择一条记录')
        return false
      }
      ManagementGroup.openWindowManagementGroup({selectDetail: data.selectDetail, Id: form.BillId})
    }

    const changetab = () => {
      console.log(data.checkbox[data.TabName])
    }

    const getRowClass = (val:any) => {
      let _children = val.row.children
      let res = <any>[]
      if (_children.length > 0) {
        res.push('row-expand-has')
        return res;
      } else {
        res.push('row-expand-unhas')
        return res;
      }
    }
    
    onMounted(() => {
      form.BillId = props.FormData.BillId
      MaterialOrderTopRef.value.getData(form.BillId)
      getData()
      getMaterialList(form, data)
    })
    return {
      boxStyle,
      closeWindow,
      openSplitList,
      Grouping,
      MaterialOrderTopRef,
      data,
      form,
      getData,
      SetGroup,
      getRowClass,
      changetab,
      ...TabFindFun(data),
      ...SplitMatch,
      ...ManagementGroup,
      ...tableRender(form, data),
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_purchasingManagement_billMaterials {
  :deep(.BillMaterialsTable-tabs) {
    .el-tabs__content {
      overflow: initial;
    }
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
:deep(.el-table .el-table__cell){
  padding: 0;
}
:deep(.el-table .cell){
  padding: 8px 12px;
}
:deep(.el-table .warning-row) {
  --el-table-tr-bg-color: rgba(106, 159, 238, 0.04);
}

:deep(.row-expand-unhas .el-table__expand-icon){
  pointer-events: none;
}
:deep(.row-expand-unhas .el-table__expand-icon){
  visibility:hidden;
}
</style>
