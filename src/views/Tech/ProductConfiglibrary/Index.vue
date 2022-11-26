<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <div class="w-full">
        <div>产品库配置</div>
        <div class="w-full">
          <el-tabs class="demo-tabs" v-model="data.tabsModel" @tab-click="TabshandleClick">
            <el-tab-pane label="产品分类" name="first">
              <div class="flex">
                <div class="w-1/5">
                  <span>分类树</span>
                  <el-tree :data="data.dataTree" accordion :props="defaultProps" @node-click="handleNodeClick" />
                </div>
                <div class="w-4/5">
                  <div class="flex justify-between items-center">
                    <div>子类数据</div>
                    <div>
                      <el-button type="primary" @click="openWindow(0)">新增</el-button>
                    </div>
                  </div>
                  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                    <div class="bf-table-content">
                      <el-table :data="data.ProductTable">
                        <el-table-column type="selection" width="55" align="center" />
                        <el-table-column prop="ProductTypeCode" label="编码" min-width="100" align="center" />
                        <el-table-column prop="ProductTypeName" label="名称" min-width="100" align="center" />
                        <el-table-column prop="ParentProductTypeName" label="所属上级" min-width="100" align="center" />
                        <el-table-column prop="OrderNum" label="排序" min-width="100" align="center" />
                        <el-table-column fixed="right" label="操作" width="240" align="center">
                          <template #default="scope">
                            <el-button type="warning" @click="openWindow(scope.row.Id)"> 修改 </el-button>
                            <el-button type="danger" @click="openMessage(scope.row.Id)">删除 </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </table-search>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="法兰配对" name="second">
              <div class="inline-flex justify-between items-center">
                <div>
                  <el-select v-model="form.Common" clearable placeholder="常规性">
                    <el-option v-for="item in data.commonOptions" :key="item.DicValue" :label="item.DicKey" :value="item.DicValue" />
                  </el-select>
                  <el-input v-model="form.DN" style="width: 10%" placeholder="规格" />
                  <el-input v-model="form.MPa" style="width: 10%" placeholder="压力" />
                  <el-select v-model="form.BasicType" clearable placeholder="法兰">
                    <el-option v-for="item in data.sonList" :key="item.Id" :label="item.ProductTypeName" :value="item.Id" />
                  </el-select>
                  <el-input v-model="form.Version" style="width: 10%" placeholder="法兰型号" />
                  <div class="inline-block mx-5">
                    <el-button type="primary" @click="search()">搜索</el-button>
                    <el-button type="warning" @click="reset()">重置</el-button>
                  </div>
                </div>

                <div class="inline-flex justify-between items-center">
                  <el-button type="primary" @click="openAccessoriesWindow(0)">新增</el-button>
                  <el-button type="success" @click="EditEntity()">编辑</el-button>
                  <el-button type="danger" @click="openMessage(0)">删除</el-button>
                  <el-upload class="ml-3" action="" ref="upload" :auto-upload="false" :on-change="handleChange" :show-file-list="false">
                    <el-button type="danger">批量导入</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="w-full">
                <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                  <div class="bf-table-content">
                    <el-table ref="refflangeTable" @selection-change="getSelectionRowsVal" :data="data.flangeTable">
                      <el-table-column type="selection" width="55" align="center" />
                      <el-table-column type="index" label="序号" width="100" align="center" />
                      <el-table-column prop="CommonState" label="常规性" min-width="100" align="center" />
                      <el-table-column prop="DN" label="规格" min-width="100" align="center" />
                      <el-table-column prop="MPa" label="压力" min-width="100" align="center" />
                      <el-table-column prop="BasicType" label="法兰" min-width="100" align="center" />
                      <el-table-column prop="Version" label="法兰型号" min-width="100" align="center" />
                      <el-table-column prop="Quantity" label="数量" min-width="100" align="center" />
                    </el-table>
                  </div>
                </table-search>
              </div>
            </el-tab-pane>
            <el-tab-pane label="电动配对" name="third">
              <div class="inline-flex justify-between items-center">
                <div>
                  <el-select v-model="form.Common" clearable placeholder="常规性">
                    <el-option v-for="item in data.commonOptions" :key="item.DicValue" :label="item.DicKey" :value="item.DicValue" />
                  </el-select>
                  <el-input v-model="form.DN" style="width: 10%" placeholder="规格" />
                  <el-input v-model="form.MPa" style="width: 10%" placeholder="压力" />
                  <el-select v-model="form.BasicType" clearable placeholder="垫片">
                    <el-option v-for="item in data.sonList" :key="item.Id" :label="item.ProductTypeName" :value="item.Id" />
                  </el-select>
                  <el-input v-model="form.Version" style="width: 10%" placeholder="垫片型号" />
                  <div class="inline-block mx-5">
                    <el-button type="primary" @click="search()">搜索</el-button>
                    <el-button type="warning" @click="reset()">重置</el-button>
                  </div>
                </div>

                <div class="inline-flex justify-between items-center">
                  <el-button type="primary" @click="openAccessoriesWindow(0)">新增</el-button>
                  <el-button type="success" @click="EditEntity()">编辑</el-button>
                  <el-button type="danger" @click="openMessage(0)">删除</el-button>
                  <el-upload class="ml-3" action="" ref="upload" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                    <el-button type="danger">批量导入</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="w-full">
                <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                  <div class="bf-table-content">
                    <el-table ref="refflangeTable" @selection-change="getSelectionRowsVal" :data="data.flangeTable">
                      <el-table-column type="selection" width="55" align="center" />
                      <el-table-column type="index" label="序号" width="100" align="center" />
                      <el-table-column prop="CommonState" label="常规性" min-width="100" align="center" />
                      <el-table-column prop="DN" label="规格" min-width="100" align="center" />
                      <el-table-column prop="MPa" label="压力" min-width="100" align="center" />
                      <el-table-column prop="BasicType" label="电装" min-width="100" align="center" />
                      <el-table-column prop="ExtendType" label="阀门类型" min-width="100" align="center" />
                      <el-table-column prop="Version" label="电装型号" min-width="100" align="center" />
                      <el-table-column prop="Quantity" label="数量" min-width="100" align="center" />
                    </el-table>
                  </div>
                </table-search>
              </div>
            </el-tab-pane>
            <el-tab-pane label="气动配对" name="fourth">
              <div class="inline-flex justify-between items-center">
                <div>
                  <el-select v-model="form.Common" clearable placeholder="常规性">
                    <el-option v-for="item in data.commonOptions" :key="item.DicValue" :label="item.DicKey" :value="item.DicValue" />
                  </el-select>
                  <el-input v-model="form.DN" style="width: 10%" placeholder="规格" />
                  <el-input v-model="form.MPa" style="width: 10%" placeholder="压力" />
                  <el-select v-model="form.BasicType" clearable placeholder="气动">
                    <el-option v-for="item in data.sonList" :key="item.Id" :label="item.ProductTypeName" :value="item.Id" />
                  </el-select>
                  <el-input v-model="form.Version" style="width: 10%" placeholder="气动型号" />
                  <div class="inline-block mx-5">
                    <el-button type="primary" @click="search()">搜索</el-button>
                    <el-button type="warning" @click="reset()">重置</el-button>
                  </div>
                </div>
                <div class="inline-flex justify-between items-center">
                  <el-button type="primary" @click="openAccessoriesWindow(0)">新增</el-button>
                  <el-button type="success" @click="EditEntity()">编辑</el-button>
                  <el-button type="danger" @click="openMessage(0)">删除</el-button>
                  <el-upload class="ml-3" action="" ref="upload" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                    <el-button type="danger">批量导入</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="w-full">
                <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                  <div class="bf-table-content">
                    <el-table ref="refflangeTable" @selection-change="getSelectionRowsVal" :data="data.flangeTable">
                      <el-table-column type="selection" width="55" align="center" />
                      <el-table-column type="index" label="序号" width="100" align="center" />
                      <el-table-column prop="CommonState" label="常规性" min-width="100" align="center" />
                      <el-table-column prop="DN" label="规格" min-width="100" align="center" />
                      <el-table-column prop="MPa" label="压力" min-width="100" align="center" />
                      <el-table-column prop="BasicType" label="气动" min-width="100" align="center" />
                      <el-table-column prop="ExtendType" label="阀门类型" min-width="100" align="center" />
                      <el-table-column prop="Version" label="气动型号" min-width="100" align="center" />
                      <el-table-column prop="Quantity" label="数量" min-width="100" align="center" />
                    </el-table>
                  </div>
                </table-search>
              </div>
            </el-tab-pane>
            <el-tab-pane label="垫片配对" name="dianpian">
              <div class="inline-flex justify-between items-center">
                <div>
                  <el-select v-model="form.Common" clearable placeholder="常规性">
                    <el-option v-for="item in data.commonOptions" :key="item.DicValue" :label="item.DicKey" :value="item.DicValue" />
                  </el-select>
                  <el-input v-model="form.DN" style="width: 10%" placeholder="规格" />
                  <el-input v-model="form.MPa" style="width: 10%" placeholder="压力" />
                  <el-select v-model="form.BasicType" clearable placeholder="气动">
                    <el-option v-for="item in data.sonList" :key="item.Id" :label="item.ProductTypeName" :value="item.Id" />
                  </el-select>
                  <el-input v-model="form.Version" style="width: 10%" placeholder="气动型号" />
                  <div class="inline-block mx-5">
                    <el-button type="primary" @click="search()">搜索</el-button>
                    <el-button type="warning" @click="reset()">重置</el-button>
                  </div>
                </div>

                <div class="inline-flex justify-between items-center">
                  <el-button type="primary" @click="openAccessoriesWindow(0)">新增</el-button>
                  <el-button type="success" @click="EditEntity()">编辑</el-button>
                  <el-button type="danger" @click="openMessage(0)">删除</el-button>
                  <el-upload class="ml-3" action="" ref="upload" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                    <el-button type="danger">批量导入</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="w-full">
                <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                  <div class="bf-table-content">
                    <el-table ref="refflangeTable" @selection-change="getSelectionRowsVal" :data="data.flangeTable">
                      <el-table-column type="selection" width="55" align="center" />
                      <el-table-column type="index" label="序号" width="100" align="center" />
                      <el-table-column prop="CommonState" label="常规性" min-width="100" align="center" />
                      <el-table-column prop="DN" label="规格" min-width="100" align="center" />
                      <el-table-column prop="MPa" label="压力" min-width="100" align="center" />
                      <el-table-column prop="BasicType" label="垫片" min-width="100" align="center" />
                      <el-table-column prop="Version" label="垫片型号" min-width="100" align="center" />
                      <el-table-column prop="Quantity" label="数量" min-width="100" align="center" />
                    </el-table>
                  </div>
                </table-search>
              </div>
            </el-tab-pane>
            <el-tab-pane label="螺栓配对" name="luoshuan">
              <div class="inline-flex justify-between items-center">
                <div>
                  <el-select v-model="form.Common" clearable placeholder="常规性">
                    <el-option v-for="item in data.commonOptions" :key="item.DicValue" :label="item.DicKey" :value="item.DicValue" />
                  </el-select>
                  <el-input v-model="form.DN" style="width: 10%" placeholder="规格" />
                  <el-input v-model="form.MPa" style="width: 10%" placeholder="压力" />
                  <el-select v-model="form.BasicType" style="width: 10%" clearable placeholder="螺栓">
                    <el-option v-for="item in data.sonList" :key="item.Id" :label="item.ProductTypeName" :value="item.Id" />
                  </el-select>
                  <el-select v-model="form.GradeInfo" style="width: 10%" clearable placeholder="等级">
                    <el-option v-for="item in data.GradeInfoList" :key="item.ID" :label="item.label" :value="item.ID" />
                  </el-select>
                  <el-input v-model="form.Version" style="width: 10%" placeholder="螺栓规格" />
                  <div class="inline-block mx-5">
                    <el-button type="primary" @click="search()">搜索</el-button>
                    <el-button type="warning" @click="reset()">重置</el-button>
                  </div>
                </div>
                <div class="inline-flex justify-between items-center">
                  <el-button type="primary" @click="openAccessoriesWindow(0)">新增</el-button>
                  <el-button type="success" @click="EditEntity()">编辑</el-button>
                  <el-button type="danger" @click="openMessage(0)">删除</el-button>
                  <el-upload class="ml-3" action="" ref="upload" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                    <el-button type="danger">批量导入</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="w-full">
                <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                  <div class="bf-table-content">
                    <el-table ref="refflangeTable" @selection-change="getSelectionRowsVal" :data="data.flangeTable">
                      <el-table-column type="selection" width="55" align="center" />
                      <el-table-column type="index" label="序号" width="100" align="center" />
                      <el-table-column prop="CommonState" label="常规性" min-width="100" align="center" />
                      <el-table-column prop="DN" label="规格" min-width="100" align="center" />
                      <el-table-column prop="MPa" label="压力" min-width="100" align="center" />
                      <el-table-column prop="BasicType" label="螺栓" min-width="100" align="center" />
                      <el-table-column prop="Version" label="螺栓型号" min-width="100" align="center" />
                      <el-table-column prop="GradeInfo" label="等级" min-width="100" align="center" />
                      <el-table-column prop="Quantity" label="数量" min-width="100" align="center" />
                    </el-table>
                  </div>
                </table-search>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <IndexForm title="产品类型" v-if="data.indexWindow.show" @closeWindow="closeWindow" :id="data.indexWindow.Id" />
    <flangeFrom title="法兰属性" v-if="data.flangeWindow.show" @closeWindow="closeWindow" :sonList="data.sonList" :id="data.flangeWindow.Id" />
    <ElectricFrom title="电动属性" v-if="data.electricWindow.show" @closeWindow="closeWindow" :sonList="data.sonList" :id="data.electricWindow.Id" />
    <PneumaticFrom title="气动属性" v-if="data.pneumaticWindow.show" @closeWindow="closeWindow" :sonList="data.sonList" :id="data.pneumaticWindow.Id" />
    <GasketFrom title="垫片属性" v-if="data.gasketWindow.show" @closeWindow="closeWindow" :sonList="data.sonList" :id="data.gasketWindow.Id" />
    <BoltFrom title="螺栓属性" v-if="data.boltWindow.show" @closeWindow="closeWindow" :sonList="data.sonList" :gradeList="data.GradeInfoList" :id="data.boltWindow.Id" />
  </div>
</template>
<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import ElectricFrom from './_Components/electricFrom.vue'
import flangeFrom from './_Components/flangeFrom.vue'
import IndexForm from './_Components/IndexFrom.vue'
import PneumaticFrom from './_Components/pneumaticFrom.vue'
import GasketFrom from './_Components/gasketFrom.vue'
import BoltFrom from './_Components/boltFrom.vue'
import { GetBasicProductChildrenList, GetListByPage, PostDeleteEntityById, PostImportExcelData, GetParentList, GetSonList, GetPageList, PostDeleteEntityMountingsById } from '/@/api/tech/BasicProductType'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

interface Tree {
  label: string
  children?: Tree[]
  ParentProductTypeId: number
  Id: number
}

//获取字典数据
const getDictionaryData = (data: any) => {
  //技术产品常规性选项
  store.getDict('tech_product_general_options').then((res: any) => {
    data.commonOptions = res
  })
}

export default defineComponent({
  components: {
    TableSearch,
    IndexForm,
    flangeFrom,
    ElectricFrom,
    PneumaticFrom,
    GasketFrom,
    BoltFrom
  },
  props: {},
  setup() {
    // 筛选数据
    const form: any = reactive({
      page: 1,
      size: 10,
      Common: '',
      MPa: '',
      DN: '',
      BasicType: null,
      Version: '',
      GradeInfo: ''
    })
    const data = reactive({
      UploadData: {
        fileType: 1
      },
      // 弹窗数据
      indexWindow: {
        show: false,
        Id: 0
      },
      flangeWindow: {
        show: false,
        Id: 0
      },
      pneumaticWindow: {
        show: false,
        Id: 0
      },
      electricWindow: {
        show: false,
        Id: 0
      },
      gasketWindow: {
        show: false,
        Id: 0
      },
      boltWindow: {
        show: false,
        Id: 0
      },
      GradeInfoList: [
        { ID: '不锈钢', label: '不锈钢' },
        { ID: '4.8级', label: '4.8级' },
        { ID: '8.8级', label: '8.8级' }
      ],
      dataTabsIndex: 1,
      commonOptions: [],
      total: 1,
      tabsModel: 'first',
      ProductTable: [],
      dataTree: [],
      ParentProductTypeId: 0,
      treeId: 0,
      parentList: [],
      parentId: 0,
      sonList: [],
      selectType: 0,
      flangeTable: [],
      electricTable: [],
      selectTable: [{ Id: 0 }]
    })
    //tree 点击事件
    const handleNodeClick = (val: Tree) => {
      console.log(val.ParentProductTypeId)
      data.ParentProductTypeId = val.ParentProductTypeId
      data.treeId = val.Id
      renderTableList(form, null)
    }
    //加载tree无数据
    const loadTreedataFun = () => {
      GetBasicProductChildrenList().then(res => {
        if (res.code == 1) {
          data.dataTree = res.data
        }
      })
    }
    //分页操作
    const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
    const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
    const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
    const search = () => {
      form.page = 1
      renderTableList(form, data)
    }
    // 产品列表数据请求
    const renderTableList = async (form: any, dataVal: any) => {
      if (data.ParentProductTypeId > 0) {
        return false
      }
      var dto = {}
      if (data.selectType == 0) {
        //产品分类
        dto = {
          page: form.page,
          size: form.size,
          ParentProductTypeId: data.treeId
        }
        GetListByPage(dto).then(res => {
          if (res.code == 1) {
            data.ProductTable = res.data.data
            form.totals = res.data.totals
          }
        })
      }
      if (data.selectType == 1) {
        //法兰配对
        dto = {
          page: form.page,
          size: form.size,
          MPa: form.MPa,
          DN: form.DN,
          Version: form.Version,
          Common: form.Common,
          BasicType: form.BasicType,
          QueryType: data.selectType
        }
        GetPageList(dto).then(res => {
          if (res.code == 1) {
            data.flangeTable = res.data.data
            form.totals = res.data.totali
          }
        })
      }
      if (data.selectType == 2 || data.selectType == 3 || data.selectType == 4) {
        dto = {
          page: form.page,
          size: form.size,
          MPa: form.MPa,
          DN: form.DN,
          Version: form.Version,
          Common: form.Common,
          BasicType: form.BasicType,
          QueryType: data.selectType
        }
        GetPageList(dto).then(res => {
          if (res.code == 1) {
            data.flangeTable = res.data.data
            form.totals = res.data.totali
          }
        })
      }
      if (data.selectType == 5) {
        dto = {
          page: form.page,
          size: form.size,
          MPa: form.MPa,
          DN: form.DN,
          Version: form.Version,
          Common: form.Common,
          BasicType: form.BasicType,
          GradeInfo: form.GradeInfo,
          QueryType: data.selectType
        }
        GetPageList(dto).then(res => {
          if (res.code == 1) {
            data.flangeTable = res.data.data
            form.totals = res.data.totali
          }
        })
      }
    }
    //执行上传
    const handleChange = (val: any, _list: any) => {
      console.log(_list[0])
      var fileData = new FormData()
      console.log(fileData)
      if (_list && _list.length > 0) {
        _list.forEach((element: any) => {
          fileData.append('file', element.raw)
        })
      } else {
        return
      }
      PostImportExcelData({ fileType: data.selectType, data: fileData }).then(res => {
        if (res.code == 1) {
          ElMessage({
            message: '导入成功！',
            type: 'success'
          })
          renderTableList(form, data)
        }
      })
    }
    // 删除事件
    const openMessage = (Id: number) => {
      ElMessageBox.confirm('是否删除信息?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        if (data.selectType == 0) {
          PostDeleteEntityById(Id).then(res => {
            if (res.code == 1) {
              ElMessage({
                message: '操作成功！',
                type: 'success'
              })
              renderTableList(form, data)
            }
          })
        } else {
          var list: any[] = []
          data.selectTable.forEach(function (item: any) {
            list.push(item.Id)
          })
          PostDeleteEntityMountingsById(list).then(res => {
            if (res.code == 1) {
              ElMessage({
                message: '操作成功！',
                type: 'success'
              })
              renderTableList(form, data)
            }
          })
        }
      })
    }
    // 类型添加 修改弹窗
    const openWindow = (Id: number) => {
      data.indexWindow.show = true
      data.indexWindow.Id = Id
    }
    // 配件 新增 修改
    const openAccessoriesWindow = (Id: number) => {
      if (data.selectType == 1) {
        data.flangeWindow.show = true
        data.flangeWindow.Id = Id
      }
      if (data.selectType == 2) {
        data.electricWindow.show = true
        data.electricWindow.Id = Id
      }
      if (data.selectType == 3) {
        data.pneumaticWindow.show = true
        data.pneumaticWindow.Id = Id
      }
      if (data.selectType == 4) {
        data.gasketWindow.show = true
        data.gasketWindow.Id = Id
      }
      if (data.selectType == 5) {
        data.boltWindow.show = true
        data.boltWindow.Id = Id
      }
    }
    //编辑
    const EditEntity = () => {
      if (data.selectTable.length == 0) {
        ElMessage({
          showClose: true,
          message: '请选择要编辑信息',
          type: 'error'
        })
        return false
      }
      if (data.selectTable.length > 1) {
        ElMessage({
          showClose: true,
          message: '只可编辑一条！',
          type: 'error'
        })
      } else {
        if (data.selectType == 1) {
          data.flangeWindow.Id = data.selectTable[0].Id
          data.flangeWindow.show = true
        }
        if (data.selectType == 2) {
          data.electricWindow.Id = data.selectTable[0].Id
          data.electricWindow.show = true
        }
        if (data.selectType == 3) {
          data.pneumaticWindow.Id = data.selectTable[0].Id
          data.pneumaticWindow.show = true
        }
        if (data.selectType == 4) {
          data.gasketWindow.Id = data.selectTable[0].Id
          data.gasketWindow.show = true
        }
        if (data.selectType == 5) {
          data.boltWindow.show = true
          data.boltWindow.Id = data.selectTable[0].Id
        }
      }
    }
    // 关闭弹窗
    const closeWindow = (type: string) => {
      if (data.selectType == 0) {
        data.indexWindow.show = false
      }

      if (data.selectType == 1) {
        data.flangeWindow.show = false
      }
      if (data.selectType == 2) {
        data.electricWindow.show = false
      }
      if (data.selectType == 3) {
        data.pneumaticWindow.show = false
      }
      if (data.selectType == 4) {
        data.gasketWindow.show = false
      }
      if (data.selectType == 5) {
        data.boltWindow.show = false
      }
      if (type == 'submit') {
        form.page = 1
        renderTableList(form, data)
      }
    }
    //tabs 点击事件
    const TabshandleClick = (val: any) => {
      data.selectType = val.index
      GetParentId(val.props.label)
      GetSonListFun()
      formReset()
      renderTableList(form, data)
    }
    //form reset  from 条件重置
    const formReset = () => {
      form.page = 1
      form.size = 10
      form.Common = ''
      form.MPa = ''
      form.DN = ''
      form.BasicType = null
      ;(form.Version = ''), (form.GradeInfo = null)
    }
    //根据选项获取父级Id
    const GetParentId = (key: string) => {
      if (key == '法兰配对') {
        data.parentList.forEach(function (item: any) {
          if (item.ProductTypeName == '法兰盘') {
            data.parentId = item.Id
            return
          }
        })
      }
      if (key == '电动配对') {
        data.parentList.forEach(function (item: any) {
          if (item.ProductTypeName == '电动装置') {
            data.parentId = item.Id
            return
          }
        })
      }
      if (key == '气动配对') {
        data.parentList.forEach(function (item: any) {
          if (item.ProductTypeName == '气动装置') {
            data.parentId = item.Id
            return
          }
        })
      }
      if (key == '垫片配对') {
        data.parentList.forEach(function (item: any) {
          if (item.ProductTypeName == '垫片') {
            data.parentId = item.Id
            return
          }
        })
      }
      if (key == '螺栓配对') {
        data.parentList.forEach(function (item: any) {
          if (item.ProductTypeName == '标准件') {
            data.parentId = item.Id
            return
          }
        })
      }
    }
    //获取分类父级别
    const GetParentListApiFun = () => {
      GetParentList().then(res => {
        if (res.code == 1) {
          data.parentList = res.data
        }
      })
    }
    //根据产品父级ID 获取子级数据
    const GetSonListFun = () => {
      GetSonList(data.parentId).then(res => {
        if (res.code == 1) {
          data.sonList = res.data
          console.log(data.sonList)
        }
      })
    }
    //重置 搜索情况
    const reset = () => {
      form.page = 1
      form.size = 10
      form.Common = ''
      form.MPa = ''
      form.BasicType = null
      form.Version = ''
      ;(form.DN = ''), (form.GradeInfo = null)
    }
    //table 复选框选中事件
    const getSelectionRowsVal = (val: any) => {
      data.selectTable = val
    }
    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)

      loadTreedataFun()
      GetParentListApiFun()
    })
    const defaultProps = {
      children: 'children',
      label: 'label'
    }
    return {
      form,
      data,
      handleSizeChange,
      handleCurrentChange,
      indexMethod,
      search,
      handleNodeClick,
      closeWindow,
      openWindow,
      openMessage,
      handleChange,
      TabshandleClick,
      reset,
      openAccessoriesWindow,
      EditEntity,
      getSelectionRowsVal,
      defaultProps
    }
  }
})
</script>

<style lang="scss" scoped></style>
