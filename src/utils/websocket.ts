import config from '@/config'

interface SocketEvent {
  event: SocketEvents
  message: string
  data: any
}

type websocketEventFn = (e: SocketEvent) => void

const MAX_RETRY_TIMES = 5 // 最大重试次数

class WebsocketManager {
  private websocket!: WebSocket
  private retryTimes: number = 0
  private errorConnectInterval!: NodeJS.Timeout
  private serverTimeoutInterval!: NodeJS.Timeout
  private websocketListeners = new Set<websocketEventFn>()

  //  建立连接
  create() {
    if (!window.WebSocket) return
    let url = ''
    if (process.env.NODE_ENV === 'production') {
      url = config.domain.replace('https', 'wss')
    } else if (process.env.NODE_ENV === 'test') {
      url = config.domain.replace('http', 'ws')
    } else {
      // 本地代理地址
      const proxyAddress = 'http://proxy'
      url = proxyAddress.replace('http', 'ws')
    }
    this.websocket = new WebSocket(url)
    this.websocket.onopen = this.onOpen.bind(this)
    this.websocket.onclose = this.onClose.bind(this)
    this.websocket.onerror = this.onError.bind(this)
    this.websocket.onmessage = this.onMessage.bind(this)
  }
 
  // 关闭连接
  close() {
    if (this.websocket) {
      this.websocket.close()
    }
    this.retryTimes = 0
    clearInterval(this.errorConnectInterval)
    this.heartCheck.reset()
  }
   
  // 添加事件监听
  addEventHandler(fn: websocketEventFn) {
    this.websocketListeners.add(fn)
    return () => {
      this.websocketListeners.delete(fn)
    }
  }

  removeEventHandler(fn: websocketEventFn) {
    this.websocketListeners.delete(fn)
  }

  private dispatchEventHandle(e: SocketEvent) {
    this.websocketListeners.forEach((fn) => fn(e))
  }
  
  // 连接成功
  private onOpen() {
    this.retryTimes = 0
    clearInterval(this.errorConnectInterval)
    this.heartCheck.reset()
    this.heartCheck.start()
  }
 
  // 收到消息
  private onMessage(e: MessageEvent) {
    const data = JSON.parse(e.data)
    this.heartCheck.reset()
    this.heartCheck.start()
    this.dispatchEventHandle(data)
  }
  
  // 连接断开         
  private onClose(e: Event) {
    console.log('onclose断开连接' + e)
  }
 
   // 连接发生错误
  private onError(e: Event) {
    clearInterval(this.errorConnectInterval)
    if (this.retryTimes > MAX_RETRY_TIMES) {
      // websocket尝试5次重连都失败了，可以上报错误
    } else {
      this.retryTimes++
      this.errorConnectInterval = setInterval(() => {
        this.create()
      }, this.retryTimes * 3000)
    }
  }

  // 心跳检测
  private heartCheck = {
    timeout: 10000,
    reset: () => {
      clearInterval(this.serverTimeoutInterval)
    },
    start: () => {
      this.serverTimeoutInterval = setInterval(() => {
        if (this.websocket.readyState === 1) {
          this.websocket.send('ping')
        } else {
          clearInterval(this.serverTimeoutInterval)
          if (this.retryTimes <= MAX_RETRY_TIMES) {
            this.create()
          }
        }
      }, this.heartCheck.timeout)
    }
  }
}

const webSocketManager = new WebsocketManager()

// websocket事件名
enum SocketEvents {
  paySignMoney = 'paySignMoney'
}

/**
 * @example
 ```
 // 根组件建立连接
useEffect(() => {
		webSocketManager.create()
		return webSocketManager.close
}, [])
 ```

```
// 具体地方使用
useEffect(() => {
  const removeHandler = webSocketManager.addEventHandler(socketEvent => {
		const { event, data } = socketEvent
	})
	return removeHandler
}, [])
```
 */

export { webSocketManager, WebsocketManager }
