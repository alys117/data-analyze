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

