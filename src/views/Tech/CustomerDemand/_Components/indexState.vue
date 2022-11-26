<template>
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
      <el-button type="info"> <i class="iconfont icon-mxjl mr-1"></i>返回录入 </el-button>
      <el-button type="primary"><i class="iconfont icon-dingdan21"></i>转入核算</el-button>
      <el-button type="danger">
        <i class="iconfont icon-baocun mr-1"></i>
        暂存
      </el-button>
      <el-button type="warning" @click="openWindow()"> <i class="iconfont icon-dingdan4 mr-1"></i>技术处理 </el-button>

      <el-button type="success"><i class="iconfont icon-goutong mr-1"></i>沟通记录</el-button>
      <el-button type="success" @click="SetBomId">
        <i class="iconfont icon-list mr-1"></i>
        加载数据 临时
      </el-button>
    </div>
  </div>
  <el-divider content-position="right"></el-divider>
  <div class="w-full">
    <div class="inline-block float-left leading-6">按名称：</div>
    <!-- <div
                      class="
                        w-20
                        h-8
                        mr-4
                        ml-2
                        inline-block
                        text-center
                        leading-8
                        rounded-3xl
                      "
                      :class="{ active: data.number == index }"
                      v-for="(item, index) in data.nameData"
                      :key="index"
                      @click="huanName(index)"
                    >
                      <span class="">{{ item.name }}</span>
                    </div> -->
    <div class="inline-block w-880">
      <el-checkbox-group v-model="checkboxGroup1" size="small" @change="change">
        <el-checkbox label="未处理" border />
        <el-checkbox label="已处理" border />
        <el-checkbox label="新型产品" border />
        <el-checkbox label="历史产品" border />
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
  <div>
    <el-table border :data="data.tableDataList" style="width: 100%" @selection-change="getSelectionRowsVal">
      <el-table-column type="selection" width="40" />
      <el-table-column label="展开" type="expand" width="55">
        <!-- 展开页 -->
        <template #default="props">
          <el-table :data="tableData" border style="width: 100%" :show-header="false">
            <el-table-column prop="" label="" width="40" />
            <el-table-column prop="date" label="Date" width="55" />
            <el-table-column label="产品" prop="ProductInfo">
              <template #default="scope">
                <div class="h-16 w-full relative;">
                  <div class="mt-5">
                    <div class="inline-block text-sm">
                      <span>蝶阀阀体 J341X-10Q DN50</span>
                    </div>
                    <div class="inline-block rounded-full w-6 h-6 border-2 border-yellow-500 text-sm text-center ml-2">替</div>
                    <div class="inline-block text-sm ml-2">无</div>
                    <div class="inline-block rounded-full w-6 h-6 border-2 border-blue-500 text-sm text-center ml-2">技</div>
                    <div class="inline-block text-sm ml-2">一般</div>
                    <div class="w-6 h-6 bg-red-500 text-white inline-block text-center float-right rounded-full">
                      <span>常</span>
                    </div>
                  </div>
                  <!-- <div >
                                   <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
                                </div> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column label="属性" prop="PropertyInfo" width="200" />
            <el-table-column label="单位" prop="unit" width="55" />
            <el-table-column label="数量" prop="quantity" width="55" />
            <el-table-column label="备注" prop="remark" width="100" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="产品" prop="ProductInfo"></el-table-column>
      <el-table-column label="属性" prop="PropertyInfo" width="200" />
      <el-table-column label="单位" prop="unit" width="55" />
      <el-table-column label="数量" prop="quantity" width="55" />
      <el-table-column label="备注" prop="remark" width="100" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, provide, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetProductTechnicalProcessingList } from '/@/api/tech/ProductBasics'

//窗口
const window = (form: any, data: any): any => {
  const openWindow = () => {
    if (data.selectTable.length == 0) {
      ElMessage.error('请选择一条数据！')
      return false
    }
    if (data.selectTable.length == 0 || data.selectTable.length > 1) {
      ElMessage.error('不可操作多条！')
      return false
    }
    data.indexWindow.show = true
    data.indexWindow.Id = data.selectTable[0].Id
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.indexWindow.show = false
  }
  return {
    openWindow,
    closeWindow
  }
}

export default defineComponent({
  setup() {
    const tableData = [
      {
        date: '阀体',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '阀体',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '阀体',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '阀体',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    const checkboxGroup1 = ref([])
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
      { name: 'Tag 12', type: 'info' },
      { name: 'Tag 12', type: 'info' },
      { name: 'Tag 12', type: 'info' }
    ])
    const data = reactive({
      selectTable: [],
      BomId: 0,
      // 列表数据
      tableDataList: []
    })
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const change = (value: any) => {
      console.log(value)
    }
    // 关闭任意一个tags
    const handClose = (index: any, tag: any) => {
      console.log(index)
      tags.value.splice(tags.value.indexOf(tag), 1)
    }
    const loadData = () => {
      GetProductTechnicalProcessingList(data.BomId).then((res) => {
        if (res.code == 1) {
          data.tableDataList = res.data
        }
      })
    }
    const SetBomId = () => {
      data.BomId = 200000
      loadData()
    }
    const getSelectionRowsVal = (val: any) => {
      data.selectTable = val
    }
    return {
      checkboxGroup1,
      tags,
      change,
      data,
      handClose,
      SetBomId,
      form,
      tableData,
      getSelectionRowsVal,
      ...window(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
