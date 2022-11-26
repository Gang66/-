<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="h-full m-5 border-solid border border-light-blue-600" style="border-color: rgba(102, 177, 255, 1)">
      <div class="m-3">
        <span>
          <span style="color: #409eff">▋</span>
          <span style="">选择属性</span>
        </span>
      </div>
      <div class="flex justify-start items-start...">
        <div class="w-1/2">
          <el-input v-model="data.selectInput" placeholder="属性名称" class="mx-3 revert inset-x-0" style="width: 89%" />
          <div class="border-solid border border-light-blue-600 m-3" style="height: 430px; overflow: scroll">
            <el-tree ref="propertyRef" :data="data.dataTree" :props="defaultProps" show-checkbox @check-change="handleNodeClick" :default-checked-keys="data.SelectListKey" node-key="Id" :default-expand-all="true">
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <span>
                    <a href="javascript:void(0)" @click="EditProperty(data)">
                      <el-icon>
                        <el-icon-Edit />
                      </el-icon>
                    </a>
                  </span>
                </span>
              </template>
            </el-tree>
          </div>
        </div>
        <div class="w-1/2 border-solid border border-light-blue-600 items-start" style="">
          <div class="">
            <div class="m-1">
              <span>已选{{ data.SelectListData.length }}</span>
            </div>
            <div class="border-solid border border-light-blue-600" style="height: 430px; overflow: scroll">
              <el-table :data="data.SelectListData" style="width: 100%">
                <el-table-column prop="name" label="选项名称" />
                <el-table-column fixed="right" label="操作" width="80">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="deleteRow(scope, 1)"> 删除 </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div>
            <el-button type="primary" class="w-full top-3/4" @click="SaveProductPropertys()">使用属性 </el-button>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="data.drawer" title="属性" :with-header="true">
      <div>
        <div class="m-5">
          <span
            >属性分组
            <el-select class="m-2" v-model="data.groupValue" placeholder="请选择分组" size="large">
              <el-option v-for="item in data.GroupList" :key="item.Id" :label="item.MountingsName" :value="item.Id" />
            </el-select>
          </span>
          <span class="relative inset-y-0 w-16" style="color: #409eff; left: 45%"
            ><a href="javascript:void(0)" @click="ShowDiv()">+{{ data.addProperty == false ? (data.addTitle = '创建新分组') : (data.addTitle = '创建新属性') }}</a></span
          >
        </div>
        <div class="border-solid border border-light-blue-600 m-5" style="border-radius: 5px" v-show="data.addProperty">
          <div class="m-5">
            <span style="color: #409eff">▋</span>
            <span>新增分组</span>
          </div>
          <div class="m-5">
            <el-input v-model="data.groupName" placeholder="分组名称" clearable>
              <template #append>
                <el-button style="background-color: #409eff; color: aliceblue" @click="SaveGrouping()">保存分组 </el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div v-show="data.addProperty == false">
          <div class="border-solid border border-light-blue-600 m-5">
            <div class="m-5">
              <span style="color: #409eff">▋</span>
              <span>增加属性</span>
            </div>
            <div class="m-5">
              <el-form ref="ruleFormRefProperty" :model="data.ProductPropertys" :rules="ProductPropertysrules" hide-required-asterisk>
                <el-row>
                  <el-form-item label="属性名称" prop="Name">
                    <el-input v-model="data.ProductPropertys.Name">
                      <template #append>
                        <el-button style="background-color: #409eff; color: aliceblue" @click="GetVerifyNameIsExistData()">检查名称 </el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-form-item label="填写方式" prop="PropertyTypeInfo">
                    <el-select v-model="data.ProductPropertys.PropertyTypeInfo">
                      <el-option v-for="item in data.optionsValue" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="是否必填" class="w-1/4">
                    <el-switch v-model="data.IsRequiredVal" inline-prompt active-text="是" inactive-text="否" />
                  </el-form-item>
                  <el-form-item label="数据来源" class="w-1/4">
                    <el-select v-model="data.ProductPropertys.ItemDataSourceVal" @change="ItemDataSourceSelect">
                      <el-option v-for="item in data.ItemDataSourceVal" :key="item.Value" :label="item.label" :value="item.Value" />
                    </el-select>
                  </el-form-item>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <el-form-item label="排序" class="w-1/4">
                    <el-input-number v-model="data.ProductPropertys.orederNum" :min="1" :max="99999" />
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="border-solid border border-light-blue-600 m-5" style="border-radius: 5px" v-show="data.ItemDataSourceSelectData">
            <div class="m-5">
              <span style="color: #409eff">▋</span>
              <span>属性选项</span>
            </div>
            <div class="m-5">
              <el-input v-for="(item, index) in data.modules" class="m-3" :key="index" v-model="item.Value" placeholder="选项名称" clearable />
              <div class="ml-36">
                <el-button type="primary" class="w-2/5 m-2" @click="addRowInput()">添加</el-button>
                <el-button class="w-2/5 m-2" @click="DelRowInput()">减少</el-button>
              </div>
            </div>
          </div>
          <div class="ml-36">
            <el-button type="primary" class="w-1/3" @click="SavePropertysAndVal(ruleFormRefProperty)">保存 </el-button>
            <el-button class="w-1/3">重置</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, onMounted, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules, ElTreeV2 } from 'element-plus'
import { GetProductPropertysAndItemValueList } from '/@/api/tech/ProductBasics'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
const propertyRef = ref()

//tree
interface Tree {
  id: number
  label: string
  children?: Tree[]
}
// 表单事件
const formEvent = (data: any) => {
  const ruleFormRefProperty = ref<FormInstance>()
  //属性校验
  const ProductPropertysrules = reactive<FormRules>({
    Name: [{ required: true, message: '请填写属性名称', trigger: 'blur' }]
  })
  return { ProductPropertysrules, propertyRef, ruleFormRefProperty }
}

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    Id: {
      type: Number,
      default: null
    },
    FormData: {
      type: Object,
      default: {}
    }
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    const data = <any>reactive({
      Id: '',
      drawer: false,
      selectInput: '',
      dataTree: [],
      SelectListData: [],
      SelectListKey: [],
      groupValue: 0,
      GroupList: [],
      addProperty: false,
      addTitle: '',
      groupName: '',
      TypeInfo: 1,
      PropertysTypeInfo: 1,
      ProductPropertys: {
        Name: '', //属性名称
        value: '', //属性值
        PropertyTypeInfo: 1, //属性分类
        MountingsName: '', //分组名称
        MountingsID: '', //分组id
        TypeInfo: 1, //1 产品  2 配件
        IsRequired: 0, //是否必填
        orederNum: 1,
        Id: 0,
        ItemDataSourceVal: 0
      },
      IsRequiredVal: true,
      ProductPropertyMapping: [],
      ItemDataSourceVal: [
        {
          label: '自定义',
          Value: 0
        },
        {
          label: '系统',
          Value: 1
        }
      ],
      optionsValue: [
        { value: 1, label: '输入框' },
        { value: 2, label: '单选框' },
        { value: 3, label: '复选框' }
      ],
      ItemDataSourceSelectData: true,
      modules: [{ ProductPropertysID: 0, Value: '', Id: 0, ItemDataSourceVal: 0 }],
      dto: { list: null, entity: null }
    })
    //Prop配置项
    const defaultProps = {
      children: 'children',
      label: 'label'
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })

    //属性选择事件
    const handleNodeClick = (dataValue: any, isSelect: any, TreeSelct: any) => {
      if (isSelect) {
        //新增
        if (dataValue.Level == 1) {
          data.SelectListData.push({ id: dataValue.Id, name: dataValue.label })
          data.SelectListKey.push(dataValue.Id)
        }
      } else {
        //删除
        if (dataValue.Level == 1) {
          for (var i = 0; i < data.SelectListData.length; i++) {
            var item = data.SelectListData[i]
            if (item.id == dataValue.Id) {
              data.SelectListData.splice(i, 1)
              data.SelectListKey.splice(i, 1)
            }
          }
        }
      }
    }
    //编辑属性
    const EditProperty = dataValue => {
      data.drawer = true
      GetProductPropertysEntityValue(dataValue.Id)
    }
    //获取属性
    const GetProductPropertysEntityValue = id => {}
    //获取属性值
    const GetAllProductPropertysItmeValLsitVal = id => {}
    //使用属性点击事件
    const SaveProductPropertys = () => {
      GetProductPropertysAndItem(data.SelectListKey)
      console.log('使用属性')
    }
    //属性删除事件
    const deleteRow = (rowData: any, typeinfo: number) => {
      for (var i = 0; i < data.SelectListData.length; i++) {
        var item = data.SelectListData[i]
        if (item.Id == rowData.row.id) {
          data.SelectListData.splice(i, 1)
        }
      }
      for (var i = 0; i < data.SelectListKey.length; i++) {
        if (data.SelectListKey[i] == rowData.row.id) {
          data.SelectListKey.splice(i, 1)
        }
      }
      console.log(propertyRef.value)
      propertyRef.value.setCheckedKeys(data.SelectListKey)
    }
    //根据属性idList获取属性和属性值选项
    const GetProductPropertysAndItem = (list: Array<number>) => {
      GetProductPropertysAndItemValueList(list, data.Id).then(res => {
        if (res.code == 1) {
          if (data.PropertysTypeInfo == 1) {
            context.emit('SetProductPropertyMapping', res.data)
          } else {
            context.emit('SetProductPropertyMapping', res.data)
          }
        }
      })
    }

    const ShowDiv = () => {
      data.TypeInfo = 1
      if (data.addProperty == true) {
        data.addProperty = false
      } else {
        data.addProperty = true
      }
    }
    //检测属性名称
    const GetVerifyNameIsExistData = async () => {
      if (data.ProductPropertys.Name == '' || data.ProductPropertys.Name == undefined || data.ProductPropertys.Name == null) {
        ElMessage.error('请填写名称')
        return false
      }
    }
    //选择数据来源 系统或自定义
    const ItemDataSourceSelect = (val: any) => {
      if (val == 0) {
        data.ItemDataSourceSelectData = true
      } else {
        data.ItemDataSourceSelectData = false
      }
    }
    //添加属性值选项框
    const addRowInput = () => {
      data.modules.push({ ProductPropertysID: 0, Value: '' })
    }
    //减少属性值选项框
    const DelRowInput = () => {
      data.modules.pop()
    }
    //保存属性
    const SavePropertysAndVal = async (formEl: FormInstance | undefined) => {
      if (!formEl) {
        return
      }
      await formEl.validate((valid, fields) => {
        if (valid) {
          if (data.ProductPropertys.PropertyTypeInfo > 1 && data.ItemDataSourceSelectData == true) {
            if (data.modules.length == 0) {
              ElMessage.error('请填写属性选项')
              return false
            } else {
              for (var i = 0; i < data.modules.length; i++) {
                if (data.modules[i].Value == '' || data.modules[i].Value == undefined || data.modules[i].Value == null) {
                  ElMessage.error('请填写属性选项的值')
                  return false
                }
              }
            }
          }
          data.ProductPropertys.MountingsID = data.groupValue
          data.modules.IsRequired = data.IsRequiredVal == true ? 1 : 0
          data.dto.list = data.modules
          data.dto.entity = data.ProductPropertys
        }
      })
    }
    //根据类型 获取数据属性和属性选项值
    const GetGroupAndProductPropertysValue = () => {
      // GetGroupAndProductPropertys(data.PropertysTypeInfo).then(res => {
      //   if (res.code == 1) {
      //     data.dataTree = res.data
      //     GetProductPropertySelectedMapPropertyFun()
      //   }
      // })
    }
    const GetProductPropertySelectedMapPropertyFun = () => {
      // debugger
      // 接口已删除
      // GetProductPropertySelectedMapProperty(data.Id).then((res) => {
      //   if (res.code == 1) {
      //     data.SelectListKey = res.data
      //   }
      // })
    }
    onMounted(() => {
      GetGroupAndProductPropertysValue()
    })

    return {
      boxStyle,
      closeWindow,
      data,

      defaultProps,
      handleNodeClick,
      EditProperty,
      SaveProductPropertys,
      deleteRow,
      ShowDiv,
      GetVerifyNameIsExistData,
      ItemDataSourceSelect,
      addRowInput,
      DelRowInput,
      SavePropertysAndVal,
      ...formEvent(data)
    }
  }
})
</script>
<style lang="postcss" scoped></style>
