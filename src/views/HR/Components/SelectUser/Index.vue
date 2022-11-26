<template>
  <div class="SelectUser">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="选择人员">
      <template #topBtn>
        <el-button type="primary" size="small" @click="submitForm">提交</el-button>
      </template>
      <div class="p-2">
        <el-tree :data="data.treeList" :props="defaultProps" show-checkbox node-key="Id" :default-expanded-keys="[26]" @check="handleNodeClickClassify" />
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetUserTree } from '/@/api/system/user'
const store = useCommonStore() //记得加这一句
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled'
}
const GetContractManagementInfoEvent = async (data: any) => {
  GetUserTree().then((res: any) => {
    data.treeList = res.data
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any, context: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = () => {
    console.log(data.userDetailsList)
    context.emit('selectDetails', data.userDetailsList)
    closeWindow()
  }
  // 监听复选款被选中
  const handleNodeClickClassify = (val: any, details: any) => {
    data.userDetailsList = []
    var arr = details
    arr.checkedNodes.forEach((element: any) => {
      if (element.NodeType == 'user') {
        data.userDetailsList.push(element)
      }
    })
    // data.details = details
  }
  //校验
  const rules = reactive<FormRules>({})
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    handleNodeClickClassify
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow', 'selectDetails'],
  props: {
    // 数据列表
    userList: {
      type: Array,
      default: []
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      treeList: [] as any[],
      details: {}, //选中详情
      userDetailsList: [] //选中用户详情
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-400',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      if (props.userList.length > 0) {
        data.treeList = props.userList
      } else {
        GetContractManagementInfoEvent(data)
      }
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow, context),
      defaultProps
    }
  }
})
</script>

<style lang="postcss" scoped></style>
