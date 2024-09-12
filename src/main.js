import './assets/main.css'
import 'animate.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import App from './App.vue'
import router from './router'
import { loadVxeTable } from '@/plugins/vxe-table'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'
import registerDetec from './utils/detectives'
const app = createApp(App)
registerDetec(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
loadVxeTable(app)

app.use(LoadingPlugin)

app.mount('#app')
