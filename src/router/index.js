import { createRouter, createWebHistory } from 'vue-router'
import Step1 from '../views/step-1.vue'
import Step2 from '../views/step-2.vue'
import Step3 from '../views/step-3.vue'
import Step4 from '../views/step-4.vue'
import Error403 from '../views/403.vue'
import Error404 from '../views/404.vue'
import Demo1 from '../views/demo-1.vue'
import Demo2 from '../views/demo-2.vue'
import Demo3 from '../views/demo-3.vue'

import AiConversation from '../views/ai-conversation.vue'
import BaseDemo from '@/views/base-demo.vue'
const routes = [
  { path: '/talk', component: AiConversation },
  { path: '/', redirect: '/talk' },
  { path: '/step1', name: 'Step1', component: Step1 },
  { path: '/step2', name: 'Step2', component: Step2 },
  { path: '/step3', name: 'Step3', component: Step3 },
  { path: '/step4', name: 'Step4', component: Step4 },
  { path: '/403', name: '403', component: Error403 },
  { path: '/404', name: '404', component: Error404 },
  { path: '/base', name: 'BaseDemo', component: BaseDemo },
  { path: '/demo1', name: 'Demo1', component: Demo1 },
  { path: '/demo2', name: 'Demo2', component: Demo2 },
  { path: '/demo3', name: 'Demo3', component: Demo3 }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
