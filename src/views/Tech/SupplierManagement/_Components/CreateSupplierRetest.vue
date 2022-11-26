<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <template #title>
      <div class="header px-4 pt-2 pb-2 sale_bg EditSalesContract_header">
        <div class="flex justify-between">
          <div class="text-sm">
            重名检测: 【<span class="text-yellow-500">{{ data.Name }}</span
            >】
          </div>
          <el-icon @click="closeWindow('close')" class="cursor-pointer">
            <el-icon-Close />
          </el-icon>
        </div>
      </div>
    </template>
    <!-- 表格 -->
    <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
      <div class="p-4 pt-2">
        <el-table :data="data.RepeatSupplierList" stripe :show-header="false">
          <el-table-column prop="CreateOn">
            <template #default="scope">
              <p v-html="scope.row.CompanyName.replace(data.Name, `<font color='#ff0909'>${data.Name}</font>`)"></p>
            </template>
          </el-table-column>
          <el-table-column prop="CompName">
            <template #default="scope">
              <span class="text-xs text-gray-400"> 最后更新：{{ scope.row.UpdateOn }} </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </table-search>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import TableSearch from '/@/components/TableSearch/index.vue'
const store = useCommonStore() //记得加这一句
import { parseTime } from '/@/utils/tools'
import { ElMessage } from 'element-plus'
import { GetHasRepeatSupplier } from '/@/api/tech/Supplier'

export default defineComponent({
  components: {
    OpenWindow,
    TableSearch
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0
    })
    let data = reactive({
      Name: '',
      RepeatSupplierList: [],
      teshuName: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-520',
      boxHeight: ''
    })

    // 列表数据请求
    const renderTableList = async (form: any, data: any) => {
      const datas = {
        Name: props.FormData.ClientName,
        page: 1,
        size: 10,
        totals: 0
      }
      await GetHasRepeatSupplier(datas).then((res: any) => {
        console.log(res)
        if (res.code == 1) {
          data.RepeatSupplierList = res.data
          form.totals = res.data.totals
        } else {
          ElMessage.error(res.message)
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
      return {
        getStatus,
        handleSizeChange,
        handleCurrentChange,
        indexMethod
      }
    }
    onMounted(() => {
      console.log(props.FormData)
      data.Name = props.FormData.ClientName
    })

    return {
      closeWindow,
      data,
      boxStyle,
      form,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.EditSalesContract_header {
  background-color: var(--7ba5bd90-themeStyle_sidebarBg) !important;
  color: #ffffff;
}
</style>
