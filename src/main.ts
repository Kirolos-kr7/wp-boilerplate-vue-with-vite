import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/tailwind.css'
import routes from './routes'

import 'element-plus/dist/index.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp({})
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#formbuilder_app')

document.body.classList.remove('wp-core-ui')
document.body.classList.remove('wp-admin')
document.getElementById('wpfooter').remove()
