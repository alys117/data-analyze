import { posts, users, msg } from './data'
export const routes = [
  {
    url: '/api/test1',
    body: () => users
  },
  { url: '/api/test2',
    body: () => posts.value
  },
  { url: '/api/test3',
    body: () => msg
  },
  { url: '/api/test4',
    delay: 3000,
    body(req) {
      console.log(req.headers, 'req')
      return {
        name: 'tom1'
      }
    }
  }
]
