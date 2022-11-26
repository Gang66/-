<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addSample text-base' v-loading="modelLoding" element-loading-text="Loading...">
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='formdata.form' :rules="rules" :inline='true'>
            <el-card class='sale_card mb-2'>
              <el-form-item label='申请人' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.UserName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='事业部' prop="CompName">
                <el-input :readonly='true' v-model='formdata.form.CompName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='职务' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.PostName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='申请时间' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.CreateOn' placeholder='请输入' class="inputwidth" />
              </el-form-item>
            </el-card>
            <el-card class='sale_card'>
              <el-form-item label='姓名' prop="Name">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Name' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='性别' prop="Sex">
                <el-select :disabled='formdata.disabled' v-model="formdata.form.Sex" placeholder="请选择" class="inputwidth">
                  <el-option label="男" :value="0"></el-option>
                  <el-option label="女" :value="1"></el-option>
                  <el-option label="其他" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='年龄' prop="Age">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Age' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='地址' prop="Address">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Address' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='籍贯' prop="Native">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Native' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='企业' prop="EmployedBy">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.EmployedBy' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='岗位' prop="UserPost">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.UserPost' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='职务' prop="JobName">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.JobName' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='手机' prop="MobilePhone">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.MobilePhone' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='微信' prop="WeChat">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.WeChat' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='电话' prop="Telephone">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Telephone' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='邮箱' prop="Mailbox">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Mailbox' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='QQ号'>
                <el-input :readonly='formdata.disabled' v-model='formdata.form.QQ' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='传真'>
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Fax' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-divider content-position="left">紧急联系人</el-divider>
              <el-form-item label='姓名' prop="Contact">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Contact' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='关系' prop="Relationship">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Relationship' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='工作单位' prop="WorkAddress">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.WorkAddress' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='联系方式' prop="ContactInformation">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.ContactInformation' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
            </el-card>
            <el-card class='sale_card mt-2'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>关联企业</div>
                  <div class='header-right text-right'>
                    <div v-if="formdata.disabled==false" class="flex justify-end">
                      <el-button @click="showrelation(-1)" size="small">
                        <el-icon-plus class='w-4 h-4 mr-2' />
                        新增关联企业
                      </el-button>
                    </div>
                  </div>
                </div>
              </template>
              <div class="tableclass pt-2">
                <el-table :cell-style='{ textAlign:"center",color: "#333",height:"45px",padding:"0px" }'
                  :header-cell-style="{'text-align':'center','background':'#E7F4FE','color':'#303133'}" :data="formdata.Entity" border style="width: 100%">
                  <el-table-column type="index" label="序号" width="50" />
                  <el-table-column prop="Project" label="关联企业名称" >
                    <template #default="scope">
                      <el-form-item>
                        <el-input :readonly='true' style="width:100%" v-model="scope.row.CustomerName"
                          placeholder="请选择客户" @click="showrelation(scope.$index)">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="SalerName" width="100" label="业务员">
                    <template #default="scope">
                      <el-form-item>
                        <el-input :readonly='true' style="width:100%;text-align: center" v-model="scope.row.SalerName"
                          placeholder=" ">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Scale" width="100" label="规模">
                    <template #default="scope">
                      <el-form-item>
                        <div class="text-center w-full" v-if="scope.row.Scale">
                          前{{ scope.row.Scale }}强
                        </div>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" label="类型">
                    <template #default="scope">
                      <el-form-item>
                        <el-select
                          :disabled='formdata.disabled'
                          v-model="scope.row.Type"
                          style="width:100%"
                          placeholder="请选择"
                        >
                          <el-option :label="itm.DicValue" :value="itm.DicKey" :key="itm.DicKey" v-for="itm in dic.EnterpriseType"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Relationship" width="100" label="关系">
                    <template #default="scope">
                      <el-form-item>
                        <el-select
                          :disabled='formdata.disabled'
                          v-model="scope.row.Relationship"
                          style="width:100%"
                          placeholder="请选择"
                        >
                          <el-option :label="itm.DicValue" :value="itm.DicKey" :key="itm.DicKey" v-for="itm in dic.EnterpriseRelation"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="EnterpriseStatus" width="100" label="状态">
                    <template #default="scope">
                      <el-form-item>
                        <div class="text-center w-full text-green-500" v-if="scope.row.State == 100">
                          已通过
                        </div>
                        <div class="text-center w-full text-red-500" v-else-if="scope.row.State < 0">
                          驳回
                        </div>
                        <div class="text-center w-full text-blue-500" v-else-if="scope.row.State == 1">
                          审核中
                        </div>
                        <div class="text-center w-full" v-else>
                          待申请
                        </div>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="120">
                    <template #default="scope">
                      <div v-if="formdata.disabled==false">
                        <el-button text class="textbut" size="small" style="padding: 5px;width: 45px;color: red;" @click="delentity(scope.$index)">删除</el-button>
                      </div>
                      <div v-if="formdata.ViewType==4" class="flex items-center justify-center">
                        <a href="javascript:;" @click="changeState(scope, 1)" v-if="formdata.Entity[scope.$index].State != -2">
                          <el-icon color="green" :size="20" class="mx-2"><CircleCheck /></el-icon>
                        </a>
                        <a href="javascript:;" @click="changeState(scope, 0)" v-if="formdata.Entity[scope.$index].State != 100">
                          <el-icon color="red" :size="20" class="mx-2"><CircleClose /></el-icon>
                        </a>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-form>
          <div v-if="formdata.disabled==false" class="text-center pt-6">
            <el-button class="cancelbut" @click="closeWindow">
              取消
            </el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef,1)">
              提交
            </el-button>
          </div>
        </div>

        <div>
          <template v-if="formdata.ViewType != 1">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 调薪审批 -->
            <template v-if="formdata.ViewType==4">
              <el-input v-model="formdata.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
              <div class="bf-search-formItem ">
                <div class="text-center w-full mt-4">
                  <el-button type="danger" @click="closeWindow">取 消</el-button>
                  <el-button type="primary" @click="ApprovalForm(1)">保 存</el-button>
                </div>
              </div>
            </template>
          </template>
        </div>

      </div>
      <!-- 选择客户 -->
      <CusDialog v-if=" relation.show" :boxStyle='cusboxStyle' title='选择客户' :is-show='true' @closeWindow='cancelrelation'>
        <div>
          <el-card class="sale_card " style="padding:0px">
            <div>
              <el-input v-model="relation.relationpageInfo.Name" style="width:200px"></el-input>
              <el-button @click="CustomersByNameEvent">搜索</el-button>
            </div>
          </el-card>

          <el-card class='sale_card mt-6'>
            <div>
              <el-table border :data='relation.list'
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
                <el-pagination small v-model:page-size="relation.relationpageInfo.size" :background="true" layout="prev, pager, next, jumper" :total="relation.relationpageInfo.count"
                  @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
              </div>
            </div>
          </el-card>
        </div>
      </CusDialog>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { PostAddOrEditCostSample } from '/@/api/Sale/Cost'
import { GetCustomersByName } from '/@/api/Sale/Customer'
import { remoteUrl, toChies, parseTime, getTime } from '/@/utils/tools'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { PostAddIntermediator,GetIntermediatorInfo, PostApprovalIntermediator } from '/@/api/Sale/Intermediator'
import { isMobileTel, isEmail, isNumber } from '/@/utils/validate'
import {
  CircleCheck,
  CircleClose
} from '@element-plus/icons-vue'

//#region 数据字典
const store = useCommonStore() //记得加这一句
const dic = reactive({
  EnterpriseType: [],
  EnterpriseRelation: []
})
//获取字典数据
const getDictionaryData = () => {
  //企业类型
  store.getDict('enterprise_type').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.EnterpriseType = res
  })
  //企业关系
  store.getDict('enterprise_relation').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.EnterpriseRelation = res
  })
}
//#endregion

//#region 选择客户
const relation = reactive({
  show: false,
  list: [],
  index: 0,
  relationpageInfo: {
    Name: '',
    count: 0,
    page: 1,
    size: 10
  }
})
const cusboxStyle = reactive({
  boxWidth: 'w-1000',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const showrelation = (index: number) => {
  relation.index = index  // 0时为新增，其他为编辑
  if (formdata.disabled == false) {
    relation.show = true
    CustomersByNameEvent()
  }
}
const cancelrelation = () => {
  relation.show = false
}
const relationhandleSizeChange = (val: number) => {
  relation.relationpageInfo.size = val
  CustomersByNameEvent()
}
const relationhandleCurrentChange = (val: number) => {
  relation.relationpageInfo.page = val
  CustomersByNameEvent()
}
const CustomersByNameEvent = () => {
  GetCustomersByName(relation.relationpageInfo).then((res) => {
    if (res.code == 1) {
      relation.relationpageInfo.count = res.data.count
      relation.list = res.data.list
    }
  })
}

const checkcustomer = (val: any) => {
  if (val.Id) {
    let idx = formdata.Entity.findIndex(itm => itm.CustomerId == val.Id)
    if (idx >= 0) {
      ElMessage({
        message: `${val.Name}已存在，请重新选择`,
        type: 'warning',
      })
      return false
    }
  }
  console.log(11)
  // 新增关联企业后如果第一条没有数据，则删除
  if (formdata.Entity.length > 0 && !formdata.Entity[0].CustomerId && val.Id) {
    formdata.Entity.splice(0,1)
  }
  console.log(22)
  let list = {
    CustomerName: val.Name,
    CustomerId: val.Id,
    Id: 0,
    SalerName: val.UserName,
    Scale: val.Ranking,
    Type: undefined,
    Relationship: undefined,
    State: 0
  }
  if (relation.index == -1) {
    formdata.Entity.push(list)
  } else {
    formdata.Entity[relation.index] = list
  }
  cancelrelation()
}
//#endregion

const modelLoding = ref(true)
const props = defineProps({
  info: {
    type: Object,
    default: {
      checkId: null,
      Id: null,
      // 显示类型 1 添加 2修改 3查看 4审批
      viewType: 1
    }
  },
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看 4审批
  },
  DataId: {
    type: Number,
    default: 0
  },
  title: { // 标题
    type: String,
    default: '居间人申请'
  }
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'change'
    }
  ],
  Sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change'
    }
  ],
  Age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'change'
    },
    {
      validator: isNumber,
      message: '请输入数字',
      trigger: 'change'
    }
  ],
  Address: [
    {
      required: true,
      message: '请输入地址',
      trigger: 'change'
    }
  ],
  Native: [
    {
      required: true,
      message: '请输入籍贯',
      trigger: 'change'
    }
  ],
  EmployedBy: [
    {
      required: true,
      message: '请输入就职企业',
      trigger: 'change'
    }
  ],
  UserPost: [
    {
      required: true,
      message: '请输入岗位',
      trigger: 'change'
    }
  ],
  JobName: [
    {
      required: true,
      message: '请输入职务',
      trigger: 'change'
    }
  ],
  MobilePhone: [
    {
      required: true,
      message: '请输入手机',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  Telephone: [
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  Mailbox: [
    {
      validator: isEmail,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  WeChat: [
    {
      required: true,
      message: '请输入微信',
      trigger: 'change'
    }
  ],
  Contact: [
    {
      required: true,
      message: '请输入紧急联系人姓名',
      trigger: 'change'
    }
  ],
  Relationship: [
    {
      required: true,
      message: '请输入紧急联系人关系',
      trigger: 'change'
    }
  ],
  WorkAddress: [
    {
      required: true,
      message: '请输入紧急联系人工作单位',
      trigger: 'change'
    }
  ],
  ContactInformation: [
    {
      required: true,
      message: '请输入紧急联系人联系方式',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
})

const ApprovalForm = (num: number) => {
  for (let i in formdata.Entity) {
    if (formdata.Entity[i].State !== -2 && formdata.Entity[i].State !== 100) {
      ElMessage({
        message: `请选择${formdata.Entity[i].CustomerName}的审核状态`,
        type: 'error'
      })
      return false
    }
  }
  var arr = {
    Asf: {
      checkId: props.info.checkId,
      state: num,
      remark: formdata.Approval.remark,
      dataid: formdata.form.Id,
    },
    Entity: formdata.Entity
  }
  PostApprovalIntermediator(arr).then((res: any) => {
    if (res.code == 1) {
      ElMessage({
        message: res.message,
        type: 'success'
      })
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
}

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      formdata.form.UserName = res.data.RealName
      formdata.form.CompName = res.data.CompName
      formdata.form.DeptName = res.data.DeptName
      formdata.form.PostName = res.data.PostName
      formdata.form.CompId = res.data.CompId
      formdata.form.DeptId = res.data.DeptId
      formdata.form.PostId = res.data.PostId
      modelLoding.value = false
    }
  })
}

const retviewurl = (list: any) => {
  var retlist: any = []
  if (list.length > 0) {
    list.forEach((f: any) => {
      var item = remoteUrl(f.Path)
      retlist.push(item)
    })
  }
  console.log('retlist', retlist)
  return retlist
}

const getCostSampleInfo = () => {
  var Id = props.info.Id ? props.info.Id : props.DataId
  GetIntermediatorInfo({ DataId: Id }).then((res) => {
    if (res.code == 1) {
      formdata.form = res.data.bill
      formdata.Entity = res.data.Entity
      modelLoding.value = false
    }
  })
}
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})


//详情实体
const formdata = reactive({
  ViewType: 1,
  Approval: {
    remark: ''
  },
  form: {
    Id: 0,
    Name: '', //姓名
    Sex: undefined, //性别
    Age: '', //年龄
    Address: '', //地址
    Native: '', //籍贯
    EmployedBy: '', //就职企业
    UserPost: '', // 岗位
    JobName: '', // 职务
    MobilePhone: '', // 手机
    WeChat: '', // 微信
    Telephone: '', // 电话
    Mailbox: '', // 邮箱
    QQ: '', // QQ
    Fax: '', // 传真
    Contact: '', // 紧急联系人姓名
    Relationship: '', // 紧急联系人关系
    WorkAddress: '', // 紧急联系人工作单位
    ContactInformation: '', // 紧急联系人联系方式
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CreateOn: parseTime(getTime('day'), ''),
    State: 0
  },
  Entity: Array<any>(),
  uploadShow: false,
  disabled: false
})

//删除关联企业
const delentity = (index: any) => {
  if (formdata.Entity.length <= 1) {
    ElMessage.warning('请至少保留一条记录')
    return false
  }
  formdata.Entity.splice(index, 1)
}
//添加关联企业
const addentity = () => {
  let list = {
    CustomerName: '',
    CustomerId: 0,
    Id: 0,
    SalerName: '',
    Scale: '',
    Type: undefined,
    Relationship: undefined,
    State: 0
  }
  formdata.Entity.push(list)
}
// 修改关联企业状态
const changeState = (val:any, type: number) => {
  if (val.row.State == 100 || val.row.State == -2) {
    formdata.Entity[val.$index].State = 1
  } else if (type) {
    formdata.Entity[val.$index].State = 100
  } else {
    formdata.Entity[val.$index].State = -2
  }
}
///提交
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      if (formdata.Entity.length <= 0) {
        ElMessage.warning('请添加关联企业')
        return false
      }
      let Entity = []
      // 验证关联企业中是否有字段为空
      for(let i in formdata.Entity){
        let data = {...formdata.Entity[i],State: 1}
        Entity.push(data)
        if (!formdata.Entity[i].CustomerName || !formdata.Entity[i].CustomerId || formdata.Entity[i].Scale == '' || formdata.Entity[i].Type == undefined || formdata.Entity[i].Relationship == undefined) {
          ElMessage.warning('请检查关联企业中内容是否填写完整')
          return false
        }
      }
      PostAddIntermediator({ bill: formdata.form, Entity: Entity }).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          emit('closeWindow')
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      ElMessage.warning('请完善相关信息')
    }
  })
}
onMounted(() => {
  // 字典
  getDictionaryData()
  if (props.info.viewType != 1) {
    formdata.ViewType = props.info.viewType
  } else {
    formdata.ViewType = props.ViewType
  }
  if (formdata.ViewType == 3 || formdata.ViewType == 4) {
    formdata.disabled = true
  }
  if (formdata.ViewType == 1) {
    getuserinfo()
    addentity()
  } else {
    getCostSampleInfo()
  }
})
</script>
<style lang="postcss" scoped>
.addSample {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
    }
  }
  :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    .el-input__prefix {
      display: none;
    }
  }

  .tableclass {
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: #fff;
    }
    :deep(.el-table .cell) {
      padding: 0px;
      text-align: center;
    }
    .el-form-item {
      margin-bottom: 0px;
      width: 100%;
      .el-form-item__content {
        .el-input {
          :deep(.el-input__wrapper) {
            box-shadow: none;
          }
        }
        .el-textarea {
          :deep(.el-textarea__inner) {
            box-shadow: none;
          }
        }
        .el-select {
          :deep(.el-input__wrapper) {
            box-shadow: none;
          }
        }
      }
    }
  }
  :deep(.el-card__body) {
    padding: 0rem;
  }
  .inputwidth {
    width: 180px;
  }
  .otherinputwidth {
    width: 100px;
    :deep(.el-input-group__append) {
      padding: 0 5px;
    }
  }

  :deep(.el-form-item__label) {
    padding: 0 5px 0 0px;
    width: 4.2rem;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  :deep(.el-select){
    border: none;
  }
}
.tableclass{
  :deep(.el-input__inner){
    text-align: center;
  }
}
:deep(.el-radio){
  margin-right: 8px;
}
:deep(.el-input.is-disabled .el-input__inner){
  -webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular))
}
</style>
