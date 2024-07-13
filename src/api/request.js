import { fakeData2, outline } from '@/api/fakeData.js'

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

let fetchTables, fetchOutline
if (import.meta.env.VITE_USE_MOCK === 'true') {
  fetchTables = fakeSelectTables
  fetchOutline = fakeFetchOutline
} else {
  fetchTables = selectTables
  fetchOutline = fetchReportOutline
}
export { fetchTables, fetchOutline }
