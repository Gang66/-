<template>
  <el-drawer size="70%" :with-header="true" v-model="visibleComparison" @close="closeComparison" custom-class="bf-drawer">
    <template v-slot:header>
      <div class="bg-slate-100 p-3">
        <p class="iconfont icon-shujuku inline-block"></p>
        <span class="ml-2">标准比价</span>
      </div>
    </template>
    <div class="ml-6 mr-6 mt-4">
      <div class="h-12 bg-blue-200 flex justify-center light rounded">
        <div class="w-52 h-12 ml-3 light">
          <span>产品：先导活塞式减压阀</span>
        </div>
        <div class="w-52 h-12 ml-3 light">
          <span>型号：Y43H-16C</span>
        </div>
        <div class="w-52 h-12 ml-3 light">
          <span>规格：DN80</span>
        </div>
        <div class="w-52 h-12 ml-3 light">
          <span>质量等级：二级</span>
        </div>
        <div class="w-52 h-12 ml-3 light">
          <span>常规类别：非常规常用</span>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="main-table" cellspacing="0" cellpadding="0">
          <tr>
            <td class="w-32">
              <div class="ml-4">
                <p class="text-base font-semibold text-yellow-500">供应商信息</p>
                <p>属性状况</p>
                <p>- 无</p>
              </div>
              <div class="yinc_xiangtong">
                <el-radio-group v-model="radio1" class="ml-4">
                  <el-radio label="1" size="large">隐藏相同项</el-radio>
                  <el-radio label="2" size="large">标示最优项</el-radio>
                </el-radio-group>
              </div>
            </td>
            <td class="w-40" v-for="item in 4">
              <div class="text-xs text-gray-400 text-center leading-7">
                <p class="text-black text-lg">治泰阀门</p>
                <p>2021-09-06 14:49</p>
                <p>永嘉冶泰阀门制造有限公司</p>
                <el-popover placement="bottom" :width="200" trigger="click">
                  <template #reference>
                    <el-button style="width: 200px" type="primary" plain>换时间</el-button>
                  </template>
                  <div>
                    <div class="h-10 bg-slate-50">
                      <span class="">报价时间</span>
                    </div>
                  </div>
                </el-popover>
              </div>
            </td>
          </tr>
          <tr>
            <td><span class="float-right mr-3 text-sm">核算价（元）</span></td>
            <td v-for="item in 4" class="text-blue-500 text-sm">
              <span class="ml-3">1620</span>
              <!-- <el-popover placement="bottom" :width="200" trigger="click">
                <template #reference>
                  <span class="cursor-pointer"><i class="iconfont icon-suanshu ml-2"></i></span>
                </template>
                <div>
                  <p class="text-sm text-gray-400 text-center">- 标记优惠政策变动属性 -</p>
                  <el-checkbox-group v-model="data.checkList">
                    <el-checkbox label="数量高" />
                    <el-checkbox label="金额大" />
                    <el-checkbox label="周期长" />
                    <el-checkbox label="成本高" />
                    <el-checkbox label="自定义" />
                  </el-checkbox-group>
                  <el-input v-model="data.textarea" :rows="2" type="textarea" placeholder="输入内容" />
                  <div class="mt-3 text-center">
                    <el-button type="primary" class="mr-5" plain>确定</el-button>
                    <el-button plain>取消</el-button>
                  </div>
                </div>
              </el-popover> -->

              <!-- <el-tooltip class="box-item" effect="dark" content="数量高、金额大、周期长、成本高" placement="top">
                <i class="iconfont icon-beizhu float-right mr-2"></i>
              </el-tooltip> -->
            </td>
          </tr>
          <tr>
            <td><span class="float-right mr-3 text-sm">最高（元）</span></td>
            <td class="text-red-500"><span class="ml-3 text-sm">111</span></td>
            <td class="text-red-500"><span class="ml-3 text-sm">111</span></td>
            <td class="text-red-500"><span class="ml-3 text-sm">111</span></td>
            <td class="text-red-500"><span class="ml-3 text-sm">111</span></td>
          </tr>
          <tr>
            <td><span class="float-right mr-3 text-sm">最低（元）</span></td>
            <td class="text-green-500"><span class="ml-3 text-sm">111</span></td>
            <td class="text-green-500"><span class="ml-3 text-sm">111</span></td>
            <td class="text-green-500"><span class="ml-3 text-sm">111</span></td>
            <td class="text-green-500"><span class="ml-3 text-sm">111</span></td>
          </tr>
          <tr>
            <td class="w-48">
              <span class="float-right mr-6 text-sm">数量</span>
            </td>
            <td class="bg-yellow-50"><span class="ml-3 text-sm">12</span></td>
            <td class="bg-yellow-50"><span class="ml-3 text-sm">12</span></td>
            <td class="bg-yellow-50"><span class="ml-3 text-sm">12</span></td>
            <td class="bg-yellow-50"><span class="ml-3 text-sm">12</span></td>
          </tr>
        </table>
        <div class="h-12 bg-slate-100 p-3">产品属性</div>
        <table class="main-table" cellspacing="0" cellpadding="0">
          <tr>
            <td><span class="float-right mr-3 text-sm">材质</span></td>
            <td v-for="item in 4"><span class="ml-3 text-sm">111</span></td>
          </tr>
          <tr>
            <td><span class="float-right mr-3 text-sm">压力</span></td>
            <td v-for="item in 4"><span class="ml-3 text-sm">111</span></td>
          </tr>
          <tr>
            <td><span class="float-right mr-3">连接形式</span></td>
            <td v-for="item in 4"><span class="ml-3 text-sm">111</span></td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">适用介质</span>
            </td>
            <td v-for="item in 4"><span class="ml-3 text-sm">12</span></td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">结构形式</span>
            </td>
            <td v-for="item in 4"><span class="ml-3 text-sm">12</span></td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">压力环境</span>
            </td>
            <td v-for="item in 4"><span class="ml-3 text-sm">12</span></td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">工作温度</span>
            </td>
            <td v-for="item in 4"><span class="ml-3 text-sm">12</span></td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">衬里材料</span>
            </td>
            <td v-for="item in 4"><span class="ml-3 text-sm">12</span></td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">密封材料</span>
            </td>
            <td v-for="item in 4"><span class="ml-3 text-sm">12</span></td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">密封方式</span>
            </td>
            <td v-for="item in 4"><span class="ml-3 text-sm">12</span></td>
          </tr>
        </table>
        <div class="h-12 bg-slate-100 p-3">厂商信息</div>
        <table class="main-table" cellspacing="0" cellpadding="0">
          <tr>
            <td><span class="float-right mr-3 text-sm">厂商名称</span></td>
            <td v-for="item in 4" class="text-sm">永嘉冶泰阀门制造有限公司</td>
          </tr>
          <tr>
            <td><span class="float-right mr-3 text-sm">联系人</span></td>
            <td v-for="item in 4"><span class="ml-3 text-xs">刘某某</span></td>
          </tr>
          <tr>
            <td><span class="float-right mr-3 text-sm">手机号码</span></td>
            <td v-for="item in 4">
              <span class="ml-3 text-sm">13819719258</span>
            </td>
          </tr>
          <tr>
            <td class="w-52">
              <span class="float-right mr-6 text-sm">电话</span>
            </td>
            <td v-for="item in 4">
              <span class="ml-3 text-sm">0577-67991597</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  emits: ['closeComparison'],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const data = reactive({
      textarea: '',
      checkList: ''
    })
    const visibleComparison = ref(false)
    // 关闭抽屉
    const closeComparison = () => {
      context.emit('closeComparison')
    }
    // 探听开关
    watch(props, (newData, oldData) => {
      visibleComparison.value = newData.visible
    })
    const radio1 = ref('1')
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]

    return {
      data,
      tableData,
      radio1,
      visibleComparison,
      closeComparison
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-drawer__header) {
  margin-bottom: 0 !important;
}
.light {
  line-height: 48px;
}
.table-wrapper {
  margin-top: 18px;
}
.main-table {
  width: 100%;
  border-top: 1px solid #e6eaee;
  border-left: 1px solid #e6eaee;
}
.main-table tr td {
  height: 35px;
  box-sizing: border-box;
  padding: 10px 0 10px 5px;
  border-bottom: 1px solid #e6eaee;
  border-right: 1px solid #e6eaee;
}

.main-table tr:hover {
  background-color: #eff3f6;
}
.yinc_xiangtong {
  .el-radio-group {
    width: 50px;
    display: grid;
  }
}
:deep(.el-checkbox) {
  margin-right: 22px;
}
</style>
