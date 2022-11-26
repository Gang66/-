import { ElNotification } from 'element-plus'

const socketMessage = {
  System: <any>{},
  WorkFlow: <any>{}
}

// 消息通知
export function imMessageNotified(state: any) {
  if (state.SocketMessage) {
    if (socketMessage.System != state.SocketMessage.System) {
      //系统消息
      socketMessage.System = state.SocketMessage.System

      if (state.SocketMessage.System && state.SocketMessage.System.Code) {
        /*
        ElNotification({
          title: '系统消息',
          message: socketMessage.System.Message,
          type: 'success'
        })
        */

        console.log('系统消息', state.SocketMessage.System)
      }
    } else if (socketMessage.WorkFlow != state.SocketMessage.WorkFlow) {
      //审批流
      socketMessage.WorkFlow = state.SocketMessage.WorkFlow

      if (state.SocketMessage.WorkFlow && state.SocketMessage.WorkFlow.Code) {
        ElNotification({
          title: '审批提醒',
          message: socketMessage.WorkFlow.Message,
          type: 'success'
        })

        console.log('审批流', state.SocketMessage.WorkFlow)
      }
    }
  }
}
