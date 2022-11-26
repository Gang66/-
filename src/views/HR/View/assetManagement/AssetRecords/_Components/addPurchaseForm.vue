<template>
  <OpenWindow class="AssetManagement-AssetRecords-Components-addPurchaseForm" :title="addData.title" :isShow="true" :boxStyle="Allvar.boxStyle" @closeWindow="Cancel(ruleFormRef)">
    <!-- <h2 class="text-lg font-bold">新增资产采购</h2> -->

    <!-- <hr class="mt-4 mb-4" /> -->
    <!-- 表单内容 -->
    <div class="bf-window-padding">
      <el-form label-width="80px" ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon label-min-width="80px">
        <h2 class="font-extrabold mb-2">基础信息</h2>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请时间">
              <el-input v-model="ruleForm.times" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input v-model="ruleForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-input v-model="ruleForm.department" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="部门" prop="department1">
              <el-input disabled v-model="ruleForm.department1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注" prop="source">
              <el-input v-model="ruleForm.source" placeholder="请输入备注内容" :disabled="addData.onlyadd === 2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- table表格内容 -->
      <div class="TableTitle">
        <div class="flex justify-between">
          <h2 class="font-extrabold mb-2">申请明细-物品列表</h2>
          <el-button :disabled="addData.onlyadd === 2" link type="primary" class="text-blue-400 cursor-pointer" @click="addthing">+添加</el-button>
        </div>
        <el-table border :data="ruleForm.tableData">
          <el-table-column type="selection" min-width="30" />
          <el-table-column prop="name" label="物品名称" min-width="180">
            <template #header>
              <div class="flex justify-between"><span>物品名称</span> <el-button size="small" link type="primary" @click="GoAddAssets">无资产？ 采购</el-button></div>
            </template>
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="addData.onlyadd === 2">{{ row.name }}</div>
              <div v-else>
                <el-select placeholder="请选择" v-model="row.name" @change="changeSelect($event, $index)">
                  <el-option v-for="item in Allvar.name" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="Specification" label="规格型号" min-width="120">
            <template #default="{ row, $index }">
              {{ row.Specification }}
            </template>
          </el-table-column>

          <el-table-column prop="unit" label="计量单位" min-width="120">
            <template #default="{ row, $index }">
              {{ row.unit }}
            </template>
          </el-table-column>
          <el-table-column property="unitPrice" label="单价" min-width="100">
            <template #default="{ row, $index }">
              {{ row.unitPrice }}
            </template>
          </el-table-column>
          <el-table-column property="source" label="来源" min-width="120">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="addData.onlyadd === 2">{{ row.source }}</div>
              <div v-else>
                <el-select placeholder="请选择" v-model="row.source">
                  <el-option v-for="item in Allvar.source" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="使用人" min-width="120" property="people">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="addData.onlyadd === 2">{{ row.people }}</div>
              <div v-else>
                <el-select placeholder="请选择" v-model="row.people">
                  <el-option v-for="item in Allvar.people" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="唯一识别码" min-width="120">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="addData.onlyadd === 2">{{ row.identification }}</div>
              <div v-else>
                <el-input placeholder="请输入" v-model="row.identification"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button link type="primary" @click="delthing($index)" :disabled="addData.onlyadd === 2">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt-4">
        <div class="mb-4">上传图片</div>
        <uploadImg @uploadFileData="uploadFileData($event)" :isView="addData.onlyadd === 2 ? true : false" />
      </div>

      <div class="flex justify-end mt-2">
        <div v-if="addData.onlyadd === 1 || addData.onlyadd === 3">
          <el-button @click="Cancel(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="Confirm(ruleFormRef)">提交</el-button>
        </div>
        <div v-else-if="addData.onlyadd === 2">
          <el-button @click="Cancel(ruleFormRef)">驳回</el-button>
          <el-button type="primary" @click="Confirm(ruleFormRef)">同意</el-button>
        </div>
      </div>
    </div>
  </OpenWindow>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { parseTime } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useLayoutStore } from '/@/store/modules/layout'
import { useRouter } from 'vue-router'
import uploadImg from '../../_Components/uploadImg.vue'
export default defineComponent({
  components: {
    OpenWindow,
    uploadImg
  },
  props: {
    addData: {
      type: Object,
      default: {
        onlyadd: null
      }
    }
  },

  setup(prop, ctx) {
    // 初始化路由
    const router = useRouter()
    // 定义所有变量
    const Allvar = reactive({
      boxStyle: {
        boxWidth: 'w-1000',
        boxHeight: ''
      },
      // table表格中来源的下拉框选项
      source: [
        {
          value: '1',
          label: '购入'
        },
        {
          value: '2',
          label: '自建'
        },
        {
          value: '3',
          label: '租赁物'
        },
        {
          value: '4',
          label: '其他'
        },
        {
          value: '5',
          label: '捐赠'
        }
      ],
      people: [
        {
          value: '1',
          label: '王丽'
        },
        {
          value: '2',
          label: '王丽'
        },
        {
          value: '3',
          label: '王丽'
        },
        {
          value: '4',
          label: '王丽'
        },
        {
          value: '5',
          label: '王丽'
        }
      ],
      name: [
        {
          value: '1',
          label: '人体工学椅'
        },
        {
          value: '2',
          label: '桌子'
        },
        {
          value: '3',
          label: '沙发'
        }
      ],
      //点击查看不能上传图片
      isView: false
    })
    const { getUserInfo } = useLayoutStore()
    // 获取当前时间
    const CurrentTime = parseTime(new Date())

    // 表单的数据
    const ruleFormdemo = {
      times: '', //表单中获取时间
      name: getUserInfo.UserName, //表单中当前用户的名字
      department: getUserInfo.company, //当前用户的事业部
      department1: getUserInfo.department, //当前用户的部门
      source: '', //备注
      tableData: [], //下方table的数据
      ImgPathList: []
    }
    const ruleForm = ref()
    ruleForm.value = JSON.parse(JSON.stringify(ruleFormdemo))
    const ruleFormRef = ref()
    // 表单校验
    const rules = reactive({
      department1: [
        {
          required: true,
          message: '请输入所在部门',
          trigger: 'blur'
        }
      ],
      channel: [
        {
          required: true,
          message: '请选择采购渠道',
          trigger: 'blur'
        }
      ],
      illustrate: [
        {
          required: true,
          message: '请输入申请说明',
          trigger: 'blur'
        }
      ]
    })

    // 打开dialog的时候自动获取当前时间
    const openDialog = () => {
      if (prop.addData.onlyadd === 2 || prop.addData.onlyadd === 3) {
        ruleForm.value.times = prop.addData.data.date
        ruleForm.value.channel = prop.addData.data.channel
        ruleForm.value.illustrate = prop.addData.data.illustrate
        ruleForm.value.name = prop.addData.data.name
      } else {
        ruleForm.value.times = CurrentTime
      }
    }
    openDialog()

    // table表格的事件

    //添加
    const addthing = () => {
      let obj = {
        name: '', //物品名称
        Specification: '', //规格型号
        unit: '', //计量单位
        unitPrice: null, //单价
        source: '', //来源
        people: '', // 使用人
        identification: '' //唯一标识码
      }
      ruleForm.value.tableData.push(obj)
    }
    //点击物品名称获取物品详情,利用index选择往第几个物品赋值相应的数据
    const changeSelect = (val: any, index: number) => {
      // console.log(val)
      // console.log(index)
      ruleForm.value.tableData[index] = {
        name: val, //物品名称
        Specification: '#231', //规格型号
        unit: '条', //计量单位
        unitPrice: val, //单价
        source: '淘宝', //来源
        people: '王五', // 使用人
        identification: '123123' //唯一标识码
      }
    }
    // 点击删除当前新增的物品
    const delthing = (index: number) => {
      ElMessageBox.confirm('确定要删除该商品吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          ruleForm.value.tableData.splice(index, 1)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作'
          })
        })
    }
    //点击跳转到新增商品的页面
    const GoAddAssets = () => {
      router.push({
        name: 'HRViewassetManagementAssetProcurementindex'
      })
    }

    // 接受子组件传来的图片
    const uploadFileData = (PathList: any) => {
      // console.log(PathList)
      let arr: any = []
      PathList.forEach((item: any) => {
        arr.push(item.Path)
      })
      console.log(arr)
      ruleForm.value.ImgPathList = arr
    }
    //   点击取消/驳回
    const Cancel = (val: any) => {
      // 点击详情后的驳回
      if (prop.addData.onlyadd === 2) {
        console.log('驳回操作')
      } else if (prop.addData.onlyadd === 1) {
        console.log('新增操作')
      } else if (prop.addData.onlyadd === 3) {
        console.log('编辑操作')
      }
      val.resetFields()
      ruleForm.value = JSON.parse(JSON.stringify(ruleFormdemo))
      ctx.emit('closeAddDialog')
    }
    // 点击提交/同意
    const Confirm = async (formEl: any) => {
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          // 点击新增
          if (prop.addData.onlyadd === 1) {
          }
          // 点击编辑
          else if (prop.addData.onlyadd === 2) {
          }
          // 点击详情
          else if (prop.addData.onlyadd === 3) {
          }
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    return {
      uploadFileData,
      GoAddAssets,
      changeSelect,
      getUserInfo,
      delthing,
      addthing,
      Confirm,
      ruleFormRef,
      Cancel,
      openDialog,
      Allvar,
      rules,
      ruleForm,
      CurrentTime
    }
  }
})
</script>
<style lang="postcss" scoped>
.AssetManagement-AssetRecords-Components-addPurchaseForm {
  :deep(.TableTitle) {
    .el-table__header {
      font-size: 12px;
    }
    .el-input__wrapper {
      box-shadow: none;
    }
    .el-input__inner {
      &::placeholder {
        font-size: 12px;
      }
    }
  }
}
</style>
