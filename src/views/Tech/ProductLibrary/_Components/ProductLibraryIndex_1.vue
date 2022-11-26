<template>
  <div v-if="data.number == 0" class="bg-white rounded tech_ProductLibrary_ProductLibraryIndex">
    <div class="tech_ProductLibrary_ProductLibraryIndex_down h-48 mt-5 rounded relative">
      <div class="w-1000 h-36 absolute top-6 left-8">
        <div class="rounded">
          <div v-for="(item, index) in data.tabData2" class="pt-1 pb-1 pl-2 pr-2 inline-block mt-2 text-sm cursor-pointer" :class="{ active2: data.national == index }" @click="huanNational(index)">
            <span class="text-xs"> {{ item.value }}</span>
          </div>
        </div>
        <el-input v-model="data.input1" class="w-50 m-2" size="large" placeholder="请输入名称/型号/规格/材质">
          <template #suffix>
            <el-button type="primary" :icon="Search">搜索</el-button>
          </template>
        </el-input>

        <div class="">
          <div class="inline-block ml-2 mr-4">
            <svg-icon icon-class="svg-tech_posts_ProductLibraryIndex" />
          </div>
          <div class="h-14 m-auto inline-block">
            <div v-for="(item, index) in data.tabData1" class="pt-1 pb-1 pl-4 pr-4 bg-blue-100 rounded-2xl mr-2 inline-block mt-2 text-sm cursor-pointer" :class="{ actives: data.valve == index }" @click="huanValve(index)">
              {{ item.value }}
            </div>
          </div>
          <i class="iconfont icon-huifu text-blue-500 ml-2"></i>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div>
        <span class="text-sm text-blue-500">阀门</span>
        <span class="text-gray-400 text-sm">（共552件相关商品）</span>
        <div class="inline-block">
          <el-tag v-for="(tag, index) in tags" :key="tag.name" class="mx-1" closable effect="plain" :type="tag.type" @close="handClose(index, tag)">
            {{ tag.name }}
          </el-tag>
        </div>
        <span class="text-blue-500 text-xs ml-2">清除筛选</span>
      </div>

      <div class="mt-5">
        <div>
          <el-select v-model="data.value" class="m-2 w-80" placeholder="按用途和作用分类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="data.value1" class="m-2 w-80 ml-6" placeholder="按公称压力分类">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="data.value2" class="m-2 w-80 ml-6" placeholder="按工作温度分类">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="data.value3" class="m-2 w-80 ml-6" placeholder="按驱动方式分类">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <el-select v-model="data.value4" class="m-2 w-80" placeholder="按公称通径分类">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="data.value5" class="m-2 w-80 ml-6" placeholder="按结构特征分类">
            <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="data.value6" class="m-2 w-80 ml-6" placeholder="按连接方法分类">
            <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="data.value7" class="m-2 w-80 ml-6" placeholder="按阀体材料分类">
            <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </div>
    <!-- 安阀门分类 -->
    <div class="pt-2 pb-2 pl-3 pr-2 border rounded-lg mt-4 text-xs">
      <span class="">按阀门分类：</span>
      <div class="inline-block">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="截止阀" />
          <el-checkbox label="闸阀" />
          <el-checkbox label="止回阀和底阀" />
          <el-checkbox label="闸阀" />
          <el-checkbox label="止回阀和底阀" />
          <el-checkbox label="闸阀" />
          <el-checkbox label="止回阀和底阀" />
        </el-checkbox-group>
      </div>
    </div>
    <!-- 列表 -->
    <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
      <div class="flex flex-wrap mt-5">
        <div class="w-1/5 h1/5" v-for="(item, index) in 15">
          <div class="relative" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
            <el-image class="w-64 h-64 ml-2" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"> </el-image>
            <div class="absolute bottom-1 left-2 z-50 w-64 h-11 bg-blue-100">
              <div class="pt-2 pl-2">
                <el-tag type="" class="mx-1" effect="light">
                  <span>客户产品名称</span>
                </el-tag>
                <el-tag type="" class="mx-1" effect="light">
                  <span>客户产品名称</span>
                </el-tag>
              </div>
            </div>
            <div class="absolute -top-1 right-4" v-show="data.isfo && index == data.current">
              <el-button type="primary" size="small" plain @click="uploadPic(index)"><i class="iconfont icon-pic mr-1"></i><span>上传</span></el-button>
              <el-button type="primary" size="small" plain><i class="iconfont icon-bianji1 mr-1"></i><span>编辑</span></el-button>
            </div>
          </div>

          <div class="ml-2 text-sm leading-7 mb-3 mt-3">
            <p>
              <span class="text-blue-500">安全阀</span>
              <span class="float-right mr-4">304不锈钢</span>
            </p>
            <p><span class="text-gray-400">型号：</span><span>A42H-16P</span></p>
            <p><span class="text-gray-400">规格：</span><span>DN100</span></p>
          </div>
        </div>
      </div>
    </table-search>

    <ProductLibraryIndexUpload title="上传封面" v-if="data.ProductLibraryIndexUpload.view" @closeWindow="closeWindow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import ProductLibraryIndexUpload from './ProductLibraryIndexUpload.vue'
import { GetPageList } from '/@/api/tech/EnquiryData'
import { parseTime } from '/@/utils/tools'

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
    TableSearch,
    ProductLibraryIndexUpload
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
    const data = reactive({
      ProductLibraryIndexUpload: {
        view: false
      },
      isfo: false,
      current: 0,
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      input1: '',
      number: '',
      national: -1,
      valve: -1,
      tabData: [{ value: '首页' }, { value: '常规产品库' }, { value: '非常规产品库' }, { value: '组合产品库' }, { value: '驱动产品库' }, { value: '配件产品库' }],
      tabData1: [{ value: '国标闸阀' }, { value: '美标球阀' }, { value: '国标蝶阀' }, { value: '国标截止阀' }],
      tabData2: [{ value: '全部' }, { value: '国标' }, { value: '美标' }]
    })

    // 名称切换
    const huanName = (index: any) => {
      // console.log(index)
      data.number = index
      console.log(data.number)
    }
    // 关闭任意一个tags
    const handClose = (index: any, tag: any) => {
      console.log(index)
      tags.value.splice(tags.value.indexOf(tag), 1)
    }
    const huanValve = (index: any) => {
      data.valve = index
      console.log(data.number)
    }

    const huanNational = (index: any) => {
      data.national = index
      console.log(data.number)
    }
    const options = [
      {
        value: '截止阀',
        label: '截止阀'
      },
      {
        value: '止回阀',
        label: '止回阀'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const options1 = [
      {
        value: '低真空阀门',
        label: '低真空阀门'
      },
      {
        value: '止回阀',
        label: '止回阀'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const options2 = [
      {
        value: '高温阀',
        label: '高温阀'
      },
      {
        value: '中温阀',
        label: '中温阀'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const options3 = [
      {
        value: '手动阀门',
        label: '手动阀门'
      },
      {
        value: '电动阀门',
        label: '电动阀门'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const options4 = [
      {
        value: '小口径阀门',
        label: '小口径阀门'
      },
      {
        value: '中口径阀门',
        label: '中口径阀门'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const options5 = [
      {
        value: '截门型',
        label: '截门型'
      },
      {
        value: '闸门型',
        label: '闸门型'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const options6 = [
      {
        value: '法兰连接阀门',
        label: '法兰连接阀门'
      },
      {
        value: '螺纹连接阀门',
        label: '螺纹连接阀门'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const options7 = [
      {
        value: '金属材料阀',
        label: '金属材料阀'
      },
      {
        value: '非金属材料阀',
        label: '非金属材料阀'
      },
      {
        value: '分配阀',
        label: '分配阀'
      },
      {
        value: '调节阀',
        label: '调节阀'
      },
      {
        value: '安全阀',
        label: '安全阀'
      }
    ]
    const checkList = ref(['selected and disabled', ''])

    // 鼠标移入移出
    const mouseenter = (index: any) => {
      data.isfo = true
      data.current = index
    }
    const mouseleave = () => {
      //   data.isfo = -1
      data.isfo = false
      data.current = -1
    }
    // 上传
    const uploadPic = (index: any) => {
      console.log(index)
      data.ProductLibraryIndexUpload.view = true
    }
    // 关闭弹窗
    const closeWindow = (type: string) => {
      data.ProductLibraryIndexUpload.view = false
    }

    return {
      checkList,
      data,
      huanName,
      Search,
      huanValve,
      tags,
      handClose,
      options,
      options1,
      options2,
      options3,
      options4,
      options5,
      options6,
      options7,
      form,
      huanNational,
      mouseenter,
      mouseleave,
      uploadPic,
      closeWindow,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_ProductLibrary_ProductLibraryIndex {
  .tech_ProductLibrary_ProductLibraryIndex_down {
    background-image: url('/@/assets/img/tech/proLibrbg.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .active {
    color: #409eff;
    background: #ffffff;
    border-radius: 8px;
  }
  .actives {
    color: #ffffff;
    background: #409eff;
    border-radius: 24px;
  }
  .active2 {
    color: #ffffff;
    background: #409eff;
    border-radius: 8px;
  }
  :deep(.el-button + .el-button) {
    margin-left: 0 !important;
  }
  .yinc {
    overflow: hidden;
  }
}
</style>
