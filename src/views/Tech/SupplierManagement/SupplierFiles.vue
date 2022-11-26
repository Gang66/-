<template>
  <div>
    <div class="float-left w-1070">
      <div class="h-28 bg-white rounded-lg relative">
        <div class="">
          <div class="h-24 rounded-t-xl">
            <div class="h-24 float-left pt-4 pl-6">
              <el-popover :width="300" popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;" placement="bottom-start">
                <template #reference>
                  <div class="relative">
                    <div class="w-14 h-14 rounded-full bg-blue-400 inline-block pt-5" v-if="data.SupplierData.Abbreviation < 5">
                      <div class="w-10 text-xs text-white text-center m-auto">
                        <p>{{ data.SupplierData.Abbreviation }}</p>
                      </div>
                    </div>
                    <div class="w-14 h-14 rounded-full bg-blue-400 inline-block pt-3" v-else>
                      <div class="w-10 text-xs text-white text-center m-auto">
                        <p>{{ data.SupplierData.Abbreviation }}</p>
                      </div>
                    </div>
                  </div>
                </template>

                <template #default>
                  <div class="demo-rich-conent flex" style="gap: 16px; flex-direction: column">
                    <div class="w-14 h-14 bg-blue-400 m-auto rounded-full">
                      <div class="w-10 text-xs text-white font-medium text-center m-auto pt-3">
                        <p>{{ data.SupplierData.Abbreviation }}</p>
                      </div>
                    </div>
                    <!-- <div
                      class="w-14 h-14 bg-blue-400 m-auto rounded-full"
                    >
                      <div class=" w-8 text-sm text-white font-medium	 text-center m-auto pt-0">
                        <p>永嘉冶泰阀门</p>
                      </div>
                    </div> -->
                    <div class="text-center">
                      <p>舒黄宗</p>
                      <p class="text-xs text-gray-400">老板 / 18888888888</p>
                    </div>
                    <div class="flex h-12 text-center leading-6 text-gray-400 text-xs">
                      <div class="w-4/12 h-12">
                        <p>报价次数</p>
                        <p class="text-sm font-semibold text-yellow-500">32</p>
                      </div>
                      <div class="w-4/12 h-12 border-r border-l">
                        <p>成交笔数</p>
                        <p class="text-sm font-semibold text-green-500">32</p>
                      </div>
                      <div class="w-4/12 h-12">
                        <p>意向客户</p>
                        <p class="text-sm font-semibold text-blue-500">32</p>
                      </div>
                    </div>
                    <div class="inline-block">
                      <div class="float-left">
                        <router-link :to="'/Tech/SupplierManagement/SupplierHomepage?id=' + data.supplierId">
                          <el-button class="w-28" type="primary">
                            <i class="iconfont icon-zhuye mr-2"></i>
                            主页</el-button
                          >
                        </router-link>
                      </div>
                      <div class="float-right" @click="openWindowCreateSupplierEdit(data.SupplierData)">
                        <el-button class="w-28" type="primary" plain><i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
                      </div>
                    </div>
                    <div class="text-xs text-gray-400 text-center"><span>-</span><span>本厂产品信息由</span><span class="text-black">谭琦</span><span>更新</span><span>-</span></div>
                  </div>
                </template>
              </el-popover>
            </div>
            <div class="inline-block leading-8 ml-4 pt-3">
              <div>
                <el-link
                  ><span class="text-xl">{{ data.SupplierData.CompanyName }}</span></el-link
                >
              </div>
              <div>
                <span class="text-sm text-gray-400">主营产品：{{ data.SupplierData.MainProduct }}</span>
                <svg-icon class="inline-block ml-4 mr-1" icon-class="svg-SupplierHomepage" />
                <span class="text-xs text-gray-400">信用等级：</span>
                <span class="text-xs text-red-400">优秀</span>
                <span class="text-xs text-green-400">良好</span>
                <span class="text-xs text-blue-400">差</span>
              </div>
            </div>
            <div class="w-520 h-14 float-right mr-8">
              <router-link :to="'/Tech/SupplierManagement/SupplierHomepage?id=' + data.supplierId">
                <el-button class="absolute top-8 right-6"><i class="iconfont icon-zhuye mr-2"></i>进入主页</el-button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="h-10 bg-gray-200 rounded-b-xl">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <div class="inline-block">
              <div class="inline-block">
                <i class="iconfont icon-dingwei text-gray-400"></i><span class="text-xs text-gray-400">{{ data.SupplierData.Address + data.SupplierData.DetailAddress }}</span>
              </div>
            </div>
            <div class="inline-block float-right mr-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full inline-block mr-2"></div>
              <span class="text-sm text-gray-400">报价供应商</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white mt-10 rounded-lg">
        <!-- 工厂档案 -->
        <div class="pt-6 pl-6 pb-3 text-sm">
          <p>工厂档案</p>
        </div>
        <div class="text-xs pl-6"><i class="iconfont icon-biaoqian mr-2 text-blue-500 align-text-bottom"></i><span>公司简介</span></div>
        <div class="text-xs pl-6 pr-6 pt-3 leading-6">
          <p style="text-indent: 24px" v-html="data.SupplierData.Introduction"></p>
        </div>
        <div class="text-xs pl-6 pt-6 pb-4"><i class="iconfont icon-biaoqian mr-2 text-blue-500 align-text-bottom"></i><span>基本信息</span></div>
        <div class="pl-6 leading-8 text-sm">
          <div>
            <div class="inline-block w-44 h-9 bg-blue-50 border border-blue-200 border-b-0 border-r-0 text-center text-gray-500">
              <span>简称</span>
            </div>
            <div class="inline-block w-80 h-9 border border-blue-200 border-r-0 border-b-0">
              <span class="ml-3">{{ data.SupplierData.Abbreviation }}</span>
            </div>
            <div class="inline-block w-44 h-9 bg-blue-50 border border-blue-200 text-center text-gray-500 border-b-0 border-r-0">
              <span>综合等级</span>
            </div>
            <div class="inline-block w-80 h-9 border border-blue-200 border-b-0">
              <span class="ml-3">{{ data.SupplierData.Level }}</span>
            </div>
          </div>
          <div class="inline-block w-44 h-9 bg-blue-50 border border-blue-200 border-r-0 text-center text-gray-500">
            <span>主营类别</span>
          </div>
          <div class="inline-block w-80 h-9 border border-blue-200 border-r-0">
            <span class="ml-3" v-if="data.SupplierData.MainCategory == 'A'">手阀</span>
            <span class="ml-3" v-if="data.SupplierData.MainCategory == 'B'">控制阀</span>
            <span class="ml-3" v-if="data.SupplierData.MainCategory == 'C'">配件</span>
          </div>
          <div class="inline-block w-44 h-9 bg-blue-50 border border-blue-200 text-center text-gray-500 border-r-0">
            <span>公司网址</span>
          </div>
          <div class="inline-block w-80 h-9 border border-blue-200">
            <span class="ml-3">{{ data.SupplierData.Http }}</span>
          </div>
        </div>
        <!-- 联系方式 -->
        <div class="text-xs pl-6 pt-6 pb-4"><i class="iconfont icon-biaoqian mr-2 text-blue-500 align-text-bottom"></i><span>联系方式</span></div>
        <div class="pl-6 pb-8" style="width: 1020px">
          <el-table
            :data="data.ContactsData"
            border
            style="width: 100%"
            :header-cell-style="{
              background: '#f7faff',
              color: '#606266'
            }"
          >
            <el-table-column prop="name" label="姓名" width="100" align="center">
              <template #default="scope">{{ scope.row.Name }}</template>
            </el-table-column>
            <el-table-column prop="leibie" label="类别" width="100" align="center">
              <template #default="scope">
                <span v-if="scope.row.Type == '0'">老板</span>
                <span v-if="scope.row.Type == '1'">管理员</span>
                <span v-if="scope.row.Type == '2'">业务员</span>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机" width="180" align="center">
              <template #default="scope">{{ scope.row.MobilePhone }}</template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="180" align="center">
              <template #default="scope">{{ scope.row.Telephone }}</template>
            </el-table-column>
            <el-table-column prop="weixin" label="微信" width="180" align="center">
              <template #default="scope">{{ scope.row.VX }}</template>
            </el-table-column>
            <el-table-column prop="QQ" label="QQ" width="180" align="center">
              <template #default="scope">{{ scope.row.QQ }}</template>
            </el-table-column>
            <el-table-column prop="备注" label="备注" width="76" align="center">
              <template #default="scope">
                <el-tooltip class="box-item" effect="dark" :content="scope.row.Remarks" placement="top">
                  <i class="iconfont icon-beizhu text-blue-500"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="bg-white rounded-lg mt-5">
        <div v-if="data.QualificationsList.length != 0">
          <!-- 资质 -->
          <div class="text-xs pl-6 pt-6 pb-4"><i class="iconfont icon-biaoqian mr-2 text-blue-500 align-text-bottom"></i><span>企业资质</span></div>
          <div v-for="item in data.QualificationsList" class="inline-block pl-6">
            <el-image style="width: 100px; height: 100px" :src="remoteUrl(item)" :initial-index="0" :preview-src-list="data.QualificationsList" fit="cover" />
          </div>
        </div>
        <div v-if="data.CertificateList.length != 0">
          <div class="text-xs pl-6 pt-6 pb-4"><i class="iconfont icon-biaoqian mr-2 text-blue-500 align-text-bottom"></i><span>荣誉证书</span></div>
          <div v-for="item in data.CertificateList" class="inline-block pl-6">
            <el-image style="width: 100px; height: 100px" :src="remoteUrl(item)" :preview-src-list="data.CertificateList" :initial-index="0" fit="cover" />
          </div>
        </div>
      </div>
    </div>
    <div class="float-right w-80">
      <!-- 主营产品  高薪降价产品-->
      <ProductDetailsRight />
      <!-- 编辑 -->
      <CreateSupplierEdit title="编辑供应商" v-if="createSupplierEditOpenData.visible" :FormData="createSupplierEditOpenData.formData" @closeWindow="closeWindowCreateSupplierEdit($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import ProductDetailsRight from './_Components/ProductDetailsRight.vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { GetSupplierInfo } from '/@/api/tech/Supplier'
import CreateSupplierEdit from './_Components/CreateSupplierEdit.vue'
import { remoteUrl } from '/@/utils/tools'

export default defineComponent({
  components: {
    ProductDetailsRight,
    CreateSupplierEdit
  },
  setup() {
    const route = useRoute()
    const queryId = route.query.id
    const data = reactive({
      supplierId: 0,
      ContactsData: [],
      SupplierData: [],
      CertificateList: [],
      QualificationsList: []
    })
    // 供应商详情数据
    const GetSupplierData = async (id: any) => {
      await GetSupplierInfo(data.supplierId)
        .then((res) => {
          console.log(res)
          if (res.code == 1) {
            data.ContactsData = res.data.Contacts || []
            data.SupplierData = res.data.Supplier || []
            data.CertificateList = res.data.CertificateList || []
            data.QualificationsList = res.data.QualificationsList || []
            console.log(data.QualificationsList)
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch((e) => {
          console.log(`错误：${e}`)
        })
    }

    // 编辑供应商
    const createSupplierEditOpen = (data: any) => {
      let createSupplierEditOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowCreateSupplierEdit = (val: any) => {
        createSupplierEditOpenData.formData = {
          DataList: val
        }
        console.log(val)
        createSupplierEditOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowCreateSupplierEdit = (type: string) => {
        createSupplierEditOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        createSupplierEditOpenData,
        openWindowCreateSupplierEdit,
        closeWindowCreateSupplierEdit
      }
    }
    //获取数据
    const getData = () => {
      GetSupplierData(data.supplierId)
    }

    onMounted(() => {
      data.supplierId = queryId
      GetSupplierData(data.supplierId)
    })
    return {
      data,
      ...createSupplierEditOpen({ data, getData }),
      remoteUrl
    }
  }
})
</script>

<style lang="postcss" scoped></style>
