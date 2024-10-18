import { posts, users, msg, tables, table, outline, busitree, historyoutline, rewriteOutline, drawData, desciption } from './data'
import { generateID, setOrder } from '@/utils/util.js'
const headers = {
  'Content-Type': 'application/json',
  'accept': 'application/json'
}
const enabled = true
const map = new Map()
export const routes = [
  {
    url: '/api/test1',
    body: () => users
  },
  { url: '/api/test2',
    body: () => posts.value
  },
  { url: '/api/test3',
    status: 401,
    body: (req, res) => {
      return msg
    }
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
    url: '/api/login1',
    enabled: true,
    headers({ query, params, body, headers, getCookie }) {
      // query 是 请求链接上的 queryString, 并经过了解析为对象
      // params 请求链接中 动态匹配参数
      // body  POST 请求体
      // headers 请求头
      // getCookie(name, option) 可以通过此方法获取请求头中携带的 cookie 信息
      const token = generateID(8)
      map.set(token, { username: body.username, role: 'admin' })
      return {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly`
      }
    },
    body(req) {
      return {
        status: 200,
        msg: '登录成功'
      }
    }
  },
  {
    url: '/api/login',
    enabled: true,
    response(req, res) {
      const token = generateID(8)
      if (req.body.username === 'liuze' && req.body.password === '123456') {
        map.set(token, { username: req.body.username, role: 'admin' })
        res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly`)
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({
          status: 200,
          msg: '登录成功',
          token
        }))
      } else {
        res.statusCode = 400
        res.statusMessage = 'Unauthorized'
        res.end(JSON.stringify({
          status: 400,
          message: '用户名密码错误！'
        }))
      }
    }
  },
  {
    url: '/api/logout',
    enabled: true,
    response(req, res) {
      map.delete(req.getCookie('token'))
      console.log(map)
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({
        status: 200,
        msg: '登出成功'
      }))
    }
  },
  // {
  //   url: '/api/getUserinfo',
  //   enabled: true,
  //   status: 401,
  //   body(req) {
  //     return {
  //       status: 401,
  //       msg: '未登录'
  //     }
  //   }
  // },
  {
    url: '/api/getUserinfo',
    response(req, res) {
      const cookie = req.getCookie('token')
      console.log(cookie, 'cookie', map)
      const token = req.headers['authorization']
      console.log(token, 'token')
      if (map.has(cookie)) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(map.get(cookie)))
      } else {
        res.statusCode = 401
        res.statusMessage = 'Unauthorized'
        res.end(JSON.stringify({
          status: 401,
          msg: '未登录'
        }))
      }
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
    delay: 3000,
    body(req) {
      const n = Math.random()
      if (n > 0.9) return { 'desc': '数据库中库表无法满足主题需求，请对报告主题进行补充或修改。' }
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
    enabled: true,
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
