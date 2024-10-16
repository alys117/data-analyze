/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { ElMessageBox } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/user'
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

/**
 * 异常处理程序
 */
const errorHandler = async error => {
  const { response } = error
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    if (status === 400) {
      ElMessageBox.alert('用户名密码错误！', { type: 'error' }).then(r => {
        console.log(r, errorText)
      })
    } else if (status === 401 || status === 403) {
      ElMessageBox.alert('登录信息已过期，请重新登录!', { type: 'error' }).then(r => {
        console.log(r)
      })
      console.log(router)
      router.push('/403').then(r => {})
    } else if (status === 500) {
      ElMessageBox.alert('服务器内部错误！', { type: 'error' }).then(r => {
        console.log(r, errorText)
      })
    } else {
      ElMessageBox.alert(`请求错误 ${status}: ${url}`, { type: 'error' }).then(r => {
        console.log(errorText, r)
      })
    }
  } else if (!response) {
    ElMessageBox.alert('您的网络发生异常，无法连接服务器，网络异常', { type: 'error' }).then(r => {})
  }
  return response.clone().json()
}

/**
 * 配置request请求时的默认参数
 */
const http = extend({
  errorHandler, // 默认错误处理
  credentials: 'include' // 默认请求是否带上cookie
})

// request拦截器, 改变url 或 options.
http.interceptors.request.use((url, options) => {
  const token = `Bearer ${useUserStore().getToken().value}`
  const headers = {
    Authorization: token
  }
  Object.assign(headers, options.headers)
  return {
    url: url,
    options: { ...options, headers: headers }
  }
})

// 拦截器, 判断result的code, 是401则为登录信息已过期, 跳转到登录页
// http.interceptors.response.use(async(response) => {
//   // // 登录要验证是否被篡改，这里获取到header信息，返回到data里，方便后续处理
//   // const data = await response.clone().json()
//   // console.log(data)
//   // // if ((data && (data.code === '401')) || (data && data.code === 500)) {
//   // //   await ElMessageBox.alert('登录信息已过期，请重新登录!', { type: 'error' })
//   // //   await router.push('/403')
//   // //   // localStorage.clear()
//   // // }
//   //
//   // return data
// })

export default http
