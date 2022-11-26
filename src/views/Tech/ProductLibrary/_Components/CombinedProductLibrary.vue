<template>
  <div>
    <div class="p-4 pb-1">
      <div class="w-80 inline-block mr-4">
        <el-input v-model="data.customerName" size="large" placeholder="输入名称/型号/规格/材质" />
      </div>
      <el-button type="primary" :icon="Search" size="large" class="mr-4">查询</el-button>
      <div class="float-right -mr-8">
        <el-button type="danger" size="large" class="mr-4"><i class="iconfont icon-shanchu mr-2"></i> 删除</el-button>
      </div>
    </div>
    <div class="mt-3 bf-table-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <el-table :data="data.tableData2" :border="false" style="width: 100%">
          <el-table-column type="selection" width="40" align="center" />
          <el-table-column type="expand">
            <template #default="props">
              <div m="4" class="neizhi_table bg-blue-100">
                <el-table :data="props.row.family" :show-header="false" :highlight-current-row="false">
                  <!-- <el-table-column
                        type="index"
                        label="序号"
                        width="54"
                        align="center"
                      /> -->
                  <el-table-column type="selection" width="40" align="center" />
                  <el-table-column label="图片" prop="name" width="112" align="right">
                    <template #default="scope">
                      <div class="w-full inline-block">
                        <el-image style="width: 40px; height: 40px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="简介" prop="date" min-width="340">
                    <template #default="scope">
                      <div class="w-full inline-block">
                        <div>
                          <span>测试产品一阀体</span>
                        </div>
                        <div>
                          <span class="text-xs text-gray-400">【连接形式：123】【滤网目数：123】【滤网材质：123】【结构形式：水平方式】【内直桶直径：123】【压力：12】【材质：不锈钢】</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间" prop="name" align="center">
                    <template #default="scope">
                      <div class="w-full inline-block">
                        <span>2022-07-07 08:42</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" prop="name" align="center">
                    <template #default="scope">
                      <div class="w-full inline-block">
                        <span class="mr-2 text-blue-500 cursor-pointer" @click="data.CombinedProductLibraryEdit.view = true"> <i class="iconfont icon-bianji1"></i> 编辑</span>
                        <span class="mr-2 text-green-500 cursor-pointer" @click="data.CombinedProductLibraryExamine.view = true">
                          <i class="iconfont icon-dingdan9"></i>
                          审核</span
                        >
                        <span class="text-red-500 cursor-pointer">
                          <i class="iconfont icon-shanchu" @click="deletes()"></i>
                          删除</span
                        >
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="图片" prop="name" width="64">
            <template #default="scope">
              <div class="w-full inline-block">
                <el-image style="width: 40px; height: 40px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="简介" prop="date" min-width="340">
            <template #default="scope">
              <div class="w-full inline-block">
                <div>
                  <span>测试产品一阀体</span>
                </div>
                <div>
                  <span class="text-xs text-gray-400">【连接形式：123】【滤网目数：123】【滤网材质：123】【结构形式：水平方式】【内直桶直径：123】【压力：12】【材质：不锈钢】</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="name" align="center">
            <template #default="scope">
              <div class="w-full inline-block">
                <span>2022-07-07 08:42</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="name" align="center">
            <template #default="scope">
              <div class="w-full inline-block">
                <span class="mr-2 text-blue-500 cursor-pointer" @click="data.CombinedProductLibraryEdit.view = true"> <i class="iconfont icon-bianji1"></i> 编辑</span>
                <span class="mr-2 text-green-500 cursor-pointer" @click="data.CombinedProductLibraryExamine.view = true">
                  <i class="iconfont icon-dingdan9"></i>
                  审核</span
                >
                <span class="text-red-500 cursor-pointer" @click="detals()">
                  <i class="iconfont icon-shanchu"></i>
                  删除</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </table-search>
    </div>
    <!-- 编辑 -->
    <CombinedProductLibraryEdit title="编辑产品" v-if="data.CombinedProductLibraryEdit.view" @closeWindow="closeWindow" />
    <!-- 审核 -->
    <CombinedProductLibraryExamine title="审核产品" v-if="data.CombinedProductLibraryExamine.view" @closeWindow="closeWindow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetPageList } from '/@/api/tech/EnquiryData'
import { parseTime } from '/@/utils/tools'
import CombinedProductLibraryEdit from './CombinedProductLibraryEdit.vue'
import CombinedProductLibraryExamine from './CombinedProductLibraryExamine.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

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
  }
}

export default defineComponent({
  components: {
    TableSearch,
    CombinedProductLibraryEdit,
    CombinedProductLibraryExamine
  },
  setup() {
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })
    const data = reactive({
      CombinedProductLibraryEdit: {
        view: false
      },
      CombinedProductLibraryExamine: {
        view: false
      },
      tableData2: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California'
            },
            {
              name: 'Spike',
              state: 'California'
            },
            {
              name: 'Tyke',
              state: 'California'
            }
          ]
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California'
            },
            {
              name: 'Spike',
              state: 'California'
            },
            {
              name: 'Tyke',
              state: 'California'
            }
          ]
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          family: [
            {
              name: 'Jerry',
              state: 'California'
            },
            {
              name: 'Spike',
              state: 'California'
            },
            {
              name: 'Tyke',
              state: 'California'
            }
          ]
        },
        {
          name: 'Tom',
          state: 'California',
          family: [
            {
              name: 'Jerry',
              state: 'California'
            },
            {
              name: 'Spike',
              state: 'California'
            },
            {
              name: 'Tyke',
              state: 'California'
            }
          ]
        },
        {
          name: 'Tom',
          state: 'California',
          family: [
            {
              name: 'Jerry',
              state: 'California'
            },
            {
              name: 'Spike',
              state: 'California'
            },
            {
              name: 'Tyke',
              state: 'California'
            }
          ]
        },
        {
          name: 'Tom',
          state: 'California',
          family: [
            {
              name: 'Jerry',
              state: 'California'
            },
            {
              name: 'Spike',
              state: 'California'
            },
            {
              name: 'Tyke',
              state: 'California'
            }
          ]
        },
        {
          name: 'Tom',
          state: 'California',
          family: [
            {
              name: 'Jerry',
              state: 'California'
            },
            {
              name: 'Spike',
              state: 'California'
            },
            {
              name: 'Tyke',
              state: 'California'
            }
          ]
        }
      ],
      tableData1: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
      // 表格数据
      tableData: [],
      customerName: ''
    })
    // 关闭弹窗
    const closeWindow = (type: string) => {
      data.CombinedProductLibraryExamine.view = false
      data.CombinedProductLibraryEdit.view = false
    }
    // 删除
    const detals = () => {
      ElMessageBox.confirm('确定执行删除操作？', '操作确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    return {
      data,
      Search,
      form,
      ...tableRender(form, data),
      closeWindow,
      detals
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
