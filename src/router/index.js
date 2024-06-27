import { createRouter, createWebHistory } from 'vue-router'
import Step1 from '../views/step-1.vue'
import Step2 from '../views/step-2.vue'
import Step3 from '../views/step-3.vue'
import AiConversation from '../views/ai-conversation.vue'
const routes = [
  { path: '/talk', component: AiConversation },
  { path: '/', redirect: '/talk' },
  { path: '/step1', name: 'Step1', component: Step1 },
  { path: '/step2', name: 'Step2', component: Step2 },
  { path: '/step3', name: 'Step3', component: Step3 }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
