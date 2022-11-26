<template>
  <div class="tech_Supplier_SupplierHome">
    <div class="h-60 bg-white rounded-lg relative">
      <div class="">
        <div class="h-36 BackgroundImage rounded-t-xl">
          <div class="h-36 float-left pt-10 pl-6">
            <el-popover :width="300" popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;" placement="bottom-start">
              <template #reference>
                <div class="relative">
                  <div class="w-14 h-14 rounded-full bg-white inline-block">
                    <div class="w-10 text-xs text-blue-500 font-medium text-center m-auto pt-4">
                      <p>{{ data.SupplierData.Abbreviation }}</p>
                    </div>
                  </div>
                  <!-- <div
                    class="w-14 h-14 rounded-full bg-white inline-block"
                  >
                   <div class=" w-8 text-sm text-blue-500 font-medium	 text-center m-auto pt-0">
                        <p>浙江金豪阀门</p>
                      </div>
                  </div> -->
                </div>
              </template>
              <template #default>
                <div class="demo-rich-conent flex" style="gap: 16px; flex-direction: column">
                  <div class="w-12 h-12 bg-blue-400 m-auto rounded-full">
                    <div class="w-10 text-xs text-white font-medium text-center m-auto pt-2">
                      <p>{{ data.SupplierData.Abbreviation }}</p>
                    </div>
                  </div>
                  <!-- <div class="w-12 h-12 bg-blue-400 m-auto rounded-full">
                      <div class=" w-8 text-xs text-white font-medium	 text-center m-auto pt-0">
                        <p>浙江金豪阀门</p>
                      </div>
                  </div> -->
                  <div class="text-center">
                    <p>舒黄宗</p>
                    <p class="text-xs text-gray-400">老板 / 18888888888</p>
                  </div>
                  <div class="flex h-12 text-center leading-6 text-gray-400 text-xs">
                    <div class="w-4/12 h-12">
                      <p>报价次数</p>
                      <p class="text-sm font-semibold text-yellow-500">32</p>
                    </div>
                    <div class="w-4/12 h-12 border-r border-l">
                      <p>成交笔数</p>
                      <p class="text-sm font-semibold text-green-500">32</p>
                    </div>
                    <div class="w-4/12 h-12">
                      <p>意向客户</p>
                      <p class="text-sm font-semibold text-blue-500">32</p>
                    </div>
                  </div>
                  <div class="inline-block">
                    <div class="float-left">
                      <router-link :to="'/Tech/SupplierManagement/SupplierFiles?id=' + data.supplierId">
                        <el-button class="w-28" type="primary"> <i class="iconfont icon-yulan mr-2"></i> 详情</el-button>
                      </router-link>
                    </div>
                    <div class="float-right" @click="openWindowCreateSupplierEdit(data.SupplierData)">
                      <el-button class="w-28" type="primary" plain><i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
                    </div>
                  </div>
                  <div class="text-xs text-gray-400 text-center"><span>-</span><span>本厂产品信息由</span><span class="text-black">谭琦</span><span>更新</span><span>-</span></div>
                </div>
              </template>
            </el-popover>
          </div>
          <div class="inline-block leading-8 ml-4 pt-9">
            <div>
              <span class="text-xl text-white">{{ data.SupplierData.CompanyName }}</span>
            </div>
            <div>
              <span class="text-sm text-white">主营产品：{{ data.SupplierData.MainProduct }}</span>
            </div>
          </div>
          <div class="w-520 h-36 float-right mr-8">
            <div class="inline-flex mt-14">
              <el-input v-model="data.kehuInput" placeholder="输入客户名称或产品类别/材质找产品" class="input-with-select mr-5" style="width: 400px" size="large">
                <template #append>
                  <el-button :icon="Search" />
                  <span class="ml-3">查询</span>
                </template>
              </el-input>
            </div>
            <div class="w-24 h-8 inline-block text-white" @click="data.drawer = true">
              <i class="iconfont icon-shaixuan mr-1"></i>
              <span class="cursor-pointer">高级筛选</span>
            </div>
          </div>
        </div>
        <div class="h-11 pt-2 px-4">
          <div class="inline-block text-gray-400 text-xs">已选条件：</div>
          <el-tag v-for="item in data.tags" :key="item.name" class="mx-1" :type="item.type" effect="plain" closable>
            {{ item.name }}
          </el-tag>
          <div class="inline-block text-blue-600 text-xs ml-2">清除筛选</div>
        </div>
        <div class="h-11">
          <div class="w-800 inline-block">
            <el-menu :default-active="data.activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">综合排序</el-menu-item>
              <el-menu-item index="2">报价次数</el-menu-item>
              <el-menu-item index="3">成交数量</el-menu-item>
              <el-sub-menu index="4">
                <template #title>综合等级</template>
                <el-menu-item index="4-1">A级：极好</el-menu-item>
                <el-menu-item index="4-2">B级：满意</el-menu-item>
                <el-menu-item index="4-3">C级：一般</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>主营类别</template>
                <el-menu-item index="5-1">A级：极好</el-menu-item>
                <el-menu-item index="5-2">B级：满意</el-menu-item>
                <el-menu-item index="5-3">C级：一般</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="6">
                <template #title>信用等级</template>
                <el-menu-item index="6-1">A级：优秀</el-menu-item>
                <el-menu-item index="6-2">B级：良好</el-menu-item>
                <el-menu-item index="6-3">C级：极差</el-menu-item>
              </el-sub-menu>
              <!-- <el-menu-item index="5">Info</el-menu-item> -->
              <!-- <el-menu-item index="6">Orders</el-menu-item> -->
            </el-menu>
          </div>
          <div class="float-right inline-block mr-4 text-gray-400 text-sm mt-3">
            <span>共3552个相关产品</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <div class="w-1070 bg-white float-left rounded-lg">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div v-for="(item, index) in 5" class="mt-3">
            <div class="pl-4 pr-4 clearfix">
              <div class="w-700 h-40 float-left">
                <div class="inline-block float-left">
                  <!-- <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            /> -->
                  <img style="width: 145px; height: 145px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" />
                </div>
                <div class="inline-block float-left text-sm leading-7 ml-4">
                  <p>
                    <el-link type="primary">先导活塞式减压阀 </el-link>
                    <span class="text-xs text-gray-400 ml-3">非常规常用</span>
                  </p>
                  <p class="text-gray-400">型号：<span class="text-black">Y43H-16C</span></p>
                  <p class="text-gray-400">规格：<span class="text-black">DN80</span></p>
                  <p class="text-gray-400">
                    核算价：<span class="text-red-500">1905元</span>
                    <span>（共<span class="text-blue-500">7条</span>报价）</span>
                  </p>
                  <el-tag v-for="item in data.items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
                    {{ item.label }}
                  </el-tag>
                </div>
              </div>
              <div class="w-72 h-40 float-right">
                <div class="float-left">
                  <div class="w-5 h-5 border border-yellow-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-yellow-500">
                    <span>替</span>
                  </div>
                  <div class="inline-block text-sm ml-3 mr-3">
                    <span>有</span>
                  </div>
                  <div class="w-5 h-5 border border-blue-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-blue-500">
                    <span>技</span>
                  </div>
                  <div class="inline-block text-sm ml-3 mr-3">
                    <span>一般</span>
                  </div>
                </div>
                <div class="float-right text-sm leading-7">
                  <p>质量等级：<span>二级</span></p>
                  <p>压力：<span>1.6MPa</span></p>
                  <p>材质：<span>铸钢</span></p>
                  <p class="text-blue-500">[加入分析]</p>
                  <div class="inline-block float-right w-28 h-6 border rounded cursor-pointer" @click="foldAndUnfold(index, item)">
                    <p class="text-xs pl-2 pt-1">
                      <span class="text-blue-500">12</span>个报价产品
                      <img class="arrow" :class="{ open: data.showDetail === index }" src="../../../assets/img/tech/icon_up.png" alt="" />
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-3 mb-4" v-if="data.showDetail === index">
                <el-table
                  :data="data.tableData"
                  stripe
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#eef1f6',
                    color: '#606266'
                  }"
                >
                  <el-table-column prop="date" label="属性信息 " width="576">
                    <span>【使用温度：≤350℃】【材质：316不锈钢】</span>
                  </el-table-column>
                  <el-table-column prop="name" label="核算价（元）" width="180">
                    <span class="text-red-500">1680</span>
                  </el-table-column>
                  <el-table-column prop="address" label="报价数" width="180">
                    <span class="text-blue-500 cursor-pointer" @click="data.priceComparison = true">3条</span>
                  </el-table-column>
                  <el-table-column prop="address" label="相关信息" width="100">
                    <template #default="scope">
                      <el-tag size="small" type="info" effect="plain"><span class="text-blue-500"> + 分析</span></el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <el-divider />
          </div>
        </table-search>
      </div>
      <div class="w-80 bg-white float-right rounded-lg">
        <div class="pb-4">
          <div class="h-10 bg-blue-500 rounded-tr-lg rounded-tl-lg p-2 text-white text-sm">
            <span>主营产品</span>
          </div>
          <div class="pt-2 pl-3 text-sm">主营产品</div>

          <div>
            <el-checkbox-group v-model="data.checkboxGroup1" size="small">
              <el-checkbox-button v-for="item in data.cities" :key="item" :label="item" class="mt-2 ml-4 border rounded">
                {{ item.ce }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="pt-2 pl-3 text-sm">主营材质</div>

          <div>
            <el-checkbox-group v-model="data.checkboxGroup1" size="small">
              <el-checkbox-button v-for="item in data.cities" :key="item" :label="item" class="mt-2 ml-4 border rounded">
                {{ item.ce }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="pt-2 pl-3 text-sm">主营型号</div>

          <div>
            <el-checkbox-group v-model="data.checkboxGroup1" size="small">
              <el-checkbox-button v-for="item in data.cities" :key="item" :label="item" class="mt-2 ml-4 border rounded">
                {{ item.ce }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="pt-2 pl-3 text-sm">主营规格</div>

          <div>
            <el-checkbox-group v-model="data.checkboxGroup1" size="small">
              <el-checkbox-button v-for="item in data.cities" :key="item" :label="item" class="mt-2 ml-4 border rounded">
                {{ item.ce }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="w-80 bg-white float-right rounded-lg mt-4">
        <div class="h-10 bg-blue-500 rounded-tr-lg rounded-tl-lg p-2 text-white text-sm">
          <span>最高降价产品</span>
        </div>
        <div class="">
          <div class="mt-3" v-for="item in 4">
            <div class="h-24 pl-4">
              <div class="inline-block float-left">
                <!-- <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            /> -->
                <img style="width: 80px; height: 80px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" />
              </div>
              <div class="inline-block float-left text-sm leading-7 ml-4">
                <p>
                  <el-link type="primary">先导活塞式减压阀 </el-link>
                  <span class="text-xs text-blue-400 ml-4">Y43H-16C</span>
                </p>
                <p class="text-blue-400">
                  <span class="text-xs text-blue-400">DN80</span>
                  <span class="text-blue-400 ml-3">非常规使用</span>
                </p>
                <p class="text-gray-400">
                  <span class="text-red-500">1950.00</span>
                  <span class="float-right text-green-500">1950.00</span><i class="iconfont icon-downall float-right text-green-500"></i>
                </p>
              </div>
            </div>
            <el-divider />
          </div>
        </div>
      </div>
    </div>
    <!-- 高级筛选 -->
    <AdvancedFiltering v-model="data.drawer" />
    <!-- 标准比价 -->
    <StandardPriceComparison v-model="data.priceComparison" />
    <!-- 编辑 -->
    <CreateSupplierEdit title="编辑供应商" v-if="createSupplierEditOpenData.visible" :FormData="createSupplierEditOpenData.formData" @closeWindow="closeWindowCreateSupplierEdit($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import AdvancedFiltering from './_Components/AdvancedFiltering.vue'
import CreateSupplierEdit from './_Components/CreateSupplierEdit.vue'
import StandardPriceComparison from './_Components/StandardPriceComparison.vue'
import { parseTime } from '/@/utils/tools'
import { GetPageList } from '/@/api/tech/EnquiryData'
import { GetSupplierInfo } from '/@/api/tech/Supplier'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPageList(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data
      //   data.tableData = res.data.records
      //   form.totals = res.data.totals
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
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
    data.selectDetails = val
    console.log(data.selectDetails)
    // console.log(data.selectDetails[0].Id)
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
    handleSelectionChange,
    parseTimeEvent
    // GetOverTimeLists,
    // GetBeOverTimeLists
  }
}

export default defineComponent({
  components: {
    TableSearch,
    AdvancedFiltering,
    CreateSupplierEdit,
    StandardPriceComparison
  },
  setup() {
    const route = useRoute()
    const queryId = route.query.id
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      SupplierData: [],
      CreateSupplierEdit: {
        view: false
      },
      // 右侧弹出层
      drawer: false,
      // 标准比价
      priceComparison: false,
      showDetail: -1,
      checkboxGroup1: ['Shanghai'],
      items: [
        { type: 'info', label: '介质：蒸汽' },
        { type: 'info', label: '连接式：法兰' },
        { type: 'info', label: '温度环境：常温' }
      ],
      cities: [{ ce: '球阀' }, { ce: '截止阀' }, { ce: '减压阀' }, { ce: '减压阀1' }, { ce: '减压阀2' }, { ce: '减压阀3' }],
      //   表格数据
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ],
      kehuInput: '',
      // 综合排序
      activeIndex: '1',
      // 已选条件数据
      tags: [
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: '产品类别：闸阀', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' }
      ],
      // 创建供应商弹窗数据
      createSupplier: {
        view: false
      },
      customerName: '',
      value: []
    })
    const QuotationNumber = () => {
      console.log(11)
    }
    // 编辑供应商
    const createSupplierEditOpen = (data: any) => {
      let createSupplierEditOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowCreateSupplierEdit = (val: any) => {
        createSupplierEditOpenData.formData = {
          DataList: val
        }
        console.log(val)
        createSupplierEditOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowCreateSupplierEdit = (type: string) => {
        createSupplierEditOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        createSupplierEditOpenData,
        openWindowCreateSupplierEdit,
        closeWindowCreateSupplierEdit
      }
    }
    // 供应商详情数据
    const GetSupplierData = async (id: any) => {
      await GetSupplierInfo(data.supplierId)
        .then((res) => {
          console.log(res)
          if (res.code == 1) {
            // data.ContactsData = res.data.Contacts || []
            data.SupplierData = res.data.Supplier || []
            // data.CertificateList = res.data.CertificateList || []
            // data.QualificationsList = res.data.QualificationsList || []
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch((e) => {
          console.log(`错误：${e}`)
        })
    }
    const foldAndUnfold = (index: any, item: any) => {
      console.log('index====', index)
      if (data.showDetail === index) {
        //两次点击的对象相同，关闭
        data.showDetail = -1
      } else {
        //点击的对象不同，先关闭前一对象，再打开当前对象
        data.showDetail = index
      }
    }
    //获取数据
    const getData = () => {
      renderTableList(form, data)
      GetSupplierData(data.supplierId)
    }
    //
    const handleSelect = () => {}
    onMounted(() => {
      data.supplierId = queryId
      GetSupplierData(data.supplierId)
    })

    return {
      data,
      Search,
      form,
      foldAndUnfold,
      ...createSupplierEditOpen({ data, getData }),
      QuotationNumber,
      handleSelect,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_Supplier_SupplierHome {
  .BackgroundImage {
    background: #1891ff;
    background-image: url('/@/assets/img/tech/supplierManagement/gys_h_bg.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
}
.arrow {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  &.open {
    transform: rotate(180deg);
  }
}
.el-divider--horizontal {
  margin: 0px 0 0 0 !important;
}
</style>
