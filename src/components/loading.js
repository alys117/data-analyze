import { h } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import LoadingStatus from '@/components/loading-status.vue'
import emitter from '@/utils/mitt.js'
const $loading = useLoading({
  // options
})

let loader = null
function startLoading(process = [{ content: '分析中...', timeConsuming: 5 }], el = null) {
  loader = $loading.show({
    // Pass props by their camelCased names
    container: el,
    canCancel: false, // default false
    onCancel: () => {
      console.log('canceled')
    },
    isFullPage: !el,
    color: '#000000',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.8,
    zIndex: 999
  }, {
    // Pass slots by their names
    // default: h('h2', null, `loading...${tip.value}`)
    default: h(LoadingStatus, { process })
  })
}
function hide() {
  emitter.emit('shutdown')
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  }).then(() => {
    loader.hide()
  })
}
async function callLoading(call, process = [{ content: '分析中', timeConsuming: 5 }], el = null) {
  startLoading(process, el)
  const data = await call()
  hide()
  return data
}

export { hide, startLoading, callLoading }