<template>
  <div class="sreachtop flex justify-center w-full pb-4">
    <div class="flex">
      <div v-for="(item,index) in depts.stage">
        <el-select :disabled='item.disabled' v-model="item.check" @change="changedept(item,index)" placeholder="">
          <el-option v-for="item in item.list  " :key="item.TId" :label="item.name" :value="item.TId"></el-option>
        </el-select>
      </div>
    </div>
    <div class="flex pt-1">
      <div class="divtime h-6 w-6 shadow text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('前')" :class="form.timetype=='前'?'bg-blue-but text-white':'bg-white'">前
      </div>
      <div class="divtime h-6 w-6 shadow text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('日')" :class="form.timetype=='日'?'bg-blue-but text-white':'bg-white'">日
      </div>
      <div class="divtime h-6 w-6 shadow text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('周')" :class="form.timetype=='周'?'bg-blue-but text-white':'bg-white'">周
      </div>
      <div class="divtime h-6 w-6 shadow text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('月')" :class="form.timetype=='月'?'bg-blue-but text-white':'bg-white'">月
      </div>
      <div class="divtime h-6 w-6 shadow text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('季')" :class="form.timetype=='季'?'bg-blue-but text-white':'bg-white'">季
      </div>
      <div class="divtime h-6 w-6 shadow text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('年')" :class="form.timetype=='年'?'bg-blue-but text-white':'bg-white'">年
      </div>

      <el-popover placement="bottom" :width="300" trigger="click">
        <template #reference>
          <div class="divtime h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer pt-1" @click="clicktime('自')" :class="form.timetype=='自'?'bg-blue-but text-white':'bg-white'">
            <el-icon-Calendar class='w-4 h-4 mr-2'></el-icon-Calendar>
          </div>
        </template>
        <el-date-picker v-model="form.SeachDate" type="daterange" @change="returnData" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small"
          style="width:250px" />
      </el-popover>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { GetSaleUsetTree, GetSaleUserDeptList } from '/@/api/system/user'

const depts = reactive({
  stage: <Array<any>>[],
  data: <Array<any>>[],
  checkitem: <any>{}
})
const emit = defineEmits(['ReturnSeachData'])

const form = reactive({
  SeachDate: [],
  timetype: '',
  timecount: 0,
  beforetype: ''
})
const clicktime = (val: any) => {
  if (val == '前') {
    if (form.timetype != '前') {
      form.beforetype = form.timetype
      form.timetype = val
    }
    form.timecount++
  } else {
    if (form.timetype == val) {
      form.timetype = ''
    } else {
      form.timetype = val
    }
    form.beforetype = ''
    form.timecount = 0
  }
  if (val != '自') {
    returnData()
  }
  console.log(form)
}

//返回查询条件
const returnData = () => {
  var data: any = {}
  if (form.SeachDate.length > 0) {
    data.StartTime = form.SeachDate[0]
    data.Stopime = form.SeachDate[1]
  }
  data.TimeType = form.timetype
  data.TimeCount = form.timecount
  data.BeforeType = form.beforetype
  data.Type = depts.checkitem.Type
  data.Id = depts.checkitem.Id

  emit('ReturnSeachData', data)
}

//获取下级下拉框数据
const changedept = (val: any, index: any) => {
  if (index < depts.stage.length - 1) {
    depts.stage.splice(index + 1, depts.stage.length - index - 1)
  }
  console.log('val', val)

  var check = val.list.find((f: any) => f.TId == val.check)

  if (check) {
    if (check.children != null) {
      var stage: any = {}
      stage.list = check.children
      stage.disabled = false
      depts.stage.push(stage)
    }
    var item: any = {}
    item.Type = check.Type
    item.Id = check.id
    depts.checkitem = item
    returnData()
  }
  console.log('---------------------------', depts.checkitem)
}
//获取组织架构
const getdepts = () => {
  GetSaleUsetTree().then((res) => {
    if (res.code == 1) {
      depts.data = res.data
      console.log(' depts.data', depts.data)
      GetSaleUserDeptList().then((user) => {
        if (user.code == 1) {
          var deptdata = user.data

          console.log('deptdata', deptdata)
          for (let index = 0; index < deptdata.deptlist.length; index++) {
            const deptitem = deptdata.deptlist[index]
            var deptcode = 'D' + deptitem.Id
            var fdept = depts.data.find((f: any) => f.TId == deptcode)
            var list = []
            //一级部门
            if (fdept) {
              list = depts.data
            } else {
              //其他级别的部门
              var child = depts.stage[depts.stage.length - 1]

              var childdept = child.list.find((f: any) => f.TId == child.check)

              var checkitem = childdept.children.find((f: any) => f.TId == deptcode)
              if (checkitem) {
                fdept = checkitem
              }
              list = childdept.children
            }
            var item: any = {}

            if (fdept) {
              var stage: any = {}
              stage.list = list
              stage.check = deptcode
              stage.disabled = true
              depts.stage.push(stage)
              //记录当前选择的值
              item.Type = fdept.Type
              item.Id = fdept.id
              console.log('depts.stage', depts.stage)
            } else {
              ElMessage.error('组织架构错误')
            }
            depts.checkitem = item

            //判断是否是管理层
            if (deptdata.Mangid == deptitem.Id) {
              var child = depts.stage[depts.stage.length - 1]
              var childdept = child.list.find((f: any) => f.TId == child.check)

              var stage: any = {}
              stage.list = childdept.children
              stage.disabled = false
              depts.stage.push(stage)
              break
            }
          }
          //判断是普通业务员
          if (deptdata.Mangid == 0) {
            var child = depts.stage[depts.stage.length - 1]
            var childdept = child.list.find((f: any) => f.TId == child.check)

            var ucode = 'U' + deptdata.UserId
            var checkitem = childdept.children.find((f: any) => f.TId == ucode)
            if (checkitem) {
              var stage: any = {}
              stage.list = childdept.children
              stage.check = checkitem.TId
              stage.disabled = true
              depts.stage.push(stage)

              item.Type = checkitem.Type
              item.Id = checkitem.id
              depts.checkitem = item
            }
          }
        }
        returnData()
        console.log('---------depts.checkitem------------------', depts.checkitem)
      })
    }
  })
}

onMounted(() => {
  getdepts()
})
</script>

<style lang="postcss" scoped>
.sreachtop {
  .divtime {
    border: 1px solid #027aff;
    line-height: 1.5rem;
  }
  .el-select {
    width: 95px;
    margin-left: 5px;
  }
  :deep(.el-input__wrapper) {
    background-color: #e5f5ff;

    border: 1px solid #027aff;

    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    .el-input__suffix {
      display: none;
    }
  }
  :deep(.el-input__inner) {
    -webkit-text-fill-color: #0b2564;
    color: #0b2564;
    text-align: center;
    font-weight: 600;
  }
}
</style>
