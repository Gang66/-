<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div style="width: 100%; height: 500px; overflow-y: auto">
      <el-cascader-panel :options="data.tempRegionList" @change="expandChangeEvent" :props="data.areaProps" v-model="data.ruleForm.RegionIds"></el-cascader-panel>
    </div>
    <div class="text-center w-full p-4">
      <el-button @click="closeWindow('close')">取 消</el-button>
      <el-button type="primary" @click="submitForm()">提 交</el-button>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetHRRegionInfoByDepartInfo, GetRegionTree, PostHRRegionInfoByDepartBind } from '/@/api/system/RegionSettings'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async () => {
    var arr: any = JSON.parse(JSON.stringify(data.ruleForm))
    PostHRRegionInfoByDepartBind(arr).then((res) => {
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
  //
  const expandChangeEvent = (val: any) => {
    console.log(val)
  }
  return { submitForm, ruleFormRef, expandChangeEvent }
}
const getInfo = async (data: any) => {
  if (data.isView) {
    GetHRRegionInfoByDepartInfo(data.ruleForm.DepartId).then((res) => {
      console.log(res)
      if (res.code == 1) {
        res.data.forEach((val: any) => {
          data.ruleForm.RegionIds.push(JSON.parse(val.HRRegionInfoId))
        })
        console.log(data.ruleForm.RegionIds)
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  await GetRegionTree(data.ruleForm.DepartId).then((res) => {
    if (res.code == 1) {
      data.tempRegionList = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    //   父类传递来的Id
    Id: {
      type: Number,
      default: null
    },
    //   是否是查看 true是 false不是
    isView: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        DepartId: props.Id ? props.Id : 0,
        RegionIds: []
      },
      // 筛选配置
      areaProps: {
        multiple: true, //是否开启多选
        value: 'name',
        label: 'title'
      },
      isView: props.isView, //是否是查看
      tempRegionList: [], //区域数据
      sourceData: [] //组织架构树数据
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-650',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      getInfo(data)
    })

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow) }
  }
})
</script>

<style lang="postcss" scoped>
.buttonHeight {
  height: 28px;
}
:deep(.el-cascader-menu__wrap.el-scrollbar__wrap) {
  height: 600px;
}
</style>
