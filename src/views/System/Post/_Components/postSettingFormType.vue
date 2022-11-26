<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10" justify="end">
        <el-col :md="24" :lg="24">
          <el-form-item label="岗位类型" prop="PostName">
            <el-input v-model="data.ruleForm.PostName" placeholder="请输入类型名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bf-search-formItem">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
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
import { addPostType, editPostType, getPostDetails } from "/@/api/system/post";
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
    PostName: [{ required: true, message: "请填写岗位类型", trigger: "blur" }],
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
        IsType: 1,
      },
      levelData: [],
      Id: props.Id,
    });

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit("closeWindow", type);
    };
    // 页面样式
    const boxStyle = reactive({
      boxWidth: "w-1/5",
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
    });

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow) };
  },
});
</script>

<style scoped></style>
