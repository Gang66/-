/**
 * 验证手机号码或者电话号
 * */
export function isMobileTel(rule: any, value: any, callback: any) {
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    return callback()
  }
  setTimeout(() => {
    const myreg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
    if (!myreg.test(value)) {
      callback(new Error('请输入合法手机号/电话号'))
    } else {
      callback()
    }
  }, 0)
}

/**
 * 验证邮箱
 * */
export function isEmail(rule: any, value: any, callback: any) {
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    return callback()
  }
  setTimeout(() => {
    const myreg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  }, 0)
}

/**
 * 验证URL
 * */
export function isURL(rule: any, value: any, callback: any) {
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    return callback()
  }
  const strUrl =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
  const urlReg = new RegExp(strUrl)
  if (value) {
    if (urlReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的url格式'))
    }
  } else {
    callback()
  }
}
/**
 * 验证数字
 * */
export function isNumber(rule: any, value: any, callback: any) {
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    return callback()
  }
  setTimeout(() => {
    const myreg = /^\d+(?=\.{0,1}\d+$|$)/
    if (!myreg.test(value)) {
      callback(new Error('请输入数字值'))
    } else {
      callback()
    }
  }, 0)
}
/**
 * 验证银行卡
 * */
export function isBankCard(rule: any, value: any, callback: any) {
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    return callback()
  }
  setTimeout(() => {
    // 银行卡号(12~28)位正则验证  20210524有九位数的银行号692832890
    const myreg = /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/
    // const myreg = /^([1-9]{1})(\d{8,27})$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的卡号'))
    } else {
      callback()
    }
  }, 0)
}
/**
 * 验证税号
 * */
export function isTaxNum(rule: any, value: any, callback: any) {
  if (!value) {
    // return callback(new Error('输入不可以为空'))
    return callback()
  }
  setTimeout(() => {
    // 15或者17或者18或者20位字母、数字组成
    const myreg = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的税号'))
    } else {
      callback()
    }
  }, 0)
}
/**
 * 验证电话号码
 * */
export function isTel(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    const myreg = /^[0][0-9]{9}$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
  }, 0)
}
