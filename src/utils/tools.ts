import { ILocalStore } from '/@/type/utils/tools'
import { IMenubarList } from '/@/type/store/layout'
import { ElMessage } from 'element-plus'
/**
 * 睡眠函数
 * @param time
 */
export async function sleep(time: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(() => resolve, time)
  })
}
/**
 * 金额格式化
 * @param num 金额
 * @param symbol 金额前面修饰符号，如$,￥
 */
export function format(num: number | string, symbol = '￥'): string {
  if (Number.isNaN(Number(num))) return `${symbol}0.00`
  return (
    symbol +
    Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  )
}
/**
 * 取消金额格式化
 * @param str 金额
 */
export function unformat(str: string): number | string {
  const s = str.substr(1).replace(/\,/g, '')
  return Number.isNaN(Number(s)) || Number(s) === 0 ? '' : Number(s)
}
/**
 * 表格合计行
 * @param str 金额
 */
export function tableSummaries(param: { columns: any; data: any }): Array<string | number> {
  const { columns, data } = param
  const sums: Array<string | number> = []
  columns.forEach((column: { property: string | number }, index: number) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const values = data.map((item: { [x: string]: any }) => Number(item[column.property]))
    if (!values.every((value: number) => isNaN(value))) {
      sums[index] = values.reduce((prev: number, curr: number) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      const sum = sums[index]
      if (typeof sum === 'number') {
        sums[index] = format(sum.toFixed(2))
      }
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}

export function isInput(el: HTMLElement): boolean {
  return el.nodeName.toLocaleLowerCase() === 'input'
}
export function isTextarea(el: HTMLElement): boolean {
  return el.nodeName.toLocaleLowerCase() === 'textarea'
}

/**
 * localStorage设置有效期
 * @param name localStorage设置名称
 * @param data 数据对象
 * @param pExpires 有效期(默认100年)
 */
export function setLocal(name: string, data: IObject<any>, pExpires = 1000 * 60 * 60 * 24 * 365 * 100): void {
  const d = data as ILocalStore
  d.startTime = Date.now()
  d.expires = pExpires
  localStorage.setItem(name, JSON.stringify(data))
}
/**
 * 判断localStorage有效期是否失效
 * @param name localStorage设置名称
 */
export async function useLocal(name: string): Promise<ILocalStore> {
  return new Promise((resolve, reject) => {
    const local = getLocal<ILocalStore>(name)
    if (local.startTime + local.expires < Date.now()) reject(`${name}已超过有效期`)
    resolve(local)
  })
}
/**
 * 获取localStorage对象并转成对应的类型
 * @param name localStorage设置名称
 */
export function getLocal<T>(name: string): T {
  const l = localStorage.getItem(name)
  const local = JSON.parse(l !== null ? l : '{}') as unknown as T
  return local
}

/**
 * 函数节流
 * @param time 间隔时间
 */
export function throttle(time = 500): () => Promise<void> {
  let timer: NodeJS.Timeout | null = null
  let firstTime = true
  return () => {
    return new Promise((resolve) => {
      if (firstTime) {
        resolve()
        return (firstTime = false)
      }
      if (timer) return false
      timer = setTimeout(() => {
        if (timer) clearTimeout(timer)
        timer = null
        resolve()
      }, time)
    })
  }
}

/**
 * list结构转tree
 * @param data list原始数据
 * @param pid 最外层pid
 */
export function listToTree(data: Array<IMenubarList>, pid: string | number = 1, isChildNull = false): Array<IMenubarList> {
  const d: Array<IMenubarList> = []
  if (data) {
    data.forEach((val) => {
      if (val.parentId == pid) {
        const list = listToTree(data, val.id, isChildNull)
        const obj: IMenubarList = { ...val }
        if (!isChildNull || list.length !== 0) {
          obj.children = list
        }
        d.push(obj)
      }
    })
  }

  return d
}
/**
 * 字符串首字母大写
 * @param str
 * @returns
 */
export function firstUpperCase(str: string): string {
  return str.replace(/^\S/, (s) => s.toUpperCase())
}

/**
 * 加载store状态
 * @param modules
 * @returns
 */
export function loadStorePage(modules: IObject<any>): IObject<any> {
  const page: IObject<any> = {}
  Object.keys(modules).forEach((key) => {
    const nameMatch = key
      .substr(2)
      .replace('.ts', '')
      .split('/')
      .map((v) => firstUpperCase(v))
      .join('')
    page[nameMatch] = modules[key].default
  })
  return page
}

/**
 * 两次编码url
 * @param url
 * @returns
 */
export function decode(url: string): string {
  return decodeURIComponent(decodeURIComponent(url))
}

/**
 * 两次解码url
 * @param url
 * @returns
 */
export function encode(url: string): string {
  return encodeURIComponent(encodeURIComponent(url))
}

/**
 * 数字格式化向前补零
 * @param num 数字
 * @param digit 位数
 */
export function zeroPadding(num: string, digit: number): string {
  let zero = ''
  for (let i = 0; i < digit; i++) {
    zero += '0'
  }
  return (zero + num).slice(-digit)
}
/* 时间转换 */
export function parseTime(time: any, cFormat?: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    time = `${time}`.replace(/-/g, '/')
    if (`${time}`.length === 10) time = Number(time) * 1000
    date = new Date(`${time}`)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return time_str
}
/* 数字转换为汉子 */
export function convertToChinaNum(num: any) {
  var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
  var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿') //可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return '零'
  }
  var english = num.toString().split('')
  var result = ''
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i //倒序排列设值
    result = arr2[i] + result
    var arr1_index = english[des_i]
    result = arr1[arr1_index] + result
  }
  //将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
  //合并中间多个零为一个零
  result = result.replace(/零+/g, '零')
  //将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
  //将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿')
  //移除末尾的零
  result = result.replace(/零+$/, '')
  //将【零一十】换成【零十】
  //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  //将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}
// 获取 昨日 yesterday 今天day 本周week 上周lastWeek 本月month 上月LastMonth 本季度quarter 本年year
export function getTime(type: string) {
  var date: any = new Date() //当前日期
  var nowDay = date.getDate() //当前日
  var nowMonth = date.getMonth() //当前月
  var nowYear = date.getYear() //当前年
  var nowDayOfWeek = date.getDay() - 1 //今天本周的第几天
  nowYear += nowYear < 2000 ? 1900 : 0

  var lastMonthDate: any = new Date() //上月日期
  lastMonthDate.setDate(1)
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  var lastYear = lastMonthDate.getYear()
  var lastMonth = lastMonthDate.getMonth()

  if (type === 'yesterday') {
    return date.setDate(date.getDate() - 1)
  } else if (type === 'day') {
    return date
  } else if (type == 'week') {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek) //本周开始时间
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)) //本周结束时间
    return {
      weekStartDate,
      weekEndDate
    }
  } else if (type == 'lastWeek') {
    var weekDate = new Date(date.getTime() - 7 * 24 * 3600 * 1000) // 计算开始时间用
    var weekDate2 = new Date(date.getTime() - 7 * 24 * 3600 * 1000) // 计算结束时间用
    var day = weekDate.getDay()
    var time = weekDate.getDate() - day + (day === 0 ? -6 : 1)
    var startDate = new Date(weekDate.setDate(time))
    var endDate = new Date(weekDate2.setDate(time + 6))
    var weekStartDate = startDate //上周开始时间
    var weekEndDate = endDate //上周结束时间
    return {
      weekStartDate,
      weekEndDate
    }
  } else if (type === 'month') {
    var monthStartDate = new Date(nowYear, nowMonth, 1) //本月开始日期
    var days = getMonthDays(nowMonth, nowYear) //获取当月总共有多少天
    var monthEndDate = new Date(nowYear, nowMonth, days) //本月结束日期
    return {
      days,
      monthStartDate,
      monthEndDate
    }
  } else if (type === 'LastMonth') {
    var lastMonthStartDate = new Date(nowYear, lastMonth, 1) //上月开始时间
    var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth, nowYear)) //上月结束时间
    return {
      lastMonthStartDate,
      lastMonthEndDate
    }
  } else if (type === 'quarter') {
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(nowMonth), 1) //本季度开始时间
    var quarterEndMonth = getQuarterStartMonth(nowMonth) + 2
    var quarterEndDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth, nowYear)) //本季度结束时间
    return {
      quarterStartDate,
      quarterEndDate
    }
  } else if (type === 'year') {
    var currentYear = date.getFullYear() //获得当前年份4位年
    var currentYearFirstDate = new Date(currentYear, 0, 1) //本年第一天
    var currentYearEndDate = new Date(nowYear, nowMonth, getMonthDays(12, nowYear)) //本年最后一天
    return {
      currentYearFirstDate,
      currentYearEndDate
    }
  }
}
/////数字转大写
export const toChies = (val: any) => {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟')
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆')
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘')
  //整数金额时后面跟的字符
  var cnInteger = '整'
  //整型完以后的单位
  var cnIntLast = '元'
  //最大处理的数字
  var maxNum = 999999999999999.9999
  //金额整数部分
  var integerNum
  //金额小数部分
  var decimalNum
  //输出的中文金额字符串
  var chineseStr = ''
  //分离金额后用的数组，预定义
  var parts
  if (val + '' == '') {
    return ''
  }
  val = parseFloat(val)
  if (val >= maxNum) {
    //超出最大处理数字
    return ''
  }
  if (val == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  //转换为字符串
  val = val.toString()
  if (val.indexOf('.') == -1) {
    integerNum = val
    decimalNum = ''
  } else {
    parts = val.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0
    var IntLen = integerNum.length
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1)
      var p = IntLen - i - 1
      var q = p / 4
      var m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        //归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1)
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == '') {
    chineseStr += cnInteger
  }
  return chineseStr
}
//获得某月的天数
function getMonthDays(myMonth: any, nowYear: any) {
  var monthStartDate: any = new Date(nowYear, myMonth, 1)
  var monthEndDate: any = new Date(nowYear, myMonth + 1, 1)
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}
//获得本季度的开始月份
function getQuarterStartMonth(nowMonth: any) {
  var quarterStartMonth = 0
  if (nowMonth < 3) {
    quarterStartMonth = 0
  }
  if (2 < nowMonth && nowMonth < 6) {
    quarterStartMonth = 3
  }
  if (5 < nowMonth && nowMonth < 9) {
    quarterStartMonth = 6
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9
  }
  return quarterStartMonth
}
// 根据传递过来的url拼接前缀
export function remoteUrl(url: any) {
  return url == null ? '' : url.indexOf('http', 0) > -1 ? url : `${import.meta.env.VITE_UPLOADURL}` + url
}
//下载文件 url,name
export function downloadFiles(val: any) {
  if (val) {
    var a = document.createElement('a') //生成一个a元素
    var event = new MouseEvent('click') //创建一个单击事件
    a.download = val.name || 'pic' //设置图片名称
    a.target = '_blank'
    // 设置图片地址
    a.href = remoteUrl(val.url)
    a.dispatchEvent(event) //触发a的单击事件
  }
}

/**
 * 将字节转成B  KB MB GB
 * @param byte number
 * @returns string
 */
export const changeByte = (byte: number) => {
  let size = ''
  if (byte < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    size = `${byte.toFixed(2)}B`
  } else if (byte < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    size = `${(byte / 1024).toFixed(2)}KB`
  } else if (byte < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    size = `${(byte / (1024 * 1024)).toFixed(2)}MB`
  } else {
    // 其他转化成GB
    size = `${(byte / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  const sizeStr = `${size}` // 转成字符串
  const index = sizeStr.indexOf('.') // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  // eslint-disable-next-line eqeqeq
  if (dou == '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
/*用正则表达式实现html解码（反转义）*/
export function htmlDecodeByRegExp(str: any) {
  var temp = ''
  if (str.length == 0) return ''
  temp = str.replace(/&amp;/g, '&')
  temp = temp.replace(/&lt;/g, '<')
  temp = temp.replace(/&gt;/g, '>')
  temp = temp.replace(/&nbsp;/g, ' ')
  temp = temp.replace(/&#39;/g, "'")
  temp = temp.replace(/&quot;/g, '"')
  return temp
}
// 计算时间获取天数
export function formatDistanceTime(timestamp: number, format = 'dd天hh时mm分钟') {
  interface RegExp {
    $1: string
    $2: string
    // etc
  }
  let allS = timestamp / 1000
  let h, m, s, d, M, y
  if (allS > 60) {
    m = allS / 60
    s = allS % 60
    if (m > 60 && format.indexOf('h') != -1) {
      h = m / 60
      m = m % 60
      if (h > 24 && format.indexOf('d') != -1) {
        d = h / 24
        h = h % 24
      }
    }
  } else {
    s = allS
  }
  let o = {
    'h+': h || 0,
    'm+': m || 0,
    's+': s || 0,
    'd+': d || 0
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      let str: any = o[k].toFixed(0)
      console.log(str.padStart(2, '0'))
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : str.padStart(2, '0'))
    }
  }
  return format
}
// 复制文本  val:需要复制的内容
export function copyDomText(val: string) {
  const text = val
  // 添加一个input元素放置需要的文本内容
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  // 选中并复制文本到剪切板
  textarea.select()
  document.execCommand('copy')
  // 移除textarea元素
  document.body.removeChild(textarea)
  ElMessage.success('已复制到剪切板')
}
//返回报价单位简称
export function RetCompanySimplify(val: string) {
  var name = ''
  switch (val) {
    case '上海阀门二厂有限公司':
      name = '上海二厂'
      break
    case '山东联合阀门集团股份有限公司':
      name = '山东联合'
      break
    case '北京高中压阀门科技集团有限公司':
      name = '北京高中压'
      break
    case '北方阀门集团有限公司':
      name = '北方阀门'
      break
    case '山东华铭自控设备研究院有限公司':
      name = '华铭自控'
      break
    case '北方高中压阀门有限公司':
      name = '北方高中压'
      break
    case '潍坊华电阀门制造有限公司':
      name = '潍坊华电'
      break
    case '湖北高中压阀门有限责任公司':
      name = '湖高'
      break
    default:
      name = ''
      break
  }
  return name
}
