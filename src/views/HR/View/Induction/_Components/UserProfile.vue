<template>
  <div class="UserProfile">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
      <template #title>
        <div class="rounded-full text-right bf-window-padding" style="padding-bottom: 0">
          <el-icon class="cursor-pointer" @click="closeWindow('close')">
            <el-icon-close />
          </el-icon>
        </div>
      </template>
      <div class="bf-window-padding">
        <!-- 展示口 -->
        <!-- 员工档案表 -->
        <div v-show="data.step == 1">
          <div v-html="data.EmployeeFiles"></div>
        </div>
        <!-- 劳务协议-->
        <div v-show="data.step == 2">
          <div v-html="data.ServiceAgreement"></div>
        </div>
        <!-- 劳动合同-->
        <!-- v-show="data.step>=3&&data.step<100" -->
        <div v-show="data.step == 3">
          <div v-html="data.LaborContract.list[0]"></div>
        </div>
        <div v-show="data.step == 4">
          <div v-html="data.LaborContract.list[1]"></div>
        </div>
        <div v-show="data.step == 5">
          <div v-html="data.LaborContract.list[2]"></div>
        </div>
        <div v-show="data.step == 6">
          <div v-html="data.LaborContract.list[3]"></div>
        </div>
        <div v-show="data.step == 7">
          <div v-html="data.CompanySystem"></div>
        </div>
        <!-- 打印口 -->
        <div class="w-0 h-0 overflow-hidden">
          <div id="printMe" popTitle="北方阀门">
            <!-- 员工档案表 -->
            <div v-html="data.EmployeeFiles"></div>
            <div class="bf-print-page"></div>
            <!-- 劳务协议-->
            <div v-html="data.ServiceAgreement"></div>
            <div class="bf-print-page"></div>
            <!-- 劳动合同-->
            <div v-html="data.LaborContract.Content"></div>
            <div class="bf-print-page"></div>
            <!-- 条款制度表 -->
            <div v-html="data.CompanySystem"></div>
          </div>
        </div>
      </div>
    </OpenWindow>
    <div class="text-center mt-10" style="position: fixed;right: 44%;bottom: 60px;z-index: 999;">
      <el-button type="warning" @click="stepEvent('')" v-if="data.step>1">上一页</el-button>
      <el-button type="warning" @click="stepEvent('add')" v-if="data.step<7">下一页</el-button>
      <el-button @click="closeWindow('close')">取消</el-button>
      <el-button type="primary" v-print="print">打印</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { GetStaffDeptIdByContractinfo } from '/@/api/system/contractSetting'
import { htmlDecodeByRegExp } from '/@/utils/tools'
import { remoteUrl } from '/@/utils/tools'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
// 根据上传文件拼接路径
const remoteUrlEvent = (url: string) => {
  return remoteUrl(url)
}
const setExecStrs = (str: any, list: any) => {
  if (list) {
    for (let item of list) {
      str = str.replace('{{' + item.label + '}}', item.value)
    }
  }
  str = str.replace('>-<', '><')
  str = str.replace('>-', '>')
  str = str.replace('-<', '<')
  return str
}
const getExecStrs = (str: any) => {
  var reg = /{{(.+?)\}}/g
  var list = []
  var result = null
  do {
    result = reg.exec(str)
    result && list.push(result[1])
  } while (result)
  return list
}
const decodeRich = (rich: any, details: any) => {
  rich = htmlDecodeByRegExp(rich)
  let list = getExecStrs(rich).map(function (item: any) {
    if (item == 'IdCardFrontFilePath' || item == 'IdCardBackFilePath' || item == 'FilesSign' || item == 'LabourSign' || item == 'ContractSign' || item == 'CompanySystemSign' || item == 'StaffUploadFileAvatar') {
      return {
        label: item,
        value: remoteUrlEvent(details.info[item])
      }
    } else if (item == 'item.FamilyRelat' || item == 'item.Name' || item == 'item.PhoneNumber' || item == 'item.Profession') {
      return {
        label: item,
        value: details.FamilySituations[0][item.substring(5)]
      }
    } else if (item == 'itemTwo.FamilyRelat' || item == 'itemTwo.Name' || item == 'itemTwo.PhoneNumber' || item == 'itemTwo.Profession') {
      if (details.FamilySituations.length > 1) {
        return {
          label: item,
          value: details.FamilySituations[1][item.substring(8)]
        }
      } else {
        return {
          label: item,
          value: ''
        }
      }
    } else if (item == 'InductionBeginDate' || item == 'InductionEndDate' || item == 'CompanyName' || item == 'QuitReason' || item == 'QuitNameorNumber') {
      return {
        label: item,
        value: details.StaffProInfos && details.StaffProInfos ? details.StaffProInfos[0][item] : []
      }
    } else if (item == 'InductionBeginDate-two' || item == 'InductionEndDate-two' || item == 'CompanyName-two' || item == 'QuitReason-two' || item == 'QuitNameorNumber-two') {
      if (details.StaffProInfos && details.StaffProInfos.length > 1) {
        return {
          label: item,
          value: details.StaffProInfos[1][item.match(/(\S*)-/)[1]]
        }
      } else {
        return {
          label: item,
          value: ''
        }
      }
    } else if (item == 'InductionBeginDate-three' || item == 'InductionEndDate-three' || item == 'CompanyName-three' || item == 'QuitReason-three' || item == 'QuitNameorNumber-three') {
      if (details.StaffProInfos && details.StaffProInfos.length > 2) {
        return {
          label: item,
          value: details.StaffProInfos[2][item.match(/(\S*)-/)[1]]
        }
      } else {
        return {
          label: item,
          value: ''
        }
      }
    } else {
      return {
        label: item,
        value: details.info[item]
      }
    }
  })
  return setExecStrs(rich, list)
}
const GetContractManagementInfoEvent = async (data: any) => {
  // 根据部门Id获取档案合同信息
  // data.details.info.Id
  var arr = {
    StaffId: data.details.info.Id,
    Id: data.DeptId
  }
  GetStaffDeptIdByContractinfo(arr).then((val: any) => {
    // 员工档案表
    if (val.data.EmployeeFiles) {
      data.EmployeeFiles = decodeRich(val.data.EmployeeFiles.RichText, data.details)
    }
    // 劳务协议
    if (val.data.ServiceAgreement) {
      data.ServiceAgreement = decodeRich(val.data.ServiceAgreement.RichText, data.details)
    }
    // 劳动合同
    if (val.data.LaborContract) {
      let list: any = []
      data.LaborContract.Content = decodeRich(val.data.LaborContract.RichText, data.details)
      let tempList = (data.LaborContract.Content || '').split(`<div class="bf-print-page"> </div>`)
      tempList.forEach((x: any) => {
        list.push(x)
      })
      data.LaborContract.list = list
      console.log(data.LaborContract.list)
    }
    // 条款制度表
    if (val.data.CompanySystem) {
      data.CompanySystem = decodeRich(val.data.CompanySystem.RichText, data.details)
    }
  })
}
const LaborContractRef = ref()
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 面试Id
    Id: {
      type: Number,
      default: null
    },
    // 部门Id
    DeptId: {
      type: Number,
      default: 0
    },
    //入职详情
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      step: 1, //步骤
      DeptId: props.DeptId,
      details: props.details, //入职详情
      EmployeeFiles: [], //入职档案
      ServiceAgreement: [], //劳务协议
      LaborContract: {
        list: [],
        Content: ''
      }, //劳动合同
      CompanySystem: [] //制度条款表
    })
    let print = reactive({
      id: 'printMe',
      popTitle: '中国·北方阀门',
      openCallback() {
        console.log('点击v-print绑定的按钮了！')
      },
      closeCallback() {
        console.log('关闭了打印工具！')
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-880',
      boxHeight: 'h-1200',
      boxPaddingTop: 'pt-0'
    })
    // 步骤事件
    const stepEvent = (type: string) => {
      if (type == 'add') {
        data.step += 1
      } else {
        data.step -= 1
      }
    }
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return { boxStyle, data, closeWindow, print, stepEvent, LaborContractRef }
  }
})
</script>

<style lang="postcss" scoped>
.UserProfile {
  :deep(.bf-windows-content) {
    min-height: 121vh;
    transform: scale(0.76);
    margin-top: -104px;
  }
  :deep(.overflow-y-auto) {
    overflow-y: hidden !important;
  }
  :deep(table td) {
    padding: 0px 2px !important;
    height: 2.1rem;
  }
}
:deep(.ClauseconfigForm) {
  table {
    border: 1px solid #333;
    border-collapse: collapse;

    th,
    td {
      font-family: SimSun;
      padding: 6px 2px;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
      font-size: 1rem;
      height: 2.2rem;
      empty-cells: show;
    }
  }
}
:deep(.EmployeeFiles) {
  font-family: '宋体';
}
.mt-72 {
  margin-top: 18rem;
}
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
