import { fakeData2, outline, rewriteOutline, drawData, desciption, historyTree2, outline3 } from '@/api/fakeData.js'
import { generateID } from '@/utils/util.js'

const selectTables = async(body) => {
  const response = await fetch('/api/select_tables', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await response.json()
  return json
}

const fakeSelectTables = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeData2)
    }, 3000)
  })
}

const fetchReportOutline = async(body) => {
  const data = await fetch('/api/report_outline', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  return data
}

const fakeFetchOutline = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(outline)
    }, 50)
  })
}

const fetchRewriteReportOutline = async(body) => {
  const data = await fetch('/api/rewrite_report_outline', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  return data
}

const fakeFetchRewriteOutline = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const a = structuredClone(rewriteOutline)
      a['问题'] = a['问题'] + Math.random()
      resolve(a)
    }, 50)
  })
}

const fetchDrawChart = async(body) => {
  return new Promise((resolve, reject) => {
    fetch('/api/draw_chart', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
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
      data.draw_data = n > 0.5 ? data.draw_data : data.draw_data_2
      delete data.draw_data_2
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

const fetchDescrip = async(body) => {
  const data = await fetch('/api/chart_description', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  return data
}

const fakeFetchDescp = async() => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(desciption + generateID(6))
    }, Math.random() * 1000)
  })
}

const fetchFile = async(body) => {
  const data = await fetch('/api/write_to_word', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  return data
}

const fakeFetchHistory = async(body) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(historyTree2)
    }, 50)
  })
}

const fetchHistory = async(body) => {
  const data = await fetch('/api/get_history_report_outline', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
  return data
}
const fateFetchBusiTree = async() => {
  // return await fetch('https://hizzgdev.github.io/jsmind/example/data_example.json').then(res => res.json())
  // return await fetch('/api/check_bussiness_tree', {
  //   method: 'post'
  // }).then(res => res.json())
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(outline3)
    }, 5000)
  })
}
const selectBusiTree = async() => {
  return await fetch('/api/check_bussiness_tree', {
    method: 'post'
  }).then(res => res.json())
}
const checkTable = async(body) => {
  const response = await fetch('/api/check_table', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await response.json()
  return json
}
let fetchTables, fetchOutline, fetchRewriteOutline, fetchDrawData, fetchChartDescription, fetchBusiTree, fetchTable
if (import.meta.env.VITE_USE_MOCK === 'true') {
  fetchTables = fakeSelectTables
  fetchOutline = fakeFetchOutline
  fetchRewriteOutline = fakeFetchRewriteOutline
  fetchDrawData = fakeFetchDrawChart
  fetchChartDescription = fakeFetchDescp
  fetchBusiTree = fateFetchBusiTree
  fetchTable = checkTable
} else {
  fetchTables = selectTables
  fetchOutline = fetchReportOutline
  fetchRewriteOutline = fetchRewriteReportOutline
  fetchDrawData = fetchDrawChart
  fetchChartDescription = fetchDescrip
  fetchBusiTree = selectBusiTree
  fetchTable = checkTable
}
export { fetchTables, fetchOutline, fetchRewriteOutline, fetchDrawData, fetchChartDescription, fetchFile, fetchHistory, fetchBusiTree, fetchTable }
