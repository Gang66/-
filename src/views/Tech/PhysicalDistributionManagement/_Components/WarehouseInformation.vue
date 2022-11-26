<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pl-1">
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="5em" class="bf-window-padding" hide-required-asterisk label-position="top" :inline="true">
        <el-form-item label="仓库名称" prop="NameInput">
          <el-input v-model="data.ruleForm.NameInput" placeholder="仓库名称" style="width: 320px" />
        </el-form-item>
        <el-form-item label="仓库面积" prop="MeasureInput">
          <el-input v-model="data.ruleForm.MeasureInput" placeholder="仓库面积" style="width: 320px">
            <template #append>m²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="仓库管理员" prop="AdminInput">
          <el-input v-model="data.ruleForm.AdminInput" placeholder="仓库管理员" style="width: 320px" />
        </el-form-item>
        <el-form-item label="仓库面积" prop="MobileInput">
          <el-input v-model="data.ruleForm.MobileInput" placeholder="联系电话" style="width: 320px" />
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-cascader v-model="data.ruleForm.AddressInput" :options="data.AddressOptions" :props="data.props" @change="handleChange" style="width: 320px" placeholder="仓库地址" />
        </el-form-item>
        <el-form-item label="详细地址" prop="DetailedInput">
          <el-input v-model="data.ruleForm.DetailedInput" placeholder="详细地址" style="width: 320px" />
        </el-form-item>
        <el-form-item label="备注" prop="RemarksInput" style="width: 700px">
          <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <div class="text-sm pl-11 clearfix">
      <div class="float-right p-4">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      ruleForm: {
        NameInput: '',
        MeasureInput: '',
        DetailedInput: '',
        AddressInput: '',
        MobileInput: '',
        AdminInput: '',
        RemarksInput: ''
      },
      AddressOptions: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency'
                },
                {
                  value: 'feedback',
                  label: 'Feedback'
                },
                {
                  value: 'efficiency',
                  label: 'Efficiency'
                },
                {
                  value: 'controllability',
                  label: 'Controllability'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation'
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation'
                }
              ]
            }
          ]
        },
        {
          value: 'component',
          label: 'Component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout'
                },
                {
                  value: 'color',
                  label: 'Color'
                },
                {
                  value: 'typography',
                  label: 'Typography'
                },
                {
                  value: 'icon',
                  label: 'Icon'
                },
                {
                  value: 'button',
                  label: 'Button'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox'
                },
                {
                  value: 'input',
                  label: 'Input'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber'
                },
                {
                  value: 'select',
                  label: 'Select'
                },
                {
                  value: 'cascader',
                  label: 'Cascader'
                },
                {
                  value: 'switch',
                  label: 'Switch'
                },
                {
                  value: 'slider',
                  label: 'Slider'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker'
                },
                {
                  value: 'upload',
                  label: 'Upload'
                },
                {
                  value: 'rate',
                  label: 'Rate'
                },
                {
                  value: 'form',
                  label: 'Form'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table'
                },
                {
                  value: 'tag',
                  label: 'Tag'
                },
                {
                  value: 'progress',
                  label: 'Progress'
                },
                {
                  value: 'tree',
                  label: 'Tree'
                },
                {
                  value: 'pagination',
                  label: 'Pagination'
                },
                {
                  value: 'badge',
                  label: 'Badge'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert'
                },
                {
                  value: 'loading',
                  label: 'Loading'
                },
                {
                  value: 'message',
                  label: 'Message'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox'
                },
                {
                  value: 'notification',
                  label: 'Notification'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'Menu'
                },
                {
                  value: 'tabs',
                  label: 'Tabs'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown'
                },
                {
                  value: 'steps',
                  label: 'Steps'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip'
                },
                {
                  value: 'popover',
                  label: 'Popover'
                },
                {
                  value: 'card',
                  label: 'Card'
                },
                {
                  value: 'carousel',
                  label: 'Carousel'
                },
                {
                  value: 'collapse',
                  label: 'Collapse'
                }
              ]
            }
          ]
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'docs',
              label: 'Design Documentation'
            }
          ]
        }
      ],
      props: {
        expandTrigger: 'hover'
      }
    })
    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('success')
        } else {
          ElMessage.error('存在必填项未选')
        }
      })
    }
    // 校验
    const rules = reactive<FormRules>({
      NameInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      MeasureInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      AdminInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      MobileInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      DetailedInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      RemarksInput: [{ required: true, message: '请输入', trigger: 'blur' }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-740',
      boxHeight: ''
    })
    // 选取的地址
    const handleChange = (val: any) => {
      console.log(val)
    }
    onMounted(() => {
      console.log(props.FormData.selectDetails)
      if (props.FormData.selectDetails == undefined) {
        console.log('不走接口')
      } else {
        console.log('走接口')
      }
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ruleFormRef,
      rules,
      submitForm,
      handleChange
    }
  }
})
</script>
<style lang="postcss" scoped></style>
