<template>
  <div class='bf-content hr-route-content'>
    <table-search />

    <el-row v-action='"add"' class='mb-1'>
      <el-button type='primary'>添加权限</el-button>
      <el-tag class='ml-1'>v-action='"add"'</el-tag>
    </el-row>

  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import TableSearch from '/@/components/TableSearch/index.vue'

import { useLayoutStore } from '/@/store/modules/layout'

const departmentRender = () => {
  const { login, getUser } = useLayoutStore()
  let form = reactive({
    name: 'admin',
    pwd: 'bf2020'
  })


  return {
    form
  }
}

/* const renderTableList = async(table: ITable<IRenderTableList>, form: ISearchForm) => {
    const d = await getTableList({ page: table.page, size: table.size, tag: form.tag })
    table.data = d.data.Data.data
    table.total = d.data.Data.total
}

const tableRender = (table: ITable<IRenderTableList>, form: ISearchForm) => {
    renderTableList(table, form)
    const handleSizeChange = (v: number) => (table.size = v) && renderTableList(table, form)
    const handleCurrentChange = (v: number) => (table.page = v) && renderTableList(table, form)
    const indexMethod = (index: number) => (table.page - 1) * table.size + index + 1
    const getSummaries = tableSummaries
    return { table, handleSizeChange, handleCurrentChange, indexMethod, getSummaries }
} */

export default defineComponent({
  name: 'HRRoute',
  components: {
    TableSearch
  },
  setup () {



    return {
      ...tableRender(tableData, form)
    }
  }
})
</script>

<style>
</style>
