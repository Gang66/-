<template>
  <div>
    <div class="bg-white rounded-lg relative">
      <div class="pt-1 pr-4 pb-2 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
        <div class="clearfix pt-1">
          <div class="float-left ml-4 text-sm"><span>供应商管理</span></div>
          <div class="float-right text-sm text-gray-400">共3552个相关供应商</div>
        </div>
      </div>

      <div class="">
        <div class="h-16 pt-3 pl-4 pr-4 border-b border-gray-200">
          <div class="float-left">
            <div class="w-80 inline-block mr-4">
              <el-input v-model="form.CompanyName" size="large" placeholder="输入客户名称或产品类别/材质找供应商" />
            </div>
            <div class="inline-block mr-4">
              <el-cascader v-model="form.Address" :options="data.AllRegionTree" :props="data.areaProps" @change="handleChange" size="large" />
            </div>
            <el-button type="primary" :icon="Search" size="large" class="mr-4" @click="search">查询</el-button>
            <div class="w-24 h-8 inline-block" @click="drawer = true">
              <i class="iconfont icon-shaixuan mr-1 text-blue-500"></i>
              <span class="text-blue-500 cursor-pointer">高级筛选</span>
            </div>
          </div>
          <div class="float-right" @click="openWindowCreateSupplier()">
            <el-button type="primary" size="large"><i class="iconfont icon-chuangjian mr-2"></i>创建供应商</el-button>
          </div>
        </div>
        <div class="pt-2 px-4">
          <div class="inline-block text-gray-400 text-xs">已选条件：</div>
          <!-- <el-tag
            v-for="tag in tags"
            :key="tag.name"
            class="mx-1"
            closable
            :type="tag.type"
          >
            {{ tag.name }}
          </el-tag> -->
          <el-tag v-for="item in tags" :key="item.name" class="mx-1" :type="item.type" effect="plain" closable>
            {{ item.name }}
          </el-tag>
          <div class="inline-block text-blue-600 text-xs ml-2">清除筛选</div>
        </div>
        <div class="h-11">
          <div class="w-800 inline-block">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
            </el-menu>
          </div>
          <div class="float-right inline-block mr-4">
            <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
              <el-radio-button label="mo">默认排序</el-radio-button>
              <el-radio-button label="time">按时间排序</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 clearfix">
      <div class="w-1140 bg-white float-left rounded-lg mb-24">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="" v-for="(item, index) in data.GetSupplierList">
            <div class="pt-5 pl-5 pr-5">
              <el-popover :width="300" popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;" placement="bottom-start">
                <template #reference>
                  <div class="w-14 relative mb-3 inline-block">
                    <div class="w-14 h-14 rounded-full bg-blue-400 inline-block pt-5" v-if="item.Abbreviation < 5">
                      <div class="w-10 text-xs text-white text-center m-auto">
                        <p>{{ item.Abbreviation }}</p>
                      </div>
                    </div>
                    <div class="w-14 h-14 rounded-full bg-blue-400 inline-block pt-3" v-else>
                      <div class="w-10 text-xs text-white text-center m-auto">
                        <p>{{ item.Abbreviation }}</p>
                      </div>
                    </div>
                  </div>
                </template>

                <template #default>
                  <div class="demo-rich-conent flex" style="gap: 16px; flex-direction: column">
                    <div class="w-14 h-14 rounded-full bg-blue-400 m-auto pt-3" v-if="item.Abbreviation < 5">
                      <div class="w-10 text-xs text-white text-center m-auto">
                        <p>{{ item.Abbreviation }}</p>
                      </div>
                    </div>
                    <div class="w-14 h-14 rounded-full bg-blue-400 m-auto pt-3" v-else>
                      <div class="w-10 text-xs text-white text-center m-auto">
                        <p>{{ item.Abbreviation }}</p>
                      </div>
                    </div>

                    <div class="text-center">
                      <p>{{ item.Name }}</p>
                      <p class="text-xs text-gray-400">{{ item.MainContact }} / {{ item.MobilePhone || '-' }}</p>
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
                        <router-link :to="'/Tech/SupplierManagement/SupplierFiles?id=' + item.Id">
                          <el-button class="w-28" type="primary">
                            <i class="iconfont icon-yulan mr-2"></i>
                            详情</el-button
                          >
                        </router-link>
                      </div>
                      <div class="float-right" @click="openWindowCreateSupplierEdit(item)">
                        <el-button class="w-28" type="primary" plain><i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
                      </div>
                    </div>
                    <div class="text-xs text-gray-400 text-center"><span>-</span><span>本厂产品信息由</span><span class="text-black">谭琦</span><span>更新</span><span>-</span></div>
                  </div>
                </template>
              </el-popover>
              <div class="inline-block ml-4 pt-1 align-top">
                <div>
                  <router-link :to="'/Tech/SupplierManagement/SupplierHomepage?id=' + item.Id">
                    <el-link>
                      <span class="text-xl">{{ item.CompanyName }}</span>
                    </el-link>
                  </router-link>

                  <div class="inline-block ml-3">
                    <!-- <el-tag
                      type="warning"
                      class="mx-1"
                      effect="dark"
                      size="small"
                    >
                      <span class="text-xs">报价供应商</span>
                    </el-tag> -->
                    <!-- <el-button type="warning" size="small" color=" #16BFDC"
                      ><span class=" text-white">采购供应商</span></el-button
                    > -->
                    <!-- <el-tag
                      type=""
                      class="mx-1"
                      effect="plain"
                      size="small"
                      color=" #16BFDC"
                    >
                      <span class="text-xs text-white">采购供应商</span>
                    </el-tag> -->
                    <!-- <el-tag
                      type="primary"
                      class="mx-1"
                      effect="dark"
                      size="small"
                    >
                      <span class="text-xs">售后供应商</span>
                    </el-tag> -->
                    <!-- <div class="bg-yellow-400	pl-3 pr-3 rounded">
                        <span class="text-xs text-white">逾期供应商</span>
                    </div> -->
                    <!-- <div class="bg-purple-600	pl-3 pr-3 rounded">
                        <span class="text-xs text-white">账期供应商</span>
                    </div> -->
                    <!-- <el-tag
                      type="success"
                      class="mx-1"
                      effect="dark"
                      size="small"
                    >
                      <span class="text-xs">常用供应商</span>
                    </el-tag> -->
                    <!-- <el-tag
                      type="danger"
                      class="mx-1"
                      effect="dark"
                      size="small"
                    >
                      <span class="text-xs">失信供应商</span>
                    </el-tag> -->
                    <el-tag type="info" class="mx-1" effect="dark" size="small">
                      <span class="text-xs">未使用供应商</span>
                    </el-tag>
                  </div>
                </div>
                <div>
                  <span class="text-sm text-gray-400">主营产品：{{ item.MainProduct || '- -' }}</span>
                </div>
              </div>
              <div class="inline-block float-right mt-9 w-28 h-6 border rounded cursor-pointer" @click="foldAndUnfold(index, item)">
                <p class="text-xs pl-2 pt-1">
                  <span class="text-blue-500">12</span>个报价产品
                  <img class="arrow" :class="{ open: data.showDetail === index }" src="../../../assets/img/tech/icon_up.png" alt="" />
                </p>
              </div>
              <template v-if="data.showDetail === index">
                <div class="h-20 rounded-lg bg-gray-50 mt-2 yincang">
                  <div class="h-10 text-sm pl-4 pr-8 pt-4">
                    <div class="inline-block">
                      <span><el-link type="primary">先导活塞式减压阀 Y43H-16C DN800 非常规常用</el-link></span>
                    </div>
                    <div class="inline-block ml-28">
                      <span class="text-red-500 font-semibold">￥1950元</span><span class="ml-8"><el-link type="primary">不锈钢球阀 Q11F-16P DN15 常规常用</el-link></span>
                    </div>
                    <div class="inline-block float-right">
                      <span class="text-red-500 font-semibold">￥30元 </span>
                    </div>
                  </div>
                  <div class="mr-4 mt-2">
                    <span class="text-sm text-blue-500 float-right">更多产品》</span>
                  </div>
                </div>
              </template>
              <div class="h-20 rounded-lg bg-gray-50 mt-3 flex text-center leading-8 text-sm pt-2 border">
                <div class="h-16 border-r pr-10 pl-10">
                  <p class="text-gray-400">所在地区</p>
                  <p>{{ item.Address }}</p>
                </div>
                <div class="h-16 border-r pr-6 pl-6">
                  <p class="text-gray-400">综合等级</p>
                  <p>{{ item.Level || '-' }}</p>
                </div>
                <div class="h-16 border-r pr-12 pl-12">
                  <p class="text-gray-400">主营类别</p>
                  <p v-if="item.MainCategory == 'A'">手阀</p>
                  <p v-if="item.MainCategory == 'B'">控制阀</p>
                  <p v-if="item.MainCategory == 'C'">配件</p>
                </div>
                <div class="h-16 border-r pr-12 pl-12">
                  <p class="text-gray-400">联系人</p>
                  <p>{{ item.MainContact || '-' }}</p>
                </div>
                <div class="h-16 border-r pr-12 pl-12">
                  <p class="text-gray-400">移动电话</p>
                  <p>{{ item.MobilePhone || '-' }}</p>
                </div>
                <div class="h-16 pr-12 pl-12">
                  <p class="text-gray-400">固定电话</p>
                  <p>{{ item.FixedTelephone || '-' }}</p>
                </div>
              </div>
            </div>
            <el-divider />
          </div>
        </table-search>

        <!-- <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item  name="1">
         <template #title>
            <div>
                <div class=" w-8 h-8 bg-red-400 inline-block"></div>
                <div class=" inline-block">
                    <div><el-link>浙江金豪阀门有限公司</el-link></div>
                    <el-link type="primary">浙江金豪阀门有限公司</el-link>
                    <div><span>主营产品：闸阀、截止阀</span></div>
                </div>
            </div>
        </template>
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </el-collapse-item>
    </el-collapse> -->
      </div>
      <div class="float-right">
        <!-- 热榜供应商 -->
        <div class="w-72 rounded-lg">
          <div class="h-10 bg-blue-500 rounded-tr-lg rounded-tl-lg p-2 text-white text-sm">
            <span>热榜供应商</span>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266'
            }"
          >
            <el-table-column prop="date" label="排名" width="56" align="center">
              <template #default="scope">
                <img class="w-6 h-7 m-auto" src="../../../assets/img/tech/by01.png" alt="" v-if="scope.row.date == 1" />
                <img class="w-6 h-7 m-auto" src="../../../assets/img/tech/by02.png" alt="" v-if="scope.row.date == 2" />
                <img class="w-6 h-7 m-auto" src="../../../assets/img/tech/by03.png" alt="" v-if="scope.row.date == 3" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="供应商名称" width="232">
              <template #default="scope">
                <el-link type="primary">{{ scope.row.name }}</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 最新供应商 -->
        <div class="w-72 rounded-lg mt-4">
          <div class="h-10 bg-blue-500 rounded-tr-lg rounded-tl-lg p-2 text-white text-sm">
            <span>最新供应商</span>
          </div>
          <el-table
            :data="tableData1"
            stripe
            style="width: 100%"
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266'
            }"
          >
            <el-table-column prop="date" label="排名" width="56" align="center">
              <template #default="scope">
                <el-tag effect="dark" type="danger" v-if="scope.row.date == 1"> 1 </el-tag>
                <el-tag effect="dark" type="warning" v-else-if="scope.row.date == 2"> 2 </el-tag>
                <el-tag effect="dark" type="success" v-else-if="scope.row.date == 3"> 3 </el-tag>
                <el-tag effect="dark" type="info" v-else>{{ scope.row.date }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="供应商名称" width="232">
              <template #default="scope">
                <el-link type="primary">{{ scope.row.name }}</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 右侧弹出层 -->
    <AdvancedFiltering v-model="drawer" />
    <!-- 创建供应商 -->
    <CreateSupplier title="新增供应商" v-if="createSupplierOpenData.visible" :FormData="createSupplierOpenData.formData" @closeWindow="closeWindowCreateSupplier($event)" />
    <!-- 编辑 -->
    <CreateSupplierEdit title="编辑供应商" v-if="createSupplierEditOpenData.visible" :FormData="createSupplierEditOpenData.formData" @closeWindow="closeWindowCreateSupplierEdit($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import CreateSupplier from './_Components/CreateSupplier.vue'
import AdvancedFiltering from './_Components/AdvancedFiltering.vue'
import CreateSupplierEdit from './_Components/CreateSupplierEdit.vue'
import { parseTime } from '/@/utils/tools'
import { createSupplierOpen } from '/@/assets/ts/techOpenWindow'
import { GetAllRegionTree, GetSupplierPage } from '/@/api/tech/Supplier'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetSupplierPage(form).then((res) => {
    if (res.code == 1) {
      data.GetSupplierList = res.data.records
      form.totals = res.data.totals
      console.log(data.GetSupplierList)
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
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails)
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
  }
}

export default defineComponent({
  components: {
    TableSearch,
    CreateSupplier,
    AdvancedFiltering,
    CreateSupplierEdit
  },
  setup() {
    const checkList = ref([''])
    const changeCheck = (val: any) => {
      console.log(checkList.value)
    }
    // 最新供应排行  排行
    const items = ref([
      { type: '', label: 'Tag 1' },
      { type: 'success', label: 'Tag 2' },
      { type: 'info', label: 'Tag 3' },
      { type: 'danger', label: 'Tag 4' },
      { type: 'warning', label: 'Tag 5' }
    ])

    // 表格数据  （热榜供应商）
    const tableData = [
      {
        date: '1',
        name: '上海星空自动化仪表有限公司'
      },
      {
        date: '2',
        name: '上海星空自动化仪表有限公司'
      },
      {
        date: '3',
        name: '上海星空自动化仪表有限公司'
      },
      {
        date: '4',
        name: '浙江省永嘉永工阀门有限公司'
      },
      {
        date: '5',
        name: '潍坊盛源阀门有限公司'
      },
      {
        date: '6',
        name: '浙江省永嘉永工阀门有限公司'
      },
      {
        date: '7',
        name: '潍坊盛源阀门有限公司'
      },
      {
        date: '8',
        name: '浙江省永嘉永工阀门有限公司'
      },
      {
        date: '9',
        name: '潍坊盛源阀门有限公司'
      },
      {
        date: '10',
        name: '浙江省永嘉永工阀门有限公司'
      }
    ]
    // 表格数据  最新供应排行
    const tableData1 = [
      {
        date: '1',
        name: '上海星空自动化仪表有限公司'
      },
      {
        date: '2',
        name: '上海星空自动化仪表有限公司'
      },
      {
        date: '3',
        name: '上海星空自动化仪表有限公司'
      },
      {
        date: '4',
        name: '浙江省永嘉永工阀门有限公司'
      },
      {
        date: '5',
        name: '潍坊盛源阀门有限公司'
      },
      {
        date: '6',
        name: '浙江省永嘉永工阀门有限公司'
      },
      {
        date: '7',
        name: '潍坊盛源阀门有限公司'
      },
      {
        date: '8',
        name: '浙江省永嘉永工阀门有限公司'
      },
      {
        date: '9',
        name: '潍坊盛源阀门有限公司'
      },
      {
        date: '10',
        name: '浙江省永嘉永工阀门有限公司'
      }
    ]
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      Address: '',
      CompanyName: ''
    })
    const activeNames = ref([''])
    const handleChange1 = (val: string[]) => {
      console.log(val)
    }
    // 右侧弹出层
    const drawer = ref(false)
    const tabPosition = ref('mo')
    // 默认时间切换
    const allWait = (val: any) => {
      console.log(tabPosition.value)
      //   data.show_1 = tabPosition.value
    }
    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    //
    const data = reactive({
      GetSupplierList: [], //供应商列表
      AllRegionTree: [],
      showDetail: -1,
      // 编辑
      CreateSupplierEdit: {
        view: false
      },
      // 筛选配置
      areaProps: {
        multiple: false, //是否开启多选
        value: 'name',
        label: 'title'
      }
    })
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

    const props = {
      expandTrigger: 'hover'
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
    // 关闭弹窗
    const closeWindow = (type: string) => {
      data.CreateSupplierEdit.view = false
    }
    const handleChange = (value: any) => {
      // form.Address = value.join(',')
      console.log(form.Address)
    }
    const tags = ref([
      { name: '产品类别：闸阀', type: 'info' },
      { name: '产品类别：闸阀', type: 'info' },
      { name: '产品类别：闸阀', type: 'info' },
      { name: '产品类别：闸阀', type: 'info' },
      { name: '产品类别：闸阀', type: 'info' },
      { name: '产品类别：闸阀', type: 'info' },
      { name: '产品类别：闸阀', type: 'info' },
      { name: '产品类别：闸阀', type: 'info' }
    ])
    // 获取公司地址
    const getAllRegionTree = async (data: any) => {
      await GetAllRegionTree()
        .then((res) => {
          if (res.code == 1) {
            data.AllRegionTree = res.data || []
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch((e) => {
          console.log(`错误：${e}`)
        })
    }
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }

    onMounted(() => {
      getAllRegionTree(data)
    })

    return {
      data,
      props,
      handleChange,
      Search,
      tags,
      activeIndex,
      handleSelect,
      allWait,
      tabPosition,
      drawer,
      activeNames,
      handleChange1,
      form,
      tableData,
      items,
      tableData1,
      checkList,
      changeCheck,
      closeWindow,
      foldAndUnfold,
      ...tableRender(form, data),
      ...createSupplierOpen({ data, getData }),
      ...createSupplierEditOpen({ data, getData })
    }
  }
})
</script>

<style lang="postcss" scoped>
.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
.el-divider--horizontal {
  margin: 24px 0 0 0 !important;
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
</style>
