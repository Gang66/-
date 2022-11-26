<template>
  <div class="w-screen h-screen bg-longin-bg bg-fixed bg-transparent bg-left-top bg-cover bg-origin-border">
    <div class="fixed logo-login-size">
      <svg-icon icon-class="svg-logo-login" />
    </div>
    <div class="fixed layout-login" @keyup="enterSubmit">
      <div class="p-10">
        <img src="/src/assets/img/login/login-code.png" alt="" class="login-QRBtn" v-if="loginType == 1" @click="loginTypeChange(2)" />
        <img src="/src/assets/img/login/login-pc.png" alt="" class="login-QRBtn" v-else @click="loginTypeChange(1)" />
        <h3 class="text-3xl font-semibold text-black text-center mb-6">用户登录</h3>
        <h4 class="text-1xl font-semibold text-black-100 font-thin text-center mb-6">欢迎登录北方阀门系统</h4>
        <el-form ref="ruleForm" label-position="right" label-width="0" :model="form" :rules="rules" v-show="loginType == 1">
          <el-form-item class="mb-6" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item class="mb-10" prop="pwd">
            <el-input v-model="form.pwd" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password />
          </el-form-item>
          <el-form-item class="mb-6 pt-10">
            <el-button type="primary" size="large" class="w-full" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
        <div v-show="loginType == 2">
          <div class="text-center mb-5 bf-text-color-regular">请打开手机APP扫码登录</div>
          <qrcode :url="data.loginUrl" v-if="data.loginUrl" :QRWidth="230" :QRHeight="230" :QRMargin="0"></qrcode>
        </div>
        <div class="mt-20 text-center text-sm text-gray-500">中国·北方阀门集团 版权所有</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import qrcode from '/@/components/qrcode/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
import { ElMessage, ElNotification } from 'element-plus'
import { GetQRCodeCreateInfo, GetQRCodeLogEntity } from '/@/api/hr/QRCode'
import { validate } from '/@/utils/formExtend'
import { v4 as uuidv4 } from 'uuid'
import { PostGetQRCodeLoginInfo } from '/@/api/layout'
import { imStore } from '/@/store/modules/imStore'
const { login, getUser } = useLayoutStore()
// 登录类型
let loginType = ref(1)
var setTime: any
const timeChange = async (res: any, form: any, onSubmit: any) => {
  if (loginType.value == 1) return
  setTime = setInterval(() => {
    GetQRCodeLogEntity({
      tableName: res.TableName,
      guid: res.GUID
    }).then(async (v) => {
      if (v.code == 1) {
        if (v.data) {
          var userInfo = v.data.ImageSrc.split(',')
          PostGetQRCodeLoginInfo({
            UserName: userInfo[0],
            GUID: v.data.GUID,
            RealName: userInfo[1]
          })
            .then((val: any) => {
              if (val.code === 1) {
                form.name = val.data.UserName
                form.pwd = val.data.Password
                form.Loginkey = val.data.Loginkey
                onSubmit()
              } else {
                ElNotification({
                  message: val.message,
                  type: 'error'
                })
              }
            })
            .catch((e) => {
              ElNotification({
                message: e.message,
                type: 'error'
              })
            })
        }
      } else {
        ElNotification({
          message: v.message,
          type: 'error'
        })
      }
    })
  }, 1000)
}
const formRender = (val: any) => {
  let form = reactive({
    name: '',
    pwd: ''
  })
  const ruleForm = ref(null)
  const { asyncImOpen } = imStore()

  const enterSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }
  const onSubmit = async () => {
    let { name, pwd, Loginkey } = form
    if (!(await validate(ruleForm))) return
    let { code, message, data } = await login({
      username: name,
      password: pwd,
      Loginkey: Loginkey
    })
    if (code === 1) {
      clearInterval(setTime)

      //打开消息
      asyncImOpen()

      ElNotification({
        title: '欢迎',
        message: '欢迎回来',
        type: 'success'
      })
    } else {
      timeChange(val.codeDetails, form, onSubmit)
      ElNotification({
        title: message,
        message: message,
        type: 'error'
      })
    }
  }
  const onGetUser = async () => {
    await getUser()
  }
  const rules = reactive({
    name: [
      {
        validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
          if (!value) {
            return callback(new Error('用户名不能为空'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
    pwd: [
      {
        validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
          if (!value) {
            return callback(new Error('密码不能为空'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  })
  // 监听二维码切换
  const loginTypeChange = (num: number) => {
    loginType.value = num
    if (num == 2) {
      timeChange(val.codeDetails, form, onSubmit)
    } else {
      clearInterval(setTime)
    }
  }
  return {
    form,
    onSubmit,
    enterSubmit,
    rules,
    ruleForm,
    onGetUser,
    loginType,
    loginTypeChange
  }
}
export default defineComponent({
  name: 'Login',
  components: { qrcode },
  setup() {
    const data = reactive({
      // 登录生成的二维码链接
      loginUrl: '',
      codeDetails: ''
    })
    onMounted(() => {
      var arr = {
        appType: 'login',
        tableName: 'Sys_User',
        guid: uuidv4()
      }
      GetQRCodeCreateInfo(arr).then((res: any) => {
        if (res.code == 1) {
          data.loginUrl = JSON.stringify(res.data)
          data.codeDetails = res.data
          console.log(res.data)
          // timeChange(data.codeDetails,form,onSubmit)
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ...formRender(data),
      data
    }
  }
})
</script>

<style lang='postcss' scoped>
.logo-login-size {
  top: -36px;
  left: 33px;
  font-size: 10rem;
}

.layout-login {
  top: 5.8rem;
  right: 7.3rem;
  width: 25.5rem;
  background-color: #fff;

  :deep(.el-input__inner) {
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    border-bottom: 1px solid #ddd;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0;
    color: #ddd;
    font-weight: 100;
    height: 40px;
    padding-left: 40px;
  }

  :deep(.el-input__prefix) {
    font-size: 1.4rem;
  }
  .login-QRBtn {
    background-position: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
}
@media screen and (max-width: 40rem) {
  .layout-login {
    right: 50%;
    margin-right: -12.7rem;
  }
}
</style>