<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="PostBinding">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10">
        <el-col :md="24" :lg="24">
          <el-form-item label="部门名称" prop="PostName">
            <div class="bf-text-color-regular">{{ data.Name }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="岗位列表" prop="PostName">
        <div>
          <div v-for="(item, index) in data.list" :key="index" class="mb-2">
            <div class="bf-text-color-regular">{{ item.PostName }}</div>
            <div>
              <el-checkbox-group v-model="data.checkboxGroup" @change="checkboxGroupEvent">
                <el-checkbox-button v-for="(city, i) in item.List" :key="city.Id" :label="city.Id">{{ city.PostName }}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </el-form-item>
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
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { getPostTypeList, getPostBinding, setPostBinding } from '/@/api/system/post'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = {
          Departid: data.Id,
          PostList: data.checkboxGroup
        }
        setPostBinding(arr).then((res) => {
          if (res.code == 1) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    // PostName: [{ required: true, message: "请填写岗位名称", trigger: "blur" }],
  })
  return { rules, submitForm, ruleFormRef }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    Name: {
      type: String,
      default: ''
    },
    Id: {
      type: Number,
      default: null
    },
    level: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
    let data: any = reactive({
      ruleForm: {},
      list: [], //岗位数据
      checkboxGroup: [],
      Id: props.Id,
      Name: props.Name
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 监听多选
    const checkboxGroupEvent = (val: any) => {
      console.log(val)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1/3',
      boxHeight: ''
    })
    onMounted(() => {
      // 获取全部岗位数据
      getPostTypeList({}).then((res) => {
        if (res.code == 1) {
          data.list = res.data
          console.log(data.list)
        } else {
          ElMessage.error(res.message)
        }
      })
      // 根据Id获取详情
      if (props.Id) {
        var arr = {
          DepartId: props.Id,
          Level: props.level
        }
        getPostBinding(props.Id, props.level).then((res) => {
          if (res.code == 1) {
            res.data.forEach((element: any) => {
              data.checkboxGroup.push(element.Id)
            })
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      cities,
      checkboxGroupEvent
    }
  }
})
</script>

<style lang="postcss" scoped>
.PostBinding {
  :deep(.el-checkbox-button__inner) {
    margin: 4px;
  }
  :deep(.el-checkbox-button) {
    width: 110px;
  }
}
</style>
