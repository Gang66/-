<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <div class="bf-search-formItem flex justify-between">
        <el-form-item label="合同名称" prop="DepartIds"
          ><div class="bf-text-color-primary">{{ data.ContractInfo.ContractUnitName }}</div></el-form-item
        >
      </div>
      <el-row :gutter="10">
        <el-col :md="24" :lg="24">
          <el-form-item label="部门绑定" prop="BeginDate">
            <div v-for="(item, index) in data.selectData" :key="index" class="dept-bg bf-window-header-bg float-left mr-2 mt-1">{{ item.Name }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center w-full">
        <el-button @click="closeWindow('close')">取 消</el-button>
        <el-button type="primary" @click="data.contractSetFormWindow.show = true">编 辑</el-button>
      </div>
    </el-form>
    <ContractSettingForm title="合同设置" v-if="data.contractSetFormWindow.show" :setUp="data.contractSetFormWindow.setUp" :isEdit="data.contractSetFormWindow.isEdit" :Id="data.contractSetFormWindow.Id" @closeWindow="closeWindow"></ContractSettingForm>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from "/@/components/OpenWindow/index.vue";
import { defineComponent, onMounted, reactive, SetupContext } from "vue";
import { useCommonStore } from "/@/store/modules/Common";
import { GetContractManagementInfo } from "/@/api/system/contractSetting";
import ContractSettingForm from "../_Components/ContractSettingForm.vue";
import { ElMessage } from "element-plus";
const store = useCommonStore(); //记得加这一句
export default defineComponent({
  components: {
    OpenWindow,
    ContractSettingForm,
  },
  emits: ["closeWindow"],
  props: {
    Id: {
      type: Number,
      default: null,
    },
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {},
      // 新增合同弹窗数据
      contractSetFormWindow: {
        show: false,
        Id: null,
        isEdit: true, //是否可以修改 true否 false是
        setUp: true, //是否是合同设置 true 是 false否
      },
      ContractInfo: {}, //合同信息
      selectData: [], //绑定数据
      Id: props.Id,
    });

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit("closeWindow", type);
    };
    // 页面样式
    const boxStyle = reactive({
      boxWidth: "w-600",
      boxHeight: "",
    });
    onMounted(() => {
      GetContractManagementInfo(data.Id).then((res) => {
        if (res.code == 1) {
          data.selectData = res.data.DepartIds;
          data.ContractInfo = res.data.ContractInfo;
          data.contractSetFormWindow.Id = res.data.ContractInfo.Id;
        } else {
          ElMessage.error(res.message);
        }
      });
    });
    return { boxStyle, data, closeWindow };
  },
});
</script>

<style lang="postcss" scoped>
.buttonHeight {
  height: 28px;
}
.dept-bg {
  width: 88px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
}
</style>
