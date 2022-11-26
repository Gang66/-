<template>
  <el-dialog v-model="dialogVisible" class="claimdialog" title="客户认领" width="30%" :before-close='closeWindow'>
    <el-row :gutter="10">
      <el-col v-for="(item,index) in data.comlist" :span="6">
        <div class="pb-2">
          <div class="ulstyle" @click="checkcom(item.Id)">
            <div>
              <img class="imgbox cursor-pointer" :src="remoteUrl(item.ImgUrl[0].Path)" />
            </div>

            <div v-if="data.claimlist.filter(f=>f.CompanyId==item.Id).length>0" class="but">
              <div class="but-box">
                <span style="margin: 0 10px;font-size: 18px;">
                  已被领取
                </span>
              </div>

            </div>
            <div v-if="item.check==true" class="checkbut">
              <div class="checkbut-box ">
                <span style="margin: 0 10px; ">
                  <img class="checkimgbox cursor-pointer" src="../../../../assets/img/sale/customer/check.png" />
                </span>
              </div>

            </div>

          </div>

          <div class="text-center pt-2">{{item.Name}}</div>
        </div>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <div class="text-center">
          <el-button @click="closeWindow">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </div>

      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { remoteUrl } from '/@/utils/tools'
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import { GetUserinformation } from '/@/api/layout/index'
import { GetClaimCusList, GetClaimCustomer } from '/@/api/Sale/Customer'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  CusId: {
    type: Number,
    default: 0
  },
  CusName: {
    type: String,
    default: ''
  },
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const checkcom = (val: any) => {
  if (data.claimlist.filter((f: any) => f.CompanyId == val).length > 0) {
    return false
  }
  data.comlist.forEach((f: any) => {
    if (f.Id == val) {
      if (f.check == false) {
        f.check = true
      } else {
        f.check = false
      }
    } else {
      f.check = false
    }
  })
}
const emit = defineEmits(['CloseClaim'])
const submit = () => {
  var com: any = data.comlist.find((f: any) => {
    if (f.check == true) {
      return f
    }
  })
  if (com) {
    data.form.CompanyName = com.Rename
    data.form.CompanyId = com.Id
    data.form.CompanyNameAbbr = com.Name
    GetClaimCustomer(data.form).then((res) => {
      if (res.code == 1) {
        ElMessage.success('认领成功')
        closeWindow()
      } else {
        ElMessage.error('认领失败')
      }
    })
  } else {
    ElMessage.warning('请先选择品牌')
  }
}

const closeWindow = () => {
  emit('CloseClaim')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  show: false,
  comlist: [],
  claimlist: [],
  form: {
    CreateName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CustomerName: props.CusName,
    CustomerId: props.CusId,
    CompanyId: 0,
    CompanyName: '',
    CompanyNameAbbr: ''
  }
})
const getclaimlist = () => {
  GetClaimCusList({ CusId: props.CusId }).then((res) => {
    if (res.code == 1) {
      data.claimlist = res.data
    }
  })
}
const getcomlist = () => {
  GetOrderCompany().then((res) => {
    if (res.code == 1) {
      var list: any = []
      res.data.forEach((item: any) => {
        item.ImgUrl = JSON.parse(item.ImgUrl)
        var com = item
        com.check = false
        list.push(com)
      })
      data.comlist = list
    }
  })
}

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      data.form.CreateName = res.data.RealName
      data.form.CompName = res.data.CompName
      data.form.DeptName = res.data.DeptName
      data.form.PostName = res.data.PostName
      data.form.CompId = res.data.CompId
      data.form.DeptId = res.data.DeptId
      data.form.PostId = res.data.PostId
    }
  })
}

onMounted(() => {
  getuserinfo()
  if (props.CusId != 0) {
    getclaimlist()
    getcomlist()
  }
})
</script>

<style type="postcss" >
.claimdialog {
  .ulstyle {
    position: sticky;
  }
  .imgbox {
    width: 120px;
    height: 120px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .checkimgbox {
    width: 70px;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .but {
    width: 120px;
    height: 120px;
    position: absolute;
    top: 0px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;

    .but-box {
      width: 100%;
      align-self: center;
      text-align: center;
      font-size: 24px;
      color: #fff;
      cursor: pointer;

      span {
        display: inline-block;
      }
      .btn-del {
        position: absolute;
        top: -1px;
        right: 1px;
      }
    }
  }
  .checkbut {
    width: 120px;
    height: 120px;
    position: absolute;
    top: 0px;
    display: flex;

    .checkbut-box {
      width: 100%;
      align-self: center;
      text-align: center;
      font-size: 24px;
      color: #fff;
      cursor: pointer;

      span {
        display: inline-block;
      }
      .btn-del {
        position: absolute;
        top: -1px;
        right: 1px;
      }
    }
  }
  border-radius: 12px;
  .el-dialog__body {
    border-top: 1px solid #a09a9a;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>