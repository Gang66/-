<template>
  <div>
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="位置设置">
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
        <el-row :gutter="10" justify="end">
          <el-col :md="24" :lg="24">
            <el-form-item label="事业部门" prop="DepartId">
              <!-- <el-tree-select ref="treeRef" style="width: 100%" :check-strictly="false" @check="changeddd" v-model="data.ruleForm.DepartIds" :data="data.sourceData" show-checkbox collapse-tags collapse-tags-tooltip node-key="Id" multiple /> -->
              <el-select v-model="data.ruleForm.DepartId" placeholder="请选择事业部" style="width: 100%">
                <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="考勤地址" prop="address">
          <el-input v-model="data.ruleForm.Address" id="tipinput">
            <template #append>
              <el-button type="primary" @click="parseAddress($event, true)">定位</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-row :gutter="10">
          <el-form-item label="经纬度">
            <el-col :md="24" :lg="12">
              <el-input v-model="data.ruleForm.longitude" readonly>
                <template #prepend>经度</template>
              </el-input>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-input v-model="data.ruleForm.latitude" readonly>
                <template #prepend>纬度</template>
              </el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="围栏设置" prop="Name">
          <el-button @click="open()" type="primary">开始编辑</el-button>
          <el-button @click="close()" type="primary">结束编辑</el-button>
        </el-form-item>
        <div id="container"></div>
        <div class="bf-search-formItem mt-4">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
;(window as any)._AMapSecurityConfig = {
  securityJsCode: '28397d985d6359f3084bb61f24c28205'
}
import OpenWindow from '/@/components/OpenWindow/index.vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { defineComponent, onMounted, ref, SetupContext } from 'vue'
import { reactive, shallowRef } from '@vue/reactivity'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import {
  GetPositionSettingInfo,
  PostAddEditRegionSettingSave
} from '/@/api/system/map'
import { GetTypeDepartList } from '/@/api/system/dept'
const store = useCommonStore() //记得加这一句

// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostAddEditRegionSettingSave(data.ruleForm).then((res) => {
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
    DepartId: [
      { required: true, message: '请选择事业部门', trigger: 'changge' }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const changeddd = (val: any, arr: any) => {}
  return { rules, submitForm, resetForm, ruleFormRef, changeddd }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let map: any = shallowRef(null)
    let circle = shallowRef(null)
    let circleEditor: any = ref(null)
    let Geocoder: any = shallowRef(null)
    let Autocomplete: any = shallowRef(null)
    let placeSearch: any = shallowRef(null)
    let autoOptions = shallowRef({
      input: 'tipinput'
    })
    let gpsCenter = ['119.14911', '36.76175'] // 北方阀门总部：[119.14911, 36.76175],
    const data = reactive({
      ruleForm: {
        Address: '',
        longitude: '119.14911',
        latitude: '36.76175',
        Range: '50',
        DepartId: '' //事业部Id
      },
      deptList: [], //部门数据
      sourceData: [] //组织架构树数据
    })
    const initMap = () => {
      AMapLoader.load({
        key: 'f6a92319483119100d88860cf2aa0f02', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.CircleEditor',
          'AMap.Autocomplete',
          'AMap.Geocoder',
          'AMap.PlaceSearch'
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          map = new AMap.Map('container', {
            //设置地图容器id
            center: [data.ruleForm.longitude, data.ruleForm.latitude],
            zoom: 18,
            resizeEnable: true
          })
          Geocoder = new AMap.Geocoder({})
          // Autocomplete = AMap.AutoComplete(autoOptions);
          // placeSearch = new AMap.PlaceSearch({
          //   map: map,
          // }); //构造地点查询类
          parseLocation()
          circle = new AMap.Circle({
            center: [data.ruleForm.longitude, data.ruleForm.latitude],
            radius: data.ruleForm.Range, //半径
            borderWeight: 3,
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            strokeStyle: 'dashed',
            strokeDasharray: [10, 10],
            // 线样式还支持 'dashed'
            fillColor: '#1791fc',
            zIndex: 50
          })
          //  设置鼠标样式 pointer小手 default默认
          map.setDefaultCursor('pointer')
          map.add(circle)
          // 缩放地图到合适的视野级别
          map.setFitView([circle])
          circleEditor = new AMap.CircleEditor(map, circle)
          //   circleEditor.open();
          circleEditor.on('move', (event: any) => {
            console.log('触发事件：move')
            data.ruleForm.longitude = event.lnglat.lng + ''
            data.ruleForm.latitude = event.lnglat.lat + ''
          })

          circleEditor.on('adjust', (event: any) => {
            data.ruleForm.Range = event.radius + ''
            console.log(event)
            console.log('adjust')
          })

          circleEditor.on('end', (event: any) => {
            // event.target 即为编辑后的圆形对象
            console.log(event)
            console.log('end')
          })
          // auto.on("select", select); //注册监听，当选中某条记录时会触发
          // function select(e: any) {
          //   placeSearch.setCity(e.poi.adcode);
          //   placeSearch.search(e.poi.name); //关键字查询查询
          // }
        })
        .catch((e) => {
          console.log(e)
        })
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: ''
    })
    // 编辑地图
    const open = () => {
      circleEditor.open()
    }
    // 结束编辑
    const close = () => {
      circleEditor.close()
    }
    // 初次加载获取坐标=》地址
    const parseLocation = () => {
      let lnglat = [data.ruleForm.longitude, data.ruleForm.latitude]
      Geocoder.getAddress(lnglat, (status: any, result: any) => {
        if (status === 'complete' && result.regeocode) {
          data.ruleForm.Address = result.regeocode.formattedAddress
        }
      })
    }
    // 解析地址
    const parseAddress = (e: any, isZhuizong = false) => {
      Geocoder.getLocation(
        data.ruleForm.Address,
        (status: any, result: any) => {
          /* 根据给定的地址描述进行解析，支持中文、拼音
            当status为complete时，result为GeocodeResult；
            当status为error时，result为错误信息info；
            当status为no_data时，代表检索返回0结果 */
          if (status === 'complete' && result.geocodes.length) {
            var { lng, lat } = result.geocodes[0].location
            data.ruleForm.longitude = lng + ''
            data.ruleForm.latitude = lat + ''
          } else {
            // 错误返回总部定位
            data.ruleForm.longitude = gpsCenter[0]
            data.ruleForm.latitude = gpsCenter[1]
          }
          initMap()
        }
      )
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    onMounted(() => {
      //  获取组织架构树
      store.getDeptTree().then((res: any) => {
        data.sourceData = res
      })
      // 获取部门列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
      if (props.Id) {
        GetPositionSettingInfo(props.Id).then((res) => {
          if (res.code == 1) {
            data.ruleForm = res.data
            initMap()
          } else {
            ElMessage.error(res.message)
          }
        })
      } else {
        initMap()
      }
    })
    return {
      data,
      map,
      circleEditor,
      boxStyle,
      closeWindow,
      open,
      close,
      parseAddress,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>
<style lang="postcss" scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 300px;
  cursor: pointer;
}
</style>
