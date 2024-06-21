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

// const drawerApp = document.createElement('div')
// drawerApp.id = 'drawerApp-my-monkey'
// document.body.appendChild(drawerApp)
// app.mount('#' + drawerApp.id)
app.mount('#app')
