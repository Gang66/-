<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">字典管理</div>
            <el-row :gutter="10" justify="end">
              <el-col :md="24" :lg="7">
                <el-form-item label="字典名称">
                  <el-input v-model="form.Name" placeholder="字典名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="7">
                <el-form-item label="字典类型">
                  <el-input v-model="form.Type" placeholder="字典类型" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="字典状态">
                  <el-select v-model="form.Status" placeholder="字典状态" clearable>
                    <el-option v-for="item in data.job" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey">{{ item.DicValue }}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="4">
                <el-button type="primary" @click="search()">搜索</el-button>
                <el-button type="primary" @click="openWindow()">新增</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column prop="Id" label="字典编号" width="100" />
            <el-table-column prop="Name" label="字典名称" width="100" />
            <el-table-column prop="Type" label="字典类型">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="TypeRoute(scope.row.Id, scope.row.Type)">{{ scope.row.Type }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="Status" label="状态" width="100">
              <template #default="scope">
                {{ getStatus(scope.row.Status) }}
              </template>
            </el-table-column>
            <el-table-column prop="Remark" label="备注">
              <template #default="scope">
                <div class="truncate">
                  {{ scope.row.Remark }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="CreateOn" label="创建时间" />
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <div class="bf-button-bl">
                  <el-button text key="primary" type="primary" @click="openWindow(scope.row.Id)">修改</el-button>
                  <el-button text key="primary" type="primary" @click="openMessage(scope.row.Id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 字典管理表单 -->
    <IndexForm title="字典类型" v-if="data.indexWindow.show" @closeWindow="closeWindow" :Id="data.indexWindow.Id"></IndexForm>
  </div>
</template>

<script lang="ts">
import TableSearch from "/@/components/TableSearch/index.vue";
import { defineComponent, onMounted, reactive } from "vue";
import IndexForm from "./_Components/IndexForm.vue";
import {
  getDictionaryIndexList,
  deleteIndexList,
  getDict,
} from "/@/api/system/dictionary";
import router from "/@/router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useCommonStore } from "/@/store/modules/Common";
const store = useCommonStore(); //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await getDictionaryIndexList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records;
      form.totals = res.data.totals;
    }
  });
};
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data);
  const getStatus = (val: string) => {
    var title = "";
    if (data.job.length > 0) {
      data.job.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue;
        }
      });
    }
    return title;
  };
  const handleSizeChange = (v: number) =>
    (form.size = v) && renderTableList(form, data);
  const handleCurrentChange = (v: number) =>
    (form.page = v) && renderTableList(form, data);
  const indexMethod = (index: number) =>
    (form.page - 1) * form.size + index + 1;
  const search = () => {
    form.page = 1;
    renderTableList(form, data);
  };
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
  };
};
const window = (form: any, data: any): any => {
  // 删除事件
  const openMessage = (val: number) => {
    ElMessageBox.confirm("是否删除此条信息?", "提示", {
      confirmButtonText: "是",
      cancelButtonText: "否",
      type: "warning",
    }).then(() => {
      deleteIndexList(val).then((res) => {
        if (res.code == 1) {
          form.page = 1;
          tableRender(form, data);
          ElMessage({ type: "success", message: "删除成功" });
        } else {
          ElMessage({ type: "info", message: res.message });
        }
      });
    });
  };
  // 字典类型添加 修改弹窗
  const openWindow = (Id: number) => {
    data.indexWindow.show = true;
    data.indexWindow.Id = Id;
  };
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.indexWindow.show = false;
    if (type == "submit") {
      form.page = 1;
      tableRender(form, data);
    }
  };
  return {
    openMessage,
    openWindow,
    closeWindow,
  };
};
export default defineComponent({
  components: {
    IndexForm,
    TableSearch,
  },
  props: {},

  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      Name: "",
      Type: "",
      Status: "",
      CreatOn: "",
      CreateEnd: "",
      page: 1,
      size: 10,
    });
    const data = reactive({
      // 弹窗数据
      indexWindow: {
        show: false,
      },
      // 列表数据
      tableData: [],
      total: 1,
      job: {},
    });
    onMounted(() => {
      let storeData = store.getDict("sys_job_status");
      // 获取字典
      storeData.then((res: any) => {
        data.job = res;
      });
    });
    // 字典类型跳转
    const TypeRoute = (Id: number, Type: string) => {
      router.push({
        path: "/System/Dictionary/Type",
        query: { Id: Id, Type: Type },
      });
    };
    return {
      TypeRoute,
      form,
      data,
      ...tableRender(form, data),
      ...window(form, data),
    };
  },
});
</script>

<style lang="scss" scoped></style>
