import { defineMock } from 'vite-plugin-mock-dev-server'
import { routes } from './routes'

export default defineMock([...routes, {
  url: '/api/test10',
  body: () => {
    return {
      name: 'tom10'
    }
  }
}])

// import { posts, users } from './data'
// export default defineMock([
//   {
//     url: '/api/test1',
//     body: () => {
//       return users
//     }
//   },
//   { url: '/api/test2',
//     body: () => posts.value
//   }
// ])

