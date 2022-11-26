<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding"
      hide-required-asterisk>
      <el-form-item label="字典类型" prop="Type">
        <el-input v-model="data.ruleForm.Type" disabled />
      </el-form-item>
      <el-form-item label="数据标签" prop="InfoLabel">
        <el-input v-model="data.ruleForm.InfoLabel" />
      </el-form-item>
      <el-form-item label="数据键值" prop="DicKey">
        <el-input v-model="data.ruleForm.DicKey" />
      </el-form-item>
      <el-form-item label="显示排序" prop="NumSort">
        <el-input v-model="data.ruleForm.NumSort" />
      </el-form-item>

      <el-form-item label="字典状态" prop="Status">
        <el-radio-group v-model="data.ruleForm.Status">
          <el-radio :label="item.DicKey" v-for="(item, index) in data.ruleForm.job" :key="index" :value="item.DicValue">
            {{ item.DicValue }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="Remark">
        <el-input v-model="data.ruleForm.Remark" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
      </el-form-item>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from "/@/components/OpenWindow/index.vue";
import { defineComponent, onMounted, reactive, ref, SetupContext } from "vue";
import { dictionaryTypeData } from "/@/type/views/system/dictionary";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { addDictionaryType, editDictionaryType, getTypeDetails } from "/@/api/system/dictionary";
import { useRoute } from "vue-router";
import { useCommonStore } from "/@/store/modules/Common";
const store = useCommonStore(); //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>();
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (data.Id) {
          editDictionaryType(data.ruleForm).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: "success",
              });
              closeWindow("submit");
            } else {
              ElMessage.error(res.message);
            }
          });
        } else {
          addDictionaryType(data.ruleForm).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: "success",
              });
              closeWindow("submit");
            } else {
              ElMessage.error(res.message);
            }
          });
        }
      }
    });
  };
  //校验
  const rules = reactive<FormRules>({
    InfoLabel: [{ required: true, message: "请填写数据标签", trigger: "blur" }],
    DicKey: [{ required: true, message: "请填写数据键值", trigger: "blur" }],
    Status: [{ required: true, message: "请选择字典状态", trigger: "changge" }],
    Remark: [{ required: true, message: "请填写字典备注", trigger: "blur" }],
    NumSort: [{ required: true, message: "请填写显示排序", trigger: "blur" }],
  });
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };
  return { rules, submitForm, resetForm, ruleFormRef };
};
export default defineComponent({
  components: {
    OpenWindow,
  },
  emits: ["closeWindow"],
  props: {
    Id: {
      type: Number,
      default: null,
    },
  },
  setup(props, context: SetupContext) {
    let job: any;
    let route = useRoute();
    onMounted(() => { });
    let data: dictionaryTypeData = reactive({
      ruleForm: {
        ParentId: Number(route.query.Id),
        Type: route.query.Type,
        InfoLabel: "",
        NumSort: undefined,
        DicKey: "",
        Status: "",
        Remark: "",
        job: {},
      },
      Id: props.Id,
    });
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit("closeWindow", type);
    };
    // 页面样式
    const boxStyle = reactive({
      boxWidth: "w-1/4",
      boxHeight: "",
    });
    onMounted(() => {
      // 根据Id获取详情
      if (props.Id) {
        getTypeDetails(props.Id).then((res) => {
          if (res.code == 1) {
            data.ruleForm = res.data;
            data.ruleForm.Type = route.query.Type;
          } else {
            ElMessage.error(res.message);
          }
        });
      }
      let storeData = store.getDict("sys_job_status");
      // 获取字典
      storeData.then((res: any) => {
        data.ruleForm.job = res;
      });
    });
    return { boxStyle, job, data, closeWindow, ...formEvent(data, closeWindow) };
  },
});
</script>

<style scoped>
</style>
