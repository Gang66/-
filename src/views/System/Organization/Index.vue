<template>
  <!-- 组织架构中间值 -->
  <div class="bf-content">
    <div class="bf-center-content">
      <tabs :tabList="data.tabList" @handleClick="selectEvent">
        <template #button>
          <template v-if="data.selectIndex == 0">
            <!-- <template v-if="data.level == 2">
              <el-button type="primary" :disabled="data.single" @click="ContractSettingWindowForm">合同设置</el-button>
              <el-button type="primary" :disabled="data.single" @click="MapContainerWindowForm">位置设置</el-button>
              <el-button type="primary" :disabled="data.single" @click="attendanceSetWindowForm">考勤设置</el-button>
            </template> -->
            <el-button type="primary" :disabled="data.single" @click="openRegionBindingForm">区域绑定</el-button>
            <el-button type="primary" :disabled="data.single" @click="setPostBin">岗位绑定</el-button>
            <el-button type="primary" @click="deptForm">新增部门</el-button>
          </template>
          <template v-else-if="data.selectIndex == 1">
            <el-button type="primary" @click="postForm">新增岗位</el-button>
            <el-button type="primary" @click="postFormType">新增岗位类型</el-button>
            <el-button type="primary" :disabled="data.single" @click="characterForm">性格配比</el-button>
          </template>
          <template v-else-if="data.selectIndex == 2">
            <div class="flex justify-end">
              <el-input v-model="data.Name" placeholder="员工姓名" class="screen-width " />
              <el-button type="primary" class="ml-2" @click="search">搜索</el-button>
              <el-button type="primary" :disabled="data.single" @click="openRosterForm">编辑</el-button>
            </div>
          </template>
        </template>
      </tabs>
      <div class="bf-table-content">
        <Organization @single="singleChange" v-if="data.selectIndex == 0" ref="RefOrganization" @levelEvent="levelEvent"></Organization>
        <PostSetting @single="singleChange" v-if="data.selectIndex == 1" ref="RefChilde"></PostSetting>
        <Roster @single="singleChange" v-else-if="data.selectIndex == 2" ref="RefRoster"></Roster>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import PostSetting from '../Post/postSetting.vue'
import tabs from '/@/components/Tabs/Index.vue'
import Organization from './Organization.vue'
import Roster from '../Roster/Index.vue'
import { parseTime } from '/@/utils/tools'
export default defineComponent({
  components: {
    tabs,
    Organization,
    PostSetting,
    Roster
  },
  props: {},
  setup() {
    const RefChilde = ref()
    const RefOrganization = ref()
    const RefRoster = ref()
    const data = reactive({
      Name: '',
      // 标题
      tabList: [
        {
          name: '组织架构'
        },
        {
          name: '岗位设置'
        },
        {
          name: '花名册管理'
        }
      ],
      single: true, //单选
      level: 1, //等级
      selectIndex: 0 //当前选中下标
    })
    // 监听单选
    const singleChange = (val: boolean) => {
      data.single = val
    }
    // 标题监听
    const selectEvent = (index: number) => {
      data.single = true
      data.selectIndex = index
    }
    // 监听组织架构等级
    const levelEvent = (val: any) => {
      data.level = val
    }
    //部门表单
    const deptForm = () => {
      RefOrganization.value.data.deptFormDialog.view = true
    }
    // 岗位表单
    const postForm = () => {
      RefChilde.value.data.postFormDialog.view = true
    }
    // 新增岗位类型
    const postFormType = () => {
      RefChilde.value.data.postFormTypeDialog.view = true
    }
    // 岗位绑定
    const setPostBin = () => {
      RefOrganization.value.data.PostBindingDialog.view = true
    }
    // 岗位性格测试
    const characterForm = () => {
      RefChilde.value.data.characterDialog.view = true
    }
    // 考勤设置
    const attendanceSetWindowForm = () => {
      RefOrganization.value.data.attendanceSetWindow.view = true
    }
    // 考勤设置
    const ContractSettingWindowForm = () => {
      RefOrganization.value.data.ContractSettingWindow.view = true
    }
    // 考勤设置
    const MapContainerWindowForm = () => {
      RefOrganization.value.data.MapContainerWindow.view = true
    }
    // 区域绑定
    const openRegionBindingForm = () => {
      RefOrganization.value.data.RegionBindingFormWindow.view = true
    }
    // 花名册编辑
    const openRosterForm = () => {
      console.log(RefRoster.value)
      RefRoster.value.data.RosterFormWindow.view = true
    }
    const search = () => {
      RefRoster.value.form.EmployeeName = data.Name
      RefRoster.value.search()
    }
    return { RefOrganization, RefChilde, RefRoster, data, search, MapContainerWindowForm, openRosterForm, selectEvent, singleChange, deptForm, postForm, postFormType, setPostBin, levelEvent, characterForm, attendanceSetWindowForm, ContractSettingWindowForm, openRegionBindingForm }
  }
})
</script>

<style lang="scss" scoped></style>
