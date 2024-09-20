import { defineMockData } from 'vite-plugin-mock-dev-server'

export const posts = defineMockData('posts', [
  { id: '1', title: 'title1', content: 'content1' },
  { id: '2', title: 'title2', content: 'content21' }
])

export const users = {
  name: 'tom'
}

export const msg = {
  msg: 'ok'
}
