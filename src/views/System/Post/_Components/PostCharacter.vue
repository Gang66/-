<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10" class="items-center">
        <el-col :md="12" :lg="12" class="bf-search-formItem">
          <el-form-item label="岗位名称" prop="PostName">
            <div class="bf-text-color-regular">总经理</div>
          </el-form-item>
          <div class="text-sm bf-error-color">注：每人可选三级，每级选择两项</div>
        </el-col>
        <el-col :md="12" :lg="12" class="text-right">
          <el-button type="primary" plain @click="addPostCharacterList">添加</el-button>
        </el-col>
      </el-row>
      <div v-for="(item, index) in data.PostCharacterList" :key="index">
        <el-row :gutter="0" class="items-center">
          <el-col :md="24" :lg="10" class="bf-search-formItem flex">
            <div class="flex items-center mt-2">
              <div class="rounded-full bf-bg-blue-color bf-font-white-color w-5 h-5 text-center text-xs leading-5">
                <span v-show="false">{{ (item.Grade = index + 1) }}</span
                >{{ index + 1 }}
              </div>
              <div class="text-sm bf-text-color-regular ml-2">第{{ convertToChinaNumEvent(index + 1) }}级</div>
              <div class="bf-text-color-regular text-sm ml-6">占比</div>
              <div class="w-28 ml-2">
                <el-input v-model="item.Ratio" placeholder="占比">
                  <template #append>%</template>
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :md="24" :lg="14" class="text-right">
            <div class="flex items-center mt-2">
              <div class="">
                <el-button type="warning" @click="delPostCharacterList(index, item.EnneagramCode)">删除</el-button>
              </div>
              <div class="ml-6">
                <el-button type="primary" @click="item.show = !item.show" v-if="item.show == false"
                  >性格选择<el-icon :size="18" class="ml-1">
                    <el-icon-ArrowRight />
                  </el-icon>
                </el-button>
                <el-button type="primary" @click="item.show = !item.show" v-else
                  >性格选择<el-icon :size="18" class="ml-1">
                    <el-icon-ArrowDown />
                  </el-icon>
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="items-center p-2 mt-3 bf-bg-color-primary-light-8" v-if="item.show == true">
          <el-col :md="24" :lg="24" class="bf-search-formItem">
            <el-checkbox-group v-model="item.EnneagramCode" @change="ninehouseValueEvent($event, item.Grade)" :max="2">
              <el-checkbox :label="val.DicKey" v-for="(val, i) in item.list" :key="i" :disabled="val.disabled">{{ val.DicValue }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </div>
      <div class="bf-search-formItem mt-3">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { getPostDetails, addPostNatureStandard, getPostNatureStandardDetails, editPostNatureStandard } from '/@/api/system/post'
import { convertToChinaNum } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (data.PostCharacterList.length != 3) {
          ElMessage.error({
            message: '每个岗位需要选择三级性格配比'
          })
          return
        }
        let PostCharacterList = JSON.parse(JSON.stringify(data.PostCharacterList))
        var num = 0
        PostCharacterList.forEach((v: any) => {
          delete v.list
          num += Number(v.Ratio)
        })
        if (num != 100) {
          ElMessage.error({
            message: '性格占比率需等于100'
          })
          return
        }
        var arr = {
          Id: data.Id,
          NatureStandard: JSON.stringify(PostCharacterList)
        }
        if (data.isEdit) {
          editPostNatureStandard(arr).then((res) => {
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
        } else {
          addPostNatureStandard(arr).then((res) => {
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
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    // PostName: [{ required: true, message: "请填写岗位名称", trigger: "blur" }],
    // IsManage: [{ required: true, message: "请选择管理岗", trigger: "changge" }],
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return { rules, submitForm, resetForm, ruleFormRef }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      ruleForm: {
        Id: '', //岗位Id
        NatureStandard: '' //所有性格数据（String传递给后台）
      },
      list: [], //字典性格配比数据
      PostCharacterList: [{ EnneagramCode: [], list: [], show: true }], //性格配比数据
      Id: props.Id, //上级传递过来的Id
      isEdit: false, //true是修改
      show: false //是否显示
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    const ninehouseValueEvent = () => {
      // if (!val) return;
      console.log(data.PostCharacterList)

      let _list: any = []
      data.PostCharacterList.forEach((item: any) => {
        item.list.forEach((v: any) => {
          item.EnneagramCode.forEach((t: any) => {
            _list.push(t)
          })
        })
      })
      data.PostCharacterList.forEach((item: any) => {
        item.list.forEach((v: any) => {
          v.disabled = false
          if (item.EnneagramCode.indexOf(v.DicKey) == -1) {
            if (_list.indexOf(v.DicKey) > -1) v.disabled = true
          }
        })
      })
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1/3',
      boxHeight: ''
    })
    // 处理数字转汉子
    const convertToChinaNumEvent = (num: number) => {
      return convertToChinaNum(num)
    }
    // 删除数据
    const delPostCharacterList = (index: number, val: any) => {
      ElMessageBox.confirm('是否删除此条信息?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        data.PostCharacterList.splice(index, 1)
        val.forEach((item: any) => {
          data.list.forEach((v: any) => {
            if (item == v.DicKey) {
              v.disabled = false
            }
          })
        })
      })
    }
    // 添加性格配比
    const addPostCharacterList = () => {
      if (data.PostCharacterList.length > 2) {
        ElMessage.error({
          message: '每个岗位只能选择三级性格配比'
        })
      } else {
        data.PostCharacterList.push({
          EnneagramCode: [],
          Grade: '',
          Ratio: '',
          show: true,
          list: JSON.parse(JSON.stringify(data.list))
        })
        ninehouseValueEvent()
      }
    }
    onMounted(() => {
      // 根据Id获取详情
      let getDetails = async () => {
        if (props.Id) {
          await getPostNatureStandardDetails(props.Id).then((res) => {
            if (res.code == 1) {
              let item = eval('(' + res.data.NatureStandard + ')')
              if (item && item.length > 0) {
                data.PostCharacterList = JSON.parse(JSON.stringify(item))
                data.isEdit = true
              }
            } else {
              ElMessage.error(res.message)
            }
          })
        }
        // 获取性格字典
        store.getDict('sys_character_test').then((res: any) => {
          res.forEach((val: any) => {
            val.disabled = false
          })
          data.list = res
          data.PostCharacterList.forEach((val: any) => {
            val.list = JSON.parse(JSON.stringify(res))
          })
        })
      }
      getDetails()
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      ninehouseValueEvent,
      convertToChinaNumEvent,
      addPostCharacterList,
      delPostCharacterList
    }
  }
})
</script>

<style lang="postcss" scoped>
:deep(.el-checkbox) {
  height: 26px;
}
</style>
