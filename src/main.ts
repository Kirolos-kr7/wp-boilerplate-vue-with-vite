import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/tailwind.css'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp({})

app.use(router, ElementPlus).mount('#formbuilder_app')
