<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <el-form-item label="岗位名称" prop="PostName">
            <el-input v-model="data.ruleForm.PostName" placeholder="请填写岗位名称" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="岗位类型" prop="ParentId">
            <el-select class="w-full" v-model="data.ruleForm.ParentId" placeholder="请选择岗位类型">
              <el-option v-for="item in data.postType" :key="item.Id" :label="item.PostName" :value="item.Id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="24">
          <el-form-item label="岗位编码" prop="PostCode">
            <el-input v-model="data.ruleForm.PostCode" placeholder="请填写部门名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <el-form-item label="管理岗" prop="IsManage">
            <el-radio-group v-model="data.ruleForm.IsManage">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="岗位状态" prop="Status">
            <el-radio-group v-model="data.ruleForm.Status">
              <el-radio :label="item.DicKey" v-for="(item, index) in data.job" :key="index" :value="item.DicValue">{{ item.DicValue }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bf-search-formItem">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from "/@/components/OpenWindow/index.vue";
import { defineComponent, onMounted, reactive, ref, SetupContext } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useCommonStore } from "/@/store/modules/Common";
import { addPostType, editPostType, getPostDetails, getPostSelect } from "/@/api/system/post";
const store = useCommonStore(); //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>();
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (data.Id) {
          editPostType(data.ruleForm).then((res) => {
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
          addPostType(data.ruleForm).then((res) => {
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
    PostName: [{ required: true, message: "请填写岗位名称", trigger: "blur" }],
    PostCode: [{ required: true, message: "请填写岗位编码", trigger: "blur" }],
    ParentId: [{ required: true, message: "请选择岗位类型", trigger: "changge" }],
    Status: [{ required: true, message: "请选择字典状态", trigger: "changge" }],
    IsManage: [{ required: true, message: "请选择管理岗", trigger: "changge" }],
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
    let data = reactive({
      ruleForm: {
        PostName: "",
        PostCode: "",
        ParentId: "",
        Status: "1",
        IsManage: "2",
        IsType: 2,
      },
      postType: [],
      job: {},
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
        getPostDetails(props.Id).then((res) => {
          if (res.code == 1) {
            data.ruleForm = res.data;
          } else {
            ElMessage.error(res.message);
          }
        });
      }
      // 获取岗位类型
      getPostSelect(1).then((res) => {
        if (res.code == 1) {
          data.postType = res.data;
        }
      });
      // 获取任务状态
      store.getDict("sys_job_status").then((res: any) => {
        data.job = res;
      });
    });

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow) };
  },
});
</script>

<style scoped></style>
