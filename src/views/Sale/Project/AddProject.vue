<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addproject text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>基本信息</div>
                  <div class='header-right'>
                    <div class="flex justify-end">
                      <div>

                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div>
                <el-form-item label='添加人员'>
                  <el-input :readonly='true' v-model='data.form.CreateName' placeholder='请输入' class="inputwidth" />
                </el-form-item>
                <el-form-item label='事业部'>
                  <el-input :readonly='true' v-model='data.form.CompName' placeholder='请输入' class="inputwidth" />
                </el-form-item>
                <el-form-item label='添加时间'>
                  <el-input :readonly='true' v-model='data.form.CreateOn' placeholder='请输入' class="inputwidth" />
                </el-form-item>
                <el-form-item label='客户名称' @click="showrelation" prop="CustomerName">
                  <el-input :readonly='true' v-model='data.form.CustomerName' placeholder='请输入' style="width:573px" />
                </el-form-item>
                <el-form-item label='建设状态' prop="Build">
                  <el-select v-model='data.form.Build' class="inputwidth" placeholder='请选择' :disabled='data.disabled'>
                    <el-option key='1' label='立项' value='立项' />
                    <el-option key='2' label='勘察' value='勘察' />
                    <el-option key='3' label='设计' value='设计' />
                    <el-option key='4' label='审核' value='审核' />
                    <el-option key='5' label='招标' value='招标' />
                    <el-option key='6' label='施工' value='施工' />
                    <el-option key='7' label='验收' value='验收' />
                    <el-option key='8' label='投入使用' value='投入使用' />

                  </el-select>
                </el-form-item>

                <el-form-item label='项目名称' prop="ProjectName">
                  <el-input :readonly='data.disabled' v-model='data.form.ProjectName' placeholder='请输入' style="width:573px" />
                </el-form-item>
                <el-form-item label='所在行业' prop="Trade">
                  <el-cascader :disabled='data.disabled' @change="TradeChange" :placeholder="'请选择地址'" :options="Trade" :props="regionProps" filterable v-model="data.form.Trade"
                    style=" width: 250px;">
                  </el-cascader>
                </el-form-item>
                <el-form-item label='投资额度' prop="Quota">
                  <el-input :readonly='data.disabled' v-model.number='data.form.Quota' placeholder='请输入' class="inputwidth">
                    <template #append>万</template>
                  </el-input>
                </el-form-item>

                <el-form-item label='采购性质' prop="Nature">
                  <el-select v-model='data.form.Nature' class="inputwidth" placeholder='请选择' :disabled='data.disabled'>
                    <el-option key='1' label='自主采购' value='自主采购' />
                    <el-option key='2' label='外包采购' value='外包采购' />
                    <el-option key='3' label='指定品牌' value='指定品牌' />

                  </el-select>
                </el-form-item>
                <el-form-item label='预计采购时间' label-width="6rem" prop="Time">
                  <el-date-picker :readonly='data.disabled' v-model="data.form.Time" type="date" placeholder="请选择" style="width:228px" />
                </el-form-item>
                <el-form-item label='项目等级' prop="Grade">
                  <el-select v-model='data.form.Grade' class="inputwidth" placeholder='请选择' :disabled='data.disabled'>
                    <el-option key='1' label='A级' value='A' />
                    <el-option key='2' label='B级' value='B' />
                    <el-option key='3' label='C级' value='C' />
                    <el-option key='4' label='D级' value='D' />

                  </el-select>
                </el-form-item>
                <el-form-item label='项目地址' prop="CityAddress">
                  <el-cascader :disabled='data.disabled' @change="changeRegion" :placeholder="Region == null ? '加载中' : '请选择地址'" :options="Region" :props="regionProps" filterable
                    v-model="data.form.CityAddress" style="width:287px"></el-cascader>

                </el-form-item>
                <el-form-item label-width="0" prop="Address">
                  <el-input :readonly='data.disabled' v-model='data.form.Address' placeholder='请输入详细地址' style="width:287px" />
                </el-form-item>

                <el-form-item label='项目简介' prop="Note">
                  <el-input :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" :readonly='data.disabled' v-model='data.form.Note' placeholder='请输入' style="width:897px" />
                </el-form-item>
                <el-form-item label='项目跟进'>
                  <div class="flex">
                    <el-input :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" v-model='data.follow.Note' placeholder='请输入' style="width:797px" />
                    <div class="pl-2">
                      <el-button @click="showmessage" type="primary" size="small">
                        消息记录
                        <el-icon-ChatLineRound class='w-4 h-4' />
                      </el-button>
                    </div>

                  </div>
                </el-form-item>

              </div>
            </el-card>
          </el-form>

          <div class="pt-2">
            <div class="flex justify-between">
              <div class="flex">
                <div class="cursor-pointer checktabletitle">联系人</div>
                <!--                   <div class="cursor-pointer" :class="tabletopindex==2?'checktabletitle':'tabletitle'" @click="checktop(2)">开票信息</div> -->
              </div>
              <div class="mt-1">
                <div>
                  <el-button size="small" type="primary" @click='showcontact' style="background: #027AFF;">
                    <el-icon-plus class='w-4 h-4 mr-2' /> 新增
                  </el-button>
                </div>
              </div>
            </div>
            <div class=" bg-white border-blue-300 border-solid border rounded-b-lg pb-2">
              <el-table border :data='data.SituationData'
                :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
                :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
                <el-table-column type="index" width="55" label='序号' />
                <el-table-column prop='CreatrOn' width="100" label='录入日期'>
                  <template #default="scope">{{ (scope.row.CreatrOn||'').substring(0,11) }}</template>
                </el-table-column>
                <el-table-column prop='Type' width="50" label='类别' />
                <el-table-column prop='Name' width="50" label='姓名' />
                <el-table-column prop='Duties' width="50" label='职位' />
                <el-table-column prop='Telephone' label='联系方式' />
                <!-- <el-table-column prop='address' width="50" label='属性' /> -->
                <el-table-column label='属性' width="80">
                  <template #default="scope">
                    <!--  <span class="cursor-pointer" v-if="scope.row.isView==1" style="color:#07C160;" @click="viewcontact(scope.row.Id,3)">详情</span>
                        <span class="cursor-pointer" v-else style="color:#DB0C0C;" @click="viewcontact(scope.row.Id,4)">添加</span> -->
                  </template>
                </el-table-column>
                <el-table-column label='操作' width="100">
                  <template #default="scope">
                    <span v-if="scope.row.IsSuccess==true" class="mr-4 cursor-pointer" @click="editcontact(scope.row)">查看</span>
                    <span v-else class="mr-4 cursor-pointer" @click="editcontact(scope.row)">变更</span>
                    <span class="cursor-pointer" @click="DeleteSituationInfo(scope.row)" style="color:#DB0C0C;">删除</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="flex justify-end">
                <el-pagination small v-model:page-size="sitpage.size" :background="true" layout="prev, pager, next, jumper" :total="sitpage.count"
                  @size-change="sithandleSizeChange" @current-change="sithandleCurrentChange" />
              </div>
            </div>

          </div>

        </div>
      </div>
      <div v-if="ViewType==1||ViewType==2" class="text-center pt-6">
        <el-button class="cancelbut mr-2" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
      </div>
    </CusDialog>
    <CusDialog v-if=" data.relation.show" :boxStyle='cusboxStyle' title='选择客户' :is-show='true' @closeWindow='cancelrelation'>
      <div>
        <el-card class="sale_card " style="padding:0px">
          <div>
            <el-input v-model="data.relationpageInfo.Name" style="width:200px"></el-input>
            <el-button @click="CustomersByNameEvent">搜索</el-button>
          </div>
        </el-card>

        <el-card class='sale_card mt-6'>
          <div>
            <el-table border :data='data.relation.list'
              :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
              :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
              <el-table-column type="index" width="50" label='序号' />
              <el-table-column prop='CreateOn' width="130" label='录入时间'>
                <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
              </el-table-column>
              <el-table-column prop='Name' label='客户名称' />
              <el-table-column prop='address' width="100" label='操作'>
                <template #default="scope">
                  <span class="text-blue-400 cursor-pointer" @click="checkcustomer(scope.row)">点击选择</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="flex justify-end">
              <el-pagination small v-model:page-size="data.relationpageInfo.size" :background="true" layout="prev, pager, next, jumper" :total="data.relationpageInfo.count"
                @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
            </div>
          </div>
        </el-card>
      </div>
    </CusDialog>
    <CusDialog v-if="messagedata.show" :boxStyle='meboxStyle' title='跟进记录' :is-show='true' @closeWindow='closemessage'>
      <div>
        <el-card class="sale_card " style="padding:0px">
          <div>
            <div class="p-2 overflow-y-auto max-h-80 rounded-none" style="border-radius: 0px;">
              <div v-for="(item,index) in messagedata.list " :key="index" class="border-dashed  border-l-2 border-blue-400 relative p-4">
                <div class="w-4 h-4 bg-blue-400 rounded-xl absolute -top-2 -left-2"></div>
                <div>
                  {{item.CreatName}}<span class="text-gray-400">{{item.CreateOn}}</span><span class="text-gray-400"> 审批中</span>
                </div>
                <div class="text-gray-500 break-all">{{item.CreateName+'('+item.CompName+')：'+item.Note}}</div>
              </div>
            </div>
          </div>
        </el-card>
        <div class="text-center pt-6">
          <el-button type="primary" @click="closemessage">
            提交
          </el-button>
        </div>

      </div>
    </CusDialog>
    <Contacts v-if='contactview.view' :ViewType='contactview.type' :CustomerName='data.form.CustomerName' :title="contactview.title" :SituationId="contactview.sitId"
      :CustomerId='data.form.CustomerId' :dialog-visible='contactview.view' @cancelcontact='cancelcontact' />
  </div>
</template>
<script lang="ts" setup>
import { PostAddProject, GetProjectById, GetProjectFollowList } from '/@/api/Sale/CustomerProjeck'
import { parseTime, getTime } from '/@/utils/tools'
import { GetUserinformation } from '/@/api/layout/index'
import Contacts from '/@/views/Sale/Customer/Component/Contacts.vue'
import { GetCustomerTrade, GetRegionTreeByUserId, GetSituationInfoList, GetDeleteSituationInfo, GetCustomersByName } from '/@/api/Sale/Customer'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { isNumber } from '/@/utils/validate'
const props = defineProps({
  DataInfo: {
    type: Object,
    default: null
  },
  ViewType: {
    type: Number,
    default: 1 //-1是认领项目 1是添加  2是修改联系人 3是查看
  },
  DataId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  CustomerName: [
    {
      required: true,
      message: '请选择客户',
      trigger: 'change'
    }
  ],
  Build: [
    {
      required: true,
      message: '请选择建设状态',
      trigger: 'change'
    }
  ],
  Trade: [
    {
      required: true,
      message: '请录入行业',
      trigger: 'change'
    }
  ],
  Quota: [
    {
      required: true,
      message: '请输入投资额度',
      trigger: 'change'
    },
    {
      validator: isNumber,
      message: '请输入正确的金额',
      trigger: 'change'
    }
  ],
  Time: [
    {
      required: true,
      message: '请选择采购时间',
      trigger: 'change'
    }
  ],
  Grade: [
    {
      required: true,
      message: '请选择项目等级',
      trigger: 'change'
    }
  ],
  CityAddress: [
    {
      required: true,
      message: '请选择项目地址',
      trigger: 'change'
    }
  ],
  Address: [
    {
      required: true,
      message: '请录入详细地址',
      trigger: 'change'
    }
  ],
  Note: [
    {
      required: true,
      message: '请录入项目简介',
      trigger: 'change'
    }
  ],
  Nature: [
    {
      required: true,
      message: '请选择采购性质',
      trigger: 'change'
    }
  ],
  ProjectName: [
    {
      required: true,
      message: '请录入项目名称',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const cusboxStyle = reactive({
  boxWidth: 'w-1000',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const meboxStyle = reactive({
  boxWidth: 'w-800',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  disabled: false,
  SituationData: [],
  form: {
    ZxwContentInfoId: '',
    Id: 0,
    CreateBy: 0,
    Trade: [],
    CreateOn: parseTime(getTime('day'), ''),
    CreateName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CityAddress: [],
    Addr_Province: '',
    Addr_City: '',
    Addr_Area: '',
    Build: '',
    ProjectName: '',
    Trade_One: '',
    Trade_Two: '',
    Quota: null,
    Nature: '',
    Time: '',
    Grade: '',
    Note: '',
    CustomerName: '',
    CustomerId: 0
  },
  follow: {
    ProjectId: 0,
    Note: '',
    CreateName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0
  },
  relation: {
    list: [],
    show: false
  },
  relationpageInfo: {
    Name: '',
    count: 0,
    page: 1,
    size: 10
  }
})

///消息记录
const messagedata = reactive({
  show: false,
  list: []
})
///打开跟进记录
const showmessage = () => {
  messagedata.show = true
  if (data.form.Id > 0) {
    GetProjectFollowList({ Id: data.form.Id }).then((res) => {
      if (res.code == 1) {
        messagedata.list = res.data
      }
    })
  }
}
//关闭消息记录
const closemessage = () => {
  messagedata.show = false
}

///选择客户
const showrelation = () => {
  if (data.disabled == false) {
    data.relation.show = true
    CustomersByNameEvent()
  }
}
const cancelrelation = () => {
  data.relation.show = false
}
const relationhandleSizeChange = (val: number) => {
  data.relationpageInfo.size = val
  CustomersByNameEvent()
}
const relationhandleCurrentChange = (val: number) => {
  data.relationpageInfo.page = val
  CustomersByNameEvent()
}
const CustomersByNameEvent = () => {
  GetCustomersByName(data.relationpageInfo).then((res) => {
    if (res.code == 1) {
      data.relationpageInfo.count = res.data.count
      data.relation.list = res.data.list
    }
  })
}

const checkcustomer = (val: any) => {
  data.form.CustomerName = val.Name
  data.form.CustomerId = val.Id
  SituationInfoList()
  cancelrelation()
}

///联系人分页
const sitpage = reactive({
  count: 0,
  page: 1,
  size: 10
})
const sithandleSizeChange = (val: number) => {
  sitpage.size = val
  SituationInfoList()
}
const sithandleCurrentChange = (val: number) => {
  sitpage.page = val
  SituationInfoList()
}
const SituationInfoList = () => {
  let postdata: any = {}
  postdata = sitpage
  postdata.CustomerId = data.form.CustomerId
  if (data.form.CustomerId > 0) {
    GetSituationInfoList(postdata).then((res) => {
      if (res.code == 1) {
        data.SituationData = res.data.data
        sitpage.count = res.data.count
      }
    })
  }
}

//联系人弹窗
const contactview = ref({
  title: '',
  view: false,
  type: 1,
  sitId: 0
})
//联系人编辑
const DeleteSituationInfo = (val: any) => {
  ElMessageBox.confirm('确定要删除此联系人吗', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      var postdata: any = {}
      postdata.Id = val.Id
      GetDeleteSituationInfo(postdata).then((res) => {
        if (res.code == 1) {
          ElMessage.success('删除成功')
          SituationInfoList()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    .catch(() => {})
}
const cancelcontact = () => {
  SituationInfoList()
  contactview.value.view = false
  contactview.value.title = ''
  contactview.value.type = 1
  contactview.value.sitId = 0
}
//打开添加联系人
const showcontact = () => {
  if (data.form.CustomerId == 0) {
    ElMessage.warning('请先选择客户')
  } else {
    contactview.value.view = true
    contactview.value.title = '添加联系人'
    contactview.value.type = 1
  }
}
///打开变更联系人
const editcontact = (val: any) => {
  if (val.IsSuccess == true) {
    contactview.value.title = '查看联系人'
    contactview.value.type = 3
  } else {
    contactview.value.title = '变更联系人'
    contactview.value.type = 2
  }
  contactview.value.view = true

  contactview.value.sitId = val.Id
}
//选择地区
const changeRegion = () => {
  if (data.form.CityAddress.length > 0) {
    data.form.Addr_Province = data.form.CityAddress[0]
    data.form.Addr_City = data.form.CityAddress[1]
    data.form.Addr_Area = data.form.CityAddress[2]
  }
}
const Region = ref<any>([])
const regionProps = {
  children: 'children',
  label: 'title',
  value: 'title',
  expandTrigger: 'hover'
}
const GetRegion = (val: any) => {
  GetRegionTreeByUserId(val).then((res) => {
    if (res.code == 1) {
      Region.value = res.data
      assignmentinfo()
    }
  })
}
///中项网项目赋值
const assignmentinfo = () => {
  console.log(props.DataInfo)
  if (props.DataInfo != null) {
    var info = props.DataInfo
    data.form.ProjectName = info.ystitle
    data.form.Quota = info.price
    data.form.Note = info.content.replace('<br>', '\n')
    data.form.ZxwContentInfoId = info.Id
    var add: any = []
    for (let index = 0; index < Region.value.length; index++) {
      const item = Region.value[index]
      ///查找省份
      if (item.name == info.Addr_Province) {
        add.push(item.title)
        ///查找城市
        for (let index = 0; index < item.children.length; index++) {
          const city = item.children[index]
          if (city.name == info.Addr_City) {
            console.log(city.title)
            add.push(city.title)
            for (let index = 0; index < city.children.length; index++) {
              const area = city.children[index]
              if (area.name == info.Addr_Area) {
                add.push(area.title)
                break
              }
            }
            break
          }
        }
        break
      }
    }
    data.form.CityAddress = add
    console.log('data.form.CityAddress', data.form.CityAddress)
  }
}
const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      if (props.ViewType == 1) {
        data.form.CreateName = res.data.RealName
        data.form.CompName = res.data.CompName
        data.form.DeptName = res.data.DeptName
        data.form.PostName = res.data.PostName
        data.form.CompId = res.data.CompId
        data.form.DeptId = res.data.DeptId
        data.form.PostId = res.data.PostId

        GetRegion(res.data.UserId)
      } else {
        data.follow.CreateName = res.data.RealName
        data.follow.CompName = res.data.CompName
        data.follow.DeptName = res.data.DeptName
        data.follow.PostName = res.data.PostName
        data.follow.CompId = res.data.CompId
        data.follow.DeptId = res.data.DeptId
        data.follow.PostId = res.data.PostId
      }
    }
  })
}
///提交项目
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var postdata: any = {}
      postdata.AddOrEdit = props.ViewType
      if (props.ViewType == 1) {
        postdata.project = JSON.parse(JSON.stringify(data.form))
        postdata.project.Trade = JSON.stringify(postdata.project.Trade)
        postdata.project.CityAddress = JSON.stringify(postdata.project.CityAddress)
        postdata.follow = JSON.parse(JSON.stringify(data.follow))
      } else {
        console.log('asdasdsadas')
        if (data.follow.Note == '') {
          ElMessage.error('请填写项目跟进')
          return false
        }
        postdata.project = {}
        postdata.follow = JSON.parse(JSON.stringify(data.follow))
        postdata.follow.ProjectId = data.form.Id
      }

      PostAddProject(postdata).then((res) => {
        if (res.code == 1) {
          if (res.data == true) {
            ElMessage.success(res.message)
            closeWindow()
          } else {
            ElMessage.error(res.message)
          }
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
    }
  })
}
///获取行业
const Trade = ref<any>([])

const TradeChange = () => {
  if (data.form.Trade.length > 0) {
    data.form.Trade_One = data.form.Trade[0]
    data.form.Trade_Two = data.form.Trade[1]
  }
}

///获取行业
const CustomerTrade = () => {
  GetCustomerTrade().then((res) => {
    if (res.code == 1) {
      Trade.value = res.data
    }
  })
}
///获取项目详情
const GetProjectByIdEven = () => {
  GetProjectById({ Id: props.DataId }).then((res) => {
    if (res.code == 1) {
      var pro = res.data
      pro.Trade = JSON.parse(pro.Trade)
      pro.CityAddress = JSON.parse(pro.CityAddress)
      data.form = pro
      SituationInfoList()
      GetRegion(data.form.CreateBy)
    }
  })
}
onMounted(() => {
  CustomerTrade()
  getuserinfo()
  if (props.ViewType == 1) {
  } else {
    data.disabled = true
    GetProjectByIdEven()
  }
})
</script>
<style lang="postcss" scoped>
.addproject {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  .inputwidth {
    width: 250px;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 4.5rem;
  }
  :deep(.el-table) .cell {
    padding: 0px !important;
  }
  .checktabletitle {
    width: 86px;

    color: #ffffff;
    text-align: center;
    line-height: 30px;
    height: 30px;

    background: #027aff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 0px 0px;
  }
}
</style>
