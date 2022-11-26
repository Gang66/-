<template>
  <div class="tech_orderinput_right">
    <div class="right grid-content ep-bg-purple mt-5 mb-0 ml-px">
      <!-- middle -->
      <div class="bg-white rounded relative tech_kehu">
        <div v-if="data.isMyOrder">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <!-- 客户信息 -->
            <el-tab-pane label="客户信息" name="first">
              <div class="w-11/12 m-auto">
                <div class="h-20">
                  <div class="float-left h-20 w-20 bg-slate-100 rounded-md relative">
                    <img class="h-20 w-20" src="../../../../assets/img/tech/header.jpg" alt="" />
                    <div class="w-20 h-6 bg-red-300 bg-opacity-70 absolute bottom-0 text-center rounded-b-md cursor-pointer" @click="rejectClick()">
                      <span class="text-xs text-white">驳 回</span>
                    </div>
                  </div>
                  <div class="float-right">
                    <div class="text-sm flex items-center">
                      <el-tooltip :content="data.orderInfo.CustomerName" placement="top" :disabled="getTextLength(data.orderInfo.CustomerName, 13)">
                        <div class="font-semibold truncate block" style="max-width: 180px">{{ data.orderInfo.CustomerName || '' }}</div>
                      </el-tooltip>
                      <div class="ml-2 bg-red-200 text-red-600 text-xs pl-1 pr-1 font-semibold" v-show="data.orderInfo.Grade == 'A'">必跟</div>
                      <div class="ml-2 bg-blue-200 text-blue-600 text-xs pl-1 pr-1 font-semibold" v-show="data.orderInfo.Grade === 'B'">重要</div>
                      <div class="ml-2 bg-green-200 text-green-600 text-xs pl-1 pr-1 font-semibold" v-show="data.orderInfo.Grade === 'C'">普通</div>
                    </div>
                    <div class="text-xs text-gray-400 my-2">
                      <span>{{ data.orderInfo.CreateOn || '' }}</span>
                      <span class="text-xs text-blue-500 ml-2">沟通记录</span>
                    </div>
                    <div class="text-sm font-normal">
                      <span>联系人 {{ data.orderInfo.CustomerConName || '' }}</span>
                      <span class="ml-2"> 手机 {{ data.orderInfo.CC_Telephone || '' }}</span>
                    </div>
                  </div>
                </div>
                <div class="h-20 bg-blue-50 my-3.5 rounded">
                  <div class="flex m-3 text-center mt-0">
                    <div class="w-2/6 mt-4">
                      <div style="position: relative">
                        <span class="font-medium text-sm">信用等级</span>
                      </div>
                      <div>
                        <span class="text-xs font-semibold text-red-500" v-if="data.orderInfo.CreditScore >= 90">好</span>
                        <span class="text-xs font-semibold text-red-500" v-else-if="data.orderInfo.CreditScore >= 60">一般</span>
                        <span class="text-xs font-semibold text-red-500" v-else-if="data.orderInfo.CreditScore < 60">差</span>
                        <span class="text-xs font-semibold text-red-500" v-else>暂无</span>
                      </div>
                    </div>
                    <div class="w-2/6 mt-4">
                      <div style="position: relative">
                        <span class="font-medium text-sm">成交数量</span>
                      </div>
                      <div>
                        <span class="text-xs font-semibold text-green-400">{{ data.CustomerOrderStatistics.EffectiveOrderCount || 0 }}</span>
                      </div>
                    </div>
                    <div class="w-2/6 mt-4">
                      <div style="position: relative">
                        <span class="font-medium text-sm">报价次数</span>
                      </div>
                      <div>
                        <span class="text-xs font-semibold text-yellow-500">{{ data.CustomerOrderStatistics.AllOrderCount || 0 }}</span>
                      </div>
                    </div>
                    <div class="w-2/6 mt-4">
                      <div style="position: relative">
                        <span class="font-medium text-sm">订单状态</span>
                      </div>
                      <div>
                        <span class="text-xs font-semibold text-blue-400">{{ getOrderStatus(data.orderInfo.OrderState) || '-' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- 业务信息 -->
            <el-tab-pane label="业务信息" name="second">
              <!-- 报价单位 -->
              <div class="h-14 bg-blue-50 my-2 rounded m-auto w-11/12">
                <div class="flex m-3 text-center mt-0">
                  <div class="w-2/6">
                    <div class="text-xs mt-2 mb-1"><span>报价单位</span></div>
                    <div class="text-xs">
                      <el-tooltip :content="data.orderInfo.CompanyName" placement="top" :disabled="getTextLength(data.orderInfo.CompanyName, 6)">
                        <span class="truncate block" style="max-width: 72px">{{ data.orderInfo.CompanyName || '-' }}</span>
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="w-2/6">
                    <div class="text-xs mt-2 mb-1"><span>询价阶段</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.IS_State || '-' }}</span>
                    </div>
                  </div>
                  <div class="w-2/6">
                    <div class="text-xs mt-2 mb-1"><span>询价性质</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.IN_State || '-' }}</span>
                    </div>
                  </div>
                  <div class="w-2/6">
                    <div class="text-xs mt-2 mb-1"><span>询价数量</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.IQ_State || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 业务员 -->
              <div class="h-14 bg-blue-50 my-2 rounded m-auto w-11/12">
                <div class="flex m-3 text-center mt-0">
                  <div class="w-2/6">
                    <div class="text-xs mt-2 mb-1"><span>业务员</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.SalerName || '-' }}</span>
                    </div>
                  </div>
                  <div class="w-2/6 mr-2">
                    <div class="text-xs mt-2 mb-1"><span>手机</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.S_Telephone || '-' }}</span>
                    </div>
                  </div>
                  <div class="w-2/6 mr-2">
                    <div class="text-xs mt-2 mb-1"><span>电话</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.S_Mobile || '-' }}</span>
                    </div>
                  </div>
                  <div class="w-2/6">
                    <div class="text-xs mt-2 mb-1"><span>事业部</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.CompName || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 报价等级 -->
              <div class="h-14 bg-blue-50 my-2 rounded m-auto w-11/12">
                <div class="flex text-center mt-0">
                  <div class="w-2/6">
                    <div class="text-xs ml-2 mt-2 mb-1"><span>报价等级</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.Grade || '' }}</span>
                    </div>
                  </div>
                  <div class="w-3/6">
                    <div class="text-xs ml-2 mt-2 mb-1"><span>运费</span></div>
                    <div class="text-xs">
                      <span>{{ getFreight(data.orderInfo.Freight) || '' }}</span>
                    </div>
                  </div>
                  <div class="w-2/6">
                    <div class="text-xs ml-2 mt-2 mb-1"><span>标牌证件</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.SignageName || '-' }}</span>
                    </div>
                  </div>
                  <div class="w-2/6">
                    <div class="text-xs ml-2 mt-2 mb-1"><span>信用分数</span></div>
                    <div class="text-xs">
                      <span>{{ data.orderInfo.CreditScore || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <!-- 附件预览 -->
            <el-tab-pane label="附件预览" name="third">
              <el-table
                :data="data.fileList"
                stripe
                class="w-full"
                :header-cell-style="{
                  background: '#eef1f6',
                  color: '#606266'
                }">
                <el-table-column type="index" label="序号" width="54" align="center" class="text-xs" />
                <el-table-column prop="date" label="附件" min-width="200">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="100" align="center"
                  ><template #default="scope">
                    <span class="text-xs text-blue-500 cursor-pointer" @click="openFile(scope.row)"> 预览</span>
                    <span class="text-red-500 text-xs ml-2 cursor-pointer" @click="downFiles(scope.row.url, scope.row.name)">下载</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="筛选" name="four">
              <div class="p-2 pt-0 tech_AccountingProcessing_Components_ApprovalStatusFiltering">
                <el-tabs v-model="activeName_shai" class="demo-tabs" @tab-click="handleClick_shai">
                  <el-tab-pane label="名称" name="first">
                    <template #label>
                      <span>名称</span>
                      <div class="w-4 h-4 text-white rounded-full bg-red-400 text-center inline-block ml-2 mt-1 leading-4">
                        <span class="text-white text-xs">{{ data.screen.ProductList.length }}</span>
                      </div>
                    </template>
                    <div>
                      <div class="">
                        <el-checkbox-group v-model="data.Name" size="small" @change="NameChange">
                          <el-checkbox-button v-for="item in data.screen.ProductList" :key="item" :label="item"> </el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="型号" name="second">
                    <template #label>
                      <span class="custom-tabs-label">
                        <span>型号</span>
                        <div class="w-4 h-4 text-white rounded-full bg-red-400 text-center inline-block ml-2 mt-1 leading-4">
                          <span class="text-white text-xs">{{ data.screen.ModelList.length }}</span>
                        </div>
                      </span>
                    </template>
                    <div>
                      <div class="">
                        <el-checkbox-group v-model="data.ModelCheckList" size="small" @change="ModelChange">
                          <el-checkbox-button v-for="item in data.screen.ModelList" :key="item" :label="item"> </el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="规格" name="third">
                    <template #label>
                      <span class="custom-tabs-label">
                        <span>规格</span>
                        <div class="w-4 h-4 text-white rounded-full bg-red-400 text-center inline-block ml-2 mt-1 leading-4">
                          <span class="text-white text-xs">{{ data.screen.SpecificationsList.length }}</span>
                        </div>
                      </span>
                    </template>
                    <div>
                      <div class="">
                        <el-checkbox-group v-model="data.SpecificationsCheckList" size="small" @change="SpecificationsChange">
                          <el-checkbox-button v-for="item in data.screen.SpecificationsList" :key="item" :label="item"></el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="材质" name="fourth">
                    <template #label>
                      <span class="custom-tabs-label">
                        <span>材质</span>
                        <div class="w-4 h-4 text-white rounded-full bg-red-400 text-center inline-block ml-2 mt-1 leading-4">
                          <span class="text-white text-xs">{{ data.screen.MaterialsList.length }}</span>
                        </div>
                      </span>
                    </template>
                    <div>
                      <div class="">
                        <el-checkbox-group v-model="data.MaterialsCheck" size="small" @change="MaterialsChange">
                          <el-checkbox-button v-for="item in data.screen.MaterialsList" :key="item" :label="item"></el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="分组" name="five">
                    <template #label>
                      <span class="custom-tabs-label">
                        <span>分组</span>
                        <div class="w-4 h-4 text-white rounded-full bg-red-400 text-center inline-block ml-2 mt-1 leading-4">
                          <span class="text-white text-xs">{{ data.screen.groupidList.length }}</span>
                        </div>
                      </span>
                    </template>
                    <div>
                      <div class="">
                        <el-checkbox-group v-model="data.groupidCheckList" size="small" @change="groupidChange">
                          <el-checkbox-button v-for="item in data.screen.groupidList" :key="item" :label="item"></el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="text-center pb-6" v-else>
          <svg-icon icon-class="svg-tech_dingdan" style="font-size: 13rem; margin: auto" />
          <span class="text-red-500">恭喜你，暂无需核算处理的订单！</span>
        </div>
      </div>
      <!-- bottom -->
      <div class="h-20 mt-3 bg-white rounded">
        <div class="h-12 mt-3 bg-blue-50 rounded pt-2.5 pl-4 pr-4">
          <div class="float-left mr-1 w-60">
            <el-input v-model="form.CustomerName" size="small" placeholder="请输入客户名称" />
          </div>
          <div class="float-right -ml-2">
            <el-button type="primary" size="small" :icon="Search" @click="searchEvent()">查询</el-button>
          </div>
        </div>
        <div v-if="data.isMyOrder">
          <el-table
            :data="data.OrderTechnicistEntryList"
            stripe
            class="w-full"
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266'
            }">
            <el-table-column type="index" label="序号" width="54" align="center" class="text-xs" />
            <el-table-column prop="date" label="客户名称" min-width="180">
              <template #default="scope">
                <span class="text-xs cursor-pointer" @click="customerClick(scope.row.Id)" :class="{ red: data.changeRedId == scope.row.Id }">{{ scope.row.CustomerName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="核算员" width="100" align="center"
              ><template #default="scope">
                <span class="text-xs">{{ scope.row.TreatmUserName || '-' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="h-60 bg-white text-center">
          <svg-icon icon-class="svg-tech_jilu" style="font-size: 13rem; margin: auto" />
          <span class="text-gray-400">未查询到相关数据记录</span>
        </div>
      </div>
    </div>
    <!-- 驳回 -->
    <el-dialog v-model="data.dialogVisible" title="驳回订单" width="26%">
      <div class="inline-block">
        <el-icon size="30px" color="#f9c300"><WarningFilled /></el-icon>
      </div>
      <div class="inline-block leading-8 ml-4">
        <span class="text-base font-semibold">确定驳回订单？</span>
        <p class="text-sm text-gray-400">确定驳回客户【{{ data.orderInfo.CustomerName }}】的订单？</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="rejectOk">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <FileWindowOpen title="供应商特殊属性" v-if="FileOpenData.visible" :FormData="FileOpenData.formData" @closeWindow="closeFileOpen($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject, onMounted, defineExpose } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, TabsPaneContext } from 'element-plus'
import { GetOrderAccounterTreatmList, GetEnquiryIdToSaleCustomerOrderInfo, GetProductBusinessFilter, GetSetEntityCodeRejectTechDealSave } from '/@/api/tech/EnquiryData'
import FileWindowOpen from '/@/views/Tech/AccountingProcessing/_Components/FileOpen.vue'
import { FileOpen } from '/@/assets/ts/techOpenWindow'
import { useLayoutStore } from '/@/store/modules/layout'
import { useTechStore } from '/@/store/modules/techStore'
import { useCommonStore } from '/@/store/modules/Common'
import { downloadFiles } from '/@/utils/tools'
import { WarningFilled } from '@element-plus/icons-vue'
const store = useCommonStore() //记得加这一句
//获取字典数据
const getDictionaryData = (data: any) => {
  //订单状态
  store.getDict('tech_order_status').then((res: any) => {
    data.techOrderStatusOptions = res
  })
  // 运费
  store.getDict('sale_Order_FreightType').then((res: any) => {
    data.FreightType = res
  })
}

// 获取技术订单录入列表
const getOrderAccounterTreatmList = async (form: any, data: any) => {
  // debugger
  await GetOrderAccounterTreatmList(form)
    .then(res => {
      if (res.code == 1) {
        var _list = res.data || []
        data.OrderTechnicistEntryList = _list
        //判断是否有订单
        data.isMyOrder = _list.length > 0
        if (data.isMyOrder > 0) {
          const storeTech = useTechStore()
          data.changeRedId = _list[0].Id
          if (storeTech.getTechCurrEnquiryId > 0) {
            if (_list.find((x: any) => x.Id == storeTech.getTechCurrEnquiryId)) data.changeRedId = storeTech.getTechCurrEnquiryId
          }

          if (storeTech.getTechCurrEnquiryId != data.changeRedId) {
            storeTech.setTechCurrEnquiryId(data.changeRedId)
            getCriteriaData(data)
          }
        }
        getData(data)
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch(e => {
      console.log(`GetMyOrderTechnicistWarningData${e}`)
    })
}
//获取数据
const getData = async (data: any) => {
  await GetEnquiryIdToSaleCustomerOrderInfo(data.changeRedId)
    .then(res => {
      if (res.code == 1) {
        let _obj = res.data || {}
        data.orderInfo = _obj.bill || {}
        data.productList = _obj.entities || {}
        data.CustomerOrderStatistics = _obj.CustomerOrderStatistics || {}
        data.fileList = JSON.parse((_obj.bill || {}).FileList || '[]')
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch(e => {
      console.log(`错误：${e}`)
    })
}
// 筛选条件数据
const getCriteriaData = async (data: any) => {
  // return
  await GetProductBusinessFilter(data.changeRedId)
    .then(res => {
      if (res.code == 1) {
        let _obj = res.data || {}
        data.screen.MaterialsList = _obj.MaterialsList //材质
        data.screen.ModelList = _obj.ModelList //型号
        data.screen.ProductList = _obj.ProductList //名称
        data.screen.SpecificationsList = _obj.SpecificationsList //规格
        data.screen.groupidList = _obj.groupidList //分组
        // 清空
        data.groupidCheckList = []
        data.MaterialsCheck = []
        data.SpecificationsCheckList = []
        data.Name = []
        data.ModelCheckList = []
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch(e => {
      console.log(`错误：${e}`)
    })
}

export default defineComponent({
  components: {
    WarningFilled,
    FileWindowOpen
  },
  setup() {
    const { currentRoute } = useRouter()
    const { getUserInfo } = useLayoutStore()
    const { setTechCurrEnquiryId, setAccountSpecifications, setAccountName, setAccountGrouping, setAccountMaterials, setAccountModel } = useTechStore()
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      CustomerName: '',
      UserId: null
    })
    const activeName = ref('first')

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    const data = <any>reactive({
      dialogVisible: false,
      orderInfo: {},
      productList: [],
      fileList: [],
      CustomerOrderStatistics: {},
      OrderTechnicistEntryList: [],
      isMyOrder: false,
      //订单状态选项
      techOrderStatusOptions: [],
      //运费
      FreightType: [],
      changeRedId: 0,
      groupidCheckList: [],
      MaterialsCheck: [],
      SpecificationsCheckList: [],
      Name: [],
      ModelCheckList: [],
      screen: {
        MaterialsList: [],
        ModelList: [],
        ProductList: [],
        SpecificationsList: [],
        groupidList: []
      }
    })
    const activeName_shai = ref('first')
    // 查询
    const searchEvent = () => {
      getOrderAccounterTreatmList(form, data)
    }

    //选择报价单
    const customerClick = (val: number) => {
      setTechCurrEnquiryId(val)
      data.changeRedId = val
      getData(data)
      getCriteriaData(data)
    }

    // 获取订单状态
    const getOrderStatus = (val: number) => {
      let str = '-'
      if (val != undefined) {
        let _obj = data.techOrderStatusOptions.find((x: any) => x.DicKey == val.toFixed(0))
        if (_obj) str = _obj.DicValue
      }
      return str
    }
    // 获取运费
    const getFreight = (val: number) => {
      let str = '-'
      if (val != undefined) {
        let _obj = data.FreightType.find((x: any) => x.DicKey == val.toFixed(0))
        if (_obj) str = _obj.DicValue
      }
      return str
    }
    //下载文件
    const downFiles = (url: string, name: string) => {
      downloadFiles({ url, name })
    }
    const FileOpenWindow = FileOpen({ data })
    // 浏览文件或图片
    const openFile = (val: any) => {
      console.log(val.name.includes('.jpg'))
      if (val.name.includes('.img') || val.name.includes('.jpg') || val.name.includes('.jpeg') || val.name.includes('.png')) {
        downFiles(val.url, val.name)
      } else {
        FileOpenWindow.openFileOpen(val)
      }
    }

    // 判断文本是否溢出
    const getTextLength = (text: any, num: any) => {
      let _disabled = <boolean>true
      if (text) {
        if (text.length >= num) {
          _disabled = false
        }
      }
      return _disabled
    }

    const handleClick_shai = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
    // 产品名称
    const NameChange = (val: any) => {
      setAccountName(val)
    }
    // 产品分组
    const groupidChange = (val: any) => {
      setAccountGrouping(val)
    }
    // 产品材质
    const MaterialsChange = (val: any) => {
      setAccountMaterials(val)
    }
    // 产品规格
    const SpecificationsChange = (val: any) => {
      setAccountSpecifications(val)
    }
    // 产品型号
    const ModelChange = (val: any) => {
      setAccountModel(val)
    }
    // 驳回
    const rejectClick = () => {
      data.dialogVisible = true
    }
    // 驳回弹框确定驳回
    const rejectOk = () => {
      GetSetEntityCodeRejectTechDealSave({ id: data.changeRedId }).then(res => {
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
        if (res.code == 1) {
          data.dialogVisible = false
          getOrderAccounterTreatmList(form, data)
        }
      })
    }

    // 获取订单列表数据
    const getOrderList = () => {
      //判断是否存在该指令“tech_alldata_authority”
      if (currentRoute.value.meta.permission.find((x: any) => x == 'tech_alldata_authority')) {
        form.UserId = undefined
      } else {
        form.UserId = getUserInfo.Id || 0
      }
      
      getOrderAccounterTreatmList(form, data)
    }

    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
      getCriteriaData(data)

      //获取订单列表数据
      getOrderList()
    })
    return {
      handleClick,
      activeName,
      activeName_shai,
      data,
      Search,
      form,
      searchEvent,
      customerClick,
      getOrderStatus,
      getFreight,
      downFiles,
      handleClick_shai,
      rejectClick,
      rejectOk,
      NameChange,
      groupidChange,
      MaterialsChange,
      SpecificationsChange,
      ModelChange,
      getTextLength,
      ...FileOpenWindow,
      openFile,
      getOrderList
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_orderinput_right {
  min-width: 345px;
  :deep(.el-tabs__item.is-top:nth-child(2)) {
    padding-left: 14px;
  }
  .tech_AccountingProcessing_Components_ApprovalStatusFiltering {
    :deep(.el-tabs--top) {
      .el-tabs__item.is-top {
        padding-left: 6px !important;
        padding-right: 6px !important;
      }
    }
  }
  :deep(.el-checkbox-button) {
    border-left: 1px solid #dcdfe6;
    margin: 2px;
  }
  :deep(.el-checkbox-button--small .el-checkbox-button__inner) {
    border-radius: 0;
  }
  .red {
    color: red;
  }
  :deep(.el-dialog__body) {
    padding: 6px 20px;
  }
}
</style>
