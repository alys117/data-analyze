import './assets/main.css'
import 'animate.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadVxeTable } from '@/plugins/vxe-table'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
loadVxeTable(app)

app.mount('#app')
