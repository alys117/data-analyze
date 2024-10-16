import router from './router'
import { useUserStore } from '@/stores/user'
import { useStepStore } from '@/stores/step'
const WHITE_LIST = ['/403']
router.beforeEach(async(to, from, next) => {
  if (WHITE_LIST.indexOf(to.path) !== -1) {
    next()
    return
  }
  const userStore = useUserStore()
  const stepStore = useStepStore()
  const userinfo = await userStore.getUserinfo()
  console.log('userinfo', userinfo)
  if (userinfo && userinfo.value.username) {
    if (to.matched.length === 0) {
      next('/404') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    }
    console.log('放行', userinfo.username)
    next()
  } else {
    stepStore.setStep1(null)
    stepStore.setAiConversation(null)
    stepStore.setOutline(null)
    stepStore.setTreeCache(null)
    next('/403')
  }
})
