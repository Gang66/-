<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4">
      <!-- #region 基础信息 -->
      <div v-show="data.BasicShow">
        <MaterialOrderTop />
      </div>
      <div class="text-sm pt-4">
        <span>销售总价：</span><span class="font-semibold mr-3">194040.00</span> <span>采购总价：</span><span class="font-semibold mr-3">101370.00</span><span>采购比例：</span><span class="font-semibold text-red-500">1.91</span> / <span class="font-semibold text-green-500">2.18</span> <span class="text-red-500 float-right"> <i class="iconfont icon-yichang mr-1"></i> 单项产品采购比例低于 1.5 的需【运营经理】核准，低于 2.0 的需【物采经理】核准。</span>
      </div>
      <!-- #endregion -->
      <div class="pt-3">
        <el-select v-model="form.ProductName" placeholder="产品名称" style="width: 200px" class="mr-4">
          <el-option v-for="item in data.ProductNameOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
        <el-select v-model="form.SubItem" placeholder="分组分项" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.SubItemOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
        <el-select v-model="form.model" placeholder="型号" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.modelOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
        <el-select v-model="form.Specifications" placeholder="规格" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.SpecificationsOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
        <el-select v-model="form.material" placeholder="材质" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.materialOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
        <el-input v-model="form.attribute" size="default" placeholder="属性" style="width: 200px" class="mr-4" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
      </div>
      <div class="pt-3">
        <el-button type="warning" @click="BasicClick()"> <i class="iconfont icon-gongzuotai mr-2"></i> 基础信息</el-button>
        <el-button type="primary" @click="FromsParameter()"> <i class="iconfont icon-dingdan mr-2"></i> 表单显示</el-button>
      </div>
      <!-- #region 表格列表 -->
      <div class="bf-table-content">
        <el-table :data="data.PurchaseList" stripe>
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="CreateOn" label="分组分项" align="center" width="80">
            <template #default="scope">
              <span class="text-red-500">1-11-2</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="属性" align="center" width="80">
            <template #default="scope">
              <span>独立件</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="技术参数" min-width="260" v-if="data.FromsParam == 1">
            <template #default="scope">
              <div class="inline-block">
                <p class="text-sm mb-2 mt-2">304浆料闸板阀 PZ73F-10P DN200</p>
                <p class="text-xs">304; 304</p>
              </div>
              <!-- <div class="w-16 h-7 leading-6 bg-green-100 border-green-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-75 rounded text-green-500">已确认</div> -->
              <!-- <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-75 rounded text-red-500">待核准</div> -->
              <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-75 rounded text-red-500">已驳回</div>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="名称" width="140" v-if="data.FromsParam == 2">
            <template #default="scope">
              <span>304气动球阀阀体</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="型号" align="center" width="120" v-if="data.FromsParam == 2">
            <template #default="scope">
              <span>VQ647W-10P</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="规格" align="center" width="80" v-if="data.FromsParam == 2">
            <template #default="scope">
              <span>DN200</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="数量" align="center" width="60">
            <template #default="scope">
              <span>1</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="销售价" align="center" min-width="100">
            <template #default="scope">
              <span>￥1900.00</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="核采价格" width="140">
            <template #default="scope">
              <el-popover placement="bottom-start" trigger="hover">
                <template #reference>
                  <!-- <div>
                  <div class="w-5 h-5 rounded-full border border-red-500 bg-red-50 inline-block align-middle text-xs text-center leading-5 text-red-500">核</div>
                  <div class="inline-block">
                    <span class="text-red-500">￥1900</span>
                    <span class="text-xs">/ </span>
                    <span class="text-xs text-red-500">1.58</span>
                    <span class="text-xs text-green-500">2.00</span>
                  </div>
                </div> -->
                  <div>
                    <div class="w-5 h-5 rounded-full border border-green-500 bg-green-50 inline-block align-middle text-xs text-center leading-5 text-green-500">采</div>
                    <div class="inline-block">
                      <span class="text-green-500">￥1900</span>
                      <span class="text-xs">/ </span>
                      <span class="text-xs text-red-500">1.58</span>
                      <!-- <span class="text-xs text-green-500">2.00</span> -->
                    </div>
                  </div>
                </template>
                <!-- <template #content> -->
                <div>
                  <p class="text-green-500">采购信息：</p>
                  <p><span>浙江环控</span><span class="float-right">￥100</span></p>
                  <!--  -->
                  <p class="text-red-500">核算信息：</p>
                  <p v-for="item in 4"><span>浙江环控</span><span class="float-right">￥100</span></p>
                </div>
                <!-- </template> -->
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="供应商" align="center" width="100">
            <template #default="scope">
              <span>麦斯凯阀门</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="金额" align="center" width="100">
            <template #default="scope">
              <span> 2200.00</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="操作" align="center" width="60">
            <template #default="scope">
              <span class="text-blue-500 cursor-pointer" @click="openWindowItemizedPrice()">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="核准" align="center" width="100">
            <template #default="scope">
              <div class="cursor-pointer">
                <span class="text-green-500">通过</span>
                <span class="text-red-500 ml-2">驳回</span>
              </div>
              <!-- <span class="text-green-500 cursor-pointer	">已核准</span> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- #endregion -->
      <!-- 查看  -->
      <ItemizedPrice v-if="itemizedPriceOpenData.visible" :FormData="itemizedPriceOpenData.formData" @closeWindow="closeWindowItemizedPrice($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { PostProductBusinessList } from '/@/api/tech/EnquiryData'
import MaterialOrderTop from './MaterialOrderTop.vue'
import ItemizedPrice from './ItemizedPrice.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await PostProductBusinessList(form).then((res) => {
    console.log(res)
    if (res.code == 1) {
      //   data.PurchaseList = res.data
      form.totals = res.data.totalss
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
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetail = val
    // data.selectDetail = data.selectDetail.map((x: any) => {
    //   return x.Id
    // })
    console.log(data.selectDetail)
    if (val.length <= 0) {
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
    MaterialOrderTop,
    ItemizedPrice
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      FromsParam: 1, // 1 默认是技术参数
      BasicShow: true,
      PurchaseList: [{ val: 1 }] //表格数据
    })
    const form = reactive({
      ProductName: '',
      SubItem: '',
      model: '',
      Specifications: '',
      material: '',
      attribute: ''
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
    // 基础信息
    const BasicClick = () => {
      if (data.BasicShow == false) {
        data.BasicShow = true
      } else {
        data.BasicShow = false
      }
    }
    // 判断是否是表单显示还是技术参数  默认是i技术参数
    const FromsParameter = () => {
      if (data.FromsParam == 1) {
        data.FromsParam = 2
      } else {
        data.FromsParam = 1
      }
      console.log(data.FromsParam)
    }

    // 查看
    const itemizedPriceOpen = (data: any) => {
      let itemizedPriceOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowItemizedPrice = (val: any) => {
        itemizedPriceOpenData.formData = {}
        itemizedPriceOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowItemizedPrice = (type: string) => {
        itemizedPriceOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        itemizedPriceOpenData,
        openWindowItemizedPrice,
        closeWindowItemizedPrice
      }
    }

    return {
      boxStyle,
      closeWindow,
      data,
      form,
      BasicClick,
      FromsParameter,
      ...tableRender(form, data),
      ...itemizedPriceOpen({ data })
    }
  }
})
</script>
<style lang="postcss" scoped></style>
