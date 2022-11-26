<template>
  <div class="tech_PriceLibraryManagement">
    <div class="h-60 bg-white rounded-lg relative">
      <div class="pt-1 pr-4 pb-2 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
        <div class="pt-1 clearfix">
          <div class="float-left text-sm ml-4"><span>价格库管理</span></div>
        </div>
      </div>
      <div class="">
        <div class="h-24 pt-7 pb-5 px-4 border-b border-gray-200">
          <div class="float-left">
            <div class="w-80 inline-block mr-4">
              <el-input v-model="data.customerName" size="large" placeholder="输入客户名称或产品类别/材质找供应商" />
            </div>
            <div class="inline-block mr-4">
              <el-cascader v-model="data.value" :options="data.options" :props="props" placeholder="所在区域" size="large" />
              <!-- @change="handleChange" -->
            </div>
            <el-button type="primary" :icon="Search" size="large" class="mr-4">查询</el-button>
            <div class="w-24 h-8 inline-block" @click="data.drawer = true">
              <i class="iconfont icon-shaixuan mr-1 text-blue-500"></i>
              <span class="text-blue-500">高级筛选</span>
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
            <el-menu :default-active="data.activeIndex" class="el-menu-demo" mode="horizontal">
              <!-- @select="handleSelect" -->
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
          <div class="float-right text-sm text-gray-400 mr-4">共3552个相关供应商</div>
        </div>
      </div>
    </div>
    <div class="w-1070 bg-white float-left rounded-lg mt-6">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" :isAdvancedSearch="false" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <div v-for="(item, index) in 5" class="mt-3 clearfix">
          <div class="pl-4 pr-4 clearfix">
            <div class="w-900 h-40 float-left relative">
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
                  <span class="text-xs text-gray-400 ml-4">非常规常用</span>
                </p>
                <div class="w-36 inline-block">
                  <p class="text-gray-400">型号：<span class="text-black">Y43H-16C</span></p>
                  <p class="text-gray-400">规格：<span class="text-black">DN80</span></p>
                </div>
                <div class="w-32 h-10 ml-14 inline-block">
                  <p><span class="text-gray-400">压力：</span><span>1.6MPa</span></p>
                  <p><span class="text-gray-400">材质：</span><span>铸钢</span></p>
                </div>
                <p class="text-gray-400">
                  <span>共<span class="text-blue-500">7条</span>成交价</span>
                </p>
                <el-tag v-for="item in data.items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
                  {{ item.label }}
                </el-tag>
              </div>
              <div class="w-36 h-20 inline-block mt-6 ml-20">
                <p><span class="text-gray-400">质量等级：</span><span>二级</span></p>
              </div>
              <div class="w-36 h-20 absolute right-0 top-6">
                <p><span class="text-gray-400">核算价：</span><span class="text-red-500">1905元</span></p>
                <p><span class="text-gray-400">采购价：</span><span class="text-green-500">1825元</span></p>
              </div>
            </div>
            <div class="w-30 h-40 float-right relative">
              <div class="">
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
              <div class="inline-block w-28 h-6 border rounded absolute bottom-6 right-2" @click="foldAndUnfold(index, item)">
                <p class="text-xs pl-2 pt-1">
                  <span class="text-blue-500">12</span>个报价产品
                  <img class="arrow" :class="{ open: data.showDetail === index }" src="../../../assets/img/tech/icon_up.png" alt="" />
                </p>
              </div>
            </div>
            <div class="mt-3 mb-3">
              <el-table
                :data="data.tableData"
                stripe
                style="width: 100%"
                :header-cell-style="{
                  background: '#eef1f6',
                  color: '#606266'
                }"
                v-if="data.showDetail === index"
              >
                <el-table-column prop="date" label="属性信息 " width="576">
                  <span>【使用温度：≤350℃】【材质：316不锈钢】</span>
                </el-table-column>
                <el-table-column prop="name" label="核算价（元）" width="180">
                  <span class="text-red-500">1680</span>
                </el-table-column>
                <el-table-column prop="address" label="报价数" width="180">
                  <span class="text-blue-500" @click="data.priceComparison = true">3条</span>
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
    <div class="w-80 bg-white float-right rounded-lg mt-6">
      <div class="h-10 bg-blue-500 rounded-tr-lg rounded-tl-lg p-2 text-white text-sm">
        <span>热榜供应商 Top10</span>
      </div>
      <div class="pb-5 pl-4">
        <div class="w-72 h-24 float-left border-b mt-3" v-for="item in 10">
          <div class="inline-block float-left text-sm leading-7 ml-4">
            <p>
              <el-link type="primary">浙江金豪阀门有限公司 </el-link>
            </p>
            <p class="">
              <i class="iconfont icon-dianhua"></i>
              <span class="text-xs">13506660646</span>
              <el-tag size="small" class="ml-3">舒黄宗</el-tag>
            </p>
            <p class="text-gray-400 text-xs">
              <i class="iconfont icon-dingwei"></i>
              <span>浙江省温州市永嘉县瓯北镇</span>
            </p>
          </div>
          <div class="float-right text-gray-400 text-sm">
            <span>温州</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 高级筛选 -->
    <AdvancedFiltering v-model="data.drawer" />
    <!-- 标准比价 -->
    <StandardPriceComparison v-model="data.priceComparison" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import AdvancedFiltering from './_Components/AdvancedFiltering.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import StandardPriceComparison from './_Components/StandardPriceComparison.vue'
import { parseTime } from '/@/utils/tools'
import { GetPageList } from '/@/api/tech/EnquiryData'
import { Search } from '@element-plus/icons-vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPageList(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data
      //   data.tableData = res.data.records
      //   data.PathList
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
    AdvancedFiltering,
    TableSearch,
    StandardPriceComparison
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })
    const props = {
      expandTrigger: 'hover'
    }
    const data = reactive({
      options: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency'
                },
                {
                  value: 'feedback',
                  label: 'Feedback'
                },
                {
                  value: 'efficiency',
                  label: 'Efficiency'
                },
                {
                  value: 'controllability',
                  label: 'Controllability'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation'
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation'
                }
              ]
            }
          ]
        },
        {
          value: 'component',
          label: 'Component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout'
                },
                {
                  value: 'color',
                  label: 'Color'
                },
                {
                  value: 'typography',
                  label: 'Typography'
                },
                {
                  value: 'icon',
                  label: 'Icon'
                },
                {
                  value: 'button',
                  label: 'Button'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox'
                },
                {
                  value: 'input',
                  label: 'Input'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber'
                },
                {
                  value: 'select',
                  label: 'Select'
                },
                {
                  value: 'cascader',
                  label: 'Cascader'
                },
                {
                  value: 'switch',
                  label: 'Switch'
                },
                {
                  value: 'slider',
                  label: 'Slider'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker'
                },
                {
                  value: 'upload',
                  label: 'Upload'
                },
                {
                  value: 'rate',
                  label: 'Rate'
                },
                {
                  value: 'form',
                  label: 'Form'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table'
                },
                {
                  value: 'tag',
                  label: 'Tag'
                },
                {
                  value: 'progress',
                  label: 'Progress'
                },
                {
                  value: 'tree',
                  label: 'Tree'
                },
                {
                  value: 'pagination',
                  label: 'Pagination'
                },
                {
                  value: 'badge',
                  label: 'Badge'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert'
                },
                {
                  value: 'loading',
                  label: 'Loading'
                },
                {
                  value: 'message',
                  label: 'Message'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox'
                },
                {
                  value: 'notification',
                  label: 'Notification'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'Menu'
                },
                {
                  value: 'tabs',
                  label: 'Tabs'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown'
                },
                {
                  value: 'steps',
                  label: 'Steps'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip'
                },
                {
                  value: 'popover',
                  label: 'Popover'
                },
                {
                  value: 'card',
                  label: 'Card'
                },
                {
                  value: 'carousel',
                  label: 'Carousel'
                },
                {
                  value: 'collapse',
                  label: 'Collapse'
                }
              ]
            }
          ]
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'docs',
              label: 'Design Documentation'
            }
          ]
        }
      ],

      priceComparison: false,
      showDetail: -1,
      activeIndex: '1',
      tags: [
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: '产品类别：闸阀', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' }
      ],
      items: [
        { type: 'info', label: '介质：蒸汽' },
        { type: 'info', label: '连接式：法兰' },
        { type: 'info', label: '温度环境：常温' }
      ],
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
      // 右侧弹出层
      drawer: false,
      customerName: '',
      value: []
    })
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
    return {
      data,
      form,
      foldAndUnfold,
      ...tableRender(form, data),
      Search,
      props
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_PriceLibraryManagement {
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
    margin: 0 !important;
  }
}
</style>
