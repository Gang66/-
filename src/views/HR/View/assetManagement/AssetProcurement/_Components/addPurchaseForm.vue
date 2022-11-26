<template>
  <OpenWindow class="AssetManagement-AssetProcurement-Components-addPurchaseForm" :title="addData.title" :isShow="true" :boxStyle="Allvar.boxStyle" @closeWindow="Cancel(ruleFormRef)">
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
          <el-col :span="8">
            <el-form-item label="采购渠道" prop="channel">
              <el-select :disabled="addData.onlyadd === 2" v-model="ruleForm.channel" class="w-full">
                <el-option v-for="item in Allvar.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请说明" prop="illustrate">
              <el-input :disabled="addData.onlyadd === 2" v-model="ruleForm.illustrate"> </el-input>
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
          <el-table-column prop="name" label="物品名称" min-width="120">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="showType[$index].name" @click="inputF('name', $index)">
                {{ row.name }}
              </div>
              <el-input v-focus placeholder="请输入物品名称" v-model="row.name" v-else @blur="blurBtn('name', $index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="Specification" label="规格型号" min-width="120">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="showType[$index].Specification" @click="inputF('Specification', $index)">
                {{ row.Specification }}
              </div>
              <el-input v-focus placeholder="请输入规格型号" v-model="row.Specification" v-else @blur="blurBtn('Specification', $index)"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="unit" label="计量单位" min-width="120">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="showType[$index].unit" @click="inputF('unit', $index)">
                {{ row.unit }}
              </div>
              <el-input v-focus placeholder="请输入计量单位" v-model="row.unit" v-else @blur="blurBtn('unit', $index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="unitPrice" label="单价" min-width="100">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="showType[$index].unitPrice" @click="inputF('unitPrice', $index)">
                {{ row.unitPrice }}
              </div>
              <el-input v-focus placeholder="请输入单价" oninput="value=value.replace(/^\.+|[^\d.]/g,'').replace(/^0{1,}/g,'')" v-model="row.unitPrice" v-else @blur="blurBtn('unitPrice', $index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="quantity" label="申请数量" min-width="100">
            <template #default="{ row, $index }">
              <div class="w-full h-5" v-if="showType[$index].quantity" @click="inputF('quantity', $index)">
                {{ row.quantity }}
              </div>
              <el-input v-focus placeholder="请输入数量" oninput="value=value.replace(/^\.+|[^\d.]/g,'').replace(/^0{1,}/g,'')" v-model="row.quantity" v-else @blur="blurBtn('quantity', $index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="预计费用" min-width="100">
            <template #default="{ row, column }">
              {{ row.unitPrice * row.quantity }}
            </template>
          </el-table-column>
          <el-table-column label="备注" min-width="120">
            <template #default="{ row, $index }">
              <div class="h-5 w-full" v-if="showType[$index].Remark" @click="inputF('Remark', $index)">
                {{ row.Remark }}
              </div>
              <el-input v-focus placeholder="请输入备注" v-model="row.Remark" v-else @blur="blurBtn('Remark', $index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button link type="primary" @click="delthing($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="w-full h-10 bg-slate-100 flex justify-end items-center pr-4 text-xs">
        <div>
          预计总金额 <span class="text-red-400">{{ ruleForm.tableData.totalMoney }}</span> (元)
        </div>
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
export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    addData: {
      type: Object,
      default: {
        onlyadd: null
      }
    }
  },
  // input框自动获取焦点的指令
  directives: {
    focus: {
      mounted(el: any) {
        el.children[0].children[0].focus()
      }
    }
  },
  setup(prop, ctx) {
    // 定义所有变量
    const Allvar = reactive({
      // 采购渠道下拉框的内容
      options: [
        {
          value: 'taobao',
          label: '淘宝'
        },
        {
          value: 'jingdong',
          label: '京东'
        }
      ],
      // 所有的价格
      Alltotalmoney: 0,
      boxStyle: {
        boxWidth: 'w-960',
        boxHeight: ''
      }
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
      channel: '', //采购渠道
      illustrate: '', //申请说明
      tableData: [] //下方table的数据
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

    // table表格的事件
    //添加
    const addthing = () => {
      let obj = {
        name: '',
        Specification: '',
        unit: '',
        unitPrice: 0,
        quantity: 0,
        totalMoney: null,
        Remark: ''
      }
      ruleForm.value.tableData.push(obj)
      showType.push({
        name: true,
        Specification: true,
        unit: true,
        unitPrice: true,
        quantity: true,
        Remark: true
      })
    }
    // 控制是否显示input框或者span
    const showType: any = reactive([
      {
        name: true,
        Specification: true,
        unit: true,
        unitPrice: true,
        quantity: true,
        Remark: true
      }
    ])

    // 打开dialog的时候自动获取当前时间,点击编辑时不能出现input框
    const openDialog = () => {
      if (prop.addData.onlyadd === 3 || prop.addData.onlyadd === 2) {
        ruleForm.value.times = prop.addData.data.date
        ruleForm.value.channel = prop.addData.data.channel
        ruleForm.value.illustrate = prop.addData.data.illustrate
        ruleForm.value.name = prop.addData.data.name
      } else {
        ruleForm.value.times = CurrentTime
      }
    }
    openDialog()
    //span 点击事件出现input
    const inputF = (val: any, index: number) => {
      if (prop.addData.onlyadd === 2) {
        showType[index][val] = true
      } else {
        showType[index][val] = false
      }
    }
    //input blur 失去焦点出现span
    const blurBtn = (val: any, index: number) => {
      showType[index][val] = true
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
    ruleForm.value.tableData.totalMoney = computed(() => {
      let aaa: any = null
      ruleForm.value.tableData.forEach((val: any, index: any) => {
        aaa += Number(val.unitPrice) * Number(val.quantity)
      })
      return aaa
    })
    return {
      getUserInfo,
      delthing,
      blurBtn,
      inputF,
      showType,
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
.AssetManagement-AssetProcurement-Components-addPurchaseForm {
  :deep(.TableTitle) {
    .el-input__inner {
      &::placeholder {
        font-size: 12px;
      }
    }
  }
}
</style>
