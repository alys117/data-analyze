import { h } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import LoadingStatus from '@/components/loading-status.vue'
const $loading = useLoading({
  // options
})

let loader = null
function startLoading(el, process = { content: '分析中...', timeConsuming: 5 }) {
  loader = $loading.show({
    // Pass props by their camelCased names
    container: el,
    canCancel: false, // default false
    onCancel: () => {
      console.log('canceled')
    },
    isFullPage: false,
    color: '#000000',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999
  }, {
    // Pass slots by their names
    // default: h('h2', null, `loading...${tip.value}`)
    default: h(LoadingStatus, { process })
  })
}
function hide() {
  loader.hide()
}

export { hide, startLoading }
