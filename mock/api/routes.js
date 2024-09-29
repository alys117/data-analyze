import { posts, users, msg, tables, table, outline, busitree, historyoutline, rewriteOutline, drawData, desciption } from './data'
import { generateID, setOrder } from '@/utils/util.js'
const headers = {
  'Content-Type': 'application/json',
  'accept': 'application/json'
}
const enabled = true
export const routes = [
  {
    url: '/api/test1',
    body: () => users
  },
  { url: '/api/test2',
    body: () => posts.value
  },
  { url: '/api/test3',
    headers,
    body: () => msg
  },
  { url: '/api/test4',
    delay: 3000,
    headers: {
      'Content-Type': 'text/plain'
    },
    body(req) {
      console.log(req.headers, 'req')
      return 'this is a plain text'
    }
  },
  {
    url: '/api/check_input_rewrite',
    delay: 2000,
    body: () => {
      return {
        'output': 'False1'
      }
    }
  },
  {
    url: '/api/select_tables',
    enabled, // 是否启用
    body(req) {
      const n = Math.random()
      if (n > 0.1) return { 'desc': '数据库中库表无法满足主题需求，请对报告主题进行补充或修改。' }
      return tables
    }
  },
  {
    url: '/api/check_table',
    enabled,
    body(req) {
      return { [req.body.table_name]: table[req.body.table_name] }
    }
  },
  {
    url: '/api/check_bussiness_tree',
    enabled,
    body: (req) => {
      setOrder(busitree)
      return busitree
    }
  },
  {
    url: '/api/report_outline',
    enabled,
    body: (req) => outline
  },
  {
    url: '/api/get_history_report_outline',
    enabled,
    body: (req) => historyoutline
  },
  {
    url: '/api/rewrite_report_outline',
    enabled,
    body: (req) => rewriteOutline
  },
  {
    url: '/api/draw_chart',
    headers,
    body: (req) => {
      const n = Math.random()
      console.log('%c' + '随机数' + n, 'color: orange; font-size: 14px;')
      const data = structuredClone(drawData)
      data.draw_data = n > 0.45 ? data.draw_data_3 : data.draw_data_2
      delete data.draw_data_2
      delete data.draw_data_3
      if (n > 0.98) data.draw_data = ''
      if (data.draw_data) {
        Object.keys(data.draw_data.y).forEach((key, index) => {
          data.draw_data.y[key] = data.draw_data.y[key].map(item => Math.random().toFixed(4))
        })
      }
      return data
    }
  },
  {
    url: '/api/chart_description',
    delay: 200,
    enabled,
    body: (req) => {
      return JSON.stringify(desciption.replace(/\n/g, '<br>') + generateID(4))
    }
  }
]
