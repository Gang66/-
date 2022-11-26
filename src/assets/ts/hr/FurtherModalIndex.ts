/*
 * @Author: ZHJ
 * @Date: 2022-08-10 08:52:57
 * @LastEditTime: 2022-08-11 10:01:02
 * @LastEditors: ZHJ
 * @Description: 商学院关停方法
 * @FilePath: \beifangrenzixitong\src\assets\ts\hr\FurtherModalIndex.ts
 * 版权声明
 */

import { Action, ElMessage, ElMessageBox } from 'element-plus'
import { createVNode, render } from 'vue'
import FurtherModal from '/@/views/HR/SchoolView/Further/_Components/FurtherModal.vue'
// 深造营地关停弹窗
export function msg(router: any) {
  const instance = createVNode(FurtherModal, router) //创建实例挂在dom上
  render(instance, document.querySelector('body') as HTMLElement)
}
// 禁止点击其他菜单
export function prohibitOclick(UserInfo: any, Path: string) {
  // 深造营地关停期间
  if (
    UserInfo.UnWorkStudyStatus == 2 &&
    Path != '/HR/SchoolView/Further/Index'
  ) {
    ElMessage({
      message: '请先解锁深造营地学习',
      type: 'warning'
    })
    return true
  }
  //   新人训期间
  if (
    UserInfo.TrainStudyStatus === 0 &&
    Path != '/HR/SchoolView/NewcomerTraining/Index'
  ) {
    ElMessage({
      message: '请先通过新人训',
      type: 'warning'
    })
    return true
  }
}
// 检测学习结束
export function changeLearningStatus(UserInfo: any, router: any) {
  // 深造营地关停期间
  if (
    UserInfo.UnWorkStudyStatus == 0 &&
    router.currentRoute.value.path == '/HR/SchoolView/Further/Index'
  ) {
    ElMessageBox.confirm('关停学习已结束，是否跳转工作台？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(() => {
        router.push({ path: '/HR/View/Index' })
      })
      .catch(() => {})
    return
  }
  if (
    UserInfo.TrainStudyStatus == 100 &&
    router.currentRoute.value.path == '/HR/SchoolView/NewcomerTraining/Index'
  ) {
    ElMessageBox.confirm('新人训学习结束，是否跳转工作台?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(() => {
        router.push({ path: '/HR/View/Index' })
      })
      .catch(() => {})
  }
}
