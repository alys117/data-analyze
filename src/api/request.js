import { setOrder } from '@/utils/util.js'
import request from '@/utils/http'

const selectTables = async(data) => {
  return await request.post('/api/select_tables', { data })
}

const fetchReportOutline = async(data) => {
  return await request.post('/api/report_outline', { data })
}

const fetchRewriteReportOutline = async(data) => {
  return await request.post('/api/rewrite_report_outline', { data })
}

const fetchDrawChart = async(body) => {
  return new Promise((resolve, reject) => {
    request.post('/api/draw_chart', { data: body }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const fetchDescrip = async(body) => {
  const res = await request.post('/api/chart_description', { data: body })
  return res.replace(/\n/g, '<br>')
}

const fetchFile = async(data) => {
  return await request.post('/api/write_to_word', { data })
}

const fetchHistory = async(data) => {
  return await request.post('/api/get_history_report_outline', { data })
}

const selectBusiTree = async() => {
  const res = await request.post('/api/check_bussiness_tree', { data: {}})
  setOrder(res)
  return res
}
const checkTable = async(data) => {
  return await request.post('/api/check_table', { data })
}

const checkInputRewrite = async(data) => {
  return await request.post('/api/check_input_rewrite', { data })
}

const login = async(data) => {
  return await request.post('/api/login', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    // 没有transformRequest这个函数，axios有的
    // transformRequest: [data => {
    //   // 将数据转换为查询字符串
    //   return new URLSearchParams(data).toString()
    // }],
    data: new URLSearchParams(data).toString()
  })
}
const logout = async() => {
  return await request.post('/api/logout', {})
}

const getUserinfo = async() => {
  if (import.meta.env.MODE === 'production') {
    return {
      username: 'liuze',
      role: 'admin'
    }
  }
  return await request.get('/api/getUserinfo')
}

if (import.meta.env.VITE_USE_MOCK === 'true') {
  console.log('vite-plugin-mock-dev-server')
}
export {
  login,
  getUserinfo as fetchUserinfo,
  logout,
  selectTables as fetchTables,
  fetchReportOutline as fetchOutline,
  fetchRewriteReportOutline as fetchRewriteOutline,
  fetchDrawChart as fetchDrawData,
  fetchDescrip as fetchChartDescription,
  fetchFile,
  fetchHistory as fetchHistoryOutline,
  selectBusiTree as fetchBusiTree,
  checkTable as fetchTable,
  checkInputRewrite as fetchCheckInputRewrite
}
