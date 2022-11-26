<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 09:23:13
 * @LastEditTime: 2022-11-10 09:02:31
 * @LastEditors: ZHJ
 * @Description: 编辑工资项
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\PostSalaryEditForm.vue
 * 版权声明
-->
<template>
  <div class="PostSalaryEditForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="编辑岗位工资">
      <template #topBtn>
        <el-button type="primary" size="small" @click="submitForm">提交</el-button>
      </template>
      <div class="bf-window-padding">
        <tabs :tabList="data.wagesTypeList" @handleClick="selectEvent">
          <template #default="scope">
            {{getWagesTotal(scope.data+1)}}
          </template>
          <!-- <template #subTitle>
            <div>{{getWagesTotal(item.value)}}</div>
          </template> -->
          <template #button>
            <el-button type="primary" size="small" class="ml-2" @click="data.SalaryItemsIndex.show=true">新增</el-button>
          </template>
        </tabs>
        <div class="bf-table-content " v-if="JSON.stringify(data.ruleForm)!='{}'">
          <el-table :data="currList" class="w-full" :key="1" max-height="450">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="label" label="工资项目" min-width="200" align="center">
              <template #default="{ row }">
                {{row.Name}}
              </template>
            </el-table-column>
            <el-table-column prop="Code" label="编号" align="center" />
            <el-table-column prop="TotalAmount" label="金额" align="center" />
            <el-table-column prop="" label="考核规则" align="center">
              <template #default="{ row }">
                <div v-for="(item,index) in data.cycleType" :key="index">
                  <div v-if="item.DicKey==row.CycleType">{{item.DicValue}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Sort" label="排序" align="center" />
            <el-table-column align="center" label="操作" width="80">
              <template #default="scope">
                <el-button text type="danger" @click="delDistributionItem(scope.row.WagesLibraryId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </OpenWindow>
    <div v-if="data.SalaryItemsIndex.show==true">
      <OpenWindow :boxStyle="boxStyleTwo" :isShow="true" @closeWindow="data.SalaryItemsIndex.show=false" title="编辑考核项">
        <template #topBtn>
          <el-button type="primary" size="small" @click="submitWindow">提交</el-button>
        </template>
        <div class="bf-window-padding">
          <SalaryItemsIndex ref="SalaryItemsIndexRef"></SalaryItemsIndex>
        </div>
      </OpenWindow>
    </div>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import SalaryItemsIndex from './SalaryItemsIndex.vue'
import { computed, defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import tabs from '/@/components/Tabs/Index.vue'
import { GetWagesDistributionEntity, PostEditWagesDistributionItemSave } from '/@/api/hr/Salary'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetAllUserList } from '/@/api/layout'
import { getPostSelect } from '/@/api/system/post'
const store = useCommonStore() //记得加这一句
const SalaryItemsIndexRef = ref()
const GetContractManagementInfoEvent = async (data: any) => {
  // 获取岗位类别
  store.getDict('hr_cycle_type').then((res: any) => {
    data.cycleType = res
  })
  if (data.Id) {
    GetWagesDistributionEntity(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data.records
        if (data.ruleForm.DistributionItemList && data.ruleForm.DistributionItemList.length > 0) {
          data.list = data.ruleForm.DistributionItemList
        }
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async () => {
    var arr = {
      Id: data.ruleForm.Id,
      DistributionItemList: data.list
    }
    PostEditWagesDistributionItemSave(arr).then((res: any) => {
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
  const submitWindow = () => {
    if (SalaryItemsIndexRef.value.data.details && SalaryItemsIndexRef.value.data.details.length > 0) {
      var itemlist = SalaryItemsIndexRef.value.data.details
      var arr = JSON.parse(JSON.stringify(data.list))
      var num = 0
      arr.forEach((item: any) => {
        var _tempNum = Number(item.Sort || 0)
        if (_tempNum > num) num = _tempNum //获取最大值
      })
      if (itemlist) {
        itemlist.forEach((item: any) => {
          if (
            arr.findIndex((x: any) => {
              return x.WagesLibraryId == item.Id
            }) < 0
          ) {
            //不存在项 防止出现重复项
            var _item = JSON.parse(JSON.stringify(item))
            _item.Id = undefined
            num = num + 1
            var _obj = {
              WagesLibraryId: item.Id,
              WagesType: data.currWagesType,
              DistributionId: data.Id,
              Sort: num
            }
            arr.push(Object.assign(_obj, _item))
          } else {
            ElMessage.warning('已存在')
          }
        })
      }
      data.list = arr
      data.SalaryItemsIndex.show = false
    } else {
      ElMessage.error('请选一条数据')
    }
  }
  //计算工资合计
  const getWagesTotal = (wagesType: any) => {
    return data.list
      .filter((x: any) => {
        return x.WagesType == wagesType
      })
      .reduce((a: any, b: any) => {
        return a + parseFloat(b.TotalAmount) || 0
      }, 0)
  }
  const currList = computed(() => {
    return data.list.filter((x: any) => {
      return x.WagesType == data.currWagesType
    })
  })
  const selectEvent = (val: any) => {
    data.currWagesType = val + 1
  }
  //删除
  const delDistributionItem = (wagesLibraryId: number) => {
    var index = data.list.findIndex((x: any) => x.WagesLibraryId == wagesLibraryId)
    if (index >= 0) data.list.splice(index, 1)
  }
  //监听角色
  const RoleChange = (val: any) => {
    data.postList.forEach((item: any) => {
      if (item.Id == val) {
        data.ruleForm.RoleName = item.PostName
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({})
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitWindow,
    SalaryItemsIndexRef,
    submitForm,
    resetForm,
    ruleFormRef,
    remoteUrlEvent,
    selectEvent,
    RoleChange,
    delDistributionItem,
    getWagesTotal,
    currList
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    tabs,
    SalaryItemsIndex
  },
  emits: ['closeWindow'],
  props: {
    Id: {
      type: Number,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      Id: props.Id,
      currWagesType: 1,
      tabList: [],
      list: [],
      cycleType: [],
      SalaryItemsIndex: {
        show: false
      },
      wagesTypeList: [
        {
          value: 1,
          name: '固定工资'
        },
        {
          value: 2,
          name: '考核工资'
        },
        {
          value: 3,
          name: '浮动工资'
        }
      ],
      ruleForm: {}
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-800',
      boxHeight: ''
    })
    // 页面样式
    const boxStyleTwo = reactive({
      boxWidth: 'w-1140',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      boxStyleTwo,
      data,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.PostSalaryEditForm {
  :deep() {
  }
}
</style>
