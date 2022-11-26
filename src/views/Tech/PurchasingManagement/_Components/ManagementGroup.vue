<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 tech_purchasingManagement_billMaterials">
      <div class="flex items-center text-sm justify-between my-3">
        <div class="flex items-center">
          <svg-icon class="text-xl mr-1.5" icon-class="svg-group-red" />
          <span class="mr-1.5">全部</span>
          <el-tag type="info" effect="plain">系统内置</el-tag>
        </div>
        <div>
          <span class="text-red-300 mr-1.5">{{ data.TotalProductCount }}</span>
          <span class="text-gray-500">个全部产品</span>
        </div>
      </div>
      <div class="flex items-center text-sm justify-between my-3">
        <div class="flex items-center">
          <svg-icon icon-class="svg-group-red" class="text-xl mr-1.5"/>
          <span class="mr-1.5">未分组</span>
          <el-tag type="info" effect="plain">系统内置</el-tag>
        </div>
        <div>
          <span class="text-red-300 mr-1.5">{{ data.UngroupedProductCount }}</span>
          <span class="text-gray-500">个未分组产品</span>
        </div>
      </div>

      <div class="flex items-center text-sm justify-between my-3" v-for="(item,index) in data.Groups" :key="index">
        <div class="flex items-center">
          <svg-icon icon-class="svg-group-green" class="text-xl m-1.5"/>
          <span class="mr-1.5 text-blue-500 cursor-pointer" @click="Submit(item.Group)">{{item.GroupIndex}}组</span>
        </div>
        <div>
          <span class="text-green-400 mr-1.5">{{ item.ProductCount }}</span>
          <span class="text-gray-500">个分组产品</span>
        </div>
      </div>

      <div class="w-full h-px my-4 bg-gray-100"></div>
      <div class="float-right mr-2 pb-4" v-if="data.IsConfirmSupplier != 1">
        <el-button @click="deleteGroup" v-if="data.Groups.length > 0">删除分组</el-button>
        <!-- <el-button @click="deleteGroup">全部</el-button> -->
        <el-button type="primary" @click="Submit(0)">新建分组</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetMaterialStatistics, PostSetMaterialGroupSave, PostDeleteGroup } from '/@/api/tech/Material'
import { convertToChinaNum } from '/@/utils/tools'

// 列表数据请求
const renderTableList = async (data: any) => {
  await GetMaterialStatistics({Id: data.Id}).then((res:any) => {
    console.log(res.data)
    if (res.code == 1) {
      data.Groups = res.data.Groups
      data.TotalProductCount = res.data.TotalProductCount
      data.UngroupedProductCount = res.data.UngroupedProductCount
    }
  })
}

export default defineComponent({
  components: {
    OpenWindow,
  },
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0,
        selectDetail: []
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      selectDetail: [],
      TotalProductCount: 0, // 全部
      UngroupedProductCount: 0, // 未分组
      Groups: [], // 组
      Id: 0
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })

    // 提交
    const Submit = (group: any) => {
      let _selectDetail= <any>[]
      data.selectDetail.forEach((item:any) => {
        _selectDetail.push(item.Id)
      })
      PostSetMaterialGroupSave(group,data.Id,_selectDetail).then(res=>{
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
        if(res.code == 1) {
          context.emit('closeWindow', 'submit')
        }
      })
    }

    // 全部删除
    const deleteGroup = () => {
      console.log(data.Groups)
      let _GroupsListIds = <any>[]
      if (data.selectDetail.length > 0) {
        data.selectDetail.forEach((item:any) => {
          _GroupsListIds.push(item.Group)
        })
      } else {
        ElMessage.error('暂无分组')
        return false
      }
      

      PostDeleteGroup(data.Id, _GroupsListIds).then(res=>{
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
        if(res.code == 1) {
          context.emit('closeWindow', 'submit')
        }
      })
    }

    onMounted(() => {
      data.selectDetail = props.FormData.selectDetail
      data.Id = props.FormData.Id
      renderTableList(data)
    })
    return {
      boxStyle,
      closeWindow,
      Submit,
      deleteGroup,
      convertToChinaNum,
      data
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-input-number){
  width: 100px;
}
</style>
