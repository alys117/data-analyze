import { fakeData2, fakeData3, fakeData4, outline, rewriteOutline,
  drawData, desciption, historyTree2, outline3, outline4, outline5 } from '@/api/fakeData.js'
import { generateID } from '@/utils/util.js'
import { setOrder } from '@/utils/util.js'
import request from '@/utils/request.js'

const fakeSelectTables = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      // resolve(fakeData2)
      // resolve(fakeData3)
      resolve(fakeData4)
    }, 1000)
  })
}

const fakeFetchOutline = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(outline)
    }, 1000)
  })
}

const fakeFetchRewriteOutline = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const a = structuredClone(rewriteOutline)
      a['问题'] = a['问题'] + Math.random()
      resolve(a)
    }, 1000)
  })
}

const fakeFetchDrawChart = async() => {
  const n = Math.random()
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('%c' + '随机数' + n, 'color: orange; font-size: 14px;')
      if (n < 0.01) {
        reject({ error: '模拟错误' })
      }
      const data = structuredClone(drawData)
      // data.draw_data = n > 0.5 ? drawData.draw_data : drawData.draw_data_2 // 这里藏着一个大坑，不能直接赋值，否则会改变原始数据
      data.draw_data = n > 0.5 ? data.draw_data_3 : data.draw_data_2
      delete data.draw_data_2
      delete data.draw_data_3
      if (n > 0.95) data.draw_data = ''
      if (data.draw_data) {
        Object.keys(data.draw_data.y).forEach((key, index) => {
          data.draw_data.y[key] = data.draw_data.y[key].map(item => Math.random().toFixed(4))
        })
      }
      resolve(data)
    }, 1000 * n)
  })
}

const fakeFetchDescp = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(desciption.replace(/\n/g, '<br>') + generateID(6))
    }, Math.random() * 1000)
  })
}

const fakeFetchHistory = async(body) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(historyTree2)
    }, 50)
  })
}

const fateFetchBusiTree = async() => {
  // return await fetch('https://hizzgdev.github.io/jsmind/example/data_example.json').then(res => res.json())
  // return await fetch('/api/check_bussiness_tree', {
  //   method: 'post'
  // }).then(res => res.json())
  return await new Promise((resolve) => {
    setTimeout(() => {
      // resolve(outline3)
      // setOrder(outline4)
      setOrder(outline5)
      resolve(outline5)
    }, 2000)
  })
}
const fetchFile = async(data) => {
  return await request.post('/api/write_to_word', { data })
}
const checkTable = async(data1) => {
  return await request.post('/api/check_table', { data1 })
}
const checkInputRewrite = async(data1) => {
  return await request.post('/api/check_input_rewrite', { data1 })
}
const login2 = async(data) => {
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
const logout1 = async() => {
  return await request.post('/api/logout', {})
}

const getUserinfo = async() => {
  return await request('/api/getUserinfo')
}

let [fetchTables, fetchOutline, fetchRewriteOutline, fetchDrawData,
  fetchChartDescription, fetchBusiTree, fetchTable, fetchHistoryOutline, fetchCheckInputRewrite,
  login, fetchUserinfo, logout] =
  [null, null, null, null, null, null, null, null, null, null, null, null]
login = login2
fetchUserinfo = getUserinfo
logout = logout1
if (import.meta.env.VITE_USE_MOCK === 'true') {
  fetchTables = fakeSelectTables
  fetchOutline = fakeFetchOutline
  fetchRewriteOutline = fakeFetchRewriteOutline
  fetchDrawData = fakeFetchDrawChart
  fetchChartDescription = fakeFetchDescp
  fetchBusiTree = fateFetchBusiTree
  fetchTable = checkTable
  fetchHistoryOutline = fakeFetchHistory
  fetchCheckInputRewrite = checkInputRewrite
}
export { login, fetchUserinfo, logout, fetchTables, fetchOutline, fetchRewriteOutline, fetchDrawData, fetchChartDescription, fetchFile, fetchHistoryOutline, fetchBusiTree, fetchTable, fetchCheckInputRewrite }
