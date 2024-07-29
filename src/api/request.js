import { fakeData2, outline, rewriteOutline, drawData, desciption, historyTree2 } from '@/api/fakeData.js'

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
    }, 50)
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
      resolve(rewriteOutline)
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
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random()
      const data = structuredClone(drawData)
      data.draw_data = Math.random() > 0.8 ? drawData.draw_data : drawData.draw_data_2
      if (n > 0.8) data.draw_data = ''
      console.log('%c' + '随机数' + n, 'color: red; font-size: 20px;')
      if (data.draw_data) {
        Object.keys(data.draw_data.y).forEach((key) => {
          data.draw_data.y[key] = data.draw_data.y[key].map((item) => {
            const m = Math.random()
            return m.toFixed(4)
          })
        })
      }
      Math.random() > 0.2 ? resolve(data) : reject({ error: '模拟错误' })
    }, 1000 * Math.random())
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
      resolve(desciption + Math.random())
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

const fetchHistory = async(body) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(historyTree2)
    }, 50)
  })
}

let fetchTables, fetchOutline, fetchRewriteOutline, fetchDrawData, fetchChartDescription
if (import.meta.env.VITE_USE_MOCK === 'true') {
  fetchTables = fakeSelectTables
  fetchOutline = fakeFetchOutline
  fetchRewriteOutline = fakeFetchRewriteOutline
  fetchDrawData = fakeFetchDrawChart
  fetchChartDescription = fakeFetchDescp
} else {
  fetchTables = selectTables
  fetchOutline = fetchReportOutline
  fetchRewriteOutline = fetchRewriteReportOutline
  fetchDrawData = fetchDrawChart
  fetchChartDescription = fetchDescrip
}
export { fetchTables, fetchOutline, fetchRewriteOutline, fetchDrawData, fetchChartDescription, fetchFile, fetchHistory }
