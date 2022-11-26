import { defineStore } from 'pinia'
import { GetImServerInfo } from '/@/api/im/im'

export interface IImStore {
  SocketId: string
  SocketOpenState: boolean
  SocketMessage: IImSocketMessage
}
export interface IImSocketMessage {
  System: any
  Chat: any
  GroupChat: any
  Notice: any
  TechEnquiry: any
  SaleComm: any
  WorkFlow: any
  Other: any
}
export const imStore = defineStore({
  id: 'imStore',
  state: (): IImStore => ({
    // IM客户端ID
    SocketId: '',
    // IM打开状态
    SocketOpenState: false,
    // 收到的最新消息
    SocketMessage: {
      System: {}, //系统消息
      Chat: {}, //单聊
      GroupChat: {}, //群聊
      Notice: {}, //通知
      TechEnquiry: {}, //技术询价单
      SaleComm: {}, //销售沟通
      WorkFlow: {}, //审批流
      Other: {} //其他未知消息
    }
  }),
  getters: {
    // 获取IM客户端ID
    getSocketId(): string {
      return this.SocketId
    },
    // 获取IM打开状态
    getSocketOpenState(): boolean {
      return this.SocketOpenState
    }
  },
  actions: {
    //设置询价单Id
    asyncImOpen(): void {
      let that = this
      if (!that.SocketOpenState) {
        that.SocketOpenState = true
        GetImServerInfo()
          .then((res) => {
            if (res.code === 1) {
              let _obj = res.data || {}
              console.log('打开连接', _obj)

              that.SocketId = _obj.WebSocketId
              //创建一个webSocket实例，执行后，客户端就会与服务端连接
              let ws = new WebSocket(_obj.ServerUrl)

              //当WebSocket创建成功时，触发onopen事件
              ws.onopen = function () {
                console.log('open')
                that.SocketOpenState = true
              }

              //当客户端收到服务端发来的消息时，触发onmessage事件
              ws.onmessage = function (e: any) {
                //e.data 的数据格式也是字符串，手动解析这些数据才能得到其他格式的数据。
                const _data = JSON.parse(e.data)
                // console.log(_data)
                let _code = (_data || {}).Code
                /* 减小探听压力，将消息多个属性存储（分组管理） */
                if (_code == 1000) {
                  //系统消息
                  that.SocketMessage.System = _data
                } else if (_code == 1001) {
                  //单聊
                  that.SocketMessage.Chat = _data
                } else if (_code == 1002) {
                  //群聊
                  that.SocketMessage.GroupChat = _data
                } else if (_code == 1003) {
                  //通知
                  that.SocketMessage.Notice = _data
                } else if (_code == 1004) {
                  //技术询价单
                  that.SocketMessage.TechEnquiry = _data
                } else if (_code == 1005) {
                  //销售沟通
                  that.SocketMessage.SaleComm = _data
                } else if (_code == 1006) {
                  //审批流
                  that.SocketMessage.WorkFlow = _data
                } else {
                  //其他未知消息
                  that.SocketMessage.Other = _data
                }
              }

              //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
              ws.onclose = function (e: any) {
                console.log('close')
                that.SocketOpenState = false

                // 5秒后重连
                setTimeout(() => {
                  that.asyncImOpen()
                }, 5000)
              }

              //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
              ws.onerror = function (e: any) {
                console.log(e.error)
                that.SocketOpenState = false

                // 5秒后重连
                setTimeout(() => {
                  that.asyncImOpen()
                }, 5000)
              }
            } else {
              that.SocketOpenState = false
              console.log(res.message)
            }
          })
          .catch((e) => {
            that.SocketOpenState = false
            console.log(`GetImServerInfo${e}`)
          })
      }
    },

    setAccountBoomId(val: boolean): void {
      this.SocketOpenState = val
    }
  }
})
