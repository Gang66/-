<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="轨迹回放">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding ArchiveForm" hide-required-asterisk>
      <div class="">
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="10" class="relative">
            <div id="container"></div>
            <div class="absolute bottom-2 right-4">
              <div class="flex">
                <el-button type="primary" plain @click="startAnimation" size="small">开始轨迹</el-button>
                <el-button type="primary" plain @click="pauseAnimation()" size="small">暂停轨迹</el-button>
              </div>
              <div class="flex mt-1">
                <el-button type="primary" plain @click="resumeAnimation()" size="small">继续轨迹</el-button>
                <el-button type="primary" plain @click="stopAnimation()" size="small">停止轨迹</el-button>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="14">
            <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
              <el-table :data="data.tableData" style="width: 100%" border>
                <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
                <el-table-column prop="CreateOn" label="日期" width="160"
                  ><template #default="scope">
                    <div class="truncate">{{ parseTimeEvent(scope.row.CreateOn) }}</div>
                  </template></el-table-column
                >
                <el-table-column prop="AddrStr" label="地址" width="320">
                  <template #default="scope">
                    <div class="truncate">{{ scope.row.AddrStr }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="MinSpan" label="停留时间" align="center"
                  ><template #default="scope">
                    <div class="truncate">{{ scope.row.MinSpan }}分</div>
                  </template></el-table-column
                >
                <el-table-column prop="defectTime" label="缺失时间" align="center"></el-table-column>
              </el-table>
            </table-search>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
;(window as any)._AMapSecurityConfig = {
  securityJsCode: '28397d985d6359f3084bb61f24c28205'
}
import AMapLoader from '@amap/amap-jsapi-loader'
import { parseTime } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext, shallowRef } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetStaffFileArchiving, PostSaveStaffFileArchiving } from '/@/api/hr/Induction'
import { GetAllLocateList } from '/@/api/hr/AttendanceManage'
const store = useCommonStore() //记得加这一句
const lStore = useLayoutStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostSaveStaffFileArchiving(data.ruleForm).then((res) => {
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
  const rules = reactive<FormRules>({})
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听人员返回数据
  const transferData = (val: any) => {
    data.ruleForm.InterViewerName = val.Details.label
    data.ruleForm.InterViewerId = val.Details.Id
    data.ruleForm.DeptIds = JSON.stringify(val.DeptIds)
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d} {h}:{i}')
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    transferData,
    parseTimeEvent
  }
}
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  var arr = {
    userId: data.UserId ? data.UserId : lStore.getUserInfo.Id,
    startDate: data.WorkDayTime ? data.WorkDayTime : parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
  }
  arr = Object.assign(arr, form)
  await GetAllLocateList(arr).then(async (res) => {
    if (res.code == 1) {
      data.tableData = res.data.StopList
      form.totals = res.data.totals
      res.data.List.forEach((element: any) => {
        data.lineArr.push([element.Longitude, element.Latitude])
      })
    } else {
      ElMessage.error(res.message)
    }
  })
  //  getInnovateList(form).then((res) => {
  //   if (res.code == 1) {
  //     res.data.records.forEach((element: any) => {
  //       element.Suggestion = eval('(' + element.Suggestion + ')')
  //     })
  //     data.tableData = res.data.records
  //     form.totals = res.data.totals
  //   }
  // })
}
// 筛选
const tableRender = (form: any, data: any, initMap: any) => {
  renderTableList(form, data).then(() => {
    initMap()
  })
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent
  }
}

// 弹窗事件
// const window = (data: any) => {
//   return {}
// }
const GetContractManagementInfoEvent = async (data: any) => {
  // 获取面试方式
  store.getDict('sys_InductionFile').then((res: any) => {
    data.InductionFile = res
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    TableSearch
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    UserId: {
      type: Number,
      default: null
    },
    // 打卡时间
    WorkDayTime: {
      type: String,
      default: ''
    }
  },
  setup(props, context: SetupContext) {
    //面试时间
    const timeStageOptions = [
      {
        value: '上午',
        label: '上午',
        children: [
          { value: '8:00~9:00', label: '8:00~9:00' },
          { value: '9:00~10:00', label: '9:00~10:00' },
          { value: '10:00~11:00', label: '10:00~11:00' },
          { value: '11:00~12:00', label: '11:00~12:00' }
        ]
      },
      {
        value: '下午',
        label: '下午',
        children: [
          { value: '13:00~14:00', label: '13:00~14:00' },
          { value: '14:00~15:00', label: '14:00~15:00' },
          { value: '15:00~16:00', label: '15:00~16:00' },
          { value: '16:00~17:00', label: '16:00~17:00' }
        ]
      }
    ]
    const checkedCities = ref()
    const cities = ['劳务协议', '劳动合同', '劳动公司制度学习及合同条款确认表', '员工档案', '毕业证复印件']
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    let data: any = reactive({
      InductionFile: [], //入职文件
      checkAll: false, //是否勾选全部
      isShow: false, //是否展示操作记录
      lineArr: [],
      tableData: [], //轨迹列表数据
      ruleForm: {},
      // 查看详情Id
      UserId: props.UserId,
      WorkDayTime: props.WorkDayTime
    })
    let map: any = shallowRef(null)
    let marker: any = shallowRef(null)
    let polyline: any = shallowRef(null)
    let passedPolyline: any = shallowRef(null)
    const initMap = () => {
      AMapLoader.load({
        key: 'f6a92319483119100d88860cf2aa0f02', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Marker', 'AMap.Polyline', 'AMap.MoveAnimation'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          map = new AMap.Map('container', {
            //设置地图容器id
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 17
          })
          marker = new AMap.Marker({
            map: map,
            position: [data.lineArr[0][0], data.lineArr[0][1]],
            icon: 'https://webapi.amap.com/images/car.png',
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true,
            angle: -90
          })
          marker.moveTo([116.397389, 39.909466], {
            duration: 10000,
            delay: 500
          })
          polyline = new AMap.Polyline({
            map: map,
            path: data.lineArr,
            showDir: true,
            strokeColor: '#28F', //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 //线宽
            // strokeStyle: "solid"  //线样式
          })
          passedPolyline = new AMap.Polyline({
            map: map,
            strokeColor: '#AF5', //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 //线宽
            // strokeStyle: "solid"  //线样式
          })
          marker.on('moving', function (e: any) {
            passedPolyline.setPath(e.passedPath)
          })
          map.setFitView()
        })
        .catch((e) => {
          console.log(e)
        })
    }
    // 开始轨迹
    const startAnimation = () => {
      marker.moveAlong(data.lineArr, 200)
    }
    // 暂停轨迹
    const pauseAnimation = () => {
      marker.pauseMove()
    }
    // 继续轨迹
    const resumeAnimation = () => {
      marker.resumeMove()
    }
    // 停止轨迹
    const stopAnimation = () => {
      marker.stopMove()
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1300',
      boxHeight: ''
    })
    //监听入职文件多选
    const handleCheckAllChange = (val: boolean) => {
      if (val) {
        var arr: any = []
        data.InductionFile.forEach((element: any) => {
          arr.push(element.DicKey)
        })
        data.ruleForm.InductionFile = arr
      } else {
        data.ruleForm.InductionFile = []
      }
    }
    onMounted(() => {
      // 根据Id获取详情
      // GetContractManagementInfoEvent(data)
    })
    return {
      initMap,
      startAnimation,
      pauseAnimation,
      resumeAnimation,
      stopAnimation,
      boxStyle,
      data,
      form,
      ...tableRender(form, data, initMap),
      closeWindow,
      timeStageOptions,
      checkedCities,
      cities,
      ...formEvent(data, closeWindow),
      handleCheckAllChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.images {
  width: 96px;
  height: 97px;
}
.ArchiveForm {
  :deep(.el-checkbox) {
    margin-right: 29px;
  }
}
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 500px;
  cursor: pointer;
}
.input-card .btn {
  margin-right: 1.2rem;
  width: 9rem;
}

.input-card .btn:last-child {
  margin-right: 0;
}
</style>
