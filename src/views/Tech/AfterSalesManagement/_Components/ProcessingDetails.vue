<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-2">
      <!-- #region  基本信息-->
      <div class="flex">
        <div class="flex-auto">
          <img class="inline-block h-4 mr-2 align-middle" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span class="text-sm">基本信息</span>
        </div>
        <div>
          <span class="text-sm">合同登记编号：BG2108200002</span>
        </div>
      </div>
      <div class="pt-2 pb-2">
        <el-input v-model="data.information.NameInput" style="width: 410px; margin-right: 15px" disabled placeholder="金烨钢铁集团铸造有限公司">
          <template #prepend>客户名称</template>
        </el-input>
        <el-input v-model="data.information.contactsInput" style="width: 200px; margin-right: 15px" disabled placeholder="贾经理">
          <template #prepend>&nbsp;&nbsp;联系人&nbsp;&nbsp;</template>
        </el-input>
        <el-input v-model="data.information.numberInput" style="width: 200px" disabled placeholder="13305368888">
          <template #prepend>联系电话</template>
        </el-input>
        <el-input v-model="data.information.amountInput" style="width: 200px; margin: 12px 13px 12px 0" disabled placeholder="36580">
          <template #prepend>合同金额</template>
        </el-input>
        <el-input v-model="data.information.arrearsInput" style="width: 200px; margin: 12px 13px 12px 0" disabled placeholder="36580">
          <template #prepend>合同欠款</template>
        </el-input>
        <el-input v-model="data.information.periodInput" style="width: 200px; margin: 12px 13px 12px 0" disabled placeholder="3年">
          <template #prepend>&nbsp;&nbsp;质保期&nbsp;&nbsp;</template>
        </el-input>
        <el-input v-model="data.information.timeInput" style="width: 200px; margin: 12px 0 12px 0" disabled placeholder="2022-09-09">
          <template #prepend>合同时间</template>
        </el-input>
        <el-input v-model="data.information.salesmanInput" style="width: 200px; margin: 0 13px 12px 0" disabled placeholder="王海涛">
          <template #prepend>&nbsp;&nbsp;业务员&nbsp;&nbsp;</template>
        </el-input>
        <el-input v-model="data.information.divisionInput" style="width: 200px; margin: 0 13px 12px 0" disabled placeholder="潍坊事业部">
          <template #prepend>&nbsp;&nbsp;事业部&nbsp;&nbsp;</template>
        </el-input>
        <el-input v-model="data.information.gradeInput" style="width: 200px; margin: 0 13px 12px 0" disabled placeholder="加急">
          <template #prepend>售后等级</template>
        </el-input>
        <el-input v-model="data.information.submissionInput" style="width: 200px; margin: 0 0 12px 0" disabled placeholder="2021-10-15">
          <template #prepend>提交时间</template>
        </el-input>
        <el-input v-model="data.information.addressInput" style="width: 413px; margin-right: 15px" disabled placeholder="山东省潍坊市经济开发区泰祥西街3999号59号楼">
          <template #prepend>售后地址</template>
        </el-input>
        <el-input v-model="data.information.remarksInput" style="width: 413px" disabled placeholder="客户退换货">
          <template #prepend>&nbsp;&nbsp;&nbsp;备注&nbsp;&nbsp;&nbsp;</template>
        </el-input>
      </div>
      <!-- #endregion -->

      <!-- #region  附件信息-->
      <div class="flex">
        <div class="flex-auto">
          <img class="inline-block h-4 mr-2 align-middle" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span class="text-sm">附件信息</span>
        </div>
      </div>
      <div class="bf-table-content">
        <el-table :data="data.EnclosureData">
          <el-table-column prop="Name" label="文件名" min-width="200px">
            <template #default="scope">
              <span>996b06c272cee6041751f585e7aa8f4.jpg</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="大小" align="center">
            <template #default="scope">
              <span>1559.22 KB</span>
            </template>
          </el-table-column>
          <el-table-column prop="work" label="操作" align="center">
            <template #default="scope">
              <div class="text-blue-500 cursor-pointer"><i class="iconfont icon-zitiyulan"></i> 预览 <i class="iconfont icon-daoru ml-2"></i> 下载</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- #endregion -->

      <!-- #region 售后进程 -->
      <div class="flex pt-2 pb-2">
        <div class="flex-auto">
          <img class="inline-block h-4 mr-2 align-middle" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span class="text-sm">售后进程</span>
        </div>
      </div>
      <div class="flex pt-2" v-for="item in 6">
        <div class="flex-auto clearfix">
          <div class="float-left">
            <img class="w-10 h-10 rounded-full" src="../../../../assets/img/tech/header.jpg" alt="" />
          </div>
          <div class="float-left pt-2 ml-2 leading-5">
            <p class="text-sm">王海涛 <span class="text-xs text-gray-400">业务员</span></p>
            <p class="text-xs text-gray-400">非质量问题，订货错误；问题描述：客户订货错误，需要紧急处理</p>
          </div>
        </div>
        <div class="leading-10 text-gray-400 text-xs">
          <i class="iconfont icon-shijian mr-1 text-xs"></i>
          <span>2022-08-23 22:31</span>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region  -->
      <!-- <div>
        <el-input class="mt-3" v-model="data.information.ApprovalTextarea" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="审批意见" />
        <div class="bf-search-formItem mt-4 mb-4 float-right">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button>驳 回</el-button>
              <el-button type="primary">通 过</el-button>
            </div>
          </el-form-item>
        </div>
      </div> -->
      <!-- #endregion -->

      <!-- #region  指定人员-->
      <!-- <div>
        <div class="pt-2 pb-2">
          <span class="text-sm mr-2">指定人员</span>
          <el-select v-model="form.NameId" placeholder="选择人员">
            <el-option v-for="item in data.NameList" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </div>
        <el-input class="mt-2" v-model="data.information.ApprovalTextarea" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="处理意见" />
        <div class="bf-search-formItem mt-4 mb-4 float-right">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button>取 消</el-button>
              <el-button type="primary">确 定</el-button>
            </div>
          </el-form-item>
        </div>
      </div> -->
      <!-- #endregion -->
      <!-- #region  处理结果-->
      <!-- <div>
        <div class="pt-2 pb-2">
          <span class="text-sm mr-2">处理结果</span>
          <el-select v-model="form.resultsId" placeholder="处理结果" style="width: 120px" class="mr-2">
            <el-option v-for="item in data.resultsList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-checkbox v-model="data.incurredChecked" label="产生费用" size="large" />
          <el-radio-group v-model="data.incurredRadio" class="ml-4">
            <el-radio label="1" size="large">预估金额</el-radio>
            <el-radio label="2" size="large">实际金额</el-radio>
          </el-radio-group>
          <el-input style="width: 150px; margin-left: 12px" v-model="data.incurredInput" placeholder="输入金额" />
          <span class="text-sm text-blue-500 ml-3 mr-3 cursor-pointer">上传凭证</span>
          <span class="text-sm text-gray-400 cursor-pointer">查看凭证</span>
        </div>
        <el-input class="mt-2" v-model="data.information.ApprovalTextarea" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="售后原因及处理方案" />
        <div class="bf-search-formItem mt-4 mb-4 float-right">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button>取 消</el-button>
              <el-button type="primary">确 定</el-button>
            </div>
          </el-form-item>
        </div>
      </div> -->
      <!-- #endregion -->
      <!-- #region -->
      <div>
        <div class="pt-2 pb-2">
          <span class="text-sm mr-2">处理结果</span>
          <el-select v-model="form.resultsId" placeholder="处理结果" style="width: 120px" class="mr-2">
            <el-option v-for="item in data.resultsList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </div>
        <el-input class="mt-2" v-model="data.information.ApprovalTextarea" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="处理结果及客户意见" />
        <div class="bf-search-formItem mt-4 mb-4 float-right">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button>取 消</el-button>
              <el-button type="primary">确 定</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const form = reactive({
      NameId: '',
      resultsId: ''
    })
    const data = reactive({
      incurredRadio: '',
      incurredInput: '',
      incurredChecked: false,
      // 基本信息
      information: {
        NameInput: '',
        ApprovalTextarea: '',
        contactsInput: '',
        numberInput: '',
        amountInput: '',
        arrearsInput: '',
        periodInput: '',
        timeInput: '',
        salesmanInput: '',
        divisionInput: '',
        gradeInput: '',
        submissionInput: '',
        addressInput: '',
        remarksInput: ''
      },
      EnclosureData: [{ value: 1 }, { value: 1 }],
      NameList: [
        {
          value: 'Beijing',
          label: 'Beijing'
        },
        {
          value: 'Shanghai',
          label: 'Shanghai'
        },
        {
          value: 'Nanjing',
          label: 'Nanjing'
        },
        {
          value: 'Chengdu',
          label: 'Chengdu'
        }
      ],
      resultsList: [
        { Name: '已解决', Id: '1' },
        { Name: '处理中', Id: '2' }
      ]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-880',
      boxHeight: ''
    })

    return {
      boxStyle,
      closeWindow,
      data,
      form
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-input-group__prepend) {
  padding: 0 10px;
}
</style>
