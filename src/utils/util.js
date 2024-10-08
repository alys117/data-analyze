// 防抖
export function debounce(fn) {
  console.log(1)
  let t = null // 只会执行一次
  debugger

  return function() {
    if (t) {
      clearTimeout(t)
    }
    t = setTimeout(() => {
      // console.log(arguments[0]) //undefined
      fn.apply(this, arguments)
      // 在这个回调函数里面的argument是这个回调函数的参数，因为没有参数所以undefined，可以通过外面的函数赋值来进行访问
      // 也可以改变成箭头函数,箭头函数的this是指向定义函数的那一层的，所以访问到的arguments是上一层函数的arguments
    }, 1000)
  }
}
// 节流
export function throttle(fn, delay = 200) {
  let timer = null
  console.log(fn)
  debugger
  return function() {
    if (timer) return
    timer = setTimeout(() => {
      debugger
      fn.apply(this, arguments)
      timer = null
    })
  }
}
// 下拉动画
export function animation(obj, target, fn1) {
  // console.log(fn1);
  // fn是一个回调函数，在定时器结束的时候添加
  // 每次开定时器之前先清除掉定时器
  clearInterval(obj.timer)
  obj.timer = setInterval(function() {
    // 步长计算公式  越来越小
    // 步长取整
    var step = (target - obj.scrollTop) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer)
      // 如果fn1存在，调用fn
      if (fn1) {
        fn1()
      }
    } else {
      // 每30毫秒就将新的值给obj.left
      obj.scrollTop = obj.scrollTop + step
    }
  }, 10)
}

// // 判断文件类型
// export function judgeFileType(file) {
//   if (file == null || file == '') {
//     alert(i18n.t('util_js.select'))
//     return false
//   }
//   if (file.lastIndexOf('.') == -1) { // 如果不存在"."
//     alert(i18n.t('util_js.path'))
//     return false
//   }
//   var AllImgExt = '.jpg|.jpeg|.gif|.bmp|.png|'
//   var extName = file.substring(file.lastIndexOf('.')).toLowerCase()// （把路径中的所有字母全部转换为小写）
//   if (AllImgExt.indexOf(extName + '|') == -1) {
//     ErrMsg = i18n.t('util_js.notallowed') + AllImgExt + i18n.t('util_js.type') + extName
//     alert(ErrMsg)
//     return false
//   }
// }

// 文件类型
export function fileType() {
  return {
    'application/msword': 'word',
    'application/pdf': 'pdf',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.ms-excel': 'excel',
    'aplication/zip': 'zpi'
  }
}

/**
* 获取当前时间
*/
export function getNowTime() {
  // 创建一个Date对象
  var date = new Date()
  // 获取年份、月份、日期、小时、分钟和秒数
  var year = date.getFullYear()
  var month = date.getMonth() + 1 // 注意月份从0开始计数
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  // 如果月份、日期、小时、分钟或秒数小于10，需要在前面补0
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  // 拼接成字符串
  var currentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  // 输出结果
  return currentTime
}

/**
 * 格式化时间
 */
export function JCMFormatDate(dateStr) {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

// 将时间戳转换为正常时间
export function JCMFormatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000) // 转换为Date对象
  const options = { // 背景时间的格式选项
    year: 'numeric', // 年份（4位数字）
    month: 'long', // 月份的全称
    day: 'numeric', // 天（数字）
    hour: 'numeric', // 小时（数字）
    minute: 'numeric', // 分钟（数字）
    second: 'numeric' // 秒钟（数字）
  }
  return date.toLocaleDateString('zh-CN', options)
}
/**
 * 复制到剪切板
 */

export function copyToClipboard(content) {
  const clipboardData = window.clipboardData
  if (clipboardData) {
    clipboardData.clearData()
    clipboardData.setData('Text', content)
    return true
  } else if (document.execCommand) {
    const el = document.createElement('textarea')
    el.value = content
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    return true
  }
  return false
}

/**
 * 生成UUID
 * @returns
 */
export function generateUUID() {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export function generateID(len) {
  if (len < 11) {
    return Math.random().toString(36).substring(2, len + 2)
  } else {
    return Math.random().toString(36).substring(2, 13) + generateID(len - 11)
  }
}
// 递归遍历改名
export const renameObjectProperties = (obj, oldName, newName) => {
  // 如果是数组，则使用forEach进行遍历，为了保持索引不变
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      // 如果item是对象或数组，则递归调用自身
      if (typeof item === 'object' && item !== null) {
        renameObjectProperties(item, oldName, newName)
      } else if (item === oldName) {
        // 如果item与旧属性名相同，则替换为新的属性名
        obj[index] = newName
      }
    })
  } else if (typeof obj === 'object' && obj !== null) {
    // 如果是对象，则使用for...in遍历
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === oldName) {
          // 如果当前属性名与旧属性名相同，则替换为新的属性名
          obj[newName] = obj[oldName]
          delete obj[oldName]
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          // 如果当前属性是对象，则递归调用自身
          renameObjectProperties(obj[key], oldName, newName)
        }
      }
    }
  }
  // 返回修改后的对象或数组
  return obj
}

export const findFamily = (tree, itemId, path = []) => {
  for (const item of tree) {
    if (item.id === itemId) {
      // 找到目标项
      return [...path, item]
    }

    if (item.children && item.children.length > 0) {
      const result = findFamily(item.children, itemId, [...path, item])
      if (result) {
        // 子树中找到目标项
        return result
      }
    }
  }
  // 未找到目标项
  return null
}

export function convertFormat(obj) {
  const result = []

  for (const key in obj) {
    const value = obj[key]
    if (Array.isArray(value)) {
      const children = value.map(item => {
        if (typeof item === 'object') {
          return convertFormat(item)[0] // Assuming each object in array has only one key-value pair
        }
        return { id: generateID(10), label: item }
      })
      result.push({ id: generateID(10), label: key, children })
    } else {
      result.push({
        id: generateID(10),
        label: key,
        children: [{ id: generateID(10), label: value }]
      })
    }
  }
  return result
}

export function revertFormat(arr) {
  const result = {}

  arr.forEach(item => {
    if (item.children && item.children.every(child => typeof child === 'object' && !child.children)) {
      // 如果 children 中的每个元素都是基本类型（不包含更深层的 children）
      result[item.label] = item.children.map(child => child.label)
    } else if (item.children && item.children.some(child => typeof child === 'object' && child.children)) {
      // 如果 children 中至少有一个元素包含更深层的 children
      result[item.label] = revertFormat(item.children)
    }
  })

  return result
}

export function reverseConvertFormat(arr) {
  const n = arr.findIndex((item) => item.children && item.children.length > 0)
  if (n === -1) {
    return arr.map((item) => item.label)
  }
  const obj = {}
  arr.forEach((item) => {
    if (item.children && item.children.length > 0) {
      obj[item.label] = item.children.map((child) => reverseConvertFormat([child]))
    } else {
      // 没有children属性，直接使用label作为键
      obj[item.label] = null // 原始格式中没有这种情况，这是一个假设
    }
  })
  return obj
}

export function numToWords(num) {
  // 四位进行分割
  const numStr = num.toString().replace(/(?=(\d{4})+$)/g, ',')
    .split(',')
    .filter(Boolean)

  const bigUnits = ['', '万', '亿']
  let result = ''
  for (let i = 0; i < numStr.length; i++) {
    const part = numStr[i]
    const c = _transform(part)
    let u = bigUnits[numStr.length - i - 1]
    // 也是需要考虑当四位为0的情况不需要添加单位
    if (c === chars[0]) {
      u = ''
    }
    result += c + u
  }
  result = _handleZero(result)
  return result
}
const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const units = ['', '十', '百', '千']
function _handleZero(str) {
  return str.replace(/零{2,}/g, '零').replace(/零+$/, '')
}
function _transform(n) {
// 处理四位全部为0
  if (n === '0000') {
    return chars[0]
  }
  let result = ''
  for (let i = 0; i < n.length; i++) {
    // 转换汉字
    const c = chars[+n[i]]
    // 加单位 得到单位
    let u = units[n.length - 1 - i]
    // 处理0不加单位
    if (c === chars[0]) {
      u = ''
    }
    result += c + u
  }
  // 处理重复零，末尾零情况
  return _handleZero(result)
}

export function setOrder(data, parentOrder = '0') {
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      item.order = parentOrder + '-' + (index + 1)
      if (item.children) {
        setOrder(item.children, item.order)
      }
    })
  } else {
    data.order = parentOrder + '-1'
    if (data.children) {
      setOrder(data.children, data.order)
    }
  }
}
