<template>
  <OpenWindow class="AssetManagement-AssetInventory-Components-addPurchaseForm" title="新增资产" :isShow="true" :boxStyle="data.boxStyle" @closeWindow="Cancel(ruleFormRef)">
    <!-- 表单内容 -->
    <div class="bf-window-padding formStyle">
      <el-form label-width="80px" ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon>
        <h2 class="font-extrabold mb-2">基础信息</h2>
        <el-row class="mb-2">
          <el-col :span="8">
            <el-form-item label="资产名称" prop="name">
              <el-select :disabled="addData.onlyadd === 2" size="default" v-model="ruleForm.name" @change="selectchange">
                <el-option v-for="item in data.name" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类别">
              <el-input disabled v-model="ruleForm.category"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格型号" prop="model">
              <el-input placeholder="请输入规格型号" :disabled="addData.onlyadd === 2" v-model="ruleForm.model"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mb-2">
          <el-col :span="8">
            <el-form-item label="单位">
              <el-input disabled v-model="ruleForm.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现有库存" prop="existing">
              <el-input :disabled="addData.onlyadd === 2" v-model="ruleForm.existing" placeholder="请输入现有库存"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="冻结库存">
              <el-input disabled v-model="ruleForm.freeze"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mb-2">
          <el-col :span="8">
            <el-form-item label="价格">
              <el-input disabled v-model="ruleForm.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部" prop="Division">
              <el-input :disabled="addData.onlyadd === 2" v-model="ruleForm.Division" placeholder="请输入事业部"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门" prop="department">
              <el-input :disabled="addData.onlyadd === 2" v-model="ruleForm.department" placeholder="请输入部门名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mb-2">
          <el-col :span="8">
            <el-form-item label="创建时间" prop="times">
              <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled="addData.onlyadd === 2" v-model="ruleForm.times" type="date" placeholder="请选择时间" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人" prop="people">
              <el-input :disabled="addData.onlyadd === 2" v-model="ruleForm.people" placeholder="请输入创建人名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="Remark">
              <el-input :disabled="addData.onlyadd === 2" v-model="ruleForm.Remark" placeholder="请输入备注内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

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
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
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
    // 定义所有变量
    const data = reactive({
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

    // 表单的数据
    const ruleFormdemo = {
      name: '', //资产名称
      category: '', //资产类别
      model: '', //规格型号
      unit: '', //单位
      existing: '', //现有库存,
      freeze: '', //冻结库存
      price: '', //价格
      Division: '', //事业部
      department: '', //部门
      times: '', //创建时间
      people: '', //创建人
      Remark: '', //备注
      ImgPathList: [] //上传的图片
    }
    const ruleForm = ref()
    ruleForm.value = JSON.parse(JSON.stringify(ruleFormdemo))
    const ruleFormRef = ref()
    // 表单校验
    const rules = reactive({
      name: [
        {
          required: true,
          message: '请选择资产名称',
          trigger: 'blur'
        }
      ],
      model: [
        {
          required: true,
          message: '请选择规格型号',
          trigger: 'blur'
        }
      ],
      existing: [
        {
          required: true,
          message: '请输入现有库存',
          trigger: 'blur'
        }
      ],
      Division: [
        {
          required: true,
          message: '请输入事业部名称',
          trigger: 'blur'
        }
      ],
      department: [
        {
          required: true,
          message: '请输入部门名称',
          trigger: 'blur'
        }
      ],
      times: [
        {
          required: true,
          message: '请输入创建时间',
          trigger: 'blur'
        }
      ],
      people: [
        {
          required: true,
          message: '请输入创建人',
          trigger: 'blur'
        }
      ]
    })
    // 监听资产名称的change事件
    const selectchange = (val: any) => {
      console.log(val)
      if (val === '1') {
        ruleForm.value.category = '家具家用'

        ruleForm.value.unit = '把'
        ruleForm.value.freeze = '20'
        ruleForm.value.price = 100
      } else if (val === '2') {
        ruleForm.value.category = '家具家用'

        ruleForm.value.unit = '个'
        ruleForm.value.freeze = '10'
        ruleForm.value.price = 200
      }
    }
    // 接受子组件传来的图片
    const uploadFileData = (PathList: any) => {
      // console.log(PathList)
      let arr: any = []
      PathList.forEach((item: any) => {
        arr.push(item.Path)
      })
      // console.log(arr)
      ruleForm.value.ImgPathList = arr
    }
    // 点击查看时自动回填数据
    const openWindow = () => {
      if (prop.addData.onlyadd === 2) {
        ruleForm.value.category = '测试'
        ruleForm.value.times = '2022-09-28'
        ruleForm.value.unit = '测试'
        ruleForm.value.freeze = '测试'
        ruleForm.value.name = '测试'
        ruleForm.value.model = '测试'
        ruleForm.value.existing = '测试'
        ruleForm.value.Division = '测试'
        ruleForm.value.department = '测试'
        ruleForm.value.people = '测试'
        ruleForm.value.Remark = '测试'
        ruleForm.value.price = 100
      }
    }
    openWindow()
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
    // 点击驳回
    const reject = (val: any) => {}
    return {
      reject,
      uploadFileData,
      Confirm,
      ruleFormRef,
      Cancel,
      selectchange,
      data,
      rules,
      ruleForm
    }
  }
})
</script>
<style lang="postcss" scoped>
.AssetManagement-AssetInventory-Components-addPurchaseForm {
  :deep(.formStyle) {
    .el-select--default {
      width: 100% !important;
    }
    .el-form-item__error {
      display: block !important;
    }
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>
