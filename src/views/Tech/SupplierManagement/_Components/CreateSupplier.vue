<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pt-2 pl-6 pr-6 pb-2">
      <el-form ref="ruleFormRef" :model="data.ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" :inline="true">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="基础信息" name="first">
            <el-form-item prop="Name">
              <el-input v-model="data.ruleForm.Name" autocomplete="off" placeholder="供应商名称" style="width: 320px">
                <template #prepend>公司名称</template>
                <template #append><span class="text-yellow-400 text-sm cursor-pointer" @click="openWindowCreateSupplierRetests(data.ruleForm.Name)">重新检测</span></template>
                <!-- <span slot="suffix" class=" text-yellow-400 text-sm cursor-pointer margin-right: 10px">重新检测</span> -->
                <!-- <i slot="suffix" style="font-style: normal; margin-right: 10px" >重新检测</i> -->
              </el-input>
            </el-form-item>
            <el-form-item prop="Abbreviation">
              <el-input v-model="data.ruleForm.Abbreviation" autocomplete="off" placeholder="供应商简称" style="width: 280px">
                <template #prepend>公司简称</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="data.ruleForm.level" autocomplete="off" placeholder="C" disabled style="width: 160px">
                <template #prepend>公司等级</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="w-28 h-8 bg-gray-100 inline-block text-center text-gray-400">
                <span>主营类别</span>
              </div>
              <el-select v-model="data.ruleForm.techMainBusinessCategory" placeholder="请选择" style="width: 140px" @change="change">
                <el-option v-for="item in data.techMainBusinessCategory" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item prop="Website">
              <el-input v-model="data.ruleForm.Website" autocomplete="off" placeholder="公司网址" style="width: 320px">
                <template #prepend>公司网址</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="Address">
              <div class="w-24 h-8 bg-gray-100 inline-block text-center text-gray-400">
                <span>公司地址</span>
              </div>
              <el-cascader v-model="data.ruleForm.Address" :options="data.AllRegionTree" :props="data.areaProps" @change="handleChange" style="width: 310px" />
            </el-form-item>
            <el-form-item label="" prop="DetailAddress">
              <el-input v-model="data.ruleForm.DetailAddress" placeholder="详细地址" style="width: 320px"></el-input>
            </el-form-item>
            <!-- 联系人 -->
            <div class="text-sm">
              <div class="inline-block"><i class="iconfont icon-biaoqian text-blue-500 mr-2"></i><span class="font-semibold">联系人</span></div>
              <div class="inline-block float-right text-blue-500 cursor-pointer" @click="AddDrawer(1)"><i class="iconfont icon-tianjia mr-1"></i><span>添加联系人</span></div>
            </div>
            <el-divider />
            <!-- 表格数据 -->
            <div>
              <el-table
                :data="data.ContactsTableData"
                border
                style="width: 100%"
                :header-cell-style="{
                  background: '#eef1f6',
                  color: '#606266'
                }"
              >
                <el-table-column type="index" label="序号" width="54" align="center" />
                <el-table-column label="姓名" width="90" align="center">
                  <template #default="scope"> {{ scope.row.Name }}</template>
                </el-table-column>
                <el-table-column prop="techType" label="类别" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Type == '0'">老板</span>
                    <span v-else-if="scope.row.Type == '1'">管理员</span>
                    <span v-else="scope.row.Type == '2'">业务员</span>
                  </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机" width="140" align="center">
                  <template #default="scope"> {{ scope.row.MobilePhone || '-' }}</template>
                </el-table-column>
                <el-table-column prop="mobile" label="电话" width="140" align="center">
                  <template #default="scope"> {{ scope.row.Telephone || '-' }}</template>
                  <!-- FixedTelephone -->
                </el-table-column>
                <el-table-column prop="weixin" label="微信" width="140" align="center">
                  <template #default="scope"> {{ scope.row.VX || '-' }}</template>
                </el-table-column>
                <el-table-column prop="qq" label="QQ" width="140" align="center">
                  <template #default="scope"> {{ scope.row.QQ || '-' }}</template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注" width="254" align="center">
                  <template #default="scope"> {{ scope.row.Remarks || '-' }}</template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作" width="130" align="center">
                  <template #default="scope">
                    <div class="text-blue-500 text-sm cursor-pointer">
                      <span class="mr-3" @click="DrawerClick(scope.row, scope.$index)">编辑</span>
                      <span @click="deleteRow(scope.$index, data.ContactsTableData)">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 主营产品 -->
            <div class="text-sm mt-4 mb-4">
              <div class="inline-block"><i class="iconfont icon-biaoqian text-blue-500 mr-2"></i><span class="font-semibold">主营产品</span></div>
            </div>
            <div class="tech_SupplierManagement_CreateSupplier">
              <el-input v-model="data.ruleForm.MainProduct" maxlength="100" placeholder="例如：球阀、闸阀、截止阀或配件名称" show-word-limit type="textarea" />
            </div>
            <!-- 公司简介 -->
            <div class="text-sm mt-4 mb-4">
              <div class="inline-block"><i class="iconfont icon-biaoqian text-blue-500 mr-2"></i><span class="font-semibold">公司简介</span></div>
            </div>
            <Editor v-model="data.ContractTerms" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" :init="{ language: 'zh_CN', branding: false }"></Editor>
            <el-divider />
            <div class="float-right">
              <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
              <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资质信息" name="second">
            <!-- 资质信息 -->
            <div class="text-sm mt-4">
              <div class="inline-block"><i class="iconfont icon-biaoqian text-blue-500 mr-2"></i><span class="font-semibold">资质信息</span></div>
            </div>
            <el-divider />
            <UploadQualifications @uploadFileData="uploadFileDataQualifi" :uploadFileData="data.QualificationPathList" />
            <!-- 证书信息 -->
            <div class="text-sm mt-4">
              <div class="inline-block"><i class="iconfont icon-biaoqian text-blue-500 mr-2"></i><span class="font-semibold">证书信息</span></div>
            </div>
            <el-divider />
            <UploadQualifications @uploadFileData="uploadFileDataCertifi" :uploadFileData="data.CertificatePathList" />
            <div class="mt-5 float-right">
              <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
              <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <!-- 添加联系人 -->
      <el-drawer :with-header="true" :size="574" v-model="data.drawer">
        <template v-slot:header><span class="iconfont icon-lianxiren inline-block">创建联系人</span> </template>
        <div>
          <el-form ref="ruleFormRef2" :model="data.ruleForm2" status-icon :rules="rules2" label-width="120px" class="demo-ruleForm" :inline="true">
            <el-form-item prop="Name">
              <el-input v-model="data.ruleForm2.Name" autocomplete="off" placeholder="输入姓名" style="width: 220px">
                <template #prepend>姓名</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="Type">
              <div class="w-16 h-8 bg-gray-100 inline-block text-center text-gray-400">
                <span>类别</span>
              </div>
              <el-select v-model="data.ruleForm2.Type" placeholder="请选择" style="width: 180px">
                <el-option v-for="item in data.techType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item prop="MobilePhone">
              <el-input v-model="data.ruleForm2.MobilePhone" autocomplete="off" placeholder="输入手机号" style="width: 220px">
                <template #prepend>手机</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="Telephone">
              <el-input v-model="data.ruleForm2.Telephone" autocomplete="off" placeholder="输入电话" style="width: 246px">
                <template #prepend>电话</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="VX">
              <el-input v-model="data.ruleForm2.VX" autocomplete="off" placeholder="输入微信" style="width: 220px">
                <template #prepend>微信</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="QQ">
              <el-input v-model="data.ruleForm2.QQ" autocomplete="off" placeholder="输入QQ" style="width: 246px">
                <template #prepend>QQ</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="Remarks">
              <el-input v-model="data.ruleForm2.Remarks" autocomplete="off" placeholder="输入备注" style="width: 500px">
                <template #prepend>备注</template>
              </el-input>
            </el-form-item>
          </el-form>

          <div>
            <el-button type="primary" @click="submitForm2(ruleFormRef2)" class="w-56"><i class="iconfont icon-baocun mr-2"></i> 保存</el-button>
            <el-button @click="resetForm(ruleFormRef2)" class="w-60 float-right mr-9"><i class="iconfont icon-zhongzhi mr-2"></i> 重置</el-button>
          </div>
        </div>
      </el-drawer>
      <!-- <CreateAddContact v-model="data.drawer" /> -->
      <!-- 重新检测 -->
      <CreateSupplierRetest v-if="createSupplierRetestOpenData.visible" :FormData="createSupplierRetestOpenData.formData" @closeWindow="closeWindowCreateSupplierRetest($event)" />
      <!-- 编辑 -->
      <!-- <CreateAddContact v-model="data.operationEditing" /> -->
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, Ref, ref, SetupContext } from 'vue'
import { ElMessage, FormRules, FormInstance, ElDrawer, TabsPaneContext } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
import UploadQualifications from '/@/components/Upload/tech_index.vue'
import CreateAddContact from './CreateAddContact.vue'
import CreateSupplierRetest from './CreateSupplierRetest.vue'
import { createSupplierRetestOpen } from '/@/assets/ts/techOpenWindow'
import Editor from '@tinymce/tinymce-vue'
import { PostAddEditSupplierSave, GetAllRegionTree, GetHasRepeatSupplier } from '/@/api/tech/Supplier'
import { number } from 'echarts'

// 表单事件
const formEvent2 = (data: any, closeWindow: any) => {
  const ruleFormRef2 = ref<FormInstance>()
  // 表单提交
  const submitForm2 = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
      if (valid) {
        // console.log('submit!', data.ruleForm2)
        var ss = { Name: data.ruleForm2.Name, MobilePhone: data.ruleForm2.MobilePhone, Telephone: data.ruleForm2.Telephone, VX: data.ruleForm2.VX, QQ: data.ruleForm2.QQ, Remarks: data.ruleForm2.Remarks, Type: data.ruleForm2.Type }
        console.log('submit!', ss)
        if (data.ruleForm2.index < 0) {
          data.ContactsTableData.push(ss)
        } else {
          if (data.ContactsTableData.length > data.ruleForm2.index) {
            data.ContactsTableData[data.ruleForm2.index] = ss
          }
        }

        data.cacheValue.Name = data.ruleForm2.Name
        data.cacheValue.mobile = data.ruleForm2.MobilePhone
        data.cacheValue.phone = data.ruleForm2.Telephone
        data.cacheValue.weixin = data.ruleForm2.VX
        data.cacheValue.qq = data.ruleForm2.QQ
        data.cacheValue.remarks = data.ruleForm2.Remarks
        data.cacheValue.techType = data.ruleForm2.Type

        data.drawer = false
        data.ruleForm2.index++
        data.ruleForm2.Name = ''
        data.ruleForm2.MobilePhone = ''
        data.ruleForm2.Telephone = ''
        data.ruleForm2.VX = ''
        data.ruleForm2.QQ = ''
        data.ruleForm2.Remarks = ''
        data.ruleForm2.Type = ''
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  //校验
  const rules2 = reactive<FormRules>({
    Name: [
      {
        required: true,
        message: '请填写姓名',
        trigger: 'blur'
      }
    ],
    MobilePhone: [
      {
        required: true,
        message: '请填写手机号',
        trigger: 'blur'
      }
    ],
    TelePhone: [
      {
        required: true,
        message: '请填写电话',
        trigger: 'blur'
      }
    ],
    VX: [
      {
        required: true,
        message: '请填写微信',
        trigger: 'blur'
      }
    ],
    QQ: [
      {
        required: true,
        message: '请填写QQ',
        trigger: 'blur'
      }
    ],
    Remarks: [
      {
        required: true,
        message: '请填写备注',
        trigger: 'blur'
      }
    ],
    Type: [
      {
        required: true,
        message: '请选择类别',
        trigger: 'blur'
      }
    ]
  })
  // 表单重置
  const resetForm2 = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules2,
    submitForm2,
    resetForm2,
    ruleFormRef2
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    UploadQualifications,
    CreateAddContact,
    CreateSupplierRetest,
    Editor
  },
  emits: ['closeWindow'],
  props: {},
  setup(props, context: SetupContext) {
    const cascader = ref([])
    const prop = {
      expandTrigger: 'hover'
    }
    const handleChange = (cascader: any) => {
      console.log(cascader)
    }

    const activeName = ref('first')
    const data = reactive({
      QualificationPathList: [],
      CertificatePathList: [],
      cacheValue: {
        Name: '',
        mobile: '',
        phone: '',
        weixin: '',
        qq: '',
        remarks: '',
        techType: ''
      },
      // 筛选配置
      areaProps: {
        multiple: false, //是否开启多选
        value: 'name',
        label: 'title'
      },
      AllRegionTree: [],
      ContractTerms: '',
      edit: '',
      drawer: false,
      operationEditing: false,
      ruleForm: {
        Name: '',
        Abbreviation: '',
        level: 'C',
        Website: '',
        techMainBusinessCategory: [],
        Address: '',
        DetailAddress: '',
        MainProduct: ''
      },
      ruleForm2: {
        Name: '',
        MobilePhone: '',
        Telephone: '',
        VX: '',
        QQ: '',
        Remarks: '',
        Type: '',
        index: 0
      },
      //表格数据
      ContactsTableData: [],
      techMainBusinessCategory: [],
      techType: []
    })

    // 表单事件
    const formEvent = (data: any, closeWindow: any) => {
      const ruleFormRef = ref<FormInstance>()
      // 表单提交
      const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return

        formEl.validate((valid) => {
          if (valid) {
            console.log('submit!')
            if (data.ruleForm.MainProduct == '' || data.ContractTerms == '') {
              ElMessage.error('请将内容填写完整')
              return
            }
            const datas = {
              Supplier: {
                CompanyName: data.ruleForm.Name,
                Abbreviation: data.ruleForm.Abbreviation,
                Level: data.ruleForm.level,
                MainCategory: data.ruleForm.techMainBusinessCategory,
                Http: data.ruleForm.Website,
                Address: data.ruleForm.Address.join(','),
                DetailAddress: data.ruleForm.DetailAddress,
                Introduction: data.ContractTerms,
                MainProduct: data.ruleForm.MainProduct
              },
              Contacts: data.ContactsTableData,
              QualificationsList: data.QualificationPathList,
              CertificateList: data.CertificatePathList
            }
            /*
            data.QualificationPathList.forEach((item: string, index: number) => {
              if (index > 0) {
                datas.Supplier.QualificationsInfo += ','
              }
              datas.Supplier.QualificationsInfo += item
            })
            */
            console.log(datas)
            const CompanyName = {
              Name: data.ruleForm.Name
            }
            // 新增供应商
            PostAddEditSupplierSave(datas).then((res: any) => {
              console.log(res)
              if (res.code == 1) {
                ElMessage.success(res.message)
                openObj.openWindowCreateSupplierRetest(CompanyName)
                closeWindow('submit')
              } else {
                ElMessage.error(res.message)
              }
            })
            // data.closeWindow('submit')
          } else {
            console.log('error submit!')
            return false
          }
        })
      }
      //校验
      const rules = reactive<FormRules>({
        Name: [
          {
            required: true,
            message: '请填写公司名称',
            trigger: 'blur'
          }
        ],
        Abbreviation: [
          {
            required: true,
            message: '请填写公司简称',
            trigger: 'blur'
          }
        ],
        Website: [
          {
            required: true,
            message: '请填写公司网址',
            trigger: 'blur'
          }
        ],
        Address: [
          {
            required: true,
            message: '请填写公司地址',
            trigger: 'blur'
          }
        ],
        DetailAddress: [
          {
            required: true,
            message: '请填写详细地址',
            trigger: 'blur'
          }
        ],
        MainProduct: [
          {
            required: true,
            message: '请填写公司主营内容',
            trigger: 'blur'
          }
        ]
      })
      // 表单重置
      const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
        closeWindow('close')
      }
      // 监听上传返回的数据  资质信息
      const uploadFileDataQualifi = (val: any) => {
        val.forEach(function (i: any, index: any) {
          data.QualificationPathList.push(i)
        })
      }
      // 监听上传返回的数据  证书信息
      const uploadFileDataCertifi = (val: any) => {
        val.forEach(function (i: any, index: any) {
          data.CertificatePathList.push(i)
        })
      }
      return {
        rules,
        submitForm,
        resetForm,
        ruleFormRef,
        uploadFileDataQualifi,
        uploadFileDataCertifi
      }
    }
    const deleteRow = (index: any, rows: any) => {
      rows.splice(index, 1)
      data.ruleForm2.index--
      console.log(index)
    }

    // 获取公司地址
    const getAllRegionTree = async (data: any) => {
      await GetAllRegionTree()
        .then((res) => {
          if (res.code == 1) {
            data.AllRegionTree = res.data || []
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch((e) => {
          console.log(`错误：${e}`)
        })
    }

    //编辑
    const DrawerClick = (row: any, index: number) => {
      data.ruleForm2.Name = row.Name
      data.ruleForm2.MobilePhone = row.MobilePhone
      data.ruleForm2.Telephone = row.Telephone
      data.ruleForm2.VX = row.VX
      data.ruleForm2.QQ = row.QQ
      data.ruleForm2.Remarks = row.Remarks
      data.ruleForm2.Type = row.Type
      data.ruleForm2.index = index
      data.drawer = true
    }
    // 点击出现右侧的添加联系人
    const AddDrawer = (num: number) => {
      data.ruleForm2.index = -1
      data.drawer = true
    }
    //获取字典数据
    const getDictionaryData = (data: any) => {
      // 主营类别
      store.getDict('tech_MainBusinessCategory').then((res: any) => {
        data.techMainBusinessCategory = res
      })
      //   类别
      store.getDict('tech_contacts_type').then((res: any) => {
        data.techType = res
      })
    }
    // 获取主营类别
    const getOrderStatus = (val: number) => {
      let _obj = data.techMainBusinessCategory.find((x: any) => x.DicKey == val.toFixed(0))
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }

    // 编辑
    const edit = () => {
      data.operationEditing = true
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })

    // 重新检测
    const openObj = createSupplierRetestOpen({ data })
    const openWindowCreateSupplierRetests = () => {
      var datas = {
        Name: data.ruleForm.Name
      }
      GetHasRepeatSupplier(datas).then((res: any) => {
        console.log(res)
        if (res.code == 1) {
          if (res.message == '操作成功！') {
            openObj.openWindowCreateSupplierRetest(datas)
          } else {
            ElMessage.success(res.message)
          }
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
      getAllRegionTree(data)
    })
    // 选择主营类别
    const change = (val: any) => {
      console.log(val)
    }
    return {
      change,
      boxStyle,
      closeWindow,
      activeName,
      data,
      ...formEvent(data, closeWindow),
      ...formEvent2(data, closeWindow),
      cascader,
      prop,
      handleChange,
      DrawerClick,
      ...openObj,
      edit,
      getOrderStatus,
      deleteRow,
      AddDrawer,
      openWindowCreateSupplierRetests
    }
  }
})
</script>

<style lang="postcss" scoped>
.attendanceSetWindow {
  :deep(.el-checkbox) {
    margin-right: 17px;
  }
}
.el-divider--horizontal {
  margin: 12px !important;
}
</style>
